import React from 'react';
import { useEffect } from 'react';
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
import { FaSearch } from "react-icons/fa";
import ScrollToTop from '../components/ScrollToTop';
import { useNavigate } from 'react-router-dom';


export default function About() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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

    const navigate = useNavigate();

    const icontext = [
        {
            icon: GiNotebook,
            text: "1"
        },
        {
            icon: FaSearch,
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

            <div className='min-w-full min-h-screen pt-10 lg:pt-12 pb-24 dark:bg-[#0F172A] bg-[#fbf8ec]'>
                <div className=' pt-24 lg:pt-30 mt-18 pb-16 lg:mb-40 mb-10 max-w-6xl mx-auto px-7'>
                    <div className='flex items-center'>
                        <div className='lg:grid lg:grid-cols-2 gap-7'>
                            <div>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{ ease: "easeOut", duration: 0.6 }}
                                    className='flex gap-2 mb-4 dark:text-green-400 text-[12px] font-semibold items-center text-[#045b65]'><span className='h-0.5 w-7 dark:bg-green-400 bg-[#045b65] '> </span> ABOUT SCHOLAR SYNC
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{ delay: 0.1, ease: "easeOut", duration: 0.6 }}
                                    className="font-['Playfair_Display'] text-black dark:text-white font-bold text-6xl mt-2">Learning,</motion.p>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{ delay: 0.15, ease: "easeOut", duration: 0.6 }}
                                    className="text-6xl font-['Playfair_Display'] font-bold font-style: italic mt-1 dark:text-green-400 text-[#045b65]">curated</motion.p>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{ delay: 0.2, ease: "easeOut", duration: 0.6 }}
                                    className="text-6xl text-black dark:text-white font-bold font-['Playfair_Display'] mt-1">for you.</motion.p>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{ delay: 0.25, ease: "easeOut", duration: 0.6 }}
                                    className='text-base dark:text-[#95989d] text-gray-700 max-w-190 lg:max-w-115 mt-7'>Scholar Sync bridges the gap between curiosity and quality education. We surface the best YouTube has to offer — not by luck, but by intelligent curation across time, depth, and community trust.</motion.p>
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{ delay: 0.3, ease: "easeOut", duration: 0.6 }}
                                    whileTap={{ scale: 0.95 }}
                                    className='rounded-3xl shadow-hardGold cursor-pointer hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hardGoldlg dark:hover:shadow-Goldlg dark:shadow-Gold flex items-center gap-2 px-8 py-3 text-base mt-8 bg-black dark:bg-orange-400 text-white dark:text-black font-bold'
                                    onClick={() => navigate('/')}>
                                    <span className='font-bold text-2xl'><FaSearch className='font-black text-base ' /></span> Start Exploring
                                </motion.button>
                            </div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.9, }}
                                className='lg:block hidden'>
                                <div className='bg-white dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-[#d3d2d2] dark:border-white/10'>
                                    <div className='p-4 ml-4 mr-4'>
                                        <h1 className='text-xl font-["Playfair_Display"] font-bold text-black dark:text-white mb-6 mt-4'>What we believe in.</h1>
                                        <div className='flex gap-4 flex-wrap justify-start items-center'>
                                            <span className='rounded-2xl hover:scale-102 text-sm px-3 bg-red-500/10 py-1 border border-red-700 text-red-600'>Open Learning</span>
                                            <span className='rounded-2xl px-3 hover:scale-102 text-sm bg-green-500/10 py-1 border border-green-700 text-green-600'>No Paywalls</span>
                                            <span className='rounded-2xl px-3 hover:scale-102 text-sm bg-purple-500/10 py-1 border border-purple-700 text-purple-600'>Privacy by Default</span>
                                            <span className='rounded-2xl px-3 hover:scale-102 text-sm bg-cyan-500/10 py-1 border border-cyan-700 text-cyan-600'>Quality over Quantity</span>
                                            <span className='rounded-2xl px-3 hover:scale-102 text-sm bg-yellow-500/10 py-1 border border-yellow-700 text-yellow-600'>Curiosity-driven</span>
                                            <span className='rounded-2xl px-3 hover:scale-102 text-sm bg-blue-500/10 py-1 border border-blue-700 text-blue-600'>Community Trust</span>
                                            <span className='rounded-2xl px-3 hover:scale-102 text-sm bg-pink-500/10 py-1 border border-pink-700 text-pink-600'>Speed & Simplicity</span>
                                            <span className='rounded-2xl px-3 hover:scale-102 text-sm bg-emerald-500/10 py-1 border border-emerald-700 text-emerald-600'>Accessible Education</span>
                                        </div>
                                        <p className='text-gray-700 dark:text-gray-400 mt-5 mb-5 text-sm'>Scholar Sync believes that the best learning tools get out of your way. We don't curate what you should be interested in — we just help you find the best content once you've decided what matters to you.</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
                <div className='px-7  pt-10 mt-10 max-w-6xl mx-auto pb-10'>
                    <motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.5 }}
                            className='text-4xl font-["Playfair_Display"] font-bold text-black dark:text-white text-start '>Three steps to clarity.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                            viewport={{ once: true, amount: 0.5 }}
                            className='text-base mt-3 text-gray-700 dark:text-gray-400'>No accounts, no algorithms deciding what you should think. Just type, search, and learn.
                        </motion.p>
                    </motion.div>
                    <div>
                        <div className='grid md:grid-cols-3 grid-cols-1 gap-8 mt-12'>
                            {method.map((step, index) => {
                                const Icons = icontext[index].icon;
                                return (
                                    <AnimatedContent
                                        key={index}
                                        distance={40}
                                        direction="vertical"
                                        reverse={false}
                                        duration={1.5}
                                        ease="power3.out"
                                        initialOpacity={0}
                                        animateOpacity
                                        scale={1}
                                        threshold={0.1}
                                        delay={index * 0.2}
                                    >

                                        <div
                                            key={index}
                                            className='flex flex-col bg-white dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-[#d3d2d2] hover:border-black dark:border-white/10 dark:hover:border-[#07873d] h-full w-full items-center py-6 pl-6 pr-6  hover:shadow-hardBlack dark:hover:shadow-Goldlg transition-shadow duration-300 '>
                                            <div className='flex flex-col gap-5'>
                                                <div className=' flex items-center justify-between gap-4 min-w-0'>
                                                    <div className='w-12 h-12 bg-[#bd9b2d38] rounded-xl flex justify-center items-center'>
                                                        <Icons className='text-[25px] shrink-0 text-[#bd9c2d]' />
                                                    </div>
                                                    <h1 className='text-gray-400/50 dark:text-yellow-400/40 font-bold text-5xl mt-2'>{icontext[index].text}</h1>
                                                </div>
                                                <div>
                                                    <h2 className='font-["Playfair_Display"] text-xl mt-2 font-bold text-black dark:text-white'>{step.title}</h2>
                                                    <p className='text-gray-700 dark:text-gray-400 mt-3'>{step.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </AnimatedContent>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className='max-w-6xl mt-30 mb-30 mx-auto grid gap-5 md:grid-cols-2'>
                    <div>
                        <div className='flex flex-col px-7'>
                            <div className=' flex md:gap-3 flex-col'>
                                <motion.p className="font-['Playfair_Display'] font-bold dark:text-white text-black  text-4xl "
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}>Built for Learners,</motion.p>
                                <motion.p className="dark:text-white text-black font-bold font-['Playfair_Display']  mb-1 text-4xl "
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}>Not Browsers.</motion.p>
                            </div>
                            <motion.p className='dark:text-[#95989d] text-gray-600 text-base mt-2 max-w-200 start'
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
                                    distance={40 - index * 4}
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
                                        className="flex flex-col bg-white dark:bg-white/5 backdrop-blur-xl border border-[#d3d2d2] dark:border-white/10 rounded-2xl shadow-2xl p-6 duration-200 hover:translate-x-1 dark:hover:border-[#0180a2] hover:border-[#01a20c]"
                                    >
                                        <p className="text-black dark:text-white font-['Playfair_Display'] mv text-start font-semibold text-base">
                                            {stat.title}
                                        </p>
                                        <p className="text-gray-600 mt-0.5 dark:text-[#95989d] text-start text-sm">
                                            {stat.label}
                                        </p>
                                    </div>
                                </AnimatedContent>
                            ))}
                        </div>
                    </div>
                    <div className='px-7 mt-14 md:mt-0'>
                        <div className='flex flex-col bg-black dark:bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sticky top-22 shadow-2xl p-8 w-full xl:max-w-120 duration-200'>
                            <h1 className='text-[21px] text-white mb-1 font-["Playfair_Display"]'>Why three categories?</h1>
                            <p className='text-gray-400 dark:text-[#95989d] mb-6 text-sm'>Different learners need different things. Covering all three dimensions gives you a full picture of what's available.</p>
                            <div className='font-["Playfair_Display"] flex flex-col'>
                                <div className='flex justify-between text-gray-400 dark:text-[#ffffff]'>
                                    <p className='text-lg '>Recency</p>
                                    <p className='text-lg'>72%</p>
                                </div>
                                <div className='h-2 bg-stone-700 rounded-full mt-2'>
                                    <div className="h-full bg-yellow-400 rounded-full" style={{ width: '72%' }}></div>
                                </div>
                            </div>
                            <div className='mt-6 flex flex-col'>
                                <div className='flex text-gray-400 dark:text-[#ffffff] justify-between'>
                                    <p className='text-lg'>Duration match</p>
                                    <p className='text-lg'>85%</p>
                                </div>
                                <div className='h-2 bg-stone-700 rounded-full mt-2'>
                                    <div className="h-full bg-blue-400 rounded-full" style={{ width: '85%' }}></div>
                                </div>
                            </div>
                            <div className=' mt-6 flex flex-col'>
                                <div className='flex justify-between text-gray-400 dark:text-[#ffffff]'>
                                    <p className='text-lg'>Community trust</p>
                                    <p className='text-lg'>91%</p>
                                </div>
                                <div className='h-2 bg-stone-700 rounded-full mt-2'>
                                    <div className="h-full bg-green-400 rounded-full" style={{ width: '91%' }}></div>
                                </div>
                            </div>
                            <p className='text-gray-400 dark:text-[#95989d] mt-8 text-sm text-center'>*Satisfaction scores based on learner feedback across topic categories.</p>
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
                        {stand.map((title, index) => {
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

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.5 }} className='max-w-6xl mx-auto mt-10 mb-10 px-7 '>
                    <div className='dark:bg-white/5 dark:backdrop-blur-xl dark:shadow-Goldlg bg-white p-12 z-10 rounded-3xl shadow-hardBlack'>
                        <div className='flex md:flex-row flex-col gap-5 justify-between items-center'>
                            <p className="font-['Playfair_Display'] text-xl md:text-2xl text-black font-semibold dark:text-white lg:text-3xl xl:text-4xl max-w-200 italic">"The goal is not to watch more videos - it's to find the <span className='text-[#045b65] dark:text-blue-400'>right one</span>, faster than ever before."</p>
                            <div className='rounded-full shrink-0 bg-yellow-500 border-4 h-24 w-24 flex justify-center items-center border-black'>
                                <div className='flex flex-col justify-center items-center'>
                                    <p className='text-black text-3xl lg:text-4xl font-bold'>9</p>
                                    <p className='text-black text-[12px]'>Curated</p>
                                    <p className='text-black text-[12px]'>Results</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className='mt-20 px-7 max-w-6xl mx-auto mb-20'>
                    <div className='flex flex-col justify-center item-center'>
                        <motion.h1 className='font-["Playfair_Display"] text-start text-4xl font-bold text-black dark:text-[white] mt-10 mb-6'
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}>Meet the Team</motion.h1>
                        <motion.div className='mb-8'
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}>
                            <div className=' dark:bg-white/5 bg-white backdrop-blur-xl p-10 border border-[#d3d2d2] dark:border-white/10 hover:scale-102 dark:hover:border-green-400 hover:border-blue-400 transition-all
                             duration-300 rounded-2xl shadow-2xl'>
                                <div className='flex justify-center items-center backdrop-blur-xl shadow-2xl rounded-full w-16 h-16 dark:bg-blue-400/10 bg-green-400/25 mx-auto mb-5'>
                                    <h2 className='text-5xl font-bold dark:text-blue-400 text-green-400 font-["Playfair_Display"]'>T</h2>
                                </div>
                                <h1 className='sm:text-3xl font-["Playfair_Display"] text-[26px] font-semibold text-center dark:text-blue-400 text-green-400'>Tanmay Raj</h1>
                                <p className='dark:text-gray-300 text-gray-700 mt-2 sm:mt-5 text-center xl:px-40'>Founder & Developer
                                    "A developer with a passion for AI-driven solutions, Tanmay built Scholar-Sync to ensure quick and easy access to meaningful educational resources for all."</p>
                            </div>
                        </motion.div>
                        <motion.div className=''
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}>
                            <div className=' dark:bg-white/5 bg-white backdrop-blur-xl p-10 border border-[#d3d2d2] dark:border-white/10 hover:scale-102 dark:hover:border-green-400 hover:border-blue-400 transition-all
                             duration-300 rounded-2xl shadow-2xl'>
                                <div className='flex justify-center items-center backdrop-blur-xl shadow-2xl rounded-full w-16 h-16 dark:bg-blue-400/10 bg-green-400/25 mx-auto mb-5'>
                                    <h2 className='text-5xl font-bold dark:text-blue-400 text-green-400 font-["Playfair_Display"]'>A</h2>
                                </div>
                                <h1 className='sm:text-3xl font-["Playfair_Display"] text-[26px] font-semibold text-center dark:text-blue-400 text-green-400'>Archna Kumari</h1>
                                <p className='dark:text-gray-300 text-gray-700 mt-2 sm:mt-5 text-center xl:px-40'>UI/UX Design Analyst
                                    "A UI/UX Design Analyst with a passion for AI-driven solutions"</p>
                            </div>
                        </motion.div>
                        <div className='block lg:hidden'>
                            <div className='bg-white mt-20 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-[#d3d2d2] dark:border-white/10'>
                                <div className='p-4 ml-4 mr-4'>
                                    <h1 className='text-xl font-["Playfair_Display"] font-bold text-black dark:text-white mb-6 mt-4'>What we believe in.</h1>
                                    <div className='flex gap-4 flex-wrap justify-start items-center'>
                                        <span className='rounded-2xl hover:scale-102 text-sm px-3 bg-red-500/10 py-1 border border-red-700 text-red-600'>Open Learning</span>
                                        <span className='rounded-2xl px-3 hover:scale-102 text-sm bg-green-500/10 py-1 border border-green-700 text-green-600'>No Paywalls</span>
                                        <span className='rounded-2xl px-3 hover:scale-102 text-sm bg-purple-500/10 py-1 border border-purple-700 text-purple-600'>Privacy by Default</span>
                                        <span className='rounded-2xl px-3 hover:scale-102 text-sm bg-cyan-500/10 py-1 border border-cyan-700 text-cyan-600'>Quality over Quantity</span>
                                        <span className='rounded-2xl px-3 hover:scale-102 text-sm bg-yellow-500/10 py-1 border border-yellow-700 text-yellow-600'>Curiosity-driven</span>
                                        <span className='rounded-2xl px-3 hover:scale-102 text-sm bg-blue-500/10 py-1 border border-blue-700 text-blue-600'>Community Trust</span>
                                        <span className='rounded-2xl px-3 hover:scale-102 text-sm bg-pink-500/10 py-1 border border-pink-700 text-pink-600'>Speed & Simplicity</span>
                                        <span className='rounded-2xl px-3 hover:scale-102 text-sm bg-emerald-500/10 py-1 border border-emerald-700 text-emerald-600'>Accessible Education</span>
                                    </div>
                                    <p className='text-gray-700 dark:text-gray-400 mt-5 mb-5 text-sm'>Scholar Sync believes that the best learning tools get out of your way. We don't curate what you should be interested in — we just help you find the best content once you've decided what matters to you.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <ScrollToTopButton />
            <Footer />
        </>
    );
}