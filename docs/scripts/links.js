async function populateLinks() { 
    let theList = document.getElementById("theList")
    const links = await (await fetch(`data/links.json`)).json()
    links.forEach(link => { 
        theList.innerHTML += `
            <li><a target="blank" href="${link.url}">${link.description}</a></li>
        `
    })
}
populateLinks()
