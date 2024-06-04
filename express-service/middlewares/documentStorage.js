import { PDFDocument, rgb } from 'pdf-lib';
const { readFile, writeFile } = require('fs/promises')
let createPdf = async (input, output, replacements) => {
    try {
        const pdfDoc = await PDFDocument.load(await readFile(input))
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        // Kích thước trang PDF
        const { height } = firstPage.getSize();

        // Tạo một bản đồ vị trí cho từng phần văn bản cần thay thế
        const positions = {
            'Họ và tên:': { x: 100, y: height - 100 },
            'Giấy CMND số': { x: 100, y: height - 120 },
            'do ': { x: 100, y: height - 140 },
            'ngày / /': { x: 100, y: height - 160 },
            'Hộ khẩu thường trú: ': { x: 100, y: height - 180 },
            'Địa chỉ hiện tại: ': { x: 100, y: height - 200 },
            'Điện thoại nhà riêng: ': { x: 100, y: height - 220 },
            'Điện thoại di động: ': { x: 100, y: height - 240 },
            'Số tiền vay: ': { x: 100, y: height - 260 },
            '(Bằng chữ: )': { x: 100, y: height - 280 },
            'Mục đích sử dụng tiền vay: ': { x: 100, y: height - 300 },
            'Thời hạn vay: ': { x: 100, y: height - 320 },
            'Tài sản bảo đảm cho khoản vay là: ': { x: 100, y: height - 340 },
            'Thông tin về tính khả thi, hiệu quả của hoạt động sản xuất kinh doanh và dịch vụ, tính khả thi của hoạt động đời sống liên quan đến mục đích sử dụng vốn: ............': { x: 100, y: height - 340 },
            'Các nguồn thu dự kiến dùng để trả nợ: ': { x: 100, y: height - 380 },
            'Lợi ích từ việc thực hiện các hoạt động sử dụng vốn vay: ': { x: 100, y: height - 400 }
        };

        // Thêm văn bản mới tại vị trí cụ thể trên trang
        for (const [key, value] of Object.entries(replacements)) {
            const position = findTextPosition(firstPage, key);
            if (position) {
                // Chuyển đổi văn bản sang mã Unicode trước khi thêm vào PDF
                const unicodeValue = convertToUnicode(value);
                firstPage.drawText(unicodeValue, { x: position.x, y: position.y, size: 12, color: rgb(0, 0, 0) });
            }
        }

        // Lưu lại file PDF với các giá trị đã được thay thế
        const pdfBytes = await pdfDoc.save();
        await fs.writeFile(output, pdfBytes);

        console.log('PDF created successfully');
    } catch (error) {
        console.log('Failed to create PDF:', error)
    }
}
async function findTextPosition(page, searchText) {
    const textContent = await page.getTextContent();
    const items = textContent.items;

    for (let i = 0; i < items.length; i++) {
        if (items[i].str.includes(searchText)) {
            return { x: items[i].x, y: items[i].y };
        }
    }

    return null;
}
let convertToUnicode = (text) => {
    const map = {
        'á': '\u00E1', 'à': '\u00E0', 'ả': '\u1EA3', 'ã': '\u00E3', 'ạ': '\u1EA1',
        'ấ': '\u1EA5', 'ầ': '\u1EA7', 'ẩ': '\u1EA9', 'ẫ': '\u1EAB', 'ậ': '\u1EAD',
        'ắ': '\u1EAF', 'ằ': '\u1EB1', 'ẳ': '\u1EB3', 'ẵ': '\u1EB5', 'ặ': '\u1EB7',
        'é': '\u00E9', 'è': '\u00E8', 'ẻ': '\u1EBB', 'ẽ': '\u1EBD', 'ẹ': '\u1EB9',
        'ế': '\u1EBF', 'ề': '\u1EC1', 'ể': '\u1EC3', 'ễ': '\u1EC5', 'ệ': '\u1EC7',
        'í': '\u00ED', 'ì': '\u00EC', 'ỉ': '\u1EC9', 'ĩ': '\u0129', 'ị': '\u1ECB',
        'ó': '\u00F3', 'ò': '\u00F2', 'ỏ': '\u1ECF', 'õ': '\u00F5', 'ọ': '\u1ECD',
        'ố': '\u1ED1', 'ồ': '\u1ED3', 'ổ': '\u1ED5', 'ỗ': '\u1ED7', 'ộ': '\u1ED9',
        'ớ': '\u1EDB', 'ờ': '\u1EDD', 'ở': '\u1EDF', 'ỡ': '\u1EE1', 'ợ': '\u1EE3',
        'ú': '\u00FA', 'ù': '\u00F9', 'ủ': '\u1EE7', 'ũ': '\u0169', 'ụ': '\u1EE5',
        'ứ': '\u1EE9', 'ừ': '\u1EEB', 'ử': '\u1EED', 'ữ': '\u1EEF', 'ự': '\u1EF1',
        'ý': '\u00FD', 'ỳ': '\u1EF3', 'ỷ': '\u1EF5', 'ỹ': '\u1EF7', 'ỵ': '\u1EF9',
        'Ă': '\u0102', 'ă': '\u0103', 'Â': '\u00C2', 'â': '\u00E2',
        'Đ': '\u0110', 'đ': '\u0111', 'Ê': '\u00CA', 'ê': '\u00EA', 'Ô': '\u00D4',
        'ô': '\u00F4', 'Ơ': '\u01A0', 'ơ': '\u01A1', 'Ư': '\u01AF', 'ư': '\u01B0'
    };

    return text.replace(/[áàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵĂăÂâĐđÊêÔôƠơƯư]/g, function (matched) {
        return map[matched];
    });
}
module.exports = {
    createPdf
}