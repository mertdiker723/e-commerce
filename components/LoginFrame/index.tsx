"use client"

import { useRouter } from 'next/navigation'

// Common
import Button from '@/common/Button'
import Input from '@/common/Input'

import "./Style.scss"

const LoginFrame = () => {
    const route = useRouter();
    return (
        <div className='login-frame-container'>
            <button type="button" onClick={() => route.back()} className='back-button'>
                Go Back
            </button>
            <div className='text-center'>Logo</div>
            <Input label='Email Adress' />
            <Input label='Password' type='password' />
            <Button text='Login' type='button' customClassName='bg-color-open-red mt-4' />
            <div className='flex justify-between mt-4'>
                <button onClick={() => route.push("/register")} >Sign up</button>
            </div>
        </div>
    )
}

export default LoginFrame