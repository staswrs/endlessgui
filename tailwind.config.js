/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./lib/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'checker': "linear-gradient(45deg, #181818 25%, transparent 25%, transparent 75%, #181818 75%), linear-gradient(45deg, #181818 25%, transparent 25%, transparent 75%, #181818 75%)",
      },
      backgroundSize: {
        'checker': '10px 10px',
      },
      backgroundPosition: {
        'checker': '0 0, 5px 5px',
      },
      colors: {
        'component': '#ffffff',
      },

      screens: {
        'xs': '300px',
        's': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      
      fontSize: {
        s: ['14px', '16px'],
        sMob: ['16px', '18px'],
        sm: ['12px', '14px'],
        smMob: ['14px', '16px'],
        xl: ['20px', '20px'],
        xlMobile:['20px','20px'],
        uppercase:['10px','12px'],
      },
    },
  },
  plugins: [],
}

