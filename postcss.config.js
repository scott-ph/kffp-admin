module.exports = {
    use: [
        'autoprefixer',
        'css-mqpacker',
        'cssnano'
    ],
    autoprefixer: {
        browsers: '> 5%'
    },
    'css-mqpacker': {
        sort: true
    },
    'local-plugins': false,
    input: 'public/main.css',
    output: 'public/main.css'
};
