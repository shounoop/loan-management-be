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
module.exports = {
    createLoanType,
}