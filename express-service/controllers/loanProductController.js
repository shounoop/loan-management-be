'use strict'
const LoanProductService = require('../services/loanProductService');
const loanProductDaos = require('../daos/loanProduct');

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
        let infor = await LoanProductService.getLoanProductById(req.query.id);
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
const getTotalLoanProduct = async (req, res, next) => {
    const totalLoanProduct = await loanProductDaos.getTotalLoanProduct();
    return res.status(200).json({
        message: "Successfully get total of loan product",
        metadata: totalLoanProduct
    })
}
const getTotalLoanProductByYear = async (req, res, next) => {
    const totalLoanProductByYear = await loanProductDaos.getTotalLoanProductByYear(req.params.year);
    return res.status(200).json({
        message: "Succesfully get total of loan product by year",
        metadata: totalLoanProductByYear
    })
}
const getTotalLoanProductOfOneMonthOfOneYear = async (req, res, next) => {
    const totalLoanProductOfOneMonthOfOneYear = await loanProductDaos.getTotalLoanProductOfOneMonthOfOneYear(req.params.year, req.params.month);
    return res.status(200).json({
        message: "Succesfully get total of loan product of one month of one year",
        metadata: totalLoanProductOfOneMonthOfOneYear
    })
}
const getMostSoldLoanProductByYear = async (req, res, next) => {
    const mostSoldLoanProductByYear = await LoanProductService.getMostSoldLoanProductByYear(req.params.year);
    return res.status(200).json({
        message: "Successfully get most sold loan product of a year",
        metadata: mostSoldLoanProductByYear
    })
}
const getMostSoldLoanProductByMonthInAYear = async (req, res, next) => {
    const mostSoldLoanProductByMonthInAYear = await LoanProductService.getMostSoldLoanProductByMonthInAYear(req.params.year, req.params.month);
    return res.status(200).json({
        message: "Successfully get most sold loan product of a month in a year",
        metadata: mostSoldLoanProductByMonthInAYear
    })
}
module.exports = {
    createLoanProduct,
    getAllLoanProduct,
    getLoanProductById,
    editLoanProduct,
    deleteLoanProduct,
    getTotalLoanProduct,
    getTotalLoanProductByYear,
    getTotalLoanProductOfOneMonthOfOneYear,
    getMostSoldLoanProductByYear,
    getMostSoldLoanProductByMonthInAYear
}