import React from 'react'
import CommonAlert from '../common/CommonAlert/CommonAlert'
import CommonDataGrid from '../common/CommonDataGrid/CommonDataGrid'
import { columns } from './consts/clientTableColumns'

export default function ClientTable({ data }) {
  const length = data ? data.length : 0
  if (length === 0) {
    return <CommonAlert title="" content="Aucun client" severity="info" />
  }
  return <CommonDataGrid data={data} columns={columns} />
}
