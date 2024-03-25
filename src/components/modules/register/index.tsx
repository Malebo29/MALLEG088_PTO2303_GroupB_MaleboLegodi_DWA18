import { z } from 'zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../../auth/supabase.service'
import { AuthError } from '@supabase/supabase-js'
import { FormControl, InputLabel, FilledInput, Typography, Button } from '@mui/material'

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
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
                password: formData.password
            });

            if( error ){
                throw new AuthError(error.message, error.status)
            }

            navigate("/login")
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
    <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl variant="filled" fullWidth>
            <InputLabel htmlFor="component-filled">Email Address</InputLabel>
            <FilledInput {...register('email')} defaultValue="Your email" />
        </FormControl>
    
        <FormControl variant="filled" fullWidth>
            <InputLabel htmlFor="component-filled">Current password</InputLabel>
            <FilledInput {...register('password')}defaultValue="Current password" type='password' />
        </FormControl>

        { errors.root && <Typography>{errors.root.message}</Typography>}
        <Button type='submit' disabled={isSubmitting}>{isSubmitting ? "Submitting...": "Sign In"}</Button>
    </form>
  )
}

export default SignUpForm