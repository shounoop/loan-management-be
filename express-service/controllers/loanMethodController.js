const loanMethodService = require('../services/loanMethodService')
let createLoanMethod = async (req, res) => {
    try {
        let infor = await loanMethodService.createLoanMethod(req.body);
        return res.status(200).json({ infor })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EC: -1,
            EM: 'Error from server'
        })
    }
}
let getAllLoanMethod = async (req, res) => {
    try {
        let infor = await loanMethodService.getAllLoanMethod();
        return res.status(200).json({ infor })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EC: -1,
            EM: 'Error from server'
        })
    }
}
let getLoanMethodById = async (req, res) => {
    try {
        let infor = await loanMethodService.getLoanMethodById(req.query.id);
        return res.status(200).json({ infor })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EC: -1,
            EM: 'Error from server'
        })
    }
}
let editLoanMethod = async (req, res) => {
    try {
        let infor = await loanMethodService.editLoanMethod(req.body);
        return res.status(200).json({ infor })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EC: -1,
            EM: 'Error from server'
        })
    }
}
let deleteLoanMethod = async (req, res) => {
    try {
        let infor = await loanMethodService.deleteLoanMethod(req.body.id);
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
    createLoanMethod, getAllLoanMethod, getLoanMethodById, editLoanMethod, deleteLoanMethod,
}