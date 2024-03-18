import { useEffect, useState } from 'react'
import { getShows } from '../../api'
import { useShowsContext } from '../../context/ShowsContext'

const API_BASE_URL = "https://podcast-api.netlify.app";

export const ShowList = () => {
  const { shows , setShows } = useShowsContext()
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    getShows(`${API_BASE_URL}/shows`).then(data => {
    setShows(data)
    })
    setIsLoading(false)
}, [])

  return (
    <div>
      { isLoading ? <p>Loading...</p>:shows.map((show) => <p key={show.id}>{show.title}</p>)}
    </div>
  )
}