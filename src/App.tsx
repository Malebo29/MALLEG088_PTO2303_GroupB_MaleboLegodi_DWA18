import { useEffect, useState } from 'react'
import { getShows } from './api'
import { useShowsContext } from './context/ShowsContext'
import { Header } from './components/header/Header'

function App() {
  const { shows , setShows } = useShowsContext()
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    getShows('https://podcast-api.netlify.app/shows').then(data => {
    setShows(data)
    })
    setIsLoading(false)
}, [])

  return (
    <div>
      <Header />
    { isLoading ? <p>Loading...</p>:shows.map((show) => <p key={show.id}>{show.title}</p>)}
    </div>
  )
}

export default App
