import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const getCurrentYear = () => new Date().getFullYear();
export default function Footer() {
    return (
        <section className="footer flex-col bg-[#0c1427]
 border-t border-t-gray-900 w-full flex flex-wrap justify-center  items-center">
            <div className="flex justify-between flex-wrap md:flex-nowrap gap-5 items-center w-full pt-3 my-5 mx-auto px-7 ">
                <div className="flex flex-col items-start justify-center max-w-137.5 md:text-start  mx-auto md:mx-0">
                    <p className="font-bold text-3xl mb-1 text-[#0195be]">Scholar-Sync</p>
                    <p className="text-gray-400 flex items-center flex-wrap">We read the boring stuff so you don't have to.</p>
                </div>
                <div className="w-full md:w-5xl flex items-center text-center md:justify-center md:items-end flex-wrap flex-col gap-2">
                    <p className="text-gray-200 font-bold text-[19px] text-end">Let's Connect</p>
                    <div className="flex gap-4">
                        <a href="https://github.com/Tanmayraj503"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-icon text-gray-300 hover:text-purple-900">
                            <FaGithub />

                        </a>
                        <a href="https://www.instagram.com/tanmay.raj53"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-icon text-gray-300 hover:text-pink-600">
                            <FaInstagram />
                        </a>
                        <a href="https://www.youtube.com/watch?v=DQS6mU8Uhn8"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-icon text-gray-300 hover:text-blue-400">
                            <FaLinkedin />
                        </a>
                        <a href="mailto:tanmayraj707@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-icon text-gray-300 hover:text-yellow-500">
                            <FaEnvelope />

                        </a>
                    </div>
                </div>
            </div>
            <div className="text-gray-400 pb-7 text-center">© {getCurrentYear()} Tanmay Raj All rights reserved.</div>
        </section>
    );
}