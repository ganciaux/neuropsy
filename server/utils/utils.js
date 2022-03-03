const charPad = (num, places, char) => {
    let defaultChar='0';
    if (char) defaultChar=char;
    return String(num).padStart(places, defaultChar);
};

const getReference = (date, count, pattern) => {
    let defaultPattern='';
    if (pattern) defaultPattern=pattern;
    const year = date.getFullYear();
    return `${defaultPattern}${year}${charPad(date.getMonth()+1,2)}${charPad(count,4)}`;
    //throw new Error(`Can't set new ${model} reference (${year})`);
};

const getArticlesPrice = (articles) => {
    let price = 0.0;
    articles.forEach(element => price += Math.round(element.quantity*element.unitCost*100)/100 );
    return price;
};

const formatDate = (date) => {
    return `${date.getFullYear()}/${charPad(date.getMonth()+1,2)}/${charPad(date.getDay(),2)}`;
};

exports.charPad = charPad;
exports.getReference = getReference;
exports.getArticlesPrice = getArticlesPrice;
exports.formatDate = formatDate;