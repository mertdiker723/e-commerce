"use client"

import React from 'react'

import { useRouter } from 'next/navigation'

// Common
import Input from '@/common/Input'
import Button from '@/common/Button'

// Styles
import "./Style.scss"


const RegisterFrame = () => {
    const route = useRouter();
    return (
        <div className='register-frame-container'>
            <button type="button" onClick={() => route.back()} className='back-button'>
                Go Back
            </button>
            <div className='text-center'>Logo</div>
            <Input label="Name" />
            <Input label="Surname" />
            <Input label='Email Adress' />
            <Input label='Password' type='password' />
            <Input label='Repassword' type='password' />
            <Button text='Register' type='button' customClassName='bg-color-open-red mt-4' />            
        </div>
    )
}

export default RegisterFrame