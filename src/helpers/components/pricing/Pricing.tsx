import React from 'react';
import { FaCheckCircle } from "react-icons/fa";

const PrivacyPolicy : React.FC = () => {
    type PriceData = {
        title: string;
        price: string;
        time: string;
        features: string[];
        desc: string;
    }   
    let priceData : PriceData[] =[
        {
            "title": "Basic Plan",
            "price": "$49",
            "time": "month",
            "features": [
                "Up to 500 contestants",
                "Unlimited number of votes",
                "Basic customization options for branding (logo, colors, etc.)",
                "Standard email support",
                "Monthly analytics report"
            ],
            "desc": "Contest management for 500 contestants, basic customization."
        },
        {
            "title": "Pro Plan",
            "price": "$99",
            "time": "month",
            "features": [
                "Up to 1,000 contestants",
                "Unlimited number of votes",
                "Advanced customization options for branding (custom CSS, templates, etc.)",
                "Priority email support",
                "Access to API for integration with other platforms",
                "Bi-weekly analytics report with advanced insights"
            ],
            "desc": "Advanced features for 1,000 contestants, priority support."
        },
        {
            "title": "Enterprise Plan",
            "price": "$299",
            "time": "month",
            "features": [
                "Unlimited contestants",
                "Unlimited number of votes",
                "White-label solution with complete branding control",
                "Dedicated account manager",
                "24/7 priority support via email and phone",
                "Custom development options for additional features",
                "Real-time analytics dashboard with custom reporting"
            ],
            "desc": "Unlimited contestants, white-label branding, customization available."
        }
    ]

    

    return (
        <>
            <div className='w-full pt-10 bg-[var(--pagebg)] pb-[70px] '>
                <div className='container mx-auto flex flex-col gap-8 justify-center'>
                    <div>
                        <h1 className='text-3xl text-[var(--blue)] font-secular font-[500]'>Pricing</h1>
                    </div>
                    <div className='flex md:flex-row md:justify-between flex-col items-center gap-10'>

                        {
                            priceData.map((data : PriceData, index : number) => {
                                return (
                                    <div key={index} className='min-h-[37rem] md:px-8 px-5 rounded-lg border-1 w-[20rem] md:w-[23.5rem] flex flex-col bg-[#cc01770e]'>
                                        <div className='py-8 flex flex-col gap-3 border-b-2'>
                                            {/* <div className='flex items-baseline'><h1 className='text-3xl font-bold'>{data.price}</h1><p className='text-[var(--lightblack)]'>/{data.time}</p></div> */}
                                            <h1 className='card-title-blue'>{data.title}</h1>
                                            <p className='text-sm text-[var(--lightblack)]'>{data.desc}</p>
                                        </div>
                                        <div className='py-8 flex flex-col flex-grow justify-between h-full gap-6'>
                                            <ul className='flex flex-col gap-2 '>
                                                {
                                                    data.features.map((list : string,i : number)=>{
                                                        return (
                                                            <li key={i} className='flex items-center text-[var(--blue)]'><FaCheckCircle className='w-[10%] text-left text-[var(--blue)] text-medium' /><p className='w-[80%]'>{list}</p></li>
                                                        )
                                                    })
                                                }

                                            </ul>

                                            <span>
                                                <button className='btn py-2'>Contact Sales</button>
                                            </span>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div >
        </>
    );
}

export default PrivacyPolicy;