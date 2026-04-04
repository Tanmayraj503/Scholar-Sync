import React from "react";
import { useState, useEffect } from "react";

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 200) {
            setIsVisible(true);
        }
        else {
            setIsVisible(false);
        }
    }
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behaviour: "smooth"
        })
    }

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    })
    return (
        isVisible && (
            <button
                onClick={scrollToTop} className="scroll-to-top h-12 w-12 fixed bottom-5 right-5 bg-[#2b7189] text-white rounded-full shadow-lg hover:bg-[#203a43] transition-opacity duration-300 ease-in-out flex items-center justify-center z-5">
                ↑
            </button>
        )
    )
};