"use strict";

// const path = require('path');
// var DomParser = require('dom-parser');
// var fs = require('fs-extra');
// var parser = new DomParser();
// const dom = parser.parseFromString(fs.readFileSync("layout/template.html").toString())
// console.log(dom.getElementById('bssg-content'))
// STEPS
// find all html link or scripts
// filter out includes
// path.relative(path.dirname())
var html = "<!DOCTYPE html>\n<html lang=\"en\">\n<body>\n    <article class=\"markdown-body\">\n    <h1>Home page</h1>\n    <p>Pages:</p>\n    {{ test }}\n    <div id=\"bssg-pages\"></div>\n    <!-- insert content on line 7 -->\n    {{test}}\n    </article>\n</body>";
html = '{{ test }}    asdads';
console.log(html);
console.log('-----------------------------------------------');
html.replaceAll('{{ test }}', "---------NEW CONTENT----------");
console.log(html);
var p = '{{ test }}   {{ *test *}}The quick brown {{test     }} jumps over the lazy dog. If the dog reacted, was it really lazy?';
console.log(p.replace(new RegExp("{{ *test *}}", 'g'), "replaced text"));