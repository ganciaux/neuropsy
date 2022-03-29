import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { delay, getData, updateData } from '../api/api'

export const useFormQueryUpdate = (path, refresh = 2000) => {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const {
    isLoading,
    error: errorLoading,
    data,
  } = useQuery([path, id], () => getData('/' + path, id))

  const onSubmit = async (data) => {
    await mutateAsync({ path: '/' + path, ...data })
    queryClient.invalidateQueries([path, id])
    await delay(refresh)
    navigate('/' + path)
  }
  const {
    isLoading: isMutating,
    isSuccess,
    reset,
    mutateAsync,
    error: errorMutating,
  } = useMutation(updateData)

  return {
    data,
    onSubmit,
    isLoading,
    isMutating,
    isSuccess,
    queryReset: reset,
    queryError: errorMutating,
    errorLoading,
  }
}
