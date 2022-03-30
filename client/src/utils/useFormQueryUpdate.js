import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { delay, getData, updateData } from '../api/api'

export const useFormQueryUpdate = (path, refresh = 2000) => {
  const { id } = useParams()

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const query = useQuery([path, id], () => getData('/' + path, id))
  const mutation = useMutation(updateData)

  const onSubmit = async (data) => {
    await mutation.mutateAsync({ path: '/' + path, ...data })
    queryClient.invalidateQueries([path, id])
    await delay(refresh)
    navigate('/' + path)
  }

  return {
    query,
    mutation,
    onSubmit,
  }
}
