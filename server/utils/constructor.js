const PdfkitConstruct = require('pdfkit-construct')
const fs = require('fs')

getDbData()
  .then((products) => {
    for (let i = 0; i < products.length; i++) {
      products[i].amount = (products[i].price * products[i].quantity).toFixed(2)
      products[i].price = products[i].price.toFixed(2)
    }

    // Create a document
    const doc = new PdfkitConstruct({
      size: 'A4',
      margins: { top: 20, left: 10, right: 10, bottom: 20 },
      bufferPages: true,
    })

    // set the header to render in every page
    doc.setDocumentHeader({}, () => {
      doc
        .lineJoin('miter')
        .rect(0, 0, doc.page.width, doc.header.options.heightNumber)
        .fill('#ededed')

      doc
        .fill('#115dc8')
        .fontSize(20)
        .text('Hello world header', doc.header.x, doc.header.y)
    })

    // set the footer to render in every page
    doc.setDocumentFooter({}, () => {
      doc
        .lineJoin('miter')
        .rect(0, doc.footer.y, doc.page.width, doc.footer.options.heightNumber)
        .fill('#c2edbe')

      doc
        .fill('#7416c8')
        .fontSize(8)
        .text('Hello world footer', doc.footer.x, doc.footer.y + 10)
    })

    // add a table (you can add multiple tables with different columns)
    // make sure every column has a key. keys should be unique
    doc.addTable(
      [
        { key: 'name', label: 'Product', align: 'left' },
        { key: 'brand', label: 'Brand', align: 'left' },
        { key: 'price', label: 'Price', align: 'right' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'amount', label: 'Amount', align: 'right' },
      ],
      products,
      {
        border: null,
        width: 'fill_body',
        striped: true,
        stripedColors: ['#f6f6f6', '#d6c4dd'],
        cellsPadding: 10,
        marginLeft: 45,
        marginRight: 45,
        headAlign: 'center',
      },
    )

    // render tables
    doc.render()

    // this should be the last
    // for this to work you need to set bufferPages to true in constructor options
    doc.setPageNumbers((p, c) => `Page ${p} of ${c}`, 'bottom right')

    const path = `${__dirname}/../files/`
    const fileName = `constructor.pdf`

    // pipe to a writable stream which would save the result into the same directory
    const stream = fs.createWriteStream(`${path}${fileName}`)

    doc.pipe(stream)
    doc.end()
  })
  .catch((error) => {
    console.log('error')
  })

function getDbData() {
  return new Promise((resolve, reject) => {
    resolve([
      {
        id: 7631,
        SKU: 'HEH-9133',
        name: 'On Cloud Nine Pillow On Cloud Nine Pillow On Cloud Nine Pillow On Cloud Nine Pillow',
        price: 24.99,
        brand: 'FabDecor',
        quantity: 1,
        created_at: '2018-03-03 17:41:13',
      },
      {
        id: 7615,
        SKU: 'HEH-2245',
        name: 'Simply Sweet Blouse',
        price: 42,
        brand: 'Entity Apparel',
        quantity: 2,
        created_at: '2018-03-20 22:24:21',
      },
      {
        id: 8100,
        SKU: 'WKS-6016',
        name: 'Uptown Girl Blouse',
        price: 58,
        brand: 'Entity Apparel',
        quantity: 3,
        created_at: '2018-03-16 21:55:28',
      },
    ])
  })
}
