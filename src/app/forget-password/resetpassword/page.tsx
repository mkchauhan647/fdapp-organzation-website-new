'use client'
import * as React from 'react';
import ResetPass from '../../../helpers/components/Resetpassword/Resetpassword';
import { PublicLayout } from '@/helpers/dynamic-imports/views';

const ResetPassword : React.FC = () => {
    return ( 
        <PublicLayout>
            <ResetPass />
        </PublicLayout>
     );
}
 
export default ResetPassword;