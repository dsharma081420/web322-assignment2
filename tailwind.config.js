/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [`./views/**/*.ejs`],
    theme: {
      extend: {
        colors: {
          'forest-green': '#2d5016',
          'leaf-green': '#4a7c24',
          'mint': '#8fbc8f',
          'cream': '#f5f5dc',
          'earth-brown': '#8b7355',
        },
      },
    },
    plugins: [
      require("@tailwindcss/typography"),
      require("daisyui")
    ],
    daisyui: {
      themes: [
        {
          mytheme: {
            "primary": "#4a7c24",      
            "secondary": "#8fbc8f",    
            "accent": "#2d5016",       
            "neutral": "#3d4451",
            "base-100": "#f5f5dc",     
            "base-200": "#e8e8d0",     
            "base-300": "#d4d4b8",    
            "info": "#3abff8",
            "success": "#36d399",
            "warning": "#fbbd23",
            "error": "#f87272",
          },
        },
      ],
    },
  }