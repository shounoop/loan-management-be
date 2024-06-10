const puppeteer = require('puppeteer')
const path = require('path')
const AWSController = require('../middlewares/AWSController')
const { toWords } = require('number-to-words');
require('dotenv').config();
// Tạo trang html form đăng ký vay
let createHTML = async (req, res) => {
    const currentDate = new Date()
    const daysOfWeek = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0
    const year = currentDate.getFullYear();
    const amount_word = convertToWords(req.body.loan_amount)
    const loan = {
        name: req.body.full_name,
        cmnd: req.body.identity_number,
        cmnd_add: req.body.address,
        now_add: req.body.address,
        phoneNumber: req.body.phone_number,
        email: req.body.email,
        amount: req.body.loan_amount,
        amount_word: amount_word,
        reason: req.body.loan_type_name,
        term: req.body.term,
        assets: req.body.loan_method_name,
        date: daysOfWeek[currentDate.getDay()],
        day: day,
        month: month,
        year: year,



    }
    res.render('loanContact', { loan: loan })
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

        const pdfBuffer = await page.pdf({
            // path: `${path.join(__dirname, '../assets', todayDate.getTime() + ".pdf")}`,
            format: "A4",
            printBackground: true,
            margin: {
                top: "1cm",
                bottom: "1cm",
                left: "1cm",
                right: "1cm"
            }
        })

        await browser.close();

        // const pdfURL = path.join(__dirname, '../assets', todayDate.getTime() + ".pdf")
        // console.log('url', pdfURL)
        res.set({
            "Content-Type": "application/pdf",
            "Content-Length": pdfBuffer.length
        })

        // saveFileOnS3(pdfURL)
        res.end(pdfBuffer)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Error generating PDF');
    }
}

let saveFileOnS3 = async (data) => {
    let check = await AWSController.uploadFile(data, process.env.BUCKET_NAME)
    // req.body.file = check.key
    // req.body.url = check.Location
    console.log('check', check)
    console.log('file', req.body.file)
}
//Chuyển tiếng việt
const units = ["", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
const teens = ["mười", "mười một", "mười hai", "mười ba", "mười bốn", "mười lăm", "mười sáu", "mười bảy", "mười tám", "mười chín"];
const tens = ["", "", "hai mươi", "ba mươi", "bốn mươi", "năm mươi", "sáu mươi", "bảy mươi", "tám mươi", "chín mươi"];
const thousands = ["", "nghìn", "triệu", "tỷ"];

function convertToWords(num) {
    if (num === 0) return "không";

    let word = '';
    let thousandCounter = 0;

    while (num > 0) {
        let chunk = num % 1000;

        if (chunk) {
            let chunkWord = '';
            if (chunk > 99) {
                chunkWord += units[Math.floor(chunk / 100)] + ' trăm ';
                chunk %= 100;
            }

            if (chunk > 19) {
                chunkWord += tens[Math.floor(chunk / 10)] + ' ';
                chunk %= 10;
            }

            if (chunk > 9) {
                chunkWord += teens[chunk - 10] + ' ';
            } else if (chunk > 0) {
                chunkWord += units[chunk] + ' ';
            }

            word = chunkWord + thousands[thousandCounter] + ' ' + word;
        }

        num = Math.floor(num / 1000);
        thousandCounter++;
    }

    return word.trim();
}
module.exports = {
    createHTML: createHTML,
    generateReport: generateReport,
}