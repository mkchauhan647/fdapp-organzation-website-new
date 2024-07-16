"use client"
import ContestPage from '@/helpers/components/contesPage/ContesPage';
import PageTop from '@/helpers/components/PageTop/PageTop';
import { PublicLayout } from '@/helpers/dynamic-imports/views';
import React from 'react';

const Contestants : React.FC = () => {
    return (
        <>
            <PublicLayout>
                <section className='bg-[var(--pagebg)]'>
                    <PageTop pageName='Contestants' prevpageName='Home' />  
                    <ContestPage />
                </section>
            </PublicLayout>
        </>
    );
}

export default Contestants;