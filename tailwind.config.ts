import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
export const opacities = [4, 8, 12, 16, 24, 40, 64, 72, 88, 96];

function generateShades(varName: string) {
    return shades.reduce(
        (acc, shade) => {
            acc[shade] = `rgb(var(--${varName}-${shade}) / <alpha-value>)`;
            return acc;
        },
        { DEFAULT: `rgb(var(--${varName}-500) / <alpha-value>)` } as Record<string, string>,
    );
}

function opacity() {
    return opacities.reduce(
        (acc, opacity, index) => {
            acc[index + 1] = `${opacity / 100}`;
            return acc;
        },
        {} as Record<string, string>,
    );
}

const config: Config = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Dynamic colors matching the customization settings
                primary: generateShades('primary-color'),
                dark: 'rgb(var(--dark) / <alpha-value>)',
                light: 'rgb(var(--light) / <alpha-value>)',
                vanta: 'rgb(var(--vanta) / <alpha-value>)',
                metal: 'rgb(var(--metal) / <alpha-value>)',
                yellow: 'rgb(var(--yellow) / <alpha-value>)',
                periwinkle: 'rgb(var(--periwinkle) / <alpha-value>)',
                pomegranate: 'rgb(var(--pomegranate) / <alpha-value>)',
                teal: 'rgb(var(--teal) / <alpha-value>)',
                'header-background': generateShades('header-background'),
                'header-link': generateShades('header-link'),
            },
            keyframes: {
                pingAlt: {
                    '0%': {
                        transform: 'scale(0.5)',
                        opacity: '0',
                    },
                    '20%': {
                        opacity: '1',
                    },
                    '30%, 100%': {
                        transform: 'scale(2.5)',
                        opacity: '0',
                    },
                },
            },
            boxShadow: {
                '1xs': '0px 1.54px 1px rgba(0, 0, 0, 0.09), 0px 3.267px 2.754px rgb(0, 0, 0, 0.05), 0px 6.278px 6.63px rgb(0, 0, 0, 0.05), 0px 14px 22px rgb(0, 0, 0, 0.04)',
            },
        },
        opacity: opacity(),
    },
    plugins: [
        plugin(function ({ addVariant }) {
            addVariant('navigation-visible', 'body.navigation-visible &');
        }),
    ],
};
export default config;
