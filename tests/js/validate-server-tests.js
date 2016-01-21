// Tests of the core validator.
"use strict";
var fluid =  require("infusion");
var gpii  = fluid.registerNamespace("gpii");
var jqUnit = require("node-jqunit");

var path = require("path");

require("../../src/js/server/validate");
require("./validate-common-test-definitions");
require("./lib/errors");

var schemaDir = path.resolve(__dirname, "../schemas");

jqUnit.module("Unit tests for validation component...");

var testValidator = gpii.schema.validator.server.hasParser({
    gradeNames: ["gpii.schema.tests.validator"],
    schemaDir:  schemaDir,
    listeners: {
        "onCreate.runTests": {
            funcName: "gpii.schema.tests.validator.runTests",
            args:     ["{that}"]
        }
    }
});

console.log("Test component with id '" + testValidator.id + "' available under the global name 'testValidator'...");