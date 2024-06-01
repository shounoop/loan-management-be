import loanTypeService from '../services/loanTypeService'
let createLoanType = async (req, res) => {
    try {
        let infor = await loanTypeService.createLoanType(req.body);
        return res.status(200).json({ infor })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EC: -1,
            EM: 'Error from server'
        })
    }
}
let getAllLoanType = async (req, res) => {
    try {
        let infor = await loanTypeService.getAllLoanType();
        return res.status(200).json({ infor })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EC: -1,
            EM: 'Error from server'
        })
    }
}
let getLoanTypeById = async (req, res) => {
    try {
        let infor = await loanTypeService.getAllLoanType(req.query.id);
        return res.status(200).json({ infor })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EC: -1,
            EM: 'Error from server'
        })
    }
}
let editLoanType = async (req, res) => {
    try {
        let infor = await loanTypeService.editLoanType(req.body);
        return res.status(200).json({ infor })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EC: -1,
            EM: 'Error from server'
        })
    }
}
let deleteLoanType = async (req, res) => {
    try {
        console.log(req.body.id)
        let infor = await loanTypeService.deleteLoanType(req.body.id);
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
    createLoanType, getAllLoanType, getLoanTypeById, editLoanType, deleteLoanType,
}