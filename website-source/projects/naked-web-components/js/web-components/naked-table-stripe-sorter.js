/**
 * @class NakedTableStripeSorter
 * @classdesc If a table has alternating table row colours, when it is filtered, the alternation can get messed up. As far as I know, we cannot fix this with CSS (yet) so this component listens for changes in the tbody trs and reapplies user specified classes to each visible row.
 * 
 * @version 1.0.0
 * @license https://patrickgrey.co.uk/projects/naked-web-components/LICENCE/
 * 
 * @property {string} data-class-odd - the class to be applied to odd rows.
 * @property {string} data-class-even - the class to be applied to even rows.
 * 
 * @author Patrick Grey
 * @example <naked-table-stripe-sorter><table></table></naked-table-stripe-sorter>
 * 
 * 
 */

export default class NakedTableStripeSorter extends HTMLElement {

    #isReady = false
    #controller // An abort controller to allow multiple listeners to be removed at once
    #observer
    #isStyling = false
    #tbody
    #classOdd
    #classEven

    static register(tagName) {
        if ("customElements" in window) {
            customElements.define(tagName || "naked-table-stripe-sorter", NakedTableStripeSorter)
        }
    }

    /*
    EVENT HANDLERS
    */

    /*
    EVENT HANDLERS END
    */

    /*
    PUBLIC FUNCTIONS
    */

    /*
    PUBLIC FUNCTIONS END
    */
    setStyles() {
        let rowIndex = 1
        this.#tbody.querySelectorAll(`tr:not([style*="none"])`).forEach(tr => {
            tr.classList.remove(this.#classOdd)
            tr.classList.remove(this.#classEven)
            const isEven = (rowIndex % 2 === 0)
            rowIndex++
            const classString = isEven ? this.#classOdd : this.#classEven
            tr.classList.add(classString)
        })
        this.#observer.observe(this.#tbody, { subtree: true, attributes: true })
    }

    /*
    PRIVATE FUNCTIONS
    */

    /**
    * @function mutationCallback React to observer changes.
    */
    #mutationCallback = (mutationList, observer) => {
        this.#observer.disconnect()
        this.setStyles()
    }

    /**
    * @function init Initiate class properties and build component.
    */
    #init() {
        this.#controller = new AbortController()
        this.#isReady = true

        if (!this.dataset.classOdd || !this.dataset.classEven) return console.warn("The data-class-odd AND data-class-even attributes are required for the <naked-table-stripe-sorter> component.")

        this.#tbody = this.querySelector(`tbody`)
        if (!this.#tbody) return console.warn("A tbody element is required in your table (as is a table!)")

        this.#classOdd = this.dataset.classOdd
        this.#classEven = this.dataset.classEven

        this.#observer = new MutationObserver(this.#mutationCallback)
        this.#observer.observe(this.#tbody, { subtree: true, attributes: true })
    }

    /*
    PRIVATE FUNCTIONS END
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
        let event = new CustomEvent(`naked-table-sort:${type}`, {
            bubbles: true,
            cancelable: true,
            detail: detail
        });

        // Dispatch the event
        return this.dispatchEvent(event);
    }

    /*
    UTILS END
    */
}

NakedTableStripeSorter.register();