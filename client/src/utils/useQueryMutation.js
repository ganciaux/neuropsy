import { useMutation } from 'react-query'
import { createData } from '../api/api'

export const useQueryMutation = (path, defaultData) => {
  const mutation = useMutation(createData)

  const onSubmit = async (data, formReset) => {
    await mutation.mutateAsync({ path: '/' + path, ...data })
    formReset(defaultData)
  }
  return {
    query: { data: defaultData },
    mutation,
    onSubmit,
  }
}
