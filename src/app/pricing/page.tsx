"use client"
import { Pricing } from '@/helpers/dynamic-imports/components';
import { PublicLayout } from '@/helpers/dynamic-imports/views';
import * as React from 'react';

const TermsConditionPage = () => {
    return (
        <>
            <PublicLayout>
                <Pricing />
            </PublicLayout>
        </>
    );
}

export default TermsConditionPage;