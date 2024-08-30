import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "primary-color": "var(--primary-color)",
                "primary-color-30": "var(--primary-color-30)",
                "light-color": "var(--light-color)",
                "light-color-15": "var(--light-color-15)",
                "light-color-60": "var(--light-color-60)",
                "dark-color": "var(--dark-color)",
                "dark-color-10": "var(--dark-color-10)",
                "dark-color-85": "var(--dark-color-85)",
            },
            fontFamily: {
                inter: "var(--inter-font)",
                unbounded: "var(--unbounded-font)",
            },
            keyframes: {
                appearance: {
                    "0%": { top: "-100%" },
                    "100%": { top: "25px" },
                },
                fadeTopBtn: {
                    "0%": { bottom: "2rem" },
                    "100%": { bottom: "10rem" },
                },
                fadeBottomBtn: {
                    "0%": { bottom: "10rem" },
                    "100%": { bottom: "2rem" },
                },
                fadeTop: {
                    "0%": { transform: "translateY(100%)" },
                    "100%": { transform: "translateY(0)" },
                },
                fadeBottom: {
                    "0%": { transform: "translateY(-100%)" },
                    "100%": { transform: "translateY(0)" },
                },
            },
            animation: {
                appear: "appearance 0.2s ease-in-out, appearance 0.3s 1s reverse forwards",
                fadeTopBtn: "fadeTopBtn 0.3s ease-in-out",
                fadeBottomBtn: "fadeBottomBtn 0.3s ease-in-out",
                fadeTop: "fadeTop 0.3s ease-in-out",
                fadeBottom: "fadeBottom 0.3s ease-in-out",
            },
        },
    },
    plugins: [],
};
