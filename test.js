const path = require('path');
// var DomParser = require('dom-parser');
var fs = require('fs-extra');
// var parser = new DomParser();
const glob = require('util').promisify(require("glob"));

// const dom = parser.parseFromString(fs.readFileSync("layout/template.html").toString())


// console.log(dom.getElementById('bssg-content'))

// STEPS
// find all html link or scripts
// filter out includes



let html = `<!DOCTYPE html>
<html lang="en">
<body>
    <style href="style.css">
    <h1>Home page</h1>
    <p>Pages:</p>
    {{ test }}
    <div id="bssg-pages"></div>
    <!-- insert content on line 7 -->
    {{test}}
    </article>
</body>`

// html = '{{ test }}    asdads'

// console.log(html)
// console.log('-----------------------------------------------')

// html.replaceAll('{{ test }}',"---------NEW CONTENT----------")

// console.log(html)

// (?<=href=")[^>]+(?=")


// const p = '{{ test }}   {{ *test *}}The quick brown {{test     }} jumps over the lazy dog. If the dog reacted, was it really lazy?';

// console.log(p.replace(new RegExp(`{{ *test *}}`,'g'), "replaced text"));



async function main(){

    // const html = fs.readFileSync("layout/template.html").toString()
    const newPath = "./public/folder/article.html"

    const html_href = "./style.css"
    const file_location = "./public/folder/article.html"

    const a = path.relative(path.dirname(file_location),path.join("./public/_source",html_href))

    console.log(html)

    const relative = (source, location) => path.relative(path.dirname(location),path.join("./public/_source",source))



    

    // console.log(b.map(i => i.replace("layout/","")).filter(i => !['html','htm'].includes(i.split('.').pop())))
    const imports = (await glob('layout/**/*')).map(i => i.replace("layout/","")).filter(i => !['html','htm'].includes(i.split('.').pop()))
    imports.forEach(i => html = html.replace(new RegExp(`(?<=href=")\/?${i}\/?(?=")`,'g'), relative(i, newPath)))

        // 

    console.log(html)



    // console.log(p)
}

// (?<=href=")\/?posts\/?(?=")

main()

// function makeTemplate(html, title, newPath, date){
//     let result = template.add(SETTINGS.content, html).add(SETTINGS.date, date).html
//     // for every js or css file in layout
//         // replace all references in template with relative one
//     result.replaceAll(js_import, relative_js_import)
//     // replace every css and js link with relative
//     fs.writeFile(newPath, result,()=>{})
// }







