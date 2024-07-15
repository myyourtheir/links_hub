/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				'primary': '#f1f5f9',
				'secondary': '#fefae0',
				'top': '#f8fafc',
				'darkBg': '#171717',
				'darkText': 'white'
			}
		},
	},
	plugins: [],
}

