const PDFGenerator = require('pdfkit')
const fs = require('fs')

class orderGenerator {
  constructor(order) {
    console.log('orderGenerator: start')
    this.order = order
    this.table = 0
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

  async generate() {
    let theOutput = new PDFGenerator()

    console.log(this.invoice)

    const path = `${__dirname}/../files/`
    const fileName = `orderTest.pdf`

    // pipe to a writable stream which would save the result into the same directory
    const stream = fs.createWriteStream(`${path}${fileName}`)
    theOutput.pipe(stream)

    this.generateHeaders(theOutput)

    theOutput.moveDown()

    this.generateTable(theOutput)

    this.generateFooter(theOutput)

    // write out file
    theOutput.end()

    await new Promise((resolve) => {
      stream.on('finish', function () {
        resolve()
      })
    })

    console.log('orderGenerator: end')

    return { fileName, path, fullName: `${path}${fileName}` }
  }

  async generateTest() {
    let doc = new PDFGenerator({
      bufferPages: true,
      autoFirstPage: false,
    })

    doc.on('pageAdded', () => {
      console.log('new page...', this.table)
      if (this.table == 1) {
      } else {
      }
    })

    const path = `${__dirname}/../files/`
    const fileName = `order.pdf`

    // pipe to a writable stream which would save the result into the same directory
    const stream = fs.createWriteStream(`${path}${fileName}`)
    doc.pipe(stream)
    doc.addPage()

    doc
      .image('./images/logo.jpg', 40, 40, { width: 100 })
      .fillColor('#000')
      .fontSize(10)
      .text(`Numéro de commande: ${this.order.ref}`, 40, 150, {
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
      .text(`Date: ${this.order._date}`, { align: 'right' })
      .moveDown()
      .text(`A l’attention de ${this.order.clientId._name}`, {
        align: 'right',
      })
      .moveDown()
      .moveDown()
      .text('Objet : Commande')

    const tableTop = 370
    const descriptionX = 40
    const quantityX = 300
    const priceX = 400
    const amountX = 500

    doc
      .fontSize(10)
      .text('Description', descriptionX, tableTop)
      .text('Quantité', quantityX, tableTop)
      .text('Prix unitaire', priceX, tableTop)
      .text('Total', amountX, tableTop)
      .stroke()
      .text(
        'Description gjftfdtuf zgi jgziigzgzigz gzz kgzigijzgizgjgz gikgkgk izgi gigz igzgkgz gz kgz ',
        descriptionX,
        tableTop + 25,
      )
      .text('Quantité', quantityX, tableTop + 25)
      .text('Prix unitaire', priceX, tableTop + 25)
      .text('Total', amountX, tableTop + 25)
      .stroke()

    this.table = 1
    for (let y = 0; y < 10; y++) {
      console.log('y:', y)
      doc.text('Hello World').moveDown()
      doc.text('Hello World').moveDown()
      doc.text('Hello World').moveDown()
      doc.text('Hello World').moveDown()
      doc.text('Hello World').moveDown()
      doc.text('Hello World').moveDown()
      doc.text('Hello World').moveDown()
      doc.text('Hello World').moveDown()
      doc.text('Hello World').moveDown()
    }

    this.table = 2
    for (let z = 0; z < 10; z++) {
      console.log('z:', z)
      doc.text('Hello World').moveDown()
      doc.text('Hello World').moveDown()
      doc.text('Hello World').moveDown()
      doc.text('Hello World').moveDown()
      doc.text('Hello World').moveDown()
      doc.text('Hello World').moveDown()
      doc.text('Hello World').moveDown()
      doc.text('Hello World').moveDown()
      doc.text('Hello World').moveDown()
    }

    doc.addPage()
    doc.text('Hello World2')
    doc.addPage()
    doc.text('Hello World3')

    //Global Edits to All Pages (Header/Footer, etc)
    /*
    let pages = doc.bufferedPageRange()
    for (let i = 0; i < pages.count; i++) {
      doc.switchToPage(i)

      //Footer: Add page number
      let oldBottomMargin = doc.page.margins.bottom
      doc.page.margins.bottom = 0 //Dumb: Have to remove bottom margin in order to write into it
      doc.text(
        `Page: ${i + 1} of ${pages.count}`,
        0,
        doc.page.height - oldBottomMargin / 2, // Centered vertically in bottom margin
        { align: 'center' },
      )
      doc.page.margins.bottom = oldBottomMargin // ReProtect bottom margin
    }
    */
    doc.end()

    await new Promise((resolve) => {
      stream.on('finish', function () {
        resolve()
      })
    })

    console.log('orderGenerator: end')

    return { fileName, path, fullName: `${path}${fileName}` }
  }
}

module.exports = orderGenerator
