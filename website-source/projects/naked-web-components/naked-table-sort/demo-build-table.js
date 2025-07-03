// This file is not required for the web component. I use it to dynamically create a large table full of dummy date (including blanks), which I then copy to the HTML page so it works without javascript.

// First Name
// Surname
// Tartan
// Scran

const rowCount = 200

const names = [
    "Ailean",
    "Angus",
    "Alasdair",
    "Archie",
    "Agnes",
    "Donaldina",
    "Eilidh",
    "Iseabail",
    "Islay",
    "Salwa",
    "Ilham",
    "Jamila",
    "Hasan",
    "Mahmoud",
    "Courvoisier",
    "Boniface",
    "Dominique",
    "Claudette",
    "Dieter",
    "Heidi",
    "Damerae",
    "Ajani",
    "Cedella",
    "Abigay",
    "",
    "",
    "",
    ""
]

const tartans = [
    { "name": "Clan McYellow", "image": "MacLachlan_tartan_(Vestiarium_Scoticum).svg" },
    { "name": "Clan McGreen", "image": "Gunn_tartan_(Vestiarium_Scoticum).svg" },
    { "name": "Clan McRed", "image": "Brodie_tartan_(Vestiarium_Scoticum).svg" },
    { "name": "", "image": "icon-no-image.svg" }
]

const scranContainers = [
    "A bowl of",
    "A plate of",
    "A chip wrapper of",
    "A hipster slate of",
    "",
]

const scrans = [
    "Porridge",
    "Kebab",
    "Chips",
    "Haggis",
    "",
]

function buildTable() {
    const tbody = document.querySelector("tbody")
    for (let index = 0; index < rowCount; index++) {
        const name = names[Math.floor(Math.random() * names.length)]
        const tartan = tartans[Math.floor(Math.random() * tartans.length)]
        const scranContainer = scranContainers[Math.floor(Math.random() * scranContainers.length)]
        const scran = scrans[Math.floor(Math.random() * scrans.length)]

        const tr = document.createElement("tr")
        const tdName = document.createElement("td")
        const tdTartan = document.createElement("td")
        const tdScran = document.createElement("td")

        const tartanDiv = document.createElement("div")
        const tartanSpan1 = document.createElement("span")
        const tartanSpan2 = document.createElement("span")
        const tartanImg = document.createElement("img")
        tartanDiv.style.display = "flex"
        tartanDiv.style.gap = "1em"
        tartanImg.src = `./images/${tartan.image}`
        tartanImg.style.maxWidth = "1em"
        tartanSpan1.append(tartanImg)
        tartanSpan2.textContent = tartan.name
        tartanDiv.append(tartanSpan1)
        tartanDiv.append(tartanSpan2)

        tdName.textContent = name
        tdTartan.append(tartanDiv)
        tdScran.innerHTML = `${scranContainer} <strong>${scran}</strong>`

        tr.append(tdName)
        tr.append(tdTartan)
        tr.append(tdScran)
        tbody.append(tr)
    }
}

buildTable()