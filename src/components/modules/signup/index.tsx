import { z } from 'zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../../auth/supabase.service'
import { AuthError } from '@supabase/supabase-js'
import { FormControl, InputLabel, FilledInput, Typography, Button, Checkbox, Container, FormControlLabel, Grid, styled, Box } from '@mui/material'

const StyledContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
});

const schema = z.object({
    firstName: z.string().min(2, { message: "Username must be at least 3 characters"}),
    lastName: z.string().min(2, { message: "Username must be at least 3 characters"}),
    email: z.string().min(1, {message: "Email is required"}).email('Invalid email address'),
    password: z.string().min(8, { message: "Password must be at least 8 characters"}),
    confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters"})
}).refine((data)=> data.password == data.confirmPassword, {
  path: ['confirmPassword'],
  message: "Passwords do not match"
})

type FormFields = z.infer<typeof schema>


const SignUpForm = () => {
    const { 
        register, 
        handleSubmit,
        formState: { errors, isSubmitting }, 
        setError } = useForm();
    
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<FormFields> = async(formData)=>{
        try {
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                  emailRedirectTo: 'http://localhost:5173/login',
                  data: {
                    first_name: formData.firstName,
                    last_name: formData.lastName
                  }
                }
            });

            if( error ){
                throw new AuthError(error.message, error.status)
            }
            // alert('Please check your email inbox to confirm your registration')
            navigate("/")
        } catch (error) {
            console.log(error)
            setError("root", {
                message: "Email already taken"
            },
            {
                shouldFocus: true
            })
        }
    }
  return (
    <StyledContainer maxWidth="xs">
      <Box sx={{ mt: 5, mb: 5, pt: '150px' }}>
        
        <Typography 
          variant="h6"
          align="center"
          sx={{
            mt: 10, 
            color: '#2DD699', 
            fontSize: '1em', 
            fontWeight: 'bold', 
            fontStyle: 'italic', 
            textAlign: 'center', 
            lineHeight: '1.3em', 
            letterSpacing: '0.1em'
          }}
          >Sign up for free to select favourite shows and personalise your experience.</Typography>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <Grid container spacing={0}>

            <Grid item xs={12} sm={6}>
              <Box sx={{ mt: 2 }}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel htmlFor="component-filled">First Name</InputLabel>
                  <FilledInput {...register('firstName')} />
                </FormControl>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box sx={{ mt: 2 }}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel htmlFor="component-filled">Last Name</InputLabel>
                  <FilledInput {...register('lastName')} />
                </FormControl>
              </Box>
            </Grid>
          </Grid>

              <Box sx={{ mt: 2 }}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel htmlFor="component-filled">Email Address</InputLabel>
                  <FilledInput {...register('email')} />
                </FormControl>
              </Box>

              <Box sx={{ mt: 2 }}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel htmlFor="component-filled">New Password</InputLabel>
                  <FilledInput {...register('password')} type='password' />
                </FormControl>
              </Box>

              <Box sx={{ mt: 2 }}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel htmlFor="component-filled">Confirm new password</InputLabel>
                  <FilledInput {...register('confirmPassword')} type='password' />
                </FormControl>
              </Box>

          { errors.root && <Typography>{errors.root.message}</Typography>}

              <Box 
                sx={{ mt: 2 }}>
                <FormControlLabel
                  control={<Checkbox {...register('updates')} />}
                  label={
                    <Typography variant='body2' sx={{ lineHeight: '1.3em' }}>
                      I want to receive new show updates, marketing promotions and trending shows via email.
                    </Typography>
                  }
                />
              </Box>

              <Box sx={{ mt: 2 }}>
                <Button variant="contained" type='submit' disabled={isSubmitting}>{isSubmitting ? "Submitting...": "Create Account"}</Button>
              </Box>          
        </form>

              <Box sx={{ mt: 2 }}>
                <p>By clicking "Create Account", you agree to accept our 
                   <Link to="https://www.codespace.co.za/registration/"> terms of service </Link>
                    and agree to our <Link to="https://www.codespace.co.za/about/">privacy policy</Link>.</p>
              <hr />
              </Box>

              <Box sx={{ mt: 2 }}>
                <p>Need help? Visit our <Link to="https://www.codespace.co.za/programs/">help center</Link> via Codespace.</p>
              </Box>
      </Box>
  </StyledContainer>
  )
}

export default SignUpForm