import React from 'react';
import Link from 'next/link'


const TermsCondition = () => {

    let terms = [
        {
            "topic": "Acceptance of Terms",
            "desc": "By accessing or using the FDApp website and platform, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, you may not access or use the site."
        },
        {
            "topic": "Use of Services",
            "desc": "You agree to use FDApp's services only for lawful purposes and in accordance with these Terms and Conditions. You may not use the platform to engage in any activity that violates any laws or regulations."
        },
        {
            "topic": "Account Registration",
            "desc": "In order to access certain features of FDApp, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for any activities that occur under your account."
        },
        {
            "topic": "Intellectual Property",
            "desc": "All content on the FDApp website and platform, including text, graphics, logos, images, and software, is the property of FDApp or its licensors and is protected by copyright and other intellectual property laws."
        },
        {
            "topic": "Limitation of Liability",
            "desc": "FDApp shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the platform or these Terms and Conditions."
        },
        {
            "topic": "Governing Law",
            "desc": "These Terms and Conditions shall be governed by and construed in accordance with the laws of England and Wales."
        },
        {
            "topic": "Changes to Terms",
            "desc": "FDApp reserves the right to update or change these Terms and Conditions at any time without prior notice. Your continued use of the platform after any such changes constitutes your acceptance of the new terms."
        },
    ]

    return (
        <>
            <div className='w-full pt-10 bg-[var(--pagebg)] pb-[70px] '>
                <div className='container mx-auto flex flex-col gap-8 justify-center'>
                    <div>
                        <h1 className='card-title-blue'>Terms and Conditions</h1>
                    </div>

                    <div className='flex flex-col gap-5'>
                        {
                            terms.map((term, index) => {
                                return (
                                    <div key={index}>

                                        <h3 className='card-title'>{term.topic}</h3>
                                        <p className='text-[var(--blue)] font-ubuntu text-justify' >{term.desc}</p>
                                    </div>
                                )


                            })


                        }
                        < div>
                            <h3 className='card-title'>Contact Information</h3>
                            <p className='text-[var(--blue)]'>If you have any questions or concerns regarding these Terms and Conditions, please contact us at <Link href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCJNxNSNWKNwqVwsDTzKXdQQNkpCdzmZXdwWnGxLsqbJBvNfVqfTkxZZPjdZbGBwSZcDmXFg" className='text-[blue] underline'>contact@fdapp.co.uk</Link> </p>
                        </div>



                    </div>
                </div>
            </div >
        </>
    );
}

export default TermsCondition;
