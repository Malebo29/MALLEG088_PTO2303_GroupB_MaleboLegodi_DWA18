import { Show } from '../../utils/type'
import ShowPreview from './ShowPreview'
import { useEffect, useMemo } from 'react'
import { getShows } from '../../api'
import { useShowsContext } from '../../context/ShowsContext'
import Grid from '@mui/material/Unstable_Grid2'
 
const ShowList = () => {
    const { shows , setShows, sort, search } = useShowsContext() // Retrieve sort and search from context
    
    useEffect(() => {
        getShows('https://podcast-api.netlify.app/shows').then(data => {
        setShows(data)
        })
 
    // setTimeout(()=>console.log("fetching data..."), 5000)
}, [])

        const sortedAndFilteredShows = useMemo(() => {
        let result = [...shows];

        if(search) {
            result = result.filter(show => show.title.toLowerCase().includes(search.toLowerCase()));
        }

        switch(sort) {
            case 'titleAZ':
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'titleZA':
                result.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case 'dateAsc':
                result.sort((a, b) => new Date(a.updated).getTime() - new Date(b.updated).getTime());
                break;
            case 'dateDesc':
                result.sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime());
                break;
            default:
                break;
        }

        return result;
            }, [shows, sort, search]);

  return (
        <Grid container spacing={2} sx={{display: 'flex', justifyContent:'center'}}>
           {sortedAndFilteredShows.map((show: Show)=>
               <Grid columns={{sm:4}}>
                   <ShowPreview {...show}/>
               </Grid>
           )}
       </Grid>
  )
}
 
export default ShowList