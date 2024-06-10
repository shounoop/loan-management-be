'use strict'
const LoanProductDetailService = require('../services/loanProductDetailService');

let createLoanProductDetail = async (req, res) => {
    try {
        let infor = await LoanProductDetailService.createLoanProductDetail(req.body);
        return res.status(200).json({ infor })

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EC: -1,
            EM: 'Error from server'
        })
    }
}
let getAllLoanProductDetail = async (req, res) => {
    try {
        let infor = await LoanProductDetailService.getAllLoanProductDetail();
        return res.status(200).json({ infor })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EC: -1,
            EM: 'Error from server'
        })
    }
}
let getLoanProductDetailById = async (req, res) => {
    try {
        let infor = await LoanProductDetailService.getLoanProductDetailById(req.query.id);
        return res.status(200).json({ infor })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EC: -1,
            EM: 'Error from server'
        })
    }
}
let editLoanProductDetail = async (req, res, next) => {
    try {
        let infor = await LoanProductDetailService.editLoanProductDetail(req.body);
        return res.status(200).json({ infor })
        next()
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EC: -1,
            EM: 'Error from server'
        })
    }
}
let deleteLoanProductDetail = async (req, res) => {
    try {
        let infor = await LoanProductDetailService.deleteLoanProductDetail(req.body.id);
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
    createLoanProductDetail,
    getAllLoanProductDetail,
    getLoanProductDetailById,
    editLoanProductDetail,
    deleteLoanProductDetail,
}