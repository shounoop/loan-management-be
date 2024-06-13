const moment = require('moment');


// Hàm tính kỳ hạn dựa trên chu kỳ thanh toán
function getTermInMonths(repaymentSchedule) {
    switch (repaymentSchedule) {
        case 'tháng':
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
module.exports = {
    calculateFixedRateFee, calculateDecliningBalanceFee
}