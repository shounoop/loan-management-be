require('dotenv').config()
const nodemailer = require("nodemailer");

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    // async..await is not allowed in global scope, must use a wrapper

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: process.env.EMAIL_APP, // sender address
        to: dataSend.email, // list of receivers
        subject: "Thông báo hạn vay tín dụng ", // Subject line
        text: "Ngân hàng ABC", // plain text body
        html: getBodyHTMLEmail(dataSend),
    });
}

let getBodyHTMLEmail = (dataSend) => {
    let result =
        `
        <h3>NGÂN HÀNG ABC THÔNG BÁO</h3>
        <p>Xin chào ${dataSend.full_name}!</p>
    
    <p>Chúng tôi gửi email này để nhắc nhở bạn về khoản vay cá nhân của bạn.</p>
    
    <p>Thông tin chi tiết:</p>
    <ul>
        <li><strong>Tên khoản vay:</strong> ${dataSend.method_name}</li>
        <li><strong>Số tiền đóng theo chu kì:</strong> ${dataSend.next_term_fee} đồng</li>
        <li><strong>Hạn trả tiền vay:</strong> ${dataSend.payment_date}</li>
    </ul>
    
    <p>Vui lòng thanh toán số tiền đóng trước ngày đã hẹn để tránh các khoản phí trễ hạn.</p>
    
    <p>Xin trân thành cảm ơn.</p>
    
    <p>Trân trọng,</p>
    <p>Đội ngũ hỗ trợ khách hàng</p>
        `

    return result
}





module.exports = {
    sendSimpleEmail: sendSimpleEmail,
}