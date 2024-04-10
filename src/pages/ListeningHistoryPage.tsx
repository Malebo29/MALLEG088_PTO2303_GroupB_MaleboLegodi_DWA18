import { useShowsContext } from '../context/ShowsContext'
import { HistoryProps } from '../utils/type'
import ListeningHistory from '../components/modules/listeningHistory'
import { Box, Button, Typography, CardContent, Card, Container, Stack } from '@mui/material'
import { supabase } from '../auth/supabase.service'
import { useEffect } from 'react'
import { Store } from 'react-notifications-component'
import { UndoRounded } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const ListeningHistoryPage = () => {
  const navigate = useNavigate();
  const { history, setHistory } = useShowsContext()
  console.log(history)

  const clearUserHistory = async () => {
    const id = await (await supabase.auth.getUser()).data.user?.id

    const { error } = await supabase.
      from('user_history')
      .delete()
      .eq('userId', id)

    if (error) console.log(error.message)

    Store.addNotification({
      title: <Typography variant='h5'>History</Typography>,
      type: 'info',
      container: 'center',
      message: 'You have successfully cleared all your listening history.',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: { duration: 4000, onScreen: true },
    })

    setHistory(null)


  }

  useEffect(() => {
    const fetchUserHistory = async () => {
      const userId = await (await supabase.auth.getUser()).data.user?.id

      const { data, error } = await supabase
        .from('user_history')
        .select("*")
        .eq('userId', userId)

      if (error) console.log(error.message)

      setHistory(data)
    }
    fetchUserHistory()
  }, [])


  return (

    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Container maxWidth="sm">
        <Box sx={{ pt: '30%', display: 'flex', flexDirection: 'column', alignItems: "center" }}>

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant='outlined'
              startIcon={<UndoRounded sx={{ color: "#2DD699" }} />}
              onClick={() => navigate(-1)}
              sx={{ border: "1px solid #2DD699", color: '#040736', marginRight: "10px" }}>
              Go Back
            </Button>

            <Button
              variant="contained"
              onClick={clearUserHistory}
              disabled={!history?.length && true}
            >
              Reset History
            </Button>
          </Stack>

          <Box sx={{ mt: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {!history?.length ?
              <Card>
                <CardContent>
                  <Typography variant='h5' sx={{ color: '#040736', textAlign: 'center' }}>
                    Your listening history is currently empty. This page gets populated whenever you listen to an episode.</Typography>
                </CardContent>
              </Card>
              : history?.map((item: HistoryProps, index: number) => <ListeningHistory {...item} key={index}/>)}

          </Box>
        </Box>
      </Container>
    </Box>

  )
}

export default ListeningHistoryPage