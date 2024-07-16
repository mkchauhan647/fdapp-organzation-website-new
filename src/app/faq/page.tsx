"use client"
import { FaqSection } from '@/helpers/dynamic-imports/components';
import PublicLayout from '@/views/layouts/publicLayout';
import * as React from 'react';

const Faqpage : React.FC = () => {
    return (
        <>
            <PublicLayout>
                <FaqSection />
            </PublicLayout>
        </>
    );
}

export default Faqpage;