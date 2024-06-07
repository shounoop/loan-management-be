const AWS = require('aws-sdk')
require(`dotenv`).config();
// import fs from 'fs'
// import { reject } from 'lodash';
// import path, { resolve } from 'path';
const fs = require('fs')
const reject = require('lodash')
const { path, resolve } = require('path')
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
    region: process.env.AWS_REGION
})

const bucketName = process.env.BUCKET_NAME


//config file save on S3
AWS.config.update({

})

let uploadFile = async (filePath, bucketName, filename) => {
    try {
        const fileStream = fs.createReadStream(filePath);
        let dataFile = {};
        fileStream.on('error', (err) => {
            console.log('FIle Error: ', err)
        })
        console.log('filepath', filePath)
        // const fileName = path.basename(filePath);// lấy tên file gốc trong đường dẫn
        const params = {
            Bucket: bucketName,
            Key: filename,
            Body: fileStream,
        }
        const data = await s3.upload(params).promise()
        console.log('data', data)
        return data;
    } catch (e) {
        console.log(e)
        throw e
    }
}
async function downloadFile(bucketName, fileName) {
    const params = {
        Bucket: bucketName,
        Key: fileName,
    }

    const { Body } = await s3.getObject(params).promise();

    return Body;

}
let uploadFileOnS3 = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded')
    }

    try {
        const data = await uploadFile(req.file.path, bucketName)
        console.log('data2', data)
        return res.status(200).json({
            errCode: 0,
            data
        }
        )
    } catch (e) {
        console.log(e)
        return res.send('fail');
    }

}
let downloadFileS3 = async (req, res) => {
    if (!req.params) return res.status(400).send('Missing data')
    let filename = req.query.filename
    console.log("query", req.query.filename)
    let data = await downloadFile(bucketName, filename)
    if (data) {
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        return res.send(data)
    } else {
        res.send('Fail to download')
    }
}
// uploadFile(filePath, bucketName, newFileNameKey)
// downloadFile(bucketName, 'file.pdf', './uploads/save.pdf')

module.exports = {
    uploadFileOnS3, downloadFileS3, uploadFile,
}