import { AudioPlayerProps } from '../../utils/type'
import { Box } from '@mui/material'


const AudioPlayer = ({audioFile, audioRef}: AudioPlayerProps) => {
  return (
    <Box>
      <audio ref={audioRef} src={audioFile?.file} controls autoPlay/>
    </Box>
  )
}

export default AudioPlayer