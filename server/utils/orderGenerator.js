const PDFGenerator = require('pdfkit')
const fs = require('fs')

class orderGenerator {
  constructor(order) {
    console.log('orderGenerator: start')
    this.order = order
  }

  generateHeaders(doc) {
    doc
      .image('./images/logo.jpg', 50, 50, { width: 100 })
      .fillColor('#000')
      .fontSize(20)
      .text('COMMANDE', 275, 50, { align: 'right' })
      .fontSize(10)
      .text(`Numéro de commande: ${this.order.ref}`, {
        align: 'right',
      })
      .text(`Date: ${this.order._date}`, { align: 'right' })
      .text(`Total à payer: ${this.order.price}€`, {
        align: 'right',
      })
      .moveDown()
      .text(
        `Adresse de facturation:\n ${this.order.clientId._name}\n${this.order.clientId._address}`,
        { align: 'right' },
      )
    const beginningOfPage = 50
    const endOfPage = 550

    doc.moveTo(beginningOfPage, 200).lineTo(endOfPage, 200).stroke()

    doc.text(`Description: ${this.order.description || 'N/A'}`, 50, 210)

    doc.moveTo(beginningOfPage, 250).lineTo(endOfPage, 250).stroke()
  }

  generateTable(doc) {
    const tableTop = 270
    const itemCodeX = 50
    const descriptionX = 100
    const quantityX = 250
    const priceX = 350
    const amountX = 450

    doc
      .fontSize(10)
      .text('Code', itemCodeX, tableTop, { bold: true })
      .text('Description', descriptionX, tableTop)
      .text('Quantité', quantityX, tableTop)
      .text('Prix unitaire', priceX, tableTop)
      .text('Total', amountX, tableTop)

    const items = this.order.articles
    let i = 0

    for (i = 0; i < items.length; i++) {
      const item = items[i]
      const y = tableTop + 25 + i * 25

      doc
        .fontSize(10)
        .text(item.articleId.name, itemCodeX, y)
        .text(item.description, descriptionX, y)
        .text(item.quantity, quantityX, y)
        .text(`${item.unitCost}€ `, priceX, y)
        .text(`${item.price}€ `, amountX, y)
    }

    const offset = tableTop + 25 + i * 25
    doc
      .fontSize(10)
      .text('', itemCodeX, offset)
      .text('', descriptionX, offset)
      .text('', quantityX, offset)
      .text('Total', priceX, offset)
      .text(`${this.order.price}€`, amountX, offset)
  }

  generateFooter(doc) {
    doc
      .fontSize(10)
      .text(
        `Aurélie BIGEREL - Neuropsychologue - 150 rue de lorraine - 54000 Cosnes et Romain `,
        50,
        680,
        {
          align: 'center',
        },
      )
      .text(`Tel.: 06 08 62 89 96 - Courriel: aurelie.bigerel@hotmail.com`, {
        align: 'center',
      })
      .text(`N°SIRET : 88064815900015 ADELI : 549310969 APE : 8690F`, {
        align: 'center',
      })
  }

  generate() {
    let theOutput = new PDFGenerator()

    console.log(this.invoice)

    const path = `${__dirname}/../files/`
    const fileName = `order-${this.order.ref}.pdf`

    // pipe to a writable stream which would save the result into the same directory
    theOutput.pipe(fs.createWriteStream(`${path}${fileName}`))

    this.generateHeaders(theOutput)

    theOutput.moveDown()

    this.generateTable(theOutput)

    this.generateFooter(theOutput)

    // write out file
    theOutput.end()

    console.log('orderGenerator: end')

    return { fileName, path, fullName: `${path}${fileName}` }
  }
}

module.exports = orderGenerator
