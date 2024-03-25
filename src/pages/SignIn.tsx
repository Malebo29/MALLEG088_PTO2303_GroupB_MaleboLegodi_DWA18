import { Button, Link, Box, FilledInput, FormControl, InputLabel, Stack, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
});

export const SignIn = () => {
  return (
    <StyledContainer maxWidth="xs">
      <Typography variant="h3" align="center">Welcome to Streamer Podcast</Typography>
      <Typography variant="h6" align="center">Sign in to access your profile in favorite shows.</Typography>

      <Box component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off">

      <FormControl variant="filled" fullWidth>
            <InputLabel htmlFor="component-filled">Email Address</InputLabel>
            <FilledInput defaultValue="Your email" />
        </FormControl>

        <FormControl variant="filled" fullWidth>
            <InputLabel htmlFor="component-filled">Current password</InputLabel>
            <FilledInput defaultValue="Current password" type='password' />
        </FormControl>

      </Box>

        <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="contained">Sign In</Button>
            <Button href="#text-buttons">Forgot Password</Button>
        </Stack>
      
      <p>Don’t have a profile? <Link href="/signup">Sign up</Link></p>
    </StyledContainer>
  );
};