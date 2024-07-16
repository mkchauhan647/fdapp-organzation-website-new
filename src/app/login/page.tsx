"use client"
import React from 'react';
import { PublicLayout } from '@/helpers/dynamic-imports/views';
import { LoginSection } from '@/helpers/dynamic-imports/components';

const Login : React.FC = () => {
    return(
        <PublicLayout>
            <LoginSection />
        </PublicLayout>
    )
}

export default Login;