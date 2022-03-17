const pdfGenerator = require('./pdfmake')

console.log('order print: before call')

const orderPdf = new pdfGenerator({})

const fullName = orderPdf.generate()

console.log('order print: after call', fullName)
