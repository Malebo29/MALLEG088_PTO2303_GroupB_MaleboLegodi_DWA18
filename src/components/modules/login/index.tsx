import { z } from 'zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../../auth/supabase.service'
import { AuthError } from '@supabase/supabase-js'
import { FormControl, InputLabel, FilledInput, Typography, Button, Box, Stack, Container, styled } from '@mui/material'
import { useShowsContext } from '../../../context/ShowsContext'

const StyledContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
        setError } = useForm();
    
    const navigate = useNavigate()
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
            console.log(data.session)
            sessionStorage.setItem('token',data.session.access_token)
            //sessionStorage.setItem('token', token)
            navigate("/")
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
  return (
    <StyledContainer maxWidth="xs">
    <Typography variant="h3" align="center">Welcome to Streamer Podcast</Typography>
    <Typography variant="h6" align="center">Sign in to access your profile in favorite shows.</Typography>

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
        <Button href="#text-buttons">Forgot Password</Button>
    </Stack>
    
    <p>Don’t have a profile? <Link href="/signup">Sign up</Link></p>
    </Box>
    </StyledContainer>
  )
}

export default SigninForm