import React from 'react'
import ArticleForm from '../../components/Articles/ArticleForm'
import { useParams } from 'react-router-dom'
import Header from '../../components/common/Header/Header'

const ArticleEdit = () => {
  const { id } = useParams()
  console.log('ArticleEdit', id)
  return (
    <>
      <Header title="Modification article" />
      <ArticleForm id={id} />
    </>
  )
}

export default ArticleEdit
