let contentContainer = document.getElementById("contentContainer")
let titleContainer = document.getElementById("header-title")
const HOME = "home";

function populateHome() {
    let theList = document.getElementById("theList")
    console.log(window.gotchas)
    window.gotchas.forEach(gotcha => {
        if (gotcha.id != HOME)
            theList.innerHTML += `
        <li><a href="#${gotcha.id}">${gotcha.name}</a></li>
    `})
}

async function fetchData() {
    return await (await fetch("data/gotchas.json")).json()
}

async function displayNewContent() {
    if (!window.gotchas)
        window.gotchas = await fetchData()
    const reaquestId = window.location.hash ? window.location.hash.substr(1) : HOME
    if (!window.gotchas.filter(gotcha => gotcha.id === reaquestId).length)
        reaquestId = HOME
    const gotcha = window.gotchas.find(gotcha => gotcha.id === reaquestId);
    const content = await (await fetch(`contents/${gotcha.id}.${gotcha.isMarkdown ? "md" : "html"}`)).text()
    contentContainer.innerHTML = gotcha.isMarkdown ? marked(content) : content
    window.document.title = `Gotchas - ${gotcha.name}`;
    titleContainer.innerText = reaquestId === HOME ? "Things to learn or recall" : gotcha.name
    if (reaquestId === HOME)
        populateHome()
}

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, lang, callback) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext'
        return hljs.highlight(code, { language }).value
    },
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false

})
window.onhashchange = displayNewContent
displayNewContent()
