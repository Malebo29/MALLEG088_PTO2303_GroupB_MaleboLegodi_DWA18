import { useForm, SubmitHandler } from 'react-hook-form'
import { supabase } from '../../../auth/supabase.service'
import { FormControl, InputLabel, FilledInput, Typography, Button, Box, Container, styled } from '@mui/material'
import Logo from '/android-chrome-192x192.png';
import Carousel from '../../carousel/Carousel';

const StyledContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
});

type FormFields = {
    email: string;
}

const ForgotPasswordForm = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<FormFields>();

    const onSubmit: SubmitHandler<FormFields> = async (formData) => {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(formData.email);
            if (error) {
                throw error;
            }

            alert('A password reset email has been sent to ' + formData.email
                + '. Please check your inbox and follow the instructions to reset your password.');

        } catch (error) {
            setError("root", {
                message: 'Error occured'
            }, {
                shouldFocus: true
            });
        }
    }
    return (
        <StyledContainer maxWidth="xs">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                <img
                    src={Logo}
                    width={100}
                    alt="Podcast"
                    loading="lazy"
                />
                <Typography variant="h4" align="center" sx={{ mb: 2, color: '#040736', fontWeight: 'bold', }}>Welcome to Streamer Podcast</Typography>
            </Box>

            <Box> 
                <Carousel />
            </Box>

            <Typography variant="h5" align="center" sx={{ mt: 2, color: '#040736', fontWeight: 'bold', }}>Forgot Password</Typography>

            <Box component="form"
                sx={{
                    '& > :not(style)': { width: '100%' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >

                <Typography
                    variant="h6"
                    sx={{
                        mt: 2,
                        mb: 2,
                        color: '#040736',
                        fontSize: '1em',
                        fontStyle: 'italic',
                        lineHeight: '1.3em',
                        letterSpacing: '0.1em'
                    }}
                >Enter your email address to reset your password.</Typography>
                <FormControl variant="filled" fullWidth>
                    <InputLabel htmlFor="component-filled">Email Address</InputLabel>
                    <FilledInput {...register('email')} defaultValue="Your email" />
                </FormControl>

                {errors.root && <Typography>{errors.root.message}</Typography>}

            <Box sx={{ mt: 2 }}>
                <Button variant="contained" sx={{ backgroundColor: "#2DD699", color: "#fff" }} type='submit' disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Reset Password"}</Button>
            </Box>
            
            </Box>
        </StyledContainer>
    )
}

export default ForgotPasswordForm