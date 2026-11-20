let countries
let liveRegion
let countriesCopy = []

/**
    * @function visuallyHideElement Decorate the styles of an element to make it visually hidden.
    * @param  {element} element The element to be decorated
    */
function visuallyHideElement(element) {
    element.style.position = "absolute"
    element.style.top = "auto"
    element.style.overflow = "hidden"
    element.style.clip = "rect(1px, 1px, 1px, 1px)"
    element.style.width = "1px"
    element.style.height = "1px"
    element.style.whiteSpace = "nowrap"
}

async function getJSON(url) {
    const response = await fetch(url)
    return await response.json();
}

function getRandomCountry() {
    const random = Math.floor(Math.random() * countriesCopy.length)
    const country = countriesCopy.splice(random, 1)[0]
    if (countriesCopy.length === 0) {
        countriesCopy = [...countries]
    }
    return country
}

function handleNext() {
    const country = document.querySelector(`p[data-country]`)
    const capital = document.querySelector(`p[data-capital]`)
    const flag = document.querySelector(`img[data-flag]`)
    const randomCountry = getRandomCountry()
    country.textContent = randomCountry.country
    capital.textContent = (randomCountry.capital) ? randomCountry.capital : "Tricked ya! This country has no capital!"
    capital.style.display = "none"
    flag.src = `./images/country-4x3/${randomCountry.code?.toLowerCase()}.svg`
    flag.alt = randomCountry.country
    liveRegion.textContent = `What is the Capital of ${randomCountry.country}?`
    console.log("randomCountry: ", randomCountry)
}

function showAnswer() {
    const country = document.querySelector(`p[data-country]`)
    const capital = document.querySelector(`p[data-capital]`)
    capital.style.display = "block"
    liveRegion.textContent = `The Capital of ${country.textContent} is ${capital.textContent}`
}

function initUI() {
    const next = document.querySelector(`button[data-next]`)
    const reveal = document.querySelector(`button[data-reveal]`)

    next.addEventListener("click", (event) => {
        handleNext()
    })

    reveal.addEventListener("click", (event) => {
        showAnswer()
    })
}

function initShortcuts() {
    document.addEventListener("keydown", function (event) {
        if (event.code === `KeyN`) {
            handleNext()
        } else if (event.code === `KeyS`) {
            showAnswer()
        }
    })
}

/**
   * @function addLiveRegion If required.
   */
function addLiveRegion() {
    liveRegion = document.createElement("span")
    liveRegion.dataset.liveRegion = ""
    liveRegion.setAttribute("aria-live", "polite")
    visuallyHideElement(liveRegion)
    document.body.append(liveRegion)
}

async function init() {
    const countries = await getJSON(`./countryCapitalISOLetterCodes.json`)
    // countries = json.countries
    countriesCopy = [...countries]

    /*Build JSON from other files*/
    // const jsonCapitals = await getJSON(`./country-by-capital-city.json`)
    // const jsonISONumber = await getJSON(`./country-by-iso-numeric.json`)
    // const jsonISOLetter = await getJSON(`./ISO-3166-ID-SHORT-NUM.json`)
    // let jsonCapitalsArray = Array.from(jsonCapitals)
    // let jsonISONumberArray = Array.from(jsonISONumber)
    // jsonCapitalsArray.forEach(countryObject => {
    //     const foundCountry = jsonISONumberArray.find(x => x.country === countryObject.country)
    //     const isoNumber = foundCountry?.iso?.toString()
    //     if (isoNumber) {
    //         const padNumber = isoNumber.padStart(3, "0")
    //         const isoCountry = jsonISOLetter[padNumber]
    //         countryObject.code = isoCountry?.alpha2
    //     }
    // });

    // console.log("jsonCapitalsArray: ", JSON.stringify(jsonCapitalsArray));
    /*Build JSON from other files*/

    addLiveRegion()
    initUI()
    handleNext()
    initShortcuts()
}

(document.readyState === 'complete') ? init() : window.addEventListener("load", (event) => { init() })
