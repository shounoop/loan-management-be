import LoanProductService from '../services/loanProductService'
let createLoanProduct = async (req, res) => {
    try {
        let infor = await LoanProductService.createLoanProduct(req.body);
        return res.status(200).json({ infor })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EC: -1,
            EM: 'Error from server'
        })
    }
}
let getAllLoanProduct = async (req, res) => {
    try {
        let infor = await LoanProductService.getAllLoanProduct();
        return res.status(200).json({ infor })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EC: -1,
            EM: 'Error from server'
        })
    }
}
let getLoanProductById = async (req, res) => {
    try {
        let infor = await LoanProductService.getAllLoanProduct(req.query.id);
        return res.status(200).json({ infor })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EC: -1,
            EM: 'Error from server'
        })
    }
}
let editLoanProduct = async (req, res) => {
    try {
        let infor = await LoanProductService.editLoanProduct(req.body);
        return res.status(200).json({ infor })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EC: -1,
            EM: 'Error from server'
        })
    }
}
let deleteLoanProduct = async (req, res) => {
    try {
        let infor = await LoanProductService.deleteLoanProduct(req.body.id);
        return res.status(200).json({ infor })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EC: -1,
            EM: 'Error from server'
        })
    }
}
module.exports = {
    createLoanProduct, getAllLoanProduct, getLoanProductById, editLoanProduct, deleteLoanProduct,
}