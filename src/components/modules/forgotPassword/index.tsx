import { useForm, SubmitHandler } from 'react-hook-form'
import { supabase } from '../../../auth/supabase.service'
import { FormControl, InputLabel, FilledInput, Typography, Button, Box, Stack, Container, styled } from '@mui/material'

const StyledContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
});

type FormFields = {
    email: string;
}

const ForgotPasswordForm = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError} = useForm<FormFields>();

    const onSubmit: SubmitHandler<FormFields> = async(formData) => {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(formData.email);
            if (error) {
                throw error;
            }

            alert('A password reset email has been sent to ' + formData.email
            + '. Please check your inbox and follow the instructions to reset your password.');

        } catch (error) {
            setError("root", {
                message: error.message
            }, {
                shouldFocus: true
            });
        }
    }
  return (
    <StyledContainer maxWidth="xs">
            <Typography variant="h3" align="center">Forgot Password</Typography>
            <Typography variant="h6" align="center">Enter your email to reset your password.</Typography>

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
                    <FilledInput {...register('email')} defaultValue="" />
                </FormControl>

                {errors.root && <Typography>{errors.root.message}</Typography>}
                <Button type='submit' disabled={isSubmitting}>{isSubmitting ? "Submitting...": "Reset Password"}</Button>
            </Box>
        </StyledContainer>
    )
}

export default ForgotPasswordForm