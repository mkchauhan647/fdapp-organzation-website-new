import React from 'react';
import Link from 'next/link'
import { GoDotFill } from "react-icons/go";


const PrivacyPolicy : React.FC = () => {
    type policy = {
        topic : string,
        desc : string,
        lists? : string[]
    }
    let policy = [
        {
            "topic": "Collection of Information",
            "desc": "We collect personal information from you when you register on our site, subscribe to our newsletter, respond to a survey, fill out a form, or participate in a voting event. This information may include your name, email address, phone number, and other relevant details."
        },
        {
            "topic": "Use of Information",
            "desc": "We use the information we collect from you to:",
            "lists": ["Provide, operate, and maintain our platform.",
                "Personalize your experience and improve our website and services.",
                "Send periodic emails and notifications related to your account or voting events.",
                "Respond to your inquiries, questions, and requests.",
            ]
        },
        {
            "topic": "Protection of Information",
            "desc": "We implement a variety of security measures to maintain the safety of your personal information. We use encryption protocols to protect sensitive data transmitted online and restrict access to your information to authorized personnel only."
        },
        {
            "topic": "Disclosure of Information",
            "desc": "We do not sell, trade, or otherwise transfer your personal information to outside parties without your consent. However, we may share your information with trusted third parties who assist us in operating our website, conducting our business, or servicing you, as long as those parties agree to keep this information confidential."
        },
        {
            "topic": "Data Retention",
            "desc": "We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy unless a longer retention period is required or permitted by law."
        },
        {
            "topic": "Your Rights",
            "desc": "You have the right to access, update, or delete your personal information at any time. You may also opt-out of receiving communications from us by following the unsubscribe instructions provided in our emails."
        },
        {
            "topic": "Changes to Privacy Policy",
            "desc": "We reserve the right to update or change our Privacy Policy at any time. Any changes will be posted on this page, and the effective date will be updated accordingly."
        },

    ]


    return (
        <>
            <div className='w-full pt-10 bg-[var(--pagebg)] pb-[70px] '>
                <div className='container mx-auto flex flex-col gap-8 justify-center'>
                    <div>
                        <h1 className='card-title-blue'>Privacy Policy</h1>
                    </div>

                    <div className='flex flex-col gap-5'>
                        {
                            policy.map((term : policy, index : number) => {
                                return (
                                    <div key={index}>

                                        <h3 className='card-title'>{term.topic}</h3>
                                        <p className='text-[var(--blue)] font-ubuntu text-justify' >{term.desc}</p>
                                        {
                                            term.lists && <ul className='mt-3'>
                                                {
                                                    term.lists.map((list,i)=>{
                                                        return <li key={i} className='flex items-center gap-3'><span><GoDotFill /></span>{list}</li>
                                                    })
                                                }
                                            </ul>
                                        }
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

export default PrivacyPolicy;