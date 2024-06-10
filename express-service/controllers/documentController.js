const DocumentService = require('../services/documentService')
let createDocument = async (req, res) => {
    try {
        let infor = await DocumentService.createDocument(req.body);
        return res.status(200).json({ infor })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EC: -1,
            EM: 'Error from server'
        })
    }
}
let getAllDocument = async (req, res) => {
    try {
        let infor = await DocumentService.getAllDocument();
        return res.status(200).json({ infor })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EC: -1,
            EM: 'Error from server'
        })
    }
}
let getDocumentById = async (req, res) => {
    try {
        let infor = await DocumentService.getAllDocument(req.query.id);
        return res.status(200).json({ infor })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EC: -1,
            EM: 'Error from server'
        })
    }
}
let editDocument = async (req, res) => {
    try {
        let infor = await DocumentService.editDocument(req.body);
        return res.status(200).json({ infor })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EC: -1,
            EM: 'Error from server'
        })
    }
}
let deleteDocument = async (req, res) => {
    try {
        let infor = await DocumentService.deleteDocument(req.body.id);
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
    createDocument, getAllDocument, getDocumentById, editDocument, deleteDocument,
}