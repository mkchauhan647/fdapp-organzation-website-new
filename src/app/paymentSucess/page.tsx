'use client';

import { PaymentSuccessPage } from '@/helpers/dynamic-imports/components';
import PublicLayout from '@/views/layouts/publicLayout';
import {useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SuccessPage = () => {
    const searchParams = useSearchParams();
    const [responseData, setResponseData] = useState<any>(null);
  
    useEffect(() => {
      const response = searchParams.get('response');
      if (response) {
        setResponseData(JSON.parse(response));
      }
    }, [searchParams]);
  

  return (

    <PublicLayout>
        <PaymentSuccessPage responseData = {responseData}/>
    </PublicLayout>
  );
};

export default SuccessPage;
