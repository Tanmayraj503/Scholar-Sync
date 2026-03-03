import React from "react";
import { useState } from "react";
import { NavLink, } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import AnimatedContent from "./AnimatedContent";


export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [clicked, setClicked] = React.useState(false);

    const handlecombinedproperty = () => {
        setClicked(!clicked);
    }

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const links = ["Home", "About", "Contact"];

    return (
        <>
            <header
                className={`fixed top-0 shadow-2xs w-full z-50 bg-linear-to-r from-[#0f2027b7] via-[#203a43b7] to-[#2c5364b7] text-white  transition-all duration-300 
                    ${isScrolled ? "pt-2 pb-3" : "pt-3 pb-3.5"} px-8`}>
                <AnimatedContent
                    distance={40}
                    direction="vertical"
                    reverse
                    duration={0.9}
                    ease="power3.out"
                    initialOpacity={0}
                    animateOpacity={false}
                    scale={1}
                    threshold={0.1}
                    delay={0}
                >
                    <div className="hidden lg:flex justify-between items-center max-w-340 mx-auto">
                        <div className="text-3xl font-bold text-[#bd9c2d] cursor-pointer" >Quick-Legal</div>

                        <nav className="gap-8 flex">
                            {links.map((item) => (
                                <div key={item} className="relative group">
                                    <NavLink
                                        to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <span className={isActive ? "text-[#ecc137]" : "hover:text-[#caa630] transition-colors"}>
                                                    {item}
                                                </span>
                                                <span className={`absolute rounded-full -bottom-2 -left-2.5 -right-2.5 h-0.5 bg-[#bd9c2d] origin-left transition-transform duration-300 ease-out ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}></span>
                                            </>
                                        )}
                                    </NavLink>
                                </div>
                            ))}
                        </nav>
                    </div>


                    <div className="flex justify-between items-center lg:hidden">
                        <div className="text-3xl font-bold text-[#bd9c2d] cursor-pointer" >Quick-Legal</div>
                        <button
                            onClick={handlecombinedproperty}
                            className="cursor-pointer text-2xl z-50"
                            aria-label="Toggle menu"
                        >
                            {clicked ? <FaXmark /> : <FaBars />}
                        </button>
                    </div>
                </AnimatedContent>
            </header>
            <div className={`lg:hidden fixed top-14 right-0 h-screen w-64 bg-[#1d4c5c] shadow-md transition-transform duration-300 ease-in-out z-40 ${clicked ? "translate-x-0" : "translate-x-full"}`}>
                <nav className="flex flex-col gap-7 py-20 px-8 text-xl">
                    {links.map((item) => (
                        <div key={item} className="relative group w-fit">
                            <NavLink
                                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                onClick={() => setClicked(false)}
                                className={({ isActive }) =>
                                    isActive ? "text-[#bd9c2d]" : "hover:text-[#caa630] transition-colors text-white"
                                }
                            >
                                {item}
                            </NavLink>
                            <span className="absolute rounded-full -bottom-2 -left-2.5 -right-2.5 h-0.5 bg-[#bd9c2d] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                        </div>
                    ))}
                </nav>
            </div>
            {clicked && (
                <div
                    className="lg:hidden fixed inset-0 z-30"
                    onClick={() => setClicked(false)}
                />
            )}
        </>
    );
}