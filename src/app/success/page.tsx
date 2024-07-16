"use client"

import { Success } from '@/helpers/dynamic-imports/components';
import { PublicLayout } from '@/helpers/dynamic-imports/views';
import ReduxProvider from '@/helpers/redux/ReduxProvider';
import React  from 'react';

const SuccessPage : React.FC = () => {
    return ( 
        <PublicLayout>
            <ReduxProvider>
                <Success />
            </ReduxProvider>
        </PublicLayout>
     );
}
 
export default SuccessPage;