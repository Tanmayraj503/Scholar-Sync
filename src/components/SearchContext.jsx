import { createContext, useContext, useState } from "react";

const SearchContext = createContext(null);

export function SearchProvider({ children }) {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);

    const handleAnalyze = async (topic) => {
        if (!topic.trim()) return;
        setLoading(true);
        setResults(null);
        setError(null);

        try {
            const response = await fetch(import.meta.env.VITE_API_URL + "/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic: topic.trim() }),
            });
            if (!response.ok) throw new Error("Server error: " + response.status);
            const data = await response.json();
            setResults(data);
        } catch (err) {
            setError("Something went wrong. Please check your connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SearchContext.Provider value={{ input, setInput, loading, results, error, handleAnalyze }}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    return useContext(SearchContext);
}