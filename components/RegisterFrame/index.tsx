"use client"

import React, { useState } from 'react'
import axios from 'axios'

import { useRouter } from 'next/navigation'

// Common
import Input from '@/common/Input'
import Button from '@/common/Button'

// Styles
import "./Style.scss"


const RegisterFrame = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const route = useRouter();

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('')

        const formData = new FormData(e.currentTarget);

        axios.post('/api/users/register', {
            name: formData.get('name') as string,
            surname: formData.get('surname') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        }).then(res => {
            if (res.status === 201) {
                route.push('/login');
            }
        }).catch(err => {
            setErrorMessage(err?.response?.data?.message)
        }).finally(() => {
            setLoading(false)
        })
    }
    return (
        <div className='register-frame-container'>
            <button type="button" onClick={() => route.back()} className='back-button'>
                Go Back
            </button>
            <div className='text-center'>Logo</div>
            <form className='register-form' onSubmit={handleRegister}>
                <Input label="Name" required name="name" />
                <Input label="Surname" required name="surname" />
                <Input label='Email Adress' type='email' required name="email" />
                <Input label='Password' type='password' required name='password' />
                <Button text='Register' type='submit' customClassName='bg-color-open-red mt-4' loading={loading} />
            </form>
            {
                errorMessage && <div className='text-red-500 mt-3'>{errorMessage}</div>
            }
        </div>
    )
}

export default RegisterFrame