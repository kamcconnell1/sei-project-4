import { useHistory } from 'react-router-dom'

function useDelete(deleteFunction, deleteId, page) {
  const history = useHistory()

  const deleteItem = async () => {
    try {
      await deleteFunction(deleteId)
      history.push(`/${page}`)
    } catch (err) {
      console.log(err)
    }
  }

  return { deleteItem }
}

export default useDelete