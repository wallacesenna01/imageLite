import * as Yup from 'yup'

export interface LoginForm{
    name?: string
    email: string
    password: string
    passwordMatch?: string
}

export const validationScheme = Yup.object().shape({
    email: Yup.string().trim().required('email is required!').email('invalid email!'),
    password: Yup.string().required('password is required').min(8,'password must have at least 8 charctere '),
    passwordMatch: Yup.string().oneOf([Yup.ref('password')], 'Password must match!')
})

export const formScheme: LoginForm = {email: '', name: '', password: '', passwordMatch: ''}