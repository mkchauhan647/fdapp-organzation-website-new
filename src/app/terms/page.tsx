"use client"
import { TermsCondition } from '@/helpers/dynamic-imports/components';
import { ReduxProvider } from '@/helpers/dynamic-imports/redux';
import { PublicLayout } from '@/helpers/dynamic-imports/views';
import * as React from 'react';

const TermsConditionPage : React.FC = () => {
    return (
        <>
            <PublicLayout>
                <ReduxProvider>
                    <TermsCondition />
                </ReduxProvider>
            </PublicLayout>
        </>
    );
}

export default TermsConditionPage;