import { Box, Button, Tooltip, Typography } from '@mui/material'
import { HistoryProps } from '../../../utils/type'

const ListeningHistory = (historyItem: HistoryProps) => {
  // const { handlePlayEpisode } = useShowsContext()

  // const handleButtonClick = () => {
  //   handlePlayEpisode(historyItem.episodeId, historyItem.playProgress)
  // }


  return (

    <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
    <Box sx={{display:'flex', flexDirection:'column', ml: 2}}>
        <Typography variant='h6'>Episode Number: {historyItem.episodeId}</Typography>
        <Typography variant='h6'>Episode Title: {historyItem.episodeTitle}</Typography>
        
        <Typography variant='body2'>Episode play progress:{historyItem.playProgress}</Typography>
        <Typography variant='body2'>Episode play status:{historyItem.playStatus}</Typography>

      <Box sx={{ mt: 2 }}>
          <Tooltip title="Removes all your listening history">
              <Button variant="contained">Reset History</Button>
          </Tooltip>
      </Box>

      {/* {historyItem.playStatus === 'Finished' ? ( <Button onClick={handleButtonClick}
        >Listen again</Button>) : (<Button onClick={handleButtonClick}>Continue</Button>)} */}
    </Box>

</Box>
            
  )
}

export default ListeningHistory