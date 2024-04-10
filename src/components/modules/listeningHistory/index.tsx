import { Box, Card, CardContent, Divider, Typography } from '@mui/material'
import { HistoryProps } from '../../../utils/type'

const ListeningHistory = (historyItem: HistoryProps) => {

  return (

    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center' }}>
      <Card sx={{ m: 2 }}>
        <CardContent>
          <Typography variant='h6'>Episode Number: {historyItem.episodeId}</Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography variant='h6'>Episode Title: </Typography>
            <Typography variant='body2' sx={{ mb: 2, fontSize: "1rem", color: '#050A35', lineHeight: 1.2 }}>
              {historyItem.episodeTitle}</Typography>
          </Box>

          <Divider />

          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography variant='h6'sx={{ fontSize: "0.8rem", color: '#050A35' }}>Episode play progress:</Typography>
            <Typography variant='body2' sx={{ fontStyle: "italic", color: '#050A35' }}>{historyItem.playProgress}</Typography>
          </Box>
          {/* <Typography variant='body2' sx={{ mb: 1, mt: 1, fontSize: "1rem", color: '#050A35', lineHeight: 1.2 }}>Episode play progress: {historyItem.playProgress}</Typography>
          <Typography variant='body2' sx={{mb: 1, fontSize: "1rem", color: '#050A35', lineHeight: 1.2 }}>Episode play status: {historyItem.playStatus}</Typography>
           */}
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography variant='h6' sx={{ fontSize: "0.8rem", color: '#050A35' }}>Episode play status:</Typography>
            <Typography variant='body2' sx={{ fontStyle: "italic", color: '#050A35' }}>
             {historyItem.playStatus}</Typography>
          </Box>

          <Divider />

        </CardContent>
      </Card>
    </Box>

  )
}

export default ListeningHistory