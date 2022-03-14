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
      margins: { top: 200, left: 10, right: 10, bottom: -75 },
      bufferPages: true,
    })

    // set the header to render in every page
    doc.setDocumentHeader({}, () => {
      console.log('setDocumentHeader: ', doc.header)
      doc
        .lineJoin('miter')
        .rect(0, 0, doc.page.width, doc.header.options.heightNumber)
        .fill('#fff')
        .image('./images/logo.jpg', 55, 30, { width: 100 })

        .fill('#000')
        .fontSize(12)
        .text('BIGEREL Aurélie', doc.header.x + 45, doc.header.y - 50)
        .text('Neuropsychologue', { oblique: true })
        .moveDown()
        .fontSize(10)
        .text('150, route de Lorraine')
        .text('54400 COSNES-ET-ROMAIN')
        .text('06 08 62 89 96')
        .text('N°SIRET : 880 648 159 00015')
        .text('APE : 8690F')
        .text('ADELI : 54 93 1096 9')
    })

    // set the footer to render in every page
    doc.setDocumentFooter({}, () => {
      console.log('setDocumentFooter: ', doc.footer)
      doc
        .lineJoin('miter')
        .rect(0, doc.footer.y, doc.page.width, doc.footer.options.heightNumber)
        .fill('#c2edbe')

      doc
        .fill('#7416c8')
        .fontSize(8)
        .text('Hello world footer', doc.footer.x, doc.footer.y + 10)
    })

    doc
      .fontSize(12)
      .fill('#000')
      .text('Date : Le 7 mars 2022', 55, 350, { align: 'right' })
      .text('A l’attention de Mme CARMINATI', { align: 'right' })
      .moveDown()
      .text('Objet : Facture ')

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

    doc
      .fontSize(12)
      .fill('#000')
      .text(
        '« Assurance professionnelle : responsabilité civile MULTI PRO CIC souscrite auprès de la compagnie ACM IARD SA- CIC Longwy 54400.',
        55,
        350,
        { align: 'center' },
      )
      .text(
        '« Dispensée d’immatriculation au registre du commerce et des sociétés (RCS) et au répertoire des métiers (RM) »',
      )
      .text('« TVA non-applicable, art.293 Bdu CGI »')
      .text(
        '« En cas de retard de paiement, indemnité forfaitaire légale pour frais de recouvrement : 40,00 € »',
      )
      .moveDown()

    // this should be the last
    // for this to work you need to set bufferPages to true in constructor options
    doc.setPageNumbers((p, c) => `Page ${p} of ${c}`, 'bottom right')

    const path = `${__dirname}/../files/`
    const fileName = `constructor${new Date().getTime()}.pdf`

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
