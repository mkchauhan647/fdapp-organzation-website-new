"use client"
import * as React from 'react';
import { NewsPage, PrivacyPolicy } from '@/helpers/dynamic-imports/components';
import { PublicLayout } from '@/helpers/dynamic-imports/views';

const News: React.FC = () => {
    return (
        <>
            <PublicLayout>
                <NewsPage />
            </PublicLayout>
        </>
    );
}

export default News;