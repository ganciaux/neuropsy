import React from 'react'
import ArticleForm from '../../components/Articles/ArticleForm'
import ModelEdit from '../../components/Model/ModelEdit'

const ArticleEdit = () => {
  return (
    <ModelEdit
      title="Gestion article"
      model={'articles'}
      modelForm={(data) => <ArticleForm href="/articles" {...data} />}
    />
  )
}

export default ArticleEdit
