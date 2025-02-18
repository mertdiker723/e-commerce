"use client"

import { useRouter } from 'next/navigation'
import axios from 'axios'

// Common
import Button from '@/common/Button'
import Input from '@/common/Input'

import "./Style.scss"

const LoginFrame = () => {
    const route = useRouter();

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        axios.post('/api/users/login', {
            email,
            password
        }).then((res) => {
            route.push("/")
        }).catch((err) => {
            // eslint-disable-next-line no-console
            console.log(err.response.data);
        })
    }
    return (
        <div className='login-frame-container'>
            <button type="button" onClick={() => route.back()} className='back-button'>
                Go Back
            </button>
            <div className='text-center'>Logo</div>
            <form onSubmit={handleLogin}>
                <Input label='Email Adress' name="email" required />
                <Input label='Password' name="password" type='password' required />
                <Button text='Login' type='submit' customClassName='bg-color-open-red mt-4' />
                <div className='flex justify-between mt-4'>
                    <button type='button' onClick={() => route.push("/register")} >Sign up</button>
                </div>
            </form>
        </div>
    )
}

export default LoginFrame