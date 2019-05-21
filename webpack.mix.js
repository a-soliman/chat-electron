const mix = require("laravel-mix");

mix.js("src/app.js", "dist/").sass("resources/sass/app.scss", "dist/");

mix.setPublicPath("dist");
