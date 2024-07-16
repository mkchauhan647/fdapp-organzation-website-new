/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import * as React from 'react';


const AboutUS : React.FC = () => {
    return (
        <>
            <section className='w-full pt-10 bg-[var(--pagebg)] md:pb-[70px] pb-10 '>
                <div className='container mx-auto flex flex-col gap-0 md:gap-6 justify-center'>
                    <div className='w-full text-center flex flex-col gap-4 mt-5'>
                        <h1 className="text-[var(--blue)] text-[24px] font-[700]">
                            Welcome to FDApp - Your Ultimate Contestant Voting Solution
                        </h1>
                        <p className="text-[var(--blue)] text-[16px]">
                            Welcome to FDApp - the premier platform for organizing and managing contestant voting events with ease and efficiency. Whether you're 
                            running a talent competition, a popularity contest, or an election, FDApp provides you with all the tools you need to engage your 
                            audience, streamline the voting process, and make your event a resounding success.
                        </p>
                    </div>

                    <div className='flex flex-col pt-5'>
                        <div className='flex flex-col-reverse items-center md:flex-row md:justify-between md:items-start w-full py-6 border-b-2'>
                            <div className='w-[100%] md:w-[90%] md:w-[65%] flex flex-col gap-3'>
                                <h1 className="card-title-blue">About Us</h1>
                                <p className='text-justify'>
                                    At FDApp, we understand the importance of creating engaging and interactive experiences for your audience. 
                                    With our intuitive and user-friendly platform, you can effortlessly set up and manage contestant voting events 
                                    from start to finish. Our team is dedicated to providing you with top-notch service and support every step of 
                                    the way, ensuring that your voting event runs smoothly and seamlessly.
                                </p>
                            </div>

                            <div className='w-[100%] md:w-[30%] flex md:justify-end mb-4 md:mb-0'>
                                <div className='w-[4rem] h-[4rem] md:w-[15rem] md:h-[15rem]'>
                                    <Image src="/image/about/logo.png" alt="img" height={500} width={900} className='h-full w-full object-contain' />
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col items-center md:flex-row md:justify-between md:items-center w-full py-6 border-b-2'>
                            <div className='w-[100%] md:w-[30%] mb-4 md:mb-0 flex md:justify-start'>
                                <div className='w-[5rem] h-[5rem] md:w-[20rem] md:h-[20rem]'>
                                    <Image src="/image/about/about5.jpg" alt="img" height={500} width={900} className='h-full w-full object-contain' />
                                </div>
                            </div>
                            <div className='w-[100%] md:w-[65%] flex flex-col gap-3 justify-center'>
                                <h1 className="card-title-blue">Vision</h1>
                                <p className='text-justify'>
                                    At FDApp, our vision is to revolutionize contestant voting events with user-friendly technology. 
                                    We aim to empower organizers, foster participation, and ensure every voice is heard, driving positive change and community engagement.
                                </p>
                            </div>
                        </div>

                        <div className='flex flex-col-reverse items-center md:flex-row md:justify-between md:items-center w-full py-6 border-b-2'>

                            <div className='w-[100%] md:w-[65%] flex flex-col gap-3'>
                                <h1 className="card-title-blue">Misson</h1>
                                <p className='text-justify'>
                                    Our mission at FDApp is to provide a comprehensive platform for organizing and managing voting
                                     events of all sizes. We are committed to delivering exceptional value through intuitive features, 
                                     reliable performance, and top-notch support, redefining the voting experience and empowering 
                                     organizers to connect with their audiences effectively.
                                </p>
                            </div>
                            <div className='w-[100%] md:w-[30%] mb-4 md:mb-0flex justify-center'>
                                <div className='w-[5rem] h-[5rem] md:w-[25rem] md:h-[20rem]'>
                                    <Image src="/image/about/about3.jpg" alt="img" height={500} width={900} className='h-full w-full object-contain' />
                                </div>
                            </div>

                        </div>

                        <div className='flex flex-col items-center md:flex-row md:justify-between md:items-center w-full py-6 border-b-2'>

                            <div className='w-[100%] md:w-[30%] mb-4 md:mb-0flex items-center'>
                                <div className='w-[5rem] h-[5rem] md:w-[25rem] md:h-[22rem]'>
                                    <Image src="/image/about/about6.jpg" alt="img" height={500} width={900} className='h-full w-full object-contain' />
                                </div>
                            </div>
                            <div className='w-[100%] md:w-[65%] flex flex-col gap-3'>
                                <h1 className="card-title-blue">Key Features</h1>
                                <p className='text-justify'>
                                    FDApp offers a comprehensive suite of features designed to meet the unique needs of your voting event:
                                </p>

                                <ol className="mt-3 list-disc pl-5 flex flex-col gap-2">
                                    <li className='text-justify'>SMS and Email Voting: Reach your audience wherever they are with our 
                                        SMS and email voting capabilities. Participants can easily cast their votes using their mobile 
                                        devices or email clients, making it convenient for everyone to participate.
                                    </li>
                                    <li className='text-justify'>Customizable Voting Options: Tailor your voting event to suit your 
                                        specific requirements with customizable voting options. Whether you're voting for contestants, 
                                        proposals, or ideas, FDApp allows you to create voting scenarios that fit your needs.
                                    </li>
                                    <li className='text-justify'>Real-time Monitoring: Keep track of voting activity in real-time with our 
                                        intuitive monitoring dashboard. Get instant insights into voting trends, participant engagement, and more, 
                                        empowering you to make informed decisions throughout your event.
                                    </li>
                                    <li className='text-justify'>Secure and Reliable: Rest assured that your voting event is safe and secure 
                                        with FDApp. We employ industry-standard security protocols to protect your data and ensure 
                                        the integrity of the voting process.
                                    </li>
                                </ol>
                            </div>

                        </div>
                        <div className='flex flex-col-reverse items-center md:flex-row md:justify-between md:items-start w-full py-6'>

                            <div className='w-[100%] md:w-[65%] flex flex-col gap-5'>
                                <h1 className="card-title-blue">How It Works</h1>
                                <h3 className='card-title'>Using FDApp is simple and straightforward:</h3>

                                <div className=''>
                                    <p><span className='font-semibold mr-1'>Set Up Your Event:</span>Create your voting event in just a few clicks, specifying voting options, 
                                        duration, and other settings according to your preferences.
                                        Invite Participants: Reach out to your audience via SMS, email, or other channels to invite them to participate in your voting event.
                                    </p>
                                </div>
                                <div className=''>
                                    <p><span className='font-semibold mr-1'>Collect Votes: </span>Participants can easily cast their votes using their mobile devices or 
                                        email clients, with options to vote for their favorite contestants, proposals, or ideas.
                                    </p>
                                </div>
                                <div className=''>
                                    <p><span className='font-semibold mr-1'>Monitor Progress:</span> Keep track of voting activity in real-time using our intuitive 
                                        monitoring dashboard, allowing you to stay informed and make data-driven decisions throughout your event.
                                        Announce Results: Once voting is complete, announce the results of your event and celebrate the winners!

                                    </p>
                                </div>

                            </div>
                            <div className='w-[100%] md:w-[30%] mb-4 md:mb-0flex items-center justify-end'>
                                <div className='w-[5rem] h-[5rem] md:w-[20rem] md:h-[23rem]'>
                                    <Image src="/image/about/about9.jpg" alt="img" height={500} width={900} className='h-full w-full object-contain' />
                                </div>
                            </div>


                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}

export default AboutUS;