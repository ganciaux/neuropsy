var PdfPrinter = require('pdfmake')
var Roboto = require('../fonts/Roboto')
var printer = new PdfPrinter(Roboto)
var fs = require('fs')
var path = require('path')

class pdfGenerator {
  constructor(order, data = {}) {
    this.data = data
    this.template = data.template || 'file'
    this.object = data.object || 'file'

    this.order = order
    this.pdf = {
      content: [],
    }

    this.options = {
      bufferPages: true,
      size: 'A4',
      margin: 40,
    }

    this.styles = {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black',
      },
    }
  }

  HeaderLogoSet() {
    this.pdf.content.push({
      style: 'tableExample',
      color: '#555',
      table: {
        widths: [100, '*'],
        body: [
          [
            { image: __dirname + '/../images/logo.jpg', fit: [100, 100] },
            {
              text: `${this.template} n° ${this.order.ref}`,
              alignment: 'right',
              margin: [0, 80, 0, 0],
            },
          ],
        ],
      },
      layout: 'noBorders',
    })
  }

  HeaderInfoSet() {
    this.pdf.content.push(
      {
        text: 'BIGEREL Aurélie',
        bold: true,
        lineHeight: 1.2,
      },
      {
        text: 'Neuropsychologue',
        italics: true,
        lineHeight: 1.2,
      },
      {
        text: '150, route de Lorraine',
        margin: [0, 10, 0, 0],
        lineHeight: 1.2,
      },
      {
        text: '54400 COSNES-ET-ROMAIN',
        lineHeight: 1.2,
      },
      {
        text: '06 08 62 89 96',
        lineHeight: 1.2,
      },
      {
        text: 'N°SIRET : 880 648 159 00015',
        lineHeight: 1.2,
      },
      {
        text: 'APE : 8690F',
        lineHeight: 1.2,
      },
      {
        text: 'ADELI : 54 93 1096 9',
        lineHeight: 1.2,
      },
      {
        text: `Date: 2022/03/16`,
        margin: [0, 20, 0, 0],
        alignment: 'right',
      },
      {
        text: `A l’attention de ${this.order.client._name}`,
        alignment: 'right',
        margin: [0, 20, 0, 0],
      },
      {
        text: this.order.clientId._address,
        alignment: 'right',
        margin: [0, 20, 0, 0],
      },
    )
  }

  DataSet() {
    this.pdf.content.push({
      text: `Objet : ${this.object}`,
      margin: [0, 30, 0, 0],
    })

    var data = {
      style: 'tableExample',
      margin: [0, 20, 0, 0],
      table: {
        widths: ['*', 40, 50, 75, 70],
        headerRows: 1,
        body: [
          [
            {
              text: 'Description=*',
              bold: true,
              style: 'tableHeader',
              fillColor: 'gray',
            },
            {
              text: 'Unité',
              bold: true,
              style: 'tableHeader',
              fillColor: 'gray',
            },
            {
              text: 'Quantité',
              alignment: 'right',
              bold: true,
              style: 'tableHeader',
              fillColor: 'gray',
            },
            {
              text: 'Prix Unit.',
              alignment: 'right',
              bold: true,
              style: 'tableHeader',
              fillColor: 'gray',
            },
            {
              text: 'Total HT',
              alignment: 'right',
              bold: true,
              style: 'tableHeader',
              fillColor: 'gray',
            },
          ],
        ],
      },
    }

    for (let i = 0; i < this.order.articles.length; i++) {
      let text = `${this.order.articles[i].articleId.name}`
      console.log(this.order.client)
      if (i === 0) {
        text += `\nPatient : ${this.order.client[0]._name}`
        text += `\nNé le  : ${this.order.client[0]._birthdate}`
      }

      //Du 7 janvier au 4 février 2022. (Soit 3 séances réalisées)

      data.table.body.push([
        {
          text: text,
          margin: [5, 5, 5, 5],
        },
        {
          text: '',
          alignment: 'right',
          italics: true,
          color: 'gray',
          margin: [5, 5, 5, 5],
        },
        {
          text: this.order.articles[i].quantity,
          alignment: 'right',
          italics: true,
          color: 'gray',
          margin: [5, 5, 5, 5],
        },
        {
          text: `${this.order.articles[i].unitCost} €`,
          alignment: 'right',
          italics: true,
          color: 'gray',
          margin: [5, 5, 5, 5],
        },
        {
          text: `${this.order.articles[i].price} €`,
          alignment: 'right',
          italics: true,
          color: 'gray',
          margin: [5, 5, 5, 5],
        },
      ])
    }
    data.table.body.push([
      { text: '', border: [false, false, false, false] },
      { text: '', border: [false, false, false, false] },
      { text: '', border: [false, false, false, false] },
      { text: 'Reste à payer', bold: true, fillColor: 'gray' },
      {
        text: `${this.order.price} €`,
        bold: true,
        alignment: 'right',
        fillColor: 'gray',
      },
    ])
    this.pdf.content.push(data)
  }

  FooterSignSet() {
    this.pdf.content.push({
      style: 'tableExample',
      color: '#555',
      table: {
        widths: ['*', 100],
        body: [
          [
            {
              text: 'Mme BIGEREL Aurélie',
              alignment: 'right',
              margin: [0, 75, 0, 0],
            },
            { image: __dirname + '/../images/sign.jpg', fit: [100, 100] },
          ],
        ],
      },
      layout: 'noBorders',
    })
  }

  FooterInfofSet() {
    this.pdf.content.push(
      {
        margin: [0, 20, 0, 0],
        text: '« Assurance professionnelle : responsabilité civile MULTI PRO CIC souscrite auprès de la compagnie ACM IARD SA- CIC Longwy 54400 »',
        alignment: 'center',
        fontSize: 8,
        lineHeight: 1.2,
      },
      {
        text: '« Dispensée d’immatriculation au registre du commerce et des sociétés (RCS) et au répertoire des métiers (RM) »',
        alignment: 'center',
        fontSize: 8,
        lineHeight: 1.2,
      },
      {
        text: '« TVA non-applicable, art.293 Bdu CGI »',
        alignment: 'center',
        fontSize: 8,
        lineHeight: 1.2,
      },
      {
        text: '« En cas de retard de paiement, indemnité forfaitaire légale pour frais de recouvrement : 40,00 € »',
        alignment: 'center',
        fontSize: 8,
      },
    )
  }

  FooterPageSet(pdfDoc) {
    let pages = pdfDoc.bufferedPageRange()
    for (let l = 0; l < pages.count; l++) {
      pdfDoc.switchToPage(l)

      //Footer: Add page number
      let oldBottomMargin = pdfDoc.page.margins.bottom
      pdfDoc.page.margins.bottom = 0 //Dumb: Have to remove bottom margin in order to write into it
      pdfDoc.text(
        `Page: ${l + 1} / ${pages.count}`,
        0,
        pdfDoc.page.height - oldBottomMargin / 2, // Centered vertically in bottom margin
        { align: 'center' },
      )
      pdfDoc.page.margins.bottom = oldBottomMargin // ReProtect bottom margin
    }
  }

  async generate() {
    this.HeaderLogoSet()
    this.HeaderInfoSet()
    this.DataSet()
    this.FooterSignSet()
    this.FooterInfofSet()

    //pdf.styles = { ...styles }

    var pdfDoc = printer.createPdfKitDocument(this.pdf, this.options)

    this.FooterPageSet(pdfDoc)

    const relative = `../files/`
    const fileName = `order.pdf`
    const fullName = path.join(__dirname, `${relative}${fileName}`)

    console.log('pdfmake:', fullName)

    const stream = fs.createWriteStream(fullName)

    pdfDoc.pipe(stream)
    pdfDoc.end()

    await new Promise((resolve) => {
      stream.on('finish', function () {
        resolve()
      })
    })

    console.log('pdfmake: end')

    return fullName
  }
}

module.exports = pdfGenerator
