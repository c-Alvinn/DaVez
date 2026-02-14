/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#13ec6d",
                "background-light": "#f6f8f7",
                "background-dark": "#102218",
                "forest": "#1b4332",
                "emerald": "#2d6a4f",
                "lime-accent": "#95d5b2",
            },
            fontFamily: {
                "display": ["Inter"]
            },
            borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" },
        },
    },
    plugins: [],
}
