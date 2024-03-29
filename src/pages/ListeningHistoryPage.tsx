import { useShowsContext } from '../context/ShowsContext'
import { HistoryProps } from '../utils/type'
import ListeningHistory from '../components/modules/listeningHistory'

const ListeningHistoryPage = () => {
  const { history } = useShowsContext()
  return (
    history?.map((item: HistoryProps)=> <ListeningHistory {...item} />)
  )
}

export default ListeningHistoryPage