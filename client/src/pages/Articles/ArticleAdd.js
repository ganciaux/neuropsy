import React from 'react'
import { defaultData } from '../../components/Articles/consts/defaultData'
import ArticleForm from '../../components/Articles/ArticleForm'
import ModelAdd from '../../components/Model/ModelAdd'

const ArticleAdd = () => {
  return (
    <ModelAdd
      title="Ajouter article"
      model={'articles'}
      defaultData={defaultData}
      modelForm={(data) => <ArticleForm href="/articles" {...data} />}
    />
  )
}

export default ArticleAdd
