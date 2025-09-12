/**
 * @class NakedFilter
 * @classdesc Shows and hides things depending on your humans input. Works with other naked-filter components. V2.0.0 Improves the default size of the elements and adds a liveregion for what has been filtered.
 * 
 * @version 2.0.0
 * @license https://patrickgrey.co.uk/projects/naked-web-components/LICENCE/
 * 
 * @property {string} data-items-selector - A selector string to get all examples of the items you want to filter.
 * @property {string} data-item-text-selector - A selector string to get the text inside the items you want to filter.
 * @property {string} data-display-type - the style.display value when showing an item. Defaults to "table-row" as I think this component will be used most often on tables. Useful when filtering a table or inline elements.
 * @property {string} data-type - ["input", "select"] The type of UI element to filter with. Defaults to "input".
 * @property {string} data-label - Will be the text used for the filter element label. If left out, there will be no label and that isn't good for accessibility
 * 
 * @author Patrick Grey
 * @example <th><naked-filter data-items-selector="tbody>tr"  data-text-selector="tbody>tr>td:nth-child(2)>span" data-filter-type="select"></naked-filter></th>
 * 
 * @see Credits People who helped
 * 
 */

export default class NakedFilter extends HTMLElement {

    #isReady = false
    #controller // An abort controller to allow multiple listeners to be removed at once
    #items
    #textSelector = ""
    #model = []
    #displayType = "table-row"
    #elementType = "input"
    #element
    #labelText = ""
    #label
    #EMPTY = "empty"
    #ALL = "all"
    #SELECT = "select"
    #INPUT = "input"

    static register(tagName) {
        if ("customElements" in window) {
            customElements.define(tagName || "naked-filter", NakedFilter)
        }
    }

    /*
    EVENT HANDLERS
    */

    /**
    * @function handleChange Handle input value changes.
    */
    #handleChange(event) {
        //This works as only one component will run show all
        this.showAllItems()
        this.#emit('change');
    }

    /*
    EVENT HANDLERS END
    */

    /*
    GENERAL FUNCTIONS
    */

    /**
    * @function addElemenet Create and return input element.
    */
    #addElemenet() {
        let element
        if (this.#elementType === this.#INPUT) {
            element = document.createElement("input")
            element.type = "text"
        } else {
            element = document.createElement("select")
        }
        return element
    }

    /**
    * @function addLabel Create and return a label. Text is wrapped in a span for styling
    */
    #addLabel() {
        const label = document.createElement("label")
        const span = document.createElement("span")
        span.textContent = this.#labelText
        label.append(span)
        return label
    }

    /**
    * @function buildSelect Build unique select options based on text in items
    */
    #buildSelect() {
        let tempArray = []
        this.#model.forEach(item => {
            tempArray.push(item.text)
        })
        const optionsArray = new Set(tempArray)
        optionsArray.forEach(text => {
            const option = document.createElement("option")
            option.text = option.value = text === "" ? this.#EMPTY : text
            this.#element.append(option)
        })
    }

    /**
    * @function showAllItems Public reset to show all items
    */
    showAllItems() {
        this.#model.forEach(itemObject => {
            itemObject.item.style.display = this.#displayType
        })
    }


    /**
    * @function addLiveRegion If required.
    */
    #addLiveRegion() {
        if (!document.querySelector(`p[data-naked-filter-live]`)) {
            const p = document.createElement("p")
            p.setAttribute("data-naked-filter-live", "")
            p.setAttribute("aria-live", "polite")
            this.#visuallyHideElement(p)
            document.body.append(p)
        }
    }

    /**
    * @function announceFilter Screen readers announce that filter occured.
    */
    #announceFilter() {
        const live = document.querySelector(`p[data-naked-filter-live]`)
        live.textContent = `${this.#labelText} filtered`

        setTimeout(() => {
            live.textContent = "";
        }, 1000)
    }

    /**
    * @function runFilter Loop over each item and check if should be hidden
    * @param  {String} searchTerm The term to er search for.
    */
    #runFilter(searchTerm) {
        this.#model.forEach(itemObject => {
            const fullText = this.#getItemText(itemObject.item).toLowerCase()
            if (searchTerm != this.#EMPTY) {
                if (!fullText.includes(searchTerm.toLowerCase())) itemObject.item.style.display = "none"
            } else {
                if (fullText != "") itemObject.item.style.display = "none"
            }
        })

        this.#announceFilter()
    }

    /**
    * @function getItemText Get the text from an item using the text selector if it exists
    * @param  {Element} item The term to extract text from.
    */
    #getItemText(item) {
        return this.#textSelector != "" ? item.querySelector(this.#textSelector).textContent.trim() : item.textContent.trim()
    }

    /**
    * @function init Initiate class properties and build component.
    */
    #init() {
        this.#controller = new AbortController()
        this.#isReady = true

        if (this.dataset.label) this.#labelText = this.dataset.label
        if (this.dataset.displayType) this.#displayType = this.dataset.displayType
        if (this.dataset.itemsSelector) this.#items = Array.from(document.querySelectorAll(this.dataset.itemsSelector))
        if (!this.#items) return console.warn("No filterable items were found.")

        this.#textSelector = (this.dataset.itemTextSelector) ? this.dataset.itemTextSelector : ""

        this.#items.forEach(item => {
            const text = this.#getItemText(item)
            this.#model.push({ item, text })
        })
        // console.log("this.#model: ", this.#model);

        if (this.dataset.filterType) {
            if (this.dataset.filterType === this.#SELECT) this.#elementType = this.#SELECT
        }

        this.#addLiveRegion()

        const dynamicID = window.crypto.randomUUID();
        this.#element = this.#addElemenet()
        this.#element.id = dynamicID
        this.#element.style.fontSize = "inherit"
        this.#element.style.minHeight = "42px"

        if (this.#labelText != "") {
            this.#label = this.#addLabel()
            this.#label.setAttribute("for", dynamicID)
            this.append(this.#label)
        }
        const div = document.createElement("div")
        div.append(this.#element)
        this.append(div)


        if (this.#elementType === this.#SELECT) {
            const option = document.createElement("option")
            option.text = "Show all"
            option.value = this.#ALL
            this.#element.append(option)
            this.#buildSelect()
        }

        this.#element.addEventListener("input", (event) => { this.#handleChange(event) })
        this.#element.addEventListener("keyup", (event) => { this.#handleChange(event) })


        document.addEventListener("naked-filter:change", (event) => {
            const searchTerm = this.#element.value
            if (this.#elementType === this.#INPUT) {
                if (searchTerm != "") this.#runFilter(searchTerm)
            } else if (this.#elementType === this.#SELECT) {
                if (searchTerm != this.#ALL) this.#runFilter(searchTerm)
            }
        }, {
            signal: this.#controller.signal
        })
    }

    /*
    GENERAL FUNCTIONS END
    */

    /**
     * @function connectedCallback Bulletproofing web component loading: https://gomakethings.com/bulletproof-web-component-loading/ Ensure component works even if script loaded in head without defer.
     */
    connectedCallback() {
        if (document.readyState !== 'loading') {
            this.#init()
            return
        }
        document.addEventListener('DOMContentLoaded', () => { this.init() }, {
            signal: this.#controller.signal
        });
    }

    /**
    * @function disconnectedCallback Tidy up when component is removed.
    */
    disconnectedCallback() {
        this.#controller.abort()
    }



    /*
    GETS
    */

    /**
    * @function isReady 'getter' provide a public ready property on the class for external checking.
    */
    get isReady() {
        return this.#isReady
    }

    /*
    GETS END
    */

    /*
    UTILS
    */

    /**
     * @function emit Emit a custom event
     * @param  {String} type   The event name suffix
     * @param  {Object} detail Details to include with the event
     */
    #emit(type, detail = {}) {

        // Create a new event
        let event = new CustomEvent(`naked-filter:${type}`, {
            bubbles: true,
            cancelable: true,
            detail: detail
        });

        // Dispatch the event
        return this.dispatchEvent(event);
    }

    /**
     * @function visuallyHideElement Decorate the styles of an element to make it visually hidden.
     * @param  {element} element The element to be decorated
     */
    #visuallyHideElement(element) {
        element.style.position = "absolute"
        element.style.top = "auto"
        element.style.overflow = "hidden"
        element.style.clip = "rect(1px, 1px, 1px, 1px)"
        element.style.width = "1px"
        element.style.height = "1px"
        element.style.whiteSpace = "nowrap"
    }

    /*
    UTILS END
    */


}

NakedFilter.register();