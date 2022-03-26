const hashCode = (input) => {
    var hash = 0,
        i,
        chr;
    if (input.length === 0) return hash;
    for (i = 0; i < input.length; i++) {
        chr = input.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
};

const normalizeObjToStrings = (obj) => {
    const result = Object.entries(obj).reduce((accu, [key, _]) => {
        return accu + '-' + obj[key].toString().toLowerCase();
    }, '');
    return result.substring(1);
};

const removeAccents = (str) => {
    const AccentsMap = [
        'aàảãáạăằẳẵắặâầẩẫấậ',
        'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
        'dđ',
        'DĐ',
        'eèẻẽéẹêềểễếệ',
        'EÈẺẼÉẸÊỀỂỄẾỆ',
        'iìỉĩíị',
        'IÌỈĨÍỊ',
        'oòỏõóọôồổỗốộơờởỡớợ',
        'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
        'uùủũúụưừửữứự',
        'UÙỦŨÚỤƯỪỬỮỨỰ',
        'yỳỷỹýỵ',
        'YỲỶỸÝỴ',
    ];
    for (let i = 0; i < AccentsMap.length; i++) {
        const re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
        const char = AccentsMap[i][0];
        str = str.replace(re, char);
    }
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    return str;
};

const convertToSlug = (text) => {
    text = removeAccents(text)
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
};

module.exports = { hashCode, normalizeObjToStrings, convertToSlug, removeAccents };
