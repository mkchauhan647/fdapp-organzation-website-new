"use client";
import { ErrorModel } from "@/helpers/dynamic-imports/components";
import { dataService } from "@/utils/data/api/dataServices";
import { ContactUs } from "@/utils/schema/formSchema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

const Contact: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const closeModal = () => {
    setShowModal(false);
  };

  function showModel() {
    setShowModal(true);
    setTimeout(() => {
      closeModal();
    }, 5000);
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    try {
      const validationResult: any = ContactUs.safeParse({
        name,
        email,
        message,
      });
      if (!validationResult.success) {
        setErrorMessage(JSON.parse(validationResult.error).at(0).message);
        setShowModal(true);
        showModel();
        return;
      }
      const response = await dataService.postData("/contact-us", {
        name,
        email,
        message,
      });
      if (response.success) {
        router.push("/success");
      }
      return;
    } catch (e: any) {
      setErrorMessage(e.message);
      showModel();
    }
  }
  return (
    <section className="bg-[var(--pagebg)]" id="contact">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-4">
          <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
            <h2 className="font-heading mb-4 font-bold tracking-tight text-[var(--c-primary)]  text-xl sm:text-3xl">
              Contact Us
            </h2>
          </div>
        </div>
        <div className="flex items-stretch justify-center">
          <div className="grid md:grid-cols-2">
            <div className="h-full pr-6">
              <ul className="mb-6 md:mb-0 flex flex-col gap-3">
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                    <FaLocationDot className="h-6 w-6" fill="var(--c-grey)" />
                  </div>
                  <div className="ml-4 ">
                    <Link
                      href="https://www.google.com/maps/place/Wise+House,+38+Pinewood+Dr,
                                        +Potters+Bar+EN6+2BD,+UK/@51.7011527,-0.1975736,17z/data=!3m1!4b1!4m6!3m5!1s0x48763d490510c6b1:
                                        0xf06768e86d0d6172!8m2!3d51.
                                        7011527!4d-0.1975736!16s%2Fg%2F11b8zhlv8d?entry=ttu"
                      target="_blank"
                      className="flex gap-[.5rem] md:gap-[0.3em] items-center"
                    >
                      {/* <span style={{ alignSelf: "baseline" }}>
                      <FaLocationDot className="w-[1.3rem] h-[1.3rem]" />
                    </span> */}
                      {/* <span className="">{orgSettingData?.location}</span> */}
                      <span className="">
                        Wise House & Pinewood Drive <br></br> Potters Bar,
                        Hertfordshire<br></br>
                        United Kingdom
                      </span>
                    </Link>
                  </div>
                </li>
                <li className=" flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                    <IoMdMail className="h-6 w-6" fill="var(--c-grey)" />
                  </div>
                  <div className=" ml-4">
                    <Link
                      href="mailto:contact@fdapp.co.uk"
                      className="flex  items-center gap-[.5rem] mt-2 md:gap-[0.3em]"
                    >
                   
                      {/* <span className="">{orgSettingData?.orgEmail}</span> */}
                      <span className="">contact@fdapp.co.uk </span>
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
            <div className="card h-fit max-w-6xl px-2 md:px-4" id="form">
              <h2 className="mb-4 text-2xl font-bold dark:text-white">
                Ready to Get Started?
              </h2>
              <form id="contactForm" onSubmit={handleSubmit}>
                <div className="mb-6">
                  <div className="mx-0 mb-1 sm:mb-4">
                    <div className="mx-0 mb-1 sm:mb-4">
                      <label
                        htmlFor="name"
                        className="pb-1 text-xs uppercase tracking-wider"
                      ></label>
                      <input
                        type="text"
                        id="name"
                        placeholder="Your name"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        value={name}
                        className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0 
                                        focus:outline-[var(--c-primary)] focus:border-[var(--c-primary)]"
                        name="name"
                      />
                    </div>
                    <div className="mx-0 mb-1 sm:mb-4">
                      <label
                        htmlFor="email"
                        className="pb-1 text-xs uppercase tracking-wider"
                      ></label>
                      <input
                        type="email"
                        id="email"
                        placeholder="Your email address"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        value={email}
                        className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0 
                                        focus:outline-[var(--c-primary)] focus:border-[var(--c-primary)]"
                        name="email"
                      />
                    </div>
                  </div>
                  <div className="mx-0 mb-1 sm:mb-4">
                    <label
                      htmlFor="textarea"
                      className="pb-1 text-xs uppercase tracking-wider"
                    ></label>
                    <textarea
                      id="textarea"
                      name="textarea"
                      placeholder="Write your message..."
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                      value={message}
                      className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0 
                                    focus:outline-[var(--c-primary)] focus:border-[var(--c-primary)]"
                    ></textarea>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="w-full bg-[var(--c-primary)] text-white px-6 py-3 font-xl rounded-md sm:mb-0"
                  >
                    Send Message
                  </button>
                </div>
              </form>
              {showModal && (
                <ErrorModel errorMessage={errorMessage} onClose={closeModal} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
