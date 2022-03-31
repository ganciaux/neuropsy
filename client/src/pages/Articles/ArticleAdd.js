import React from 'react'
import { defaultData } from '../../components/Articles/consts/defaultData'
import ArticleForm from '../../components/Articles/ArticleForm'
import ModelAdd from '../../components/Model/ModelAdd'

const ArticleAdd = () => {
  return (
    <ModelAdd
      title="Ajouter un article"
      model={'articles'}
      defaultData={defaultData}
      render={(data) => <ArticleForm href="/articles" {...data} />}
    />
  )
}

export default ArticleAdd
