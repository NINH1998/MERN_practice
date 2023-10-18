/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                barlow: ['"Barlow Condensed"', 'sans-serif'],
            },
            backgroundImage: {
                'login-background':
                    "url('https://scontent.fhph2-1.fna.fbcdn.net/v/t1.15752-9/387333761_2417725505064286_8064270687797201190_n.png?stp=dst-png_p1080x2048&_nc_cat=107&ccb=1-7&_nc_sid=ae9488&_nc_ohc=YiSEed7NfyUAX8vxDSM&_nc_ht=scontent.fhph2-1.fna&oh=03_AdQefwlYFr90QfkYnYzIsX8gEzP3WpTJEAOqIz_BrGbkhA&oe=654B55DC')",
            },
        },
    },
    plugins: [],
};
