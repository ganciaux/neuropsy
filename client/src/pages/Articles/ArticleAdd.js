import React, { useEffect, useState } from 'react'
import ArticleForm from '../../components/Articles/ArticleForm'
import Header from '../../components/common/Header/Header'

const ArticleAdd = () => {
  return (
    <>
      <Header title="Ajouter un article" />
      <ArticleForm />
    </>
  )
}

export default ArticleAdd
