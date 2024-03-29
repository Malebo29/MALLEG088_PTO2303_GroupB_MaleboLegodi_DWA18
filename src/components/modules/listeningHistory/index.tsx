import { HistoryProps } from '../../../utils/type'

const ListeningHistory = (historyItem: HistoryProps) => {
  return (
    <div>{historyItem.episodeTitle}</div>
  )
}

export default ListeningHistory