"use client"
import { RootPageTop } from '@/helpers/dynamic-imports/components';
import { PublicLayout } from '@/helpers/dynamic-imports/views';
import { CategoryPage } from '@/helpers/dynamic-imports/components';
import * as React from 'react';

const Category : React.FC = () => {
    return ( 
        <PublicLayout>
            <section className='px-2 md:px-24 bg-[var(--pagebg)] category'>
                <RootPageTop pageName='Category' prevpageName='Home' prevpage2Name='Campaign' />
                <CategoryPage  />
            </section>
        </PublicLayout>
     );
}
 
export default Category;