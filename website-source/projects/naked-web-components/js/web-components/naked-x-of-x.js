/**
 * @class NakedXOfX
 * @classdesc Provides a count of visible items in the format: "[visible count] of [total count]". Items are selected using a selector. If an item's display = "none", it is part of the total but not part of the count. So, a table with 10 rows and 4 rows are display: "none", the output will be "<span>6</span> of <span>10</span>".
 * 
 * @version 1.0.0
 * @license https://patrickgrey.co.uk/projects/naked-web-components/LICENCE/
 * 
 * @property {string} data-item-selector - the items to count.
 * @property {boolean} data-has-span - whether to wrap the numbers in <span>s for styling purposes. Defaults to true.
 * 
 * @author Patrick Grey
 * @example <th><naked-x-of-x>Column title text</naked-x-of-x></th>
 * 
 */

export default class NakedXOfX extends HTMLElement {

    #isReady = false
    #controller // An abort controller to allow multiple listeners to be removed at once
    #itemSelector
    #items
    #itemsTotal
    #hasSpan = true
    #observer

    static register(tagName) {
        if ("customElements" in window) {
            customElements.define(tagName || "naked-x-of-x", NakedXOfX)
        }
    }

    /**
    * @function setText A public function to set component text.
    * @param  {html} string A string of html
    */
    setText(html) {
        this.innerHTML = html
    }

    /**
    * @function countVisible Count visible items.
    */
    #countVisible() {
        let showingCount = 0;
        this.#items.forEach(item => {
            if (item.style.display != "none") showingCount++
        })
        if (this.#hasSpan) {
            this.setText(`<span>${showingCount}</span> of <span>${this.#itemsTotal}</span>`)
        } else {
            this.setText(`${showingCount} of ${this.#itemsTotal}`)
        }
    }

    /**
    * @function mutationCallback React to observer changes.
    */
    #mutationCallback = (mutationList, observer) => {
        this.#countVisible()
    }

    /**
    * @function init Initiate class properties and build component.
    */
    #init() {
        this.#controller = new AbortController()
        this.#isReady = true

        if (!this.dataset.itemSelector) return console.warn("A data-item-selector attribute is required for the <naked-x-of-x> component.")

        this.#itemSelector = this.dataset.itemSelector
        if (this.dataset.hasSpan) this.#hasSpan = this.dataset.hasSpan

        this.#items = Array.from(document.querySelectorAll(this.#itemSelector))
        this.#itemsTotal = this.#items.length
        if (this.#itemsTotal === 0) {
            this.setText("No items found")
            return console.warn("<naked-x-of-x> component: no items were found.")
        }

        this.#observer = new MutationObserver(this.#mutationCallback)
        const config = { attributes: true }

        this.#items.forEach(item => {
            this.#observer.observe(item, { attributes: true });
        })

        this.#countVisible()
    }

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
    * @function disconnectedCallback Tidy up when component is removed
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

    /**
    * @function total 'getter' provide a the total number of items.
    */
    get total() {
        return this.#itemsTotal
    }

    /*
    GETS END
    */
}

NakedXOfX.register();