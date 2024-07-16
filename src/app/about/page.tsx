"use client"
import PublicLayout from '@/views/layouts/publicLayout';  
import { AboutUS } from '@/helpers/dynamic-imports/components';
import * as React from 'react';

const About : React.FC = () => {
    return (
        <>
            <PublicLayout>
                <AboutUS/>
            </PublicLayout>
        </>
    );
}

export default About;