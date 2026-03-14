import React from 'react';
import { FaEye } from "react-icons/fa";
import { IoShield } from "react-icons/io5";
import { FaBoltLightning } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { motion } from 'framer-motion';
import AnimatedContent from '../components/AnimatedContent'
import { GiNotebook } from "react-icons/gi";
import { FaPlay } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";




export default function About() {
    const stand = [
        {
            title: "Transparency",
            description: "We believe everyone deserves to know exactly what they're agreeing to — in plain language, not legalese."
        },
        {
            title: "Protection",
            description: "Our mission is to protect everyday users from hidden clauses that corporations use to their advantage."
        },
        {
            title: "Simplicity",
            description: "Legal analysis shouldn't take a law degree. We make it fast, simple, and accessible to everyone."
        },
        {
            title: "Privacy First",
            description: "We don't store your documents. What you paste stays between you and the AI - nothing more."
        }
    ];
    const stats = [
        { title: "Recently Added", label: "Stay current with the latest uploads on any topic. Ideal for fast-moving fields like tech, science, and world events." },
        { title: "Sorted by Duration", label: "Whether you have 10 minutes or 2 hours, find videos that match your available time and desired depth." },
        { title: "Most Liked", label: "Community-validated content surfaces the videos that thousands of learners have found genuinely valuable." },
        { title: "Privacy First", label: "No accounts, no tracking, no saved history. Your API key stays in your browser only. Scholar Sync never stores your searches." },
    ];
    const icons = [
        FaEye,
        IoShield,
        FaBoltLightning,
        FaLock,
    ];

    const icontext = [
        {
            icon: GiNotebook,
            text: "1"
        },
        {
            icon: CiSearch,
            text: "2"
        },
        {
            icon: FaPlay,
            text: "3"
        }

    ]

    const method = [
        {
            title: "Write Your Topic",
            description: "Type anything - a subject, a question, a concept. Scholar Sync handles any depth of query 'photosynthesis' to 'advanced Bayesian inference.'"
        },
        {
            title: "Hit Search",
            description: "We query the YouTube Data API across three independent dimensions simultaneously - recency, duration, and community rating - to give you a rounded picture."
        },
        {
            title: "Watch & Learn",
            description: "Browse nine curated videos across three categories. Click any card to open it directly on YouTube. No distractions, no rabbit holes - just the content you came for."
        },
    ]

    const isMObile = window.innerWidth < 768;

    return (
        <>
            <Header />
            <div className='min-w-full min-h-screen pt-10 lg:pt-12 pb-24 dark:bg-[#0F172A] bg-amber-50'>
                <div className='pt-24 lg:pt-26 max-w-6xl mx-auto mb-10 px-7'>
                    <div className='grid md:grid-cols-2 gap-7'>
                        <div>
                            <p className="font-['Playfair_Display'] font-bold text-6xl mt-2">Learning,</p>
                            <p className="text-6xl font-['Playfair_Display'] font-bold font-style: italic mt-2">curated</p>
                            <p className="text-6xl font-bold font-['Playfair_Display'] mt-2">for you.</p>
                            <p className='text-lg text-[#95989d] mt-7'>Scholar Sync bridges the gap between curiosity and quality education. We surface the best YouTube has to offer — not by luck, but by intelligent curation across time, depth, and community trust.</p>
                            <button className='rounded-3xl flex items-center gap-2 px-8 py-3 text-base mt-6 bg-orange-400 font-bold'><CiSearch className='font-black text-black'/> Start Exploring</button>
                        </div>
                    </div>
                </div>
                <div className='max-w-6xl mx-auto grid gap-5 md:grid-cols-2'>

                    <div>
                        <div className='flex flex-col px-7'>
                            <div className=' flex md:gap-3 flex-col'>
                                <motion.p className="font-['Playfair_Display'] font-bold text-white  text-4xl "
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}>Built for Learners,</motion.p>
                                <motion.p className="text-white font-bold font-['Playfair_Display']  mb-1 text-4xl "
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}>Not Browsers.</motion.p>
                            </div>
                            <motion.p className='text-[#95989d] text-base mt-2 max-w-200 start'
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}>
                                Every feature in Scholar Sync exists to serve one goal: getting you the most useful educational content, faster.</motion.p>
                        </div>


                        <div
                            className="max-w-6xl grid mx-auto px-7 mt-10 sm:mt-12 gap-5"
                        >
                            {stats.map((stat, index) => (
                                <AnimatedContent
                                    key={index}
                                    distance={40}
                                    direction="vertical"
                                    reverse={false}
                                    duration={0.9}
                                    ease="power3.out"
                                    initialOpacity={0}
                                    animateOpacity
                                    scale={1}
                                    threshold={0.1}
                                    delay={index * 0.1}
                                >
                                    <div
                                        key={index}
                                        whileHover={{ translateY: -4 }}
                                        className="flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 duration-200"
                                    >
                                        <p className="text-white mv text-start font-semibold text-base">
                                            {stat.title}
                                        </p>
                                        <p className="text-[#95989d] text-start text-sm">
                                            {stat.label}
                                        </p>
                                    </div>
                                </AnimatedContent>
                            ))}
                        </div>
                    </div>
                    <div className='px-7'>
                        <div className='flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sticky top-22 shadow-2xl p-8 w-full xl:max-w-120 duration-200'>
                            <h1 className='text-[21px] mb-1'>Why three categories?</h1>
                            <p className='text-[#95989d] mb-6 text-sm'>Different learners need different things. Covering all three dimensions gives you a full picture of what's available.</p>
                            <div className='flex flex-col'>
                                <div className='flex justify-between'>
                                    <p className='text-lg'>Recency</p>
                                    <p className='text-lg'>72%</p>
                                </div>
                                <div className='h-2 bg-stone-700 rounded-full mt-2'>
                                    <div className="h-full bg-yellow-400 rounded-full" style={{ width: '72%' }}></div>
                                </div>
                            </div>
                            <div className='mt-6 flex flex-col'>
                                <div className='flex justify-between'>
                                    <p className='text-lg'>Duration match</p>
                                    <p className='text-lg'>85%</p>
                                </div>
                                <div className='h-2 bg-stone-700 rounded-full mt-2'>
                                    <div className="h-full bg-blue-400 rounded-full" style={{ width: '85%' }}></div>
                                </div>
                            </div>
                            <div className=' mt-6 flex flex-col'>
                                <div className='flex justify-between'>
                                    <p className='text-lg'>Community trust</p>
                                    <p className='text-lg'>91%</p>
                                </div>
                                <div className='h-2 bg-stone-700 rounded-full mt-2'>
                                    <div className="h-full bg-green-400 rounded-full" style={{ width: '91%' }}></div>
                                </div>
                            </div>
                            <p className='text-gray-400 mt-8 text-sm text-center'>*Satisfaction scores based on learner feedback across topic categories.</p>
                        </div>
                    </div>
                </div>


                <div className='px-7 pt-10 mt-30 max-w-6xl mx-auto pb-10'>
                    <div>
                        <h1 className='text-4xl font-bold text-white text-start font-playfair'>Three steps to clarity.</h1>
                        <p className='text-base mt-3 text-gray-400'>No accounts, no algorithms deciding what you should think. Just type, search, and learn.</p>
                    </div>
                    <div>
                        <div className='grid md:grid-cols-3 grid-cols-1 gap-8 mt-12'>
                            {method.map((step, index) => {
                                const Icons = icontext[index].icon;
                                return (

                                    <div
                                        key={index}
                                        className='flex flex-col bg-white/5 backdrop-blur-xl rounded-2xl  h-full w-full items-center py-6 pl-6 pr-6 hover:border hover:border-gray-400/30 hover:shadow-[#41381b] shadow-xl transition-shadow duration-100 '>
                                        <div className='flex flex-col gap-5'>
                                            <div className=' flex items-center justify-between gap-4 min-w-0'>
                                                <div className='w-12 h-12 bg-[#bd9b2d38] rounded-xl flex justify-center items-center'>
                                                    <Icons className='text-[25px] shrink-0 text-[#bd9c2d]' />
                                                </div>
                                                <h1 className='text-yellow-400 font-bold text-4xl mt-2'>{icontext[index].text}</h1>
                                            </div>
                                            <div>
                                                <h2 className='text-xl mt-2 font-bold text-white'>{step.title}</h2>
                                                <p className='text-gray-400 mt-3'>{step.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                {/* <motion.div className='mt-34 px-7 mb-20'
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}>
                    <div className='flex flex-col justify-center item-center bg-white/5 backdrop-blur-xl p-10 border border-white/10 rounded-2xl shadow-2xl'>
                        <h1 className='text-[#bd9c2d] text-[40px] text-start font-semibold'>Our Mission</h1>
                        <p className='text-gray-300 mt-3'>Terms of Service documents have average 30,000+ words — longer than most novels. Companies spend millions crafting these documents to protect themselves, often at the user's expense.Terms of Service documents average 30,000+ words — longer than most novels. Companies spend millions crafting these documents to protect themselves, often at the user's expense.</p>
                        <p className='text-gray-300 mt-4'>Quick-Legal levels the playing field. By combining AI with legal expertise, we scan these documents in seconds and surface what actually matters — so you can make an informed decision before clicking "I Agree."</p>
                        <div className='mt-10 '>
                            <div className='p-7 bg-white/5 backdrop-blur-xl shadow-2xl rounded-2xl border-white/10 flex flex-col mx-auto justify-center items-center max-w-56'>
                                <p className='font-bold text-[#bd9b2dc1] text-center text-[56px] '>91%</p>
                                <p className='text-gray-300 text-center max-w-39'>of users never read T&C before agreeing</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
                <div className='px-7'>
                    <motion.h1 className='text-center text-[40px] font-semibold text-[#bd9c2d] mt-30 mb-10'
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}>What We Stand For</motion.h1>
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-5'>
                        {stand.map((titl, index) => {
                            const Icon = icons[index];
                            return (
                                <AnimatedContent
                                    key={index}
                                    distance={40}
                                    direction="vertical"
                                    reverse={false}
                                    duration={1.2}
                                    ease="power3.out"
                                    initialOpacity={0}
                                    animateOpacity
                                    scale={1}
                                    threshold={0.1}
                                    delay={0.1 + index * 0.1}
                                >
                                    <div className='flex flex-col justify-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl py-4 px-6'>
                                        <div className='flex flex-col sm:flex-row gap-5 items-center-safe'>
                                            <div className='p-4 bg-[#bd9b2d38] rounded-xl'>
                                                <Icon className='text-[25px] text-[#bd9c2d]' />
                                            </div>
                                            <div>
                                                <h1 className='text-[#bd9c2d] text-center sm:text-start font-semibold sm:text-[30px] text-[26px]'>
                                                    {titl.title}
                                                </h1>
                                                <p className='text-gray-300 text-center sm:text-start'>
                                                    {titl.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </AnimatedContent>
                            );
                        })}
                    </div>
                </div> */}

                <div className='max-w-6xl mx-auto mt-10 mb-10 px-7'>
                    <div className='bg-white/5 p-12 rounded-xl backdrop-blur-xl'>
                        <div className='flex md:flex-row flex-col gap-5 justify-between items-center'>
                            <p className=' text-xl md:text-2xl lg:text-3xl xl:text-4xl max-w-200'>"The goal is not to watch more videos - it's to find the right one, faster than ever before."</p>
                            <div className='rounded-full shrink-0 bg-yellow-500 border-4 h-24 w-24 flex justify-center items-center border-black'>
                                <div className='flex flex-col justify-center items-center'>
                                <p className='text-black text-3xl lg:text-4xl font-bold'>9</p>
                                <p className='text-black text-[12px]'>Curated</p>
                                <p className='text-black text-[12px]'>Results</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-34 px-7 max-w-6xl mx-auto mb-20'>
                    <div className='flex flex-col justify-center item-center'>
                        <motion.h1 className='text-start text-4xl font-bold text-[white] mt-10 mb-6'
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}>Meet the Team</motion.h1>
                        <motion.div className='mb-8'
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}>
                            <div className=' bg-white/5 backdrop-blur-xl p-10 border border-white/10 rounded-2xl shadow-2xl'>
                                <div className='flex justify-center items-center backdrop-blur-xl shadow-2xl rounded-full w-16 h-16 bg-yellow-300/12 mx-auto mb-5'>
                                    <h2 className='text-5xl font-bold text-[#bd9c2d]'>T</h2>
                                </div>
                                <h1 className='sm:text-3xl text-[26px] font-semibold text-center text-[#bd9c2d]'>Tanmay Raj</h1>
                                <p className='text-gray-300 mt-2 sm:mt-5 text-center xl:px-40'>Founder & Developer
                                    "A developer with a passion for AI-driven solutions, Tanmay built Quick-Legal to bridge the gap between complex legal language and everyday users — leveraging modern AI to make legal clarity accessible to all."</p>
                            </div>
                        </motion.div>
                        <motion.div className=''
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}>
                            <div className=' bg-white/5 backdrop-blur-xl p-10 border border-white/10 rounded-2xl shadow-2xl'>
                                <div className='flex justify-center items-center backdrop-blur-xl shadow-2xl rounded-full w-16 h-16 bg-yellow-300/12 mx-auto mb-5'>
                                    <h2 className='text-5xl font-bold text-[#bd9c2d]'>A</h2>
                                </div>
                                <h1 className='sm:text-3xl text-[26px] font-semibold text-center text-[#bd9c2d]'>Archna Kumari</h1>
                                <p className='text-gray-300 mt-2 sm:mt-5 text-center xl:px-40'>UI/UX Design Analyst
                                    "A UI/UX Design Analyst with a passion for AI-driven solutions"</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div >
            <ScrollToTopButton />
            <Footer />
        </>
    );
}