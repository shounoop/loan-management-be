const moment = require('moment');
const { Op } = require('sequelize');
const loanProductService = require('../services/loanProductService');
const db = require("../models");
const PaymentConst = require('../constant/paymentConst');

const beforeCreateNewPayment = async (newPaymentData) => {
    let data = {}
    console.log('newPaymentData', newPaymentData)
    let product = await loanProductService.getLoanProductById(newPaymentData.loan_product_id)
    if (!product || !product.data || !product.data.ProductType || !product.data.loan_method_id) {
        return 0;
    }
    let type = product.data.ProductType
    let method_id = product.data.loan_method_id
    data.amount_paid = 0.00;
    data.remaining_balance = newPaymentData.remaining_balance;
    //Tính theo method lãi cố đinh
    if (method_id === 1) {
        let count = calculateFixedRateFee(newPaymentData, product.data, type)
        data.remaining_balance = count.remainingBalance
        data.next_term_fee = count.nextTermFee
    }
    //Tính theo method lãi giảm dần
    else {
        let count = calculateDecliningBalanceFee(newPaymentData, product.data, type)
        data.remaining_balance = count.remainingBalance
        data.next_term_fee = count.nextTermFee
    }
    console.log('data', data)
    return data
}
// Hàm tính kỳ hạn dựa trên chu kỳ thanh toán
function getTermInMonths(repaymentSchedule) {
    switch (repaymentSchedule) {
        case 'monthly':
            return 1;
        case 'quarterly':
            return 3;
        case 'annually':
            return 12;
        default:
            return 1;
    }
}
// Hàm xác định trạng thái thanh toán
function getPaymentStatus(paymentDate, currentDate, repaymentSchedule) {
    const term = getTermInMonths(repaymentSchedule);
    const dueDate = moment(paymentDate).add(term, 'months');

    if (currentDate.isSameOrBefore(dueDate, 'day')) {
        return 'ontime';
    } else if (currentDate.isAfter(dueDate, 'day')) {
        return 'late';
    } else {
        return 'early';
    }
}

//Hàm tính lãi suất giảm dần
const calculateDecliningBalanceFee = (payment, loanProduct, loanType) => {

    const data = {}
    const currentDate = moment();
    const paymentDate = moment(payment.payment_date);
    let remainingBalance = payment.remaining_balance;
    const principalAmount = payment.principal_amount;
    const interestRate = loanType.interest_rate / 100; // Lãi suất theo chu kỳ
    const termInMonths = getTermInMonths(loanProduct.repayment_schedule);

    // Trạng thái thanh toán
    const paymentStatus = getPaymentStatus(paymentDate, currentDate, loanProduct.repayment_schedule);
    if (paymentStatus === 'ontime' || paymentStatus === 'early') {
        return data;
    }
    // Tính lãi theo dư nợ hiện tại phải trả
    const totalInterest = remainingBalance * interestRate;
    // Số tiền phải trả cho kì hạn tới
    const interestForTerm = totalInterest + (principalAmount / payment.loan_term * termInMonths)
    //Cập nhật remainingBalance
    remainingBalance += totalInterest
    // Cập nhật payment_date cho kỳ hạn tiếp theo
    payment.payment_date = paymentDate.add(termInMonths, 'months').format('YYYY-MM-DD');

    // Điều chỉnh phí kỳ hạn tiếp theo dựa trên trạng thái thanh toán
    let nextTermFee;
    if (paymentStatus === 'ontime' || paymentStatus === 'early') {
        nextTermFee = interestForTerm;
    } else {
        nextTermFee = interestForTerm + totalInterest * loanType.late_interest_fee;
        remainingBalance = remainingBalance + totalInterest * loanType.late_interest_fee
    }
    data.remainingBalance = remainingBalance
    data.nextTermFee = nextTermFee
    return data;
}
//Hàm tính lãi suất gốc cố định
const calculateFixedRateFee = (payment, loanProduct, loanType) => {
    const data = {}
    const currentDate = moment();
    const paymentDate = moment(payment.payment_date);
    const principalAmount = payment.principal_amount;
    const interestRate = loanType.interest_rate / 100;
    const term = getTermInMonths(loanProduct.repayment_schedule)
    const late_interest_fee = loanType.late_interest_fee
    // Trạng thái thanh toán
    const paymentStatus = getPaymentStatus(paymentDate, currentDate, loanProduct.repayment_schedule);
    if (paymentStatus === 'early') {
        return data;
    }
    let remainBalance = payment.remaining_balance
    // Tính số tiền phải trả hàng kỳ bao gồm cả tiền gốc và tiền lãi
    const totalInterest = principalAmount * interestRate;
    const fixedTermPayment = (principalAmount / payment.loan_term * term) + totalInterest;
    // Cập nhật payment_date cho kỳ hạn tiếp theo
    payment.payment_date = paymentDate.add(term, 'months').format('YYYY-MM-DD');
    let nextTermFee;
    if (paymentStatus === 'ontime' || paymentStatus === 'early') {
        nextTermFee = fixedTermPayment;
    } else {
        nextTermFee = fixedTermPayment + totalInterest * late_interest_fee;
        remainBalance = remainBalance + totalInterest * late_interest_fee;
    }
    data.remainingBalance = remainBalance
    data.nextTermFee = nextTermFee
    return data;
}
const updatePaymentbyStatus = async () => {
    try {
        const payments = await db.Payment.findAll({
            where: {
                payment_status: {
                    [Op.or]: [PaymentConst.DISBURSED, PaymentConst.DELINQUENT]
                }
            },
            include: [
                {
                    model: db.LoanProduct,
                    as: 'LoanProduct',
                    include: [
                        { model: db.LoanType, as: 'ProductType' },
                        { model: db.LoanMethod, as: 'ProductMethod' }
                    ]
                }
            ]
        });
        if (payments) {
            for (let payment of payments) {
                const loanProduct = payment.LoanProduct;
                const loanType = loanProduct.ProductType;
                const loanMethod = loanProduct.ProductMethod;
                const currentDate = new Date();
                const paymentDate = new Date(payment.payment_date);
                const daysDifference = Math.floor((currentDate - paymentDate) / (1000 * 60 * 60 * 24));
                const termInMonths = getTermInMonths(loanProduct.repayment_schedule);
                let nextTermFee = parseFloat(payment.next_term_fee)
                let remainBalance = parseFloat(payment.remaining_balance)
                if (daysDifference > 0) {
                    if (payment.payment_status === '3' && payment.next_term_fee === 0) {
                        payment.payment_status = '5'
                        if (loanMethod.loan_method_id === 1) {
                            const principalAmount = parseFloat(payment.principal_amount);
                            const interestRate = parseFloat(loanType.interest_rate / 100);
                            const late_interest_fee = parseFloat(loanType.late_interest_fee / 100)
                            const totalInterest = parseFloat(principalAmount * interestRate);
                            nextTermFee = parseFloat(nextTermFee + parseFloat(totalInterest) * late_interest_fee);
                            remainBalance = parseFloat(remainBalance + parseFloat(totalInterest * late_interest_fee));
                        }
                        if (loanMethod.loan_method_id === 2) {
                            const principalAmount = parseFloat(payment.principal_amount);
                            const interestRate = parseFloat(loanType.interest_rate / 100); // Lãi suất theo chu kỳ
                            const totalInterest = parseFloat(payment.remaining_balance * interestRate);
                            const late_interest_fee = parseFloat(loanType.late_interest_fee / 100)
                            // Số tiền phải trả cho kì hạn tới
                            const interestForTerm = parseFloat(totalInterest + (principalAmount / payment.loan_term * termInMonths))
                            nextTermFee = parseFloat(nextTermFee + totalInterest * late_interest_fee);
                            remainBalance = parseFloat(remainBalance + parseFloat(totalInterest * late_interest_fee))
                        }

                    }
                    if (loanMethod.loan_method_id === 1) {
                        const principalAmount = parseFloat(payment.principal_amount);
                        const interestRate = parseFloat(loanType.interest_rate / 100);
                        const totalInterest = parseFloat(principalAmount * interestRate);
                        const fixedTermPayment = (principalAmount / parseFloat(payment.loan_term) * termInMonths) + totalInterest;
                        payment.next_term_fee = parseFloat(nextTermFee + fixedTermPayment)
                        payment.remaining_balance = parseFloat(remainBalance + totalInterest);
                    }
                    if (loanMethod.loan_method_id === 2) {
                        const principalAmount = payment.principal_amount;
                        const interestRate = loanType.interest_rate / 100; // Lãi suất theo chu kỳ
                        const totalInterest = payment.remaining_balance * interestRate;
                        // Số tiền phải trả cho kì hạn tới
                        const interestForTerm = totalInterest + (principalAmount / payment.loan_term * termInMonths)
                        payment.next_term_fee = parseFloat(nextTermFee + interestForTerm);
                        payment.remaining_balance = parseFloat(remainBalance + totalInterest);
                    }
                    payment.payment_date = moment(payment.payment_date).add(termInMonths, 'months').format('YYYY-MM-DD');
                    await payment.save();
                }

            }
            console.log('Successfull update')
            return payments
        } else {
            console.log('Fail update')
            return
        }

    } catch (error) {
        console.log(error)
        return
    }
}
module.exports = {
    calculateFixedRateFee, calculateDecliningBalanceFee, beforeCreateNewPayment, updatePaymentbyStatus, getPaymentStatus,
}