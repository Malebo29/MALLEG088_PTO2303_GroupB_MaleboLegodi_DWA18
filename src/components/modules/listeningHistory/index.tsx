import { Box, Card, CardContent, Divider, Typography } from '@mui/material'
import { HistoryProps } from '../../../utils/type'

const ListeningHistory = (historyItem: HistoryProps) => {

  return (

  <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
    <Card sx={{m: 2}}>
      <CardContent>
        <Typography variant='h6'>Episode Number: {historyItem.episodeId}</Typography>
        <Typography variant='h6'>Episode Title: {historyItem.episodeTitle}</Typography>
        
        <Divider />
        <Typography variant='body2'>Episode play progress:{historyItem.playProgress}</Typography>
        <Typography variant='body2'>Episode play status:{historyItem.playStatus}</Typography>
        <Divider />
      
      </CardContent>
    </Card>
  </Box>
            
  )
}

export default ListeningHistory