const fs = require('fs-extra');
const showdown = require('showdown')
const util = require('util')
const glob = util.promisify(require("glob"));
const path = require('path');
// const { promises: fs } = require("fs")
// const glob = require("glob");

var converter = new showdown.Converter({metadata: true})


const ignoreList = ["README.md"]

const template = fs.readFileSync("template.html").toString()
const templateLine = 14

// create page for every markdown file

// create list of pages in index


async function main(){

    fs.copy(__dirname, path.join(__dirname, '/public'), {
        filter: path => {
          console.log('path ===', path)
          return !(path.indexOf('node_modules') > -1)
        }});

    const pages = (await glob('**/*'))
        .filter(f => !f.includes("node_modules/") && !ignoreList.includes(f))
        .filter(f => f.length!=2 && f.lastIndexOf(".md") == f.length - 3) //only include markdown
        .map(parseMarkdownFile)
        

        pages.forEach( ([html, title]) => console.log("AAAAAAA",title.replaceAll(" ","-")))

    // create pages
    pages.forEach(([html, title]) => fs.writeFile(title.replaceAll(" ","-")+".html", useTemplate(html),()=>{}))
        
    

    // console.log(markdownFiles)
}

const useTemplate = (html) => insertInLine(template, html, templateLine)

const  parseMarkdownFile = filename => {
    const html = converter.makeHtml(fs.readFileSync(filename).toString())
    const title = converter.getMetadata(true).split('\n')
        .filter(i=>i.toLocaleLowerCase().substring(0,5)=='title')
        .map(i => i.substring(i.indexOf(":")+1).trim())[0]
    console.log("content",[html, title])
    return [html, title]
}

const insertInLine = (content, insert, line) => { 
    var split = content.split("\n")
    split.splice(line, 0, insert)
    return split.join("\n") 
}

function generateFileWithInsert(filename, insert, line){
    const newFile = insertInLine(fs.readFileSync(filename).toString(), insert, line)
    fs.writeFile('new-'+filename, newFile, () => {})
}

generateFileWithInsert("index.html", `
<li>
<u></u>
<u></u>
<u></u>
</li>
`, 14)
 

// console.log(insertInLine("hello there cannobi\nline one\n\nline three", "inserted this", 2))



console.log("abb cs as as  ".replaceAll(" ", "-"))
main()

