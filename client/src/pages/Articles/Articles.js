import React from 'react'
import ArticleTable from '../../components/Articles/ArticleTable'
import ModelList from '../../components/Model/ModelList'

const Articles = () => {
  const render = (data) => {
    return (
      <ArticleTable
        isLoading={data.isLoading}
        isSuccess={data.isSuccess}
        data={data.data}
      />
    )
  }

  return (
    <ModelList
      title="Liste des articles"
      model={'articles'}
      render={(data) => render({ ...data })}
    ></ModelList>
  )
}

export default Articles
