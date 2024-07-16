"use client"
import CampPage from '@/helpers/components/compPage/campaingnPage';
import { RootPageTop } from '@/helpers/dynamic-imports/components';
import { PublicLayout } from '@/helpers/dynamic-imports/views';
import * as React from 'react';

const Competition : React.FC = () => {
    return ( 
        <PublicLayout>
            <section className='has-individual-campaign-detail'>
                <RootPageTop pageName='campaign' prevpageName='Home' />
                <CampPage />
            </section>
        </PublicLayout>
     );
}
 
export default Competition;