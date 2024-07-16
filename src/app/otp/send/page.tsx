
"use client"
import SendVerificationOTP from '@/helpers/components/SendOTP/SendOTP';
import { PublicLayout } from '@/helpers/dynamic-imports/views';
import * as React from 'react';

const SendOTP : React.FC = () => {
    return ( 
        <PublicLayout>
            <SendVerificationOTP/>
        </PublicLayout>
     );
}
 
export default SendOTP;