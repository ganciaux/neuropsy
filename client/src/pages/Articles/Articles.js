import React from 'react'
import ArticleTable from '../../components/Articles/ArticleTable'
import ModelList from '../../components/Model/ModelList'

const Articles = () => {
  return (
    <ModelList
      title="Liste des articles"
      model={'articles'}
      render={(data) => <ArticleTable data={data.data} />}
    ></ModelList>
  )
}

export default Articles
