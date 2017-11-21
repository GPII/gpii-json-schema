/* eslint-env node */
"use strict";

module.exports = function (grunt) {
    grunt.initConfig({
        eslint: {
            js: {
                src: ["./src/**/*.js", "./tests/**/*.js", "./*.js"]
            },
            md: {
                options: {
                    configFile: ".eslintrc-md.json"
                },
                src: ["./*.md", "./src/docs/**/*.md"]
            }
        },
        jsonlint: {
            src: ["./src/**/*.json", "tests/**/*.json", "./*.json"]
        },
        json5lint: {
            src: ["./src/**/*.json5", "tests/**/*.json5", "./*.json5"]
        },
        mdjsonlint: {
            src: ["./*.md", "./**/*.md", "!./node_modules/**"]
        },
        markdownlint: {
            full: {
                options: {
                    config: {
                        // See https://github.com/DavidAnson/markdownlint#rules--aliases for rule names and meanings.
                        "no-emphasis-as-header": false, // We use this far too often in fairly legitimate contexts i.e. for a line of actual emphasis that we should discuss
                        "no-duplicate-header": false, // We use duplicate nested headers, as in section 1 and 2 both have the same sub-section name.
                        "no-trailing-punctuation": false,  // This catches headings that are questions, which seems wrong.
                        "first-header-h1": false, // Docpad takes care of this for us.
                        "first-line-h1": false, // Docpad also takes care of this for us.
                        "header-style": {style: "atx"}, // Although we use a mix, in discussion with various team members, we agreed to try this for now.
                        "no-inline-html": false, // Obviously we need HTML
                        "line-length": false,
                        "ol-prefix": {style: "ordered"} // 1. 2. 3. etc
                    }
                },
                src: ["./*.md", "src/docs/**/*.md"]
            }
        },
        mdlint: ["./*.md", "src/docs/**/*.md"]
    });

    grunt.loadNpmTasks("grunt-jsonlint");
    grunt.loadNpmTasks("fluid-grunt-json5lint");
    grunt.loadNpmTasks("fluid-grunt-eslint");
    grunt.loadNpmTasks("grunt-markdownlint");
    grunt.loadNpmTasks("gpii-grunt-mdjson-lint");

    grunt.registerTask("lint", "Apply eslint, jsonlint, json5lint, and markdownlint", ["eslint:js", "jsonlint", "markdownlint", "eslint:md", "mdjsonlint"]);
};

