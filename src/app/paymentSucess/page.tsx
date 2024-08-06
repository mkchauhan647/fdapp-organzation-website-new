"use client";

import { PaymentSuccessPage } from '@/helpers/dynamic-imports/components';
import PublicLayout from '@/views/layouts/publicLayout';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SuccessPage = () => {
    const searchParams = useSearchParams();
    const [responseData, setResponseData] = useState<any>(null);

    useEffect(() => {
        const response = searchParams.get('response');
        if (response) {
            try {
                setResponseData(JSON.parse(decodeURIComponent(response)));
            } catch (error) {
                console.error('Error parsing response data:', error);
            }
        }
    }, [searchParams]);

    return (
        <PublicLayout>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                    <h1 className="text-2xl font-bold mb-6 text-center">Transaction Success</h1>
                    {responseData ? (
                        <PaymentSuccessPage responseData={responseData} />
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
};

export default SuccessPage;
