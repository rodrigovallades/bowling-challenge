# bowling-challenge

## Preview
- https://rodrigovallades.github.io/bowling-challenge/index.html

## Technologies used

- ES6 + Babel: modules, classes and constructors, template strings, spread operator, arrow functions;
- PostCSS: mixins, variables, imports, nesting;
- Build: Webpack + Gulp + Babel + PostCSS;
- No Bootstrap used!
- No jQuery used!

## Techniques used

- BEM: CSS naming is following (block__element--modifier) pattern;
- Mobile first approach: the layout, the dimensions and the font sizes are primarily set for mobile screens and then inscreased as needed for bigger screens;
- Development: Browsersync with hot-reloading on localhost:3000.

## Development setup

1. **npm install** (download dependencies);
2. **npm install -g gulp** (if you don't have Gulp installed globally);
3. **gulp watch** (creates a 'temp' folder and auto-starts Browsersync with hot-reloading on localhost:3000).

## How to build for production

1. **npm install** (download dependencies);
2. **npm install -g gulp** (if you don't have Gulp installed globally);
3. **gulp build** (creates a 'docs' folder minified + uglyfied and ready for deployment).

## About the build

The build of this application was output by **Webpack + Babel + PostCSS + Gulp**.

## About this challenge

I've put a lot of effort into this using the most recent coding and building techniques. The result on the browser is relatively simple, but there is actually a lot going on behind the scenes to output the files.

Please don't forget to take a lot at the webpack and gulp files. :)

Thank you,

Rodrigo
