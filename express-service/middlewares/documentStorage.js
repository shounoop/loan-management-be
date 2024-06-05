const puppeteer = require('puppeteer')
const path = require('path')
const AWSController = require('../middlewares/AWSController')

// Tạo trang html form đăng ký vay
let createHTML = async (req, res) => {
    const loan = {
        name: req.body.full_name,
        cmnd: req.body.identity_number,
        cmnd_add: req.body.address,
        now_add: req.body.address,
        phoneNumber: req.body.phone_number,
        email: req.body.email,
        amount: req.body.am
    }
    res.render('loanRegister', { loan: req.body })
}
// Tạo file pdf từ trang html, lưu lên AWS- S3
let generateReport = async (req, res) => {
    try {
        let file = {}
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', (interceptedRequest) => {
            if (interceptedRequest.isNavigationRequest() && interceptedRequest.method() === 'GET') {
                interceptedRequest.continue({
                    method: 'POST',
                    postData: JSON.stringify(req.body),
                    headers: {
                        ...interceptedRequest.headers(),
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                interceptedRequest.continue();
            }
        });
        await page.goto('http://localhost:3000/api/create', {
            waitUntil: "networkidle2"
        })
        await page.setViewport({ width: 1680, height: 1050 });
        const todayDate = new Date();

        const pdfn = await page.pdf({
            path: `${path.join(__dirname, '../assets', todayDate.getTime() + ".pdf")}`,
            format: "A4"
        })
        await browser.close();

        const pdfURL = path.join(__dirname, '../assets', todayDate.getTime() + ".pdf")
        console.log('url', pdfURL)
        res.set({
            "Content-Type": "application/pdf",
            "Content-Length": pdfn.length
        })
        res.sendFile(pdfURL)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Error generating PDF');
    }
}

let saveFileOnS3 = async (data) => {
    let check = await AWSController.uploadFile(data[0].path, process.env.BUCKET_NAME)
    // req.body.file = check.key
    // req.body.url = check.Location
    console.log('file', req.body.file)
}

module.exports = {
    createHTML: createHTML,
    generateReport: generateReport,
}