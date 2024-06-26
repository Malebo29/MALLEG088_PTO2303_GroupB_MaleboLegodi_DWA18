import { z } from 'zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../../../auth/supabase.service'
import { AuthError } from '@supabase/supabase-js'
import { FormControl, InputLabel, FilledInput, Typography, Button, Box, Stack, Container, styled } from '@mui/material'
import Carousel from '../../carousel/Carousel'
import Logo from '/android-chrome-192x192.png';
import { useShowsContext } from '../../../context/ShowsContext'
import { useEffect } from 'react'
import Cookies from 'js-cookie'

const StyledContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
    height: '100vh',
});

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

type FormFields = z.infer<typeof schema>

const SigninForm = () => {
    const { 
        register, 
        handleSubmit,
        formState: { errors, isSubmitting }, 
        setError } = useForm<FormFields>();
    
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || "/home"
    const { token, setToken } = useShowsContext()

    const onSubmit: SubmitHandler<FormFields> = async(formData)=>{
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password
            });

            if( error ){
                throw new AuthError(error.message, error.status)
            }
            setToken(data.session)
            Cookies.set('_streamerSession', JSON.stringify(data.session))
            navigate(from, { replace: true,})
            
        } catch (error) {
            console.log(error)
            setError("root", {
                message: "Invalid login credentials"
            },
            {
                shouldFocus: true
            })
        }
    }
    
    useEffect(() => {
      if(token) navigate(from, {replace: true})
      
    }, [token, from])
    
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" justifyContent="center">
        <Container maxWidth="sm"> 
        <Box sx={{ pt: '10px', display: 'flex', flexDirection: 'column', alignItems: "center"}}>
            <Box>
                <img
                src={Logo}
                width={100}
                alt="Podcast"
                loading="lazy"
                />
            </Box>
            <Typography variant="h4" align="center">Welcome to Streamer Podcast</Typography>
        </Box>

        <Box> 
            <Carousel />
        </Box>
          
            <Typography variant="body2" align="center" sx={{ mt: 2, mb: 2 }}>Sign in to access your profile and favorite shows.</Typography>
            
        <StyledContainer maxWidth="xs" sx={{ mt: 2, mb: 2 }}>
            <Box component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            >
            <FormControl variant="filled" fullWidth>
                <InputLabel htmlFor="component-filled">Email Address</InputLabel>
                <FilledInput {...register('email')} defaultValue="Your email" />
            </FormControl>

            <FormControl variant="filled" fullWidth>
                <InputLabel htmlFor="component-filled">Current password</InputLabel>
                <FilledInput {...register('password')} defaultValue="Current password" type='password' />
            </FormControl>

            { errors.root && <Typography>{errors.root.message}</Typography>}
            
            <Stack direction="row" spacing={2} justifyContent="center">
                <Button type='submit' disabled={isSubmitting}>{isSubmitting ? "Submitting...": "Sign In"}</Button>
                <Button
                    onClick={() => navigate('/forgot-password')}> Forgot Password</Button>
            </Stack>
            
            <Typography variant="body2" align="center" sx={{ mt: 2, fontSize: '0.8rem' }}>Don’t have a profile? <Link to="/register">Sign up</Link></Typography>
            </Box>
        </StyledContainer>
        </Container>
    </Box>
    
  )
}

export default SigninForm