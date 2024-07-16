import * as React from 'react';
import OTPverify from '../../../helpers/components/OtpVerify/Otpverify';
import { PublicLayout } from '@/helpers/dynamic-imports/views';

const OTP = () => {
    return ( 
        <>
            <PublicLayout>
                <OTPverify />
            </PublicLayout>
        </>
     );
}
 
export default OTP;