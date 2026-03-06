import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ScrollToTopButton from "../components/ScrollToTopButton";
import AnimatedContent from '../components/AnimatedContent';
import { motion } from 'framer-motion';


export default function Contact() {

    const [data, setData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const [result, setResult] = useState({
        message: "",
        type: ""
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.append("access_key", "c1cba2a1-28a8-4cf2-8722-cea61034175d");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });
        const polish = (message) => {
            setResult(message);
            setTimeout(() => {
                setResult({ message: "", type: "" });
            }, 3000);
        }

        const data = await response.json();
        if (data.success) {
            polish({ message: "Message sent successfully!", type: "success" });
            setData({
                name: "",
                email: "",
                message: ""
            });
        } else {
            polish({ message: "Something went wrong. Please try again.", type: "error" });
        }
    };
    return (
        <>
            <Header />
            <section className="contact">
                <div className="contact-container dark:bg-[#0F172A] min-w-full min-h-screen pt-10 lg:pt-12 pb-24">
                    <div className="text-center px-4">

                        <motion.h1 className=" pt-24 lg:pt-26 mb-4 text-[#bd9c2d] font-bold text-[36px] sm:text-[42px] md:text-5xl"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}>Let's Get In Touch</motion.h1>
                        <motion.p className="text-gray-400 mt-1 text-lg max-w-3xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}>
                            Feel free to reach out to me in case of reporting any error or for some recommendations.
                        </motion.p>

                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl mx-auto mt-7 px-4">
                        <AnimatedContent
                            distance={30}
                            direction="horizontal"
                            reverse={true}
                            duration={1.2}
                            ease="power3.out"
                            initialOpacity={0}
                            animateOpacity
                            scale={1}
                            threshold={0.1}
                            delay={0}
                        >
                            <div className="contact_left w-full bg-[#8679902a]  rounded-xl p-6 mx-auto mt-8">
                                <div className="text-[#00c8ff] text-xl font-semibold "> Contact Information </div>
                                <div className="mt-4 space-y-4 mb-6">
                                    <div className="flex items-center  bg-[#0b122967] gap-4 p-2 rounded-xl border border-gray-800">
                                        <span className="text-[#00c8ff] bg-[#00c8ff19] rounded-lg h-10 shrink-0 items-center flex justify-center w-10"><MdEmail className="text-2xl" /></span>
                                        <div className="flex flex-col text-sm sm:text-base ">
                                            <h2 className="font-semibold text-gray-300">
                                                Email</h2>
                                            <p className="text-gray-400 break-all  mb-2">tanmayraj707@gmail.com</p>

                                        </div>
                                    </div>
                                    <div className="flex items-center bg-[#0b122966] gap-4 p-2 rounded-xl border border-gray-800">
                                        <span className="text-[#00c8ff] bg-[#00c8ff19] shrink-0 rounded-lg h-10 items-center flex justify-center w-10"><FaLocationDot className="text-2xl" />
                                        </span>
                                        <div className="flex flex-col text-sm sm:text-base">
                                            <h2 className="font-semibold text-gray-300">Location</h2>
                                            <p className="text-gray-400 mb-2">New Delhi, India</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-[#00c8ff] text-xl font-semibold ">
                                    Social Media
                                </div>
                                <div className="flex gap-4 mt-5">
                                    <a href="https://github.com/Tanmayraj503"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="h-10 bg-[#00c8ff30] w-10 rounded-xl flex items-center justify-center text-gray-300 hover:text-purple-900">

                                        <FaGithub className="text-xl" />
                                    </a>
                                    <a href="https://www.instagram.com/tanmay.raj53"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="h-10 bg-[#00c8ff30] w-10 rounded-xl flex items-center justify-center text-gray-300 hover:text-pink-600">
                                        <FaInstagram className="text-xl" />
                                    </a>
                                    <a href="https://www.youtube.com/watch?v=DQS6mU8Uhn8"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="h-10 bg-[#00c8ff30] w-10 rounded-xl flex items-center justify-center text-gray-300 hover:text-blue-400">
                                        <FaLinkedin className="text-xl" />
                                    </a>
                                    <a href="mailto:tanmayraj707@gmail.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="h-10 bg-[#00c8ff30] w-10 rounded-xl flex items-center justify-center text-gray-300 hover:text-yellow-500">
                                        <FaEnvelope className="text-xl" />
                                    </a>
                                </div>
                            </div>
                        </AnimatedContent>
                        <AnimatedContent
                            distance={40}
                            direction="horizontal"
                            reverse={false}
                            duration={1.4}
                            ease="power3.out"
                            initialOpacity={0}
                            animateOpacity
                            scale={1}
                            threshold={0.1}
                            delay={0}
                        >
                            <form onSubmit={onSubmit}>
                                <div className="contact_right w-full bg-[#8679902a] rounded-xl p-6 lg:mt-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:max-w-full mx-auto">
                                        <div className="">
                                            <p className=" text-gray-200 mb-1">Name</p>
                                            <div className="flex items-center bg-[#0b122966] rounded-xl border border-gray-800 p-1 focus-within:border-[#0195be] focus-within:ring-[#0195be] focus-within:ring-1 ">
                                                <FaRegUser className='text-gray-400 text-lg ml-1' />
                                                <input type="text"
                                                    id="name"
                                                    name="name"
                                                    value={data.name}
                                                    onChange={onChange}
                                                    className=" rounded-lg p-2 w-full text-gray-300 focus:outline-none"
                                                    required
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                        </div>
                                        <div className="">
                                            <p className=" text-gray-200 mb-1">Email</p>
                                            <div className="flex items-center bg-[#0b122966] rounded-xl border border-gray-800 p-1 mb-2 focus-within:border-[#0195be] focus-within:ring-[#0195be] focus-within:ring-1">
                                                <FaEnvelope className='text-gray-400 text-lg ml-1' />
                                                <input type="text"
                                                    id="email"
                                                    name="email"
                                                    value={data.email}
                                                    onChange={onChange}
                                                    className=" rounded-lg p-2 w-full text-gray-300 focus:outline-none"
                                                    required
                                                    placeholder="you@example.com"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <p className=" text-gray-200 mb-1">Message</p>
                                        <div className="flex bg-[#0b122966] rounded-xl border border-gray-800 p-1  focus-within:border-[#0195be] focus-within:ring-[#0195be] focus-within:ring-1 mb-2">
                                            <FaRegMessage className=" text-gray-400 text-lg mt-3 ml-1" />
                                            <textarea type="message"
                                                id="message"
                                                name="message"
                                                value={data.message}
                                                onChange={onChange}
                                                rows={3}
                                                className="resize-none p-2 w-full text-gray-300 focus:outline-none "
                                                placeholder="Your message here..."
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="button">
                                        <button className="bg-cyan-700 hover:bg-cyan-800 duration-200 cursor-pointer text-white  py-3 px-4 rounded-xl w-full flex items-center justify-center gap-2 text-lg"
                                            type="submit">
                                            <FaPaperPlane />
                                            Send Message
                                        </button>
                                    </div>
                                    <div className="text-gray-400 text-center mt-4">
                                        <p className="text-[12px]"><strong>* </strong>I value your privacy. Your information will not be shared with third parties.</p>
                                    </div>
                                </div>
                            </form>
                        </AnimatedContent>

                        <div className="fixed bottom-10 right-7">
                            {result.message && (<p className={`text-white px-5 py-3 text-center ${result.type === 'success' ? 'bg-green-500' : 'bg-red-500'} rounded-xl`}>{result.message}</p>)}
                        </div>
                    </div>
                </div>
            </section>
            <ScrollToTopButton />
            <Footer />
        </>
    );
}