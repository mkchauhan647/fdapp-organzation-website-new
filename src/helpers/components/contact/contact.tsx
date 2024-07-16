'use client';
import { ErrorModel } from '@/helpers/dynamic-imports/components';
import { dataService } from '@/utils/data/api/dataServices';
import { ContactUs } from '@/utils/schema/formSchema';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaLocationDot } from 'react-icons/fa6';

const Contact: React.FC = () => {
   const router = useRouter()
  const [name , setName] = useState<string>('')
  const [email , setEmail] = useState<string>('')
  const [message , setMessage] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [errorMessage , setErrorMessage] = useState<string>('');


  const closeModal = () => {
      setShowModal(false);
  };

  function showModel (){
      setShowModal(true);
      setTimeout(()=>{
          closeModal()
      },5000)
  }

  async function handleSubmit(e:React.FormEvent<HTMLFormElement>) : Promise<void> {
    e.preventDefault();
    try{
        const validationResult : any = ContactUs.safeParse({name , email , message});
        if(!validationResult.success){
            setErrorMessage(JSON.parse(validationResult.error).at(0).message)
            setShowModal(true);
            showModel();
            return;
        }
        const response = await dataService.postData('/contact-us',{name , email ,message})
        if(response.success){
            router.push('/success')
        }
        return

    }catch(e:any){
        setErrorMessage(e.message)
        showModel();
    }
  }
  return (
    <section className="bg-[var(--pagebg)]" id="contact">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-4">
              <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
                  <h2
                      className="font-heading mb-4 font-bold tracking-tight text-[var(--c-primary)]  text-xl sm:text-3xl">
                      Contact Us
                  </h2>
              </div>
          </div>
          <div className="flex items-stretch justify-center">
              <div className="grid md:grid-cols-2">
                  <div className="h-full pr-6">
                      <ul className="mb-6 md:mb-0">
                          <li className="flex">
                              <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                                  <FaLocationDot className='h-6 w-6' fill='var(--c-grey)' />
                              </div>
                              <div className="ml-4 mb-4">
                                  <p className="text-gray-600 dark:text-slate-400">Wise House, 38 Pinewood Drive,<br /> Potters Bar, Hertfordshire, United Kingdom</p>
                              </div>
                          </li>
                          {/* <li className="flex">
                              <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                      fill="#0b005a" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                      strokeLinejoin="round" className="h-6 w-6">
                                      <path
                                          d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2">
                                      </path>
                                      <path d="M15 7a2 2 0 0 1 2 2"></path>
                                      <path d="M15 3a6 6 0 0 1 6 6"></path>
                                  </svg>
                              </div>
                              <div className="ml-4 mb-4">
                                  <p className="text-gray-600 dark:text-slate-400">Mobile: +xxxxxxxxx</p>
                                  <Link href ="https://mail.google.com/mail/u/0/#inbox?compose=CllgCJNrcrslPbPvltcwqTDGpjCgQffVLqVxRdqRRsQJDVhgFdQTFhHWlmBLXRthrWzmpLBFjVB" className="text-gray-600 dark:text-slate-400">Mail: contact@fdapp.co.uk</Link>
                              </div>
                          </li> */}
                          <li>
                          <div style={{ width: '100%' }}>
                            <iframe
                              width="100%"
                              height="100%"
                              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=38%20Pinewood%20Dr,%20Potters%20Bar%20EN6%202BD,%20UK+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                              allowFullScreen
                            ></iframe>
                            </div>
                          </li>
                      </ul>
                  </div>
                  <div className="card h-fit max-w-6xl px-2 md:px-4" id="form">
                      <h2 className="mb-4 text-2xl font-bold dark:text-white">Ready to Get Started?</h2>
                      <form id="contactForm" onSubmit={handleSubmit} >
                          <div className="mb-6">
                              <div className="mx-0 mb-1 sm:mb-4">
                                  <div className="mx-0 mb-1 sm:mb-4">
                                      <label htmlFor="name" className="pb-1 text-xs uppercase tracking-wider"></label>
                                      <input type="text" id="name" placeholder="Your name" onChange={(e)=>{setName(e.target.value)}} value={name}
                                        className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0 
                                        focus:outline-[var(--c-primary)] focus:border-[var(--c-primary)]" name="name" />
                                  </div>
                                  <div className="mx-0 mb-1 sm:mb-4">
                                      <label htmlFor="email" className="pb-1 text-xs uppercase tracking-wider"></label>
                                      <input type="email" id="email" placeholder="Your email address" onChange={(e)=>{setEmail(e.target.value)}} value={email}
                                        className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0 
                                        focus:outline-[var(--c-primary)] focus:border-[var(--c-primary)]" name="email" />
                                  </div>
                              </div>
                              <div className="mx-0 mb-1 sm:mb-4">
                                  <label htmlFor="textarea" className="pb-1 text-xs uppercase tracking-wider"></label>
                                  <textarea id="textarea" name="textarea" placeholder="Write your message..." onChange={(e)=>{setMessage(e.target.value)}} value={message}
                                    className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0 
                                    focus:outline-[var(--c-primary)] focus:border-[var(--c-primary)]"></textarea>
                              </div>
                          </div>
                          <div className="text-center">
                              <button type="submit" className="w-full bg-[var(--c-primary)] text-white px-6 py-3 font-xl rounded-md sm:mb-0">Send Message</button>
                          </div>
                      </form>
                    {showModal && <ErrorModel errorMessage={errorMessage} onClose={closeModal} />}
                  </div>
              </div>
          </div>
      </div>
  </section>
  )
}

export default Contact