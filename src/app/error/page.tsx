"use client"

import { Error } from '@/helpers/dynamic-imports/components';
import { PublicLayout } from '@/helpers/dynamic-imports/views';
import React from 'react';

const SuccessPage : React.FC = () => {
    return ( 
        <>
        <PublicLayout>
            <Error />
        </PublicLayout>
        </>
     );
}
 
export default SuccessPage;