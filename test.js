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

let html = `<!DOCTYPE html>
<html lang="en">
<body>
    <article class="markdown-body">
    <h1>Home page</h1>
    <p>Pages:</p>
    {{ test }}
    <div id="bssg-pages"></div>
    <!-- insert content on line 7 -->
    {{test}}
    </article>
</body>`

html = '{{ test }}    asdads'

console.log(html)
console.log('-----------------------------------------------')

html.replaceAll('{{ test }}',"---------NEW CONTENT----------")

console.log(html)


const p = '{{ test }}   {{ *test *}}The quick brown {{test     }} jumps over the lazy dog. If the dog reacted, was it really lazy?';

console.log(p.replace(new RegExp(`{{ *test *}}`,'g'), "replaced text"));
