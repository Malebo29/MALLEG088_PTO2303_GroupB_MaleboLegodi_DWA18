import { Button, TextField, Link, Box, FilledInput, FormControl, InputLabel, Stack, Container, Typography, Checkbox, FormControlLabel, Grid } from '@mui/material';
import { styled } from '@mui/system';
import SignUpForm from '../components/modules/register';

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
});

export const SignUp = () => {
  return (
    <SignUpForm />
    // <StyledContainer maxWidth="xs">
    //   <Typography variant="h5" align="center">Sign up for free to select favourites and personalise your experience.</Typography>

    //   <Box component="form"
    //   sx={{
    //     '& > :not(style)': { m: 1, width: '100%' },
    //   }}
    //   noValidate
    //   autoComplete="off">

    //   <Grid container spacing={2}>       
    //     <Grid item xs={12} sm={6}>
    //       <FormControl variant="filled" fullWidth>
    //         <InputLabel htmlFor="component-filled">First Name</InputLabel>
    //         <FilledInput />
    //       </FormControl>
    //     </Grid>

    //     <Grid item xs={12} sm={6}>
    //       <FormControl variant="filled" fullWidth>
    //         <InputLabel htmlFor="component-filled">Last Name</InputLabel>
    //         <FilledInput />
    //       </FormControl>
    //     </Grid>
    //   </Grid>

    //   <FormControl variant="filled" fullWidth>
    //     <InputLabel htmlFor="component-filled">Your email</InputLabel>
    //     <FilledInput />
    //   </FormControl>

    //   <FormControl variant="filled" fullWidth>
    //     <InputLabel htmlFor="component-filled">New Password</InputLabel>
    //     <FilledInput type='password' />
    //   </FormControl>

    //   <FormControl variant="filled" fullWidth>
    //     <InputLabel htmlFor="component-filled">Confirm new password</InputLabel>
    //     <FilledInput type='password' />
    //   </FormControl>

    //   <FormControlLabel
    //     control={<Checkbox />}
    //     label="I want to receive new show updates, marketing promotions and trending shows via email."
    //   />

    //   </Box>

    //   <p>By clicking "Create Account", you agree to accept our <Link href="https://www.codespace.co.za/registration/">terms of service</Link> and agree to our <Link href="https://www.codespace.co.za/about/">privacy policy</Link>.</p>
    //   <Button variant="contained">Create Account</Button>
    //   <hr />
    //   <p>Need help? Visit our <Link href="https://www.codespace.co.za/programs/">help center</Link> via Codespace.</p>
    // </StyledContainer>
  );
};