const CountingPaymentService = require('../services/CountingPaymentService')
const PaymentConst = require('../constant/paymentConst')

let beforeCreateNewPayment = async (req, res, next) => {
    try {
        req.body.remaining_balance = req.body.principal_amount
        req.body.next_term_fee = parseInt(0)
        req.body.amount_paid = parseInt(0)
        req.body.payment_status = PaymentConst.PENDING
        next()
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EC: -1,
            EM: 'Error from server'
        })
    }
}

const updatePaymentStatusMiddleware = async (req, res, next) => {
    try {
        const payments = await CountingPaymentService.updatePaymentbyStatus()
        next()

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EC: -1,
            EM: 'Error from server',
        })
    }
}
module.exports = {
    beforeCreateNewPayment, updatePaymentStatusMiddleware
}