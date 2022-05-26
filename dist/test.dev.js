"use strict";

var path = require('path'); // var DomParser = require('dom-parser');


var fs = require('fs-extra'); // var parser = new DomParser();


var glob = require('util').promisify(require("glob")); // const dom = parser.parseFromString(fs.readFileSync("layout/template.html").toString())
// console.log(dom.getElementById('bssg-content'))
// STEPS
// find all html link or scripts
// filter out includes


var html = "<!DOCTYPE html>\n<html lang=\"en\">\n<body>\n    <style href=\"style.css\">\n    <h1>Home page</h1>\n    <p>Pages:</p>\n    {{ test }}\n    <div id=\"bssg-pages\"></div>\n    <!-- insert content on line 7 -->\n    {{test}}\n    </article>\n</body>"; // html = '{{ test }}    asdads'
// console.log(html)
// console.log('-----------------------------------------------')
// html.replaceAll('{{ test }}',"---------NEW CONTENT----------")
// console.log(html)
// (?<=href=")[^>]+(?=")
// const p = '{{ test }}   {{ *test *}}The quick brown {{test     }} jumps over the lazy dog. If the dog reacted, was it really lazy?';
// console.log(p.replace(new RegExp(`{{ *test *}}`,'g'), "replaced text"));

function main() {
  var newPath, html_href, file_location, a, relative, imports;
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // const html = fs.readFileSync("layout/template.html").toString()
          newPath = "./public/folder/article.html";
          html_href = "./style.css";
          file_location = "./public/folder/article.html";
          a = path.relative(path.dirname(file_location), path.join("./public/_source", html_href));
          console.log(html);

          relative = function relative(source, location) {
            return path.relative(path.dirname(location), path.join("./public/_source", source));
          }; // console.log(b.map(i => i.replace("layout/","")).filter(i => !['html','htm'].includes(i.split('.').pop())))


          _context.next = 8;
          return regeneratorRuntime.awrap(glob('layout/**/*'));

        case 8:
          _context.t0 = function (i) {
            return i.replace("layout/", "");
          };

          _context.t1 = function (i) {
            return !['html', 'htm'].includes(i.split('.').pop());
          };

          imports = _context.sent.map(_context.t0).filter(_context.t1);
          imports.forEach(function (i) {
            return html = html.replace(new RegExp("(?<=href=\")/?".concat(i, "/?(?=\")"), 'g'), relative(i, newPath));
          }); // 

          console.log(html); // console.log(p)

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
} // (?<=href=")\/?posts\/?(?=")


main(); // function makeTemplate(html, title, newPath, date){
//     let result = template.add(SETTINGS.content, html).add(SETTINGS.date, date).html
//     // for every js or css file in layout
//         // replace all references in template with relative one
//     result.replaceAll(js_import, relative_js_import)
//     // replace every css and js link with relative
//     fs.writeFile(newPath, result,()=>{})
// }