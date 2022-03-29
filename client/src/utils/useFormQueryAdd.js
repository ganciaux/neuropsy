import { useMutation } from 'react-query'
import { createData } from '../api/api'

export const useFormQueryAdd = (path, defaultData) => {
  const { isLoading, isSuccess, reset, mutateAsync, error } =
    useMutation(createData)

  const onSubmit = async (data, formReset) => {
    await mutateAsync({ path: '/' + path, ...data })
    formReset(defaultData)
  }
  return {
    isLoading,
    isSuccess,
    queryReset: reset,
    queryError: error,
    onSubmit,
  }
}
