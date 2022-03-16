const fs = require('fs')
const PDFDocument = require('pdfkit')

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ bufferPages: true, size: 'A4', margin: 50 })

  console.log(doc.y)

  doc.on('pageAdded', () => {
    console.log('new page...')
    doc.y = 0
  })

  generateHeader(doc)
  generateInvoiceTable(doc, invoice)
  generateFooter(doc)

  doc.end()
  doc.pipe(fs.createWriteStream(path))
}

function generateHeader(doc) {
  /*
  doc
    .image('./images/logo.jpg', 50, 45, { width: 50 })
    .fillColor('#444444')
    .fontSize(20)
    .text('ACME Inc.', 110, 57)
    .fontSize(10)
    .text('ACME Inc.', 200, 50, { align: 'right' })
    .text('123 Main Street', 200, 65, { align: 'right' })
    .text('New York, NY, 10025', 200, 80, { align: 'right' })
    .moveDown()
    */
  const order = { ref: '123', name: 'ghis', date: '2022/02' }
  doc
    .image('./images/logo.jpg', 40, 40, { width: 100 })
    .fillColor('#000')
    .fontSize(10)
    .text(`Numéro de commande: ${order.ref}`, 40, 150, {
      align: 'right',
    })
    .text('BIGEREL Aurélie', 40, 170)
    .text('Neuropsychologue', { oblique: true })
    .moveDown()
    .fontSize(10)
    .text('150, route de Lorraine')
    .text('54400 COSNES-ET-ROMAIN')
    .text('06 08 62 89 96')
    .text('N°SIRET : 880 648 159 00015')
    .text('APE : 8690F')
    .text('ADELI : 54 93 1096 9')
    .text(`Date: ${order.date}`, { align: 'right' })
    .moveDown()
    .text(`A l’attention de ${order.name}`, {
      align: 'right',
    })
    .moveDown()
    .moveDown()
    .text('Objet : Commande')
}

function generateCustomerInformation(doc, invoice) {
  doc.fillColor('#444444').fontSize(20).text('Invoice', 50, 160)

  generateHr(doc, 185)

  const customerInformationTop = 200

  doc
    .fontSize(10)
    .text('Invoice Number:', 50, customerInformationTop)
    .font('Helvetica-Bold')
    .text(invoice.invoice_nr, 150, customerInformationTop)
    .font('Helvetica')
    .text('Invoice Date:', 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text('Balance Due:', 50, customerInformationTop + 30)
    .text(
      formatCurrency(invoice.subtotal - invoice.paid),
      150,
      customerInformationTop + 30,
    )

    .font('Helvetica-Bold')
    .text(invoice.shipping.name, 300, customerInformationTop)
    .font('Helvetica')
    .text(invoice.shipping.address, 300, customerInformationTop + 15)
    .text(
      invoice.shipping.city +
        ', ' +
        invoice.shipping.state +
        ', ' +
        invoice.shipping.country,
      300,
      customerInformationTop + 30,
    )
    .moveDown()

  generateHr(doc, 252)
}

function generateInvoiceTable(doc, invoice) {
  let i
  let invoiceTableTop = doc.y + 10

  doc.font('Helvetica-Bold')
  generateTableRow(
    doc,
    invoiceTableTop,
    'Description',
    'Unité',
    'Quantité',
    'Prix Unit.',
    'Total',
  )
  generateHr(doc, invoiceTableTop + 20)
  doc.font('Helvetica')
  let k = 0
  let offset = 0
  for (i = 0; i < invoice.items.length; i++) {
    offset = 0
    const item = invoice.items[i]
    let position = invoiceTableTop + (k + 1) * 30
    if (position > 780) {
      position = 50
      k = 0
      invoiceTableTop = 20
      doc.addPage()
      generateTableRow(
        doc,
        20,
        'Description',
        'Unité',
        'Quantité',
        'Prix Unit.',
        'Total',
      )
      generateHr(doc, 40)
    }
    console.log('generateHr', i, k, position, invoiceTableTop)
    offset += generateTableRow(
      doc,
      position,
      item.item,
      item.description,
      formatCurrency(item.amount / item.quantity),
      item.quantity,
      formatCurrency(item.amount),
    )

    generateHr(doc, position + 20)
    k += 1
  }

  const subtotalPosition = invoiceTableTop + (k + 1) * 30
  generateTableRow(
    doc,
    subtotalPosition,
    '',
    '',
    'Sous total',
    '',
    formatCurrency(invoice.subtotal),
  )

  const paidToDatePosition = subtotalPosition + 20
  generateTableRow(
    doc,
    paidToDatePosition,
    '',
    '',
    'Payé',
    '',
    formatCurrency(invoice.paid),
  )

  const duePosition = paidToDatePosition + 25
  doc.font('Helvetica-Bold')
  generateTableRow(
    doc,
    duePosition,
    '',
    '',
    'Reste à payer',
    '',
    formatCurrency(invoice.subtotal - invoice.paid),
  )
  doc.font('Helvetica')
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal,
) {
  console.log('generateTableRow start', y, doc.y)
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y, {
      width: 200,
    })
    .text(unitCost, 280, y, { width: 90, align: 'right' })
    .text(quantity, 370, y, { width: 90, align: 'right' })
    .text(lineTotal, 0, y, { align: 'right' })
  console.log('generateTableRow end', y, doc.y)
  return parseInt(description.length / 30)
}

function generateHr(doc, y) {
  console.log('generateHr', y)
  doc.strokeColor('#aaaaaa').lineWidth(1).moveTo(50, y).lineTo(550, y).stroke()
}

function formatCurrency(cents) {
  return '$' + (cents / 100).toFixed(2)
}

function formatDate(date) {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return year + '/' + month + '/' + day
}

function generateFooter(doc) {
  doc
    .fontSize(14)
    .image('./images/logo.jpg', 450, doc.y, { width: 100, align: 'right' })
    .text('Mme BIGEREL Aurélie', 300, doc.y - 20)
    .moveDown()
  doc
    .fontSize(8)
    .text(
      '« Assurance professionnelle : responsabilité civile MULTI PRO CIC souscrite auprès de la compagnie ACM IARD SA- CIC Longwy 54400.',
      50,
    )
  doc.text(
    '« Dispensée d’immatriculation au registre du commerce et des sociétés (RCS) et au répertoire des métiers (RM) »',
  )
  doc.text('« TVA non-applicable, art.293 Bdu CGI »')
  doc.text(
    '« En cas de retard de paiement, indemnité forfaitaire légale pour frais de recouvrement : 40,00 € »',
  )

  let pages = doc.bufferedPageRange()
  for (let l = 0; l < pages.count; l++) {
    doc.switchToPage(l)

    //Footer: Add page number
    let oldBottomMargin = doc.page.margins.bottom
    doc.page.margins.bottom = 0 //Dumb: Have to remove bottom margin in order to write into it
    doc.text(
      `Page: ${l + 1} / ${pages.count}`,
      0,
      doc.page.height - oldBottomMargin / 2, // Centered vertically in bottom margin
      { align: 'center' },
    )
    doc.page.margins.bottom = oldBottomMargin // ReProtect bottom margin
  }
}

module.exports = {
  createInvoice,
}
