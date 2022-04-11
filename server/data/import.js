const fs = require('fs')
const db = require('../db.js')
const Article = require('../models/article')
const Client = require('../models/client')
const Order = require('../models/order')
const Payment = require('../models/payment')
const Session = require('../models/session')

const clientAdd = async ({ name, firstname, birthdate }, date = []) => {
  let client = new Client({
    name,
    firstname,
    birthdate,
  })
  await client.save()

  for (let d in date) {
    await sessionAdd(client, d)
  }
}

const sessionAdd = async (client, date) => {
  let session = new Session({
    clientId: client,
    type: 1,
    status: 1,
    date: new Date(date),
  })
  await session.save()
}

const deleteData = async () => {
  try {
    /*
    await Article.deleteMany();
    await Bill.deleteMany();
    await Client.deleteMany();
    await Order.deleteMany();
    await Payment.deleteMany();
    await Reference.deleteMany();
    */
    await Session.deleteMany()
    console.log('Data successfully deleted !')
  } catch (err) {
    console.log(err)
  }
}

const importData = async () => {
  await deleteData()
  try {
    await clientAdd(
      {
        name: 'Arnaud',
        firstname: 'Robin',
        birthdate: new Date('2014-09-18T22:00:00.000Z'),
      },
      ['04/09/2020', '12/09/2020', '03/10/2020', '31/10/2020'],
    )
    await clientAdd(
      {
        name: 'Avci',
        firstname: 'Arkan',
        birthdate: Date('2006-04-11T22:00:00.000Z'),
      },
      ['04/09/2021', '12/09/2021'],
    )

    /* */
    console.log('Data successfully loaded !')
  } catch (err) {
    console.log(err)
  }
  process.exit()
}

if (process.argv[2] === '--import') {
  importData()
} else if (process.argv[2] === '--delete') {
  deleteData()
}
