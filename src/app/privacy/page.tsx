"use client"
import * as React from 'react';
import { PrivacyPolicy } from '@/helpers/dynamic-imports/components';
import { PublicLayout } from '@/helpers/dynamic-imports/views';

const Privacy : React.FC = () => {
    return (
        <>
            <PublicLayout>
                <PrivacyPolicy />
            </PublicLayout>
        </>
    );
}

export default Privacy;