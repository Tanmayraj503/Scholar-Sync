import React from "react";
import { useLocation } from "react-router-dom";


export default function ScrollToTop() {
    const { pathname } = useLocation();

    React.useEffect(() => {
        scrollToTop();
    }, [pathname]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
        });
    };

    return null;
};