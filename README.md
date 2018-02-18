# bowling-challenge

## Preview
- https://rodrigovallades.github.io/bowling-challenge/index.html

## Techniques used

- ES6 + Babel: modules, classes and constructors, template strings, spread operator, arrow functions;
- PostCSS: mixins, variables, imports, nesting;
- BEM: CSS naming is following (block__element--modifier) pattern.
- Build: Webpack + Gulp + Babel + PostCSS
- No Bootstrap used!
- No jQuery used!

## About the build

The build of this application was output by **Webpack + Babel + PostCSS + Gulp**:

1. **npm install** (download dependencies);
2. **gulp watch** (for development: creates a 'temp' folder and auto-starts browser on localhost:3000);
3. **gulp build** (for distribution: creates a 'docs' folder minified + uglyfied and ready for deployment).

I've put a lot of effort into this using the most recent coding and building techniques. The result on the browser is relatively simple, but there is actually a lot going on behind the scenes to output the files.

Please don't forget to take a lot at the webpack and gulp files. :)

Thank you,

Rodrigo
