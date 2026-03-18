import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { IoAlertCircle } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { GoXCircleFill } from "react-icons/go";
import { AiOutlineRise } from "react-icons/ai";
import { IoTimeOutline } from "react-icons/io5";
import ScrollToTopButton from "./ScrollToTopButton";
import { motion } from 'framer-motion';


export default function Home() {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState(null);

    const analyzedocument = async () => {

        if (!input.trim()) return;

        setLoading(true);
        setAnalysis(null);

        try {
            const response = await fetch("/api/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ input })
            });

            if (!response.ok) {
                throw new Error("Server error");
            }

            const data = await response.json();
            console.log("CLEAN RESPONSE:", data);


            if (
                typeof data.trustScore !== "number" ||
                !Array.isArray(data.risks) ||
                !Array.isArray(data.severity)
            ) {
                throw new Error("Invalid response structure");
            }

            setAnalysis(data);

        } catch (error) {
            console.log("Analysis error: ", error);
            setAnalysis({
                trustScore: 0,
                risks: ["Error analyzing document. Please try again or check the format."],
                severity: ["high"]
            });
        } finally {
            setLoading(false);
        }
    };


    const getSeveritycolor = (severity) => {
        switch (severity) {
            case "high": return 'text-red-600 bg-red-50 border-red-200';
            case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'low': return 'text-green-600 bg-green-50 border-green-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getTrustcolor = (score) => {
        if (score >= 80) return 'text-green-600';
        if (score >= 50) return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <>
            <Header />
            <div className="min-h-screen pt-10 lg:pt-12 pb-24">
                <div className="flex pt-24 lg:pt-26 mx-auto flex-col justify-center items-center px-7">
                    <motion.h1 className="text-[#bd9c2d] text-center font-bold text-[36px] sm:text-[42px] md:text-5xl mb-5"
                    initial={{opacity:0, y:20}}
                    whileInView={{opacity:1, y:0}}
                    viewport={{once:true, amount:0.4}}
                    transition={{ease:"easeOut", duration:0.6}}>
                        Stop Signing Away Your Rights
                    </motion.h1>
                    <motion.p className="text-gray-300 text-center md:text-xl"
                    initial={{opacity:0, y:20}}
                    whileInView={{opacity:1, y:0}}
                    viewport={{once:true, amount:0.4}}
                    transition={{delay:0.1, ease:"easeOut", duration:0.6}}>
                        Instantly decode Terms of Service and understand what you're agreeing to</motion.p>
                </div>
                <motion.div className="flex flex-wrap justify-center items-center sm:gap-20 px-7 gap-4"
                initial={{opacity:0, y:20}}
                    whileInView={{opacity:1, y:0}}
                    viewport={{once:true, amount:0.4}}
                    transition={{ease:"easeOut", duration:0.6, delay:0.2}}>
                    <div className="mt-10 flex flex-col justify-center items-center">
                        <div className="flex gap-2 items-center">
                            <span className="text-gray-400"><AiOutlineRise className="text-2xl" /></span>
                            <h1 className="text-gray-300 text-3xl font-bold">95%</h1>
                        </div>
                        <p className="text-lg text-[#bd9c2d]">Accuracy Rate</p>
                    </div>
                    <div className="mt-10 flex flex-col justify-center items-center">
                        <div className="flex gap-2 items-center">
                            <span className="text-gray-400"><IoTimeOutline className="text-2xl" /></span>
                            <h1 className="text-gray-300 text-3xl font-bold">15 s</h1>
                        </div>
                        <p className="text-lg text-center text-[#bd9c2d]">Average Response Time</p>
                    </div>
                </motion.div>

                {/* Main Content */}
                <div className=" mt-15 max-w-7xl px-7 mx-auto">
                    <motion.div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl border-opacity-20 p-8  shadow-2xl"
                    initial={{opacity:0, y:20}}
                    whileInView={{opacity:1, y:0}}
                    viewport={{once:true, amount:0.4}}
                    transition={{ease:"easeOut", duration:0.6, delay:0.26}}>
                        <div className="mb-6 ">
                            <div className="flex items-start justify-start">
                                <label className="block text-[#ad8f2a] sm:text-start text-center mb-4 text-lg font-medium">Paste URL or Legal Document Here!</label>
                            </div>
                            <textarea name="text" id="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="w-full h-48 px-4 py-3  bg-opacity-10 border border-[white] border-opacity-30 rounded-xl text-gray-300 placeholder-[gray-400] placeholder-opacity-50 focus:outline-none focus:ring-1 focus:ring-[#caa630] focus:border-[#caa630] placeholder:text-center sm:placeholder:text-start resize-none"
                                placeholder="Paste terms of service URL or text here..."
                            />
                        </div>
                        <button
                            onClick={analyzedocument}
                            disabled={loading || !input.trim()}
                            className="px-4 sm:px-16 w-full sm:w-auto bg-linear-to-r from-[#299ead] to-[#16727e] text-gray-300 py-4 rounded-xl font-semibold sm:text-lg hover:from-[#22818e] hover:to-[#125e68] transition text-base disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                        >
                            {loading ? 'Analyzing...' : 'Analyze Document'}
                        </button>
                    </motion.div>
                </div>
                {analysis && (
                    <div className="px-7">
                        < div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl border-opacity-20 p-6 mt-10 max-w-305 mx-auto shadow-2xl">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-bold text-white">Analysis Results</h3>
                                <div className="text-center">
                                    <div className="text-sm text-purple-200 mb-1">Trust Score</div>
                                    <div className={`text-4xl font-bold ${getTrustcolor(analysis.trustScore)}`}>
                                        {analysis.trustScore}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                    <IoAlertCircle className="w-6 h-6 text-red-400" />
                                    Key Risks Identified
                                </h4>

                                {analysis.risks.map((risk, index) => (
                                    <div
                                        key={index}
                                        className={`p-4 rounded-lg border ${getSeveritycolor(analysis.severity[index])} transition-all hover:scale-102`}
                                    >
                                        <div className="items-start gap-3 flex">
                                            {analysis.severity[index] == 'high' ?
                                                (<GoXCircleFill className="w-6 h-6 shrink-0 mt-0.5" />
                                                ) : analysis.severity[index] == 'medium' ? (
                                                    <IoAlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
                                                ) :
                                                    (<FaCheckCircle className="w-6 h-6 shrink-0 mt-0.5" />)
                                            }
                                            <div>
                                                <div className="font-semibold mb-1 uppercase text-xs">{analysis.severity[index]} Risk</div>
                                                <div className="font-medium">{risk}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div >
            <ScrollToTopButton />
            <Footer />
        </>
    );
}