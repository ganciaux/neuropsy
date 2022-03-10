const orderGenerator = require('./orderGenerator')

const data = {
  _id: '6229ca9ea9a59aaf6fded89e',
  clientId: {
    _id: '62286b5330cc0cea45617332',
    name: 'ANCIAUX',
    firstname: 'Ghislain',
    _name: 'ANCIAUX Ghislain',
    _address: 'undefined undefined undefined',
    _birthdate: '',
    _age: '',
    id: '62286b5330cc0cea45617332',
  },
  status: 0,
  refId: 16,
  date: '2022-03-01T09:53:09.000Z',
  description: 'rdshgdrtheh',
  sessions: 0,
  price: 2184,
  articles: [
    {
      articleId: {
        _id: '62286c7930cc0cea4561735e',
        name: 'test',
        label: 'testb',
        price: 312,
        _name: 'test (312)',
        id: '62286c7930cc0cea4561735e',
      },
      quantity: 4,
      unitCost: 312,
      price: 1248,
      description: '',
      _id: '6229ca9ea9a59aaf6fded89f',
    },
    {
      articleId: {
        _id: '62286c7930cc0cea4561735e',
        name: 'test',
        label: 'testb',
        price: 312,
        _name: 'test (312)',
        id: '62286c7930cc0cea4561735e',
      },
      quantity: 4,
      unitCost: 312,
      price: 1248,
      description: '',
      _id: '6229ca9ea9a59aaf6fded89f',
    },
  ],
  createdAt: '2022-03-10T09:53:34.876Z',
  updatedAt: '2022-03-10T13:41:57.165Z',
  ref: '2022030016',
  slug: '16',
  __v: 0,
  _date: '01-03-2022',
  id: '6229ca9ea9a59aaf6fded89e',
}

const orderPdf = new orderGenerator(data)

orderPdf.generate()
