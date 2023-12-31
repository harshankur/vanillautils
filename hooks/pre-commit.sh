#!/bin/sh

# Build Type Definition Files
tsc

# Build Minified Js File
npx minify vanillaUtils.js > vanillaUtils.min.js

# Compile JSDoc comments into markdown
npx jsdoc-to-markdown vanillaUtils.js > 'doc/jsdoc.autogenerated.md'
# Combine header doc and the autogenerated doc into README.md
cat doc/header.md doc/jsdoc.autogenerated.md > README.md



# Add the generated files to commit
git update-index --add typings/* vanillaUtils.min.js doc/* README.md