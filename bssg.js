const fs = require('fs-extra');
const path = require('path');
const glob = require('util').promisify(require("glob"));
const showdown = require('showdown')
var converter = new showdown.Converter({metadata: true})

// ------------------------------------
// Set the html template variable names here
// ------------------------------------
const SETTINGS = {
    pages : 'pages',
    content : 'content',
    date: 'date'
}

class HtmlTemplate {
    constructor(html) {this.html = html}
    add(key, content) {return new HtmlTemplate(this.html.replace(new RegExp(`{{ *${key} *}}`,'g'), content))}
    static fromFile(path) {return new HtmlTemplate(fs.readFileSync(path).toString())}
}

const index = HtmlTemplate.fromFile("layout/index.html")
const template = HtmlTemplate.fromFile("layout/template.html")

async function main(){

    const public = path.join(__dirname, '/public')
    await fs.remove(public); 
    await fs.copy(path.join(__dirname, '/src'), public)

    const pages = (await glob('public/**/*'))
        .filter(f => !f.includes("node_modules/"))
        .filter(f => f.length!=2 && f.lastIndexOf(".md") == f.length - 3)
        .map(parseMarkdownFile)

    pages.forEach(i => makeTemplate(...i))
        
    fs.writeFile("./public/index.html", index.add(SETTINGS.pages, getPageList(pages)).html,()=>{})
}


function makeTemplate(html, title, newPath, date){
    let result = template.add(SETTINGS.content, html).add(SETTINGS.date, date).html
    fs.writeFile(newPath, result,()=>{})
}

const getPageList = (pages) => {
    const toHtmlLink = (file) => file.substr(0,file.lastIndexOf(".")).replace('public'+path.sep, '')
    const listItems = pages.map(([h, title, file]) =>`<li><a href="${toHtmlLink(file)}">${title}</a></li>`).join("\n")
    return "<ul>\n" + listItems + "</ul>"
}

const parseMarkdownFile = filename => {
    const html = converter.makeHtml(fs.readFileSync(filename).toString())
    const metadata = converter.getMetadata(true).split('\n')
    const title = getMetadata(metadata, 'title')
    const newPath = path.join(path.dirname(filename), (title.toLowerCase().replaceAll(" ","-")+".html"))
    const date = getMetadata(metadata, 'date')
    return [html, title, newPath, date]
}

const getMetadata = (data,key) => data.filter(i=>i.toLocaleLowerCase().substring(0,key.length)==key).map(i=>i.substring(i.indexOf(":")+1).trim())[0]

main()
