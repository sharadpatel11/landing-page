
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				cyber: {
					green: '#00ff41',
					blue: '#0066ff',
					purple: '#8b5cf6',
					dark: '#0a0a0a',
					darker: '#050505'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'glow': {
					'0%, 100%': {
						opacity: '1',
						transform: 'scale(1)'
					},
					'50%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'matrix': {
					'0%': {
						transform: 'translateY(-100%)'
					},
					'100%': {
						transform: 'translateY(100vh)'
					}
				},
				'typing': {
					'0%': {
						width: '0'
					},
					'100%': {
						width: '100%'
					}
				},
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'glitch': {
					'0%, 74%, 100%': {
						transform: 'translate(0)'
					},
					'75%': {
						transform: 'translate(-2px, 2px)'
					},
					'76%': {
						transform: 'translate(2px, -2px)'
					},
					'77%': {
						transform: 'translate(-2px, -2px)'
					},
					'78%': {
						transform: 'translate(2px, 2px)'
					},
					'79%': {
						transform: 'translate(-2px, 2px)'
					},
					'80%': {
						transform: 'translate(2px, -2px)'
					}
				},
				'scan': {
					'0%': {
						transform: 'translateX(-100%)'
					},
					'100%': {
						transform: 'translateX(100%)'
					}
				},
				'float-y': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-8px)' }
				},
				'grid-pan': {
					'0%': { backgroundPosition: '0px 0px' },
					'100%': { backgroundPosition: '120px 120px' }
				},
				'shimmer-x': {
					'0%': { transform: 'translateX(-120%)' },
					'100%': { transform: 'translateX(120%)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glow': 'glow 2s ease-in-out infinite',
				'matrix': 'matrix 3s linear infinite',
				'typing': 'typing 3s steps(20) infinite',
				'fade-in-up': 'fade-in-up 0.6s ease-out',
				'glitch': 'glitch 0.3s infinite',
				'scan': 'scan 3s infinite',
				'float-y': 'float-y 6s ease-in-out infinite',
				'grid-pan': 'grid-pan 18s linear infinite',
				'shimmer-x': 'shimmer-x 2.8s ease-in-out infinite'
			},
			backgroundImage: {
				'cyber-grid': "linear-gradient(rgba(0,255,65,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.1) 1px, transparent 1px)",
				'cyber-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)'
			},
			backgroundSize: {
				'grid': '20px 20px'
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
