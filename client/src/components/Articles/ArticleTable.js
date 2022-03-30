import React from 'react'
import CommonAlert from '../common/CommonAlert/CommonAlert'
import CommonDataGrid from '../common/CommonDataGrid/CommonDataGrid'
import { columns } from './consts/articleTableColumns'

export default function ArticleTable({ data, handleDelete }) {
  const articleColumn = columns(handleDelete)
  const length = data ? data.length : 0

  const handleFilter = (e, data, setFilter) => {
    const pattern = e.target.value.toLowerCase()
    const result = data.filter(
      (article) =>
        article.name.toLowerCase().includes(pattern) ||
        article.label.toLowerCase().includes(pattern),
    )
    setFilter(result)
  }

  if (length === 0) {
    return <CommonAlert title="" content="Aucun article" severity="info" />
  }
  return (
    <CommonDataGrid
      data={data}
      columns={articleColumn}
      model="articles"
      handleFilter={handleFilter}
      href="/articles/add"
      placeholder="Recherche dans le nom et le label"
    />
  )
}
