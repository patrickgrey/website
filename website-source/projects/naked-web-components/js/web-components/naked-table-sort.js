/**
 * @class NakedTableSort
 * @classdesc This component converts the text of a table header into a button
 * that will sort the contents of its column. Hidden caption text is added
 * to the table to assist screen readers. The button will automatically
 * sort table cells with plain text. Data attributes can be added to the component
 * to alter the sorting.
 * 
 * @version 1.0.0
 * @license https://patrickgrey.co.uk/projects/naked-web-components/LICENCE/
 * 
 * @property {string} data-sort-order - indicate if the column is already sorted. Possible values: a-z or z-a.
 * @property {string}  data-text-find - If the text you want to sort is nested in the table cell, tell the component where to find the text using a selector e.g. " > div > span"
 * @property {string}  data-table - a selector to help find the current table. "table" is the default but that will only return the first table if there are multiple tables in the document. Example: "table#tableOne"
 * @property {number}  data-column-index - set the button to search another column. Example: "5" (nth-child(5))
 * 
 * @author Patrick Grey
 * @example <th><naked-table-sort>Column title text</naked-table-sort></th>
 * 
 * @see https://adrianroselli.com/2021/04/sortable-table-columns.html
 * 
 */
export default class NakedTableSort extends HTMLElement {

    #SORT_A_Z = "a-z"
    #SORT_Z_A = "z-a"
    #sortOrder = ""
    #button = null
    #th = null
    #table = null
    #columnIndex = null
    #textFind = ""
    #conversion = null
    #isReady = false
    #controller // An abort controller to allow multiple listeners to be removed at once

    static register(tagName) {
        if ("customElements" in window) {
            customElements.define(tagName || "naked-table-sort", NakedTableSort);
        }
    }


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

    /**
    * @function init Initiate class properties and build component.
    */
    #init() {
        this.#controller = new AbortController();
        this.#isReady = true
        if (this.dataset.table) {
            // this.#tableFind = this.dataset.table
            this.#table = document.querySelector(this.dataset.table)
        } else {
            this.#table = this.closest("table")
        }

        if (!this.#table) {
            return console.warn("A table could not be found.")
        }

        if (this.dataset.columnIndex) {
            this.#columnIndex = this.dataset.columnIndex
            this.#th = this.#table.querySelector(`th:nth-child(${this.#columnIndex})`)
        } else {
            this.#th = this.closest("th")
        }

        //If column index hasn't been provided, see if we can detect it 
        if (!this.#columnIndex && this.#th) {
            if (this.#th != -1) this.#columnIndex = this.#th.cellIndex + 1
        }

        if (!this.#th) {
            return console.warn("A column to sort on could not be found.")
        }


        if (this.dataset.sortOrder) this.#sortOrder = this.dataset.sortOrder
        if (this.#th && this.#sortOrder != "") {
            const ariaSort = this.sortOrder === this.#SORT_A_Z ? "ascending" : "descending"
            this.#th.setAttribute("aria-sort", ariaSort)
        }

        if (this.dataset.textFind) this.#textFind = this.dataset.textFind

        this.#emit('get-conversion');

        if (this.querySelector(`button, a`)) {
            const button = this.querySelector(`button, a`)
            const originalText = button.textContent
            this.#createButton(originalText, button)
        } else {
            const originalText = this.textContent
            this.textContent = ""
            this.#createButton(originalText)
        }

        this.#addCaption()
        // Listen for other sort buttons and remove sort order attribute
        this.#table.addEventListener("naked-table-sort:sort-clicked", (event) => {
            if (event.target != this) {
                this.sortOrder = "";
                this.button.setAttribute("data-sort", this.sortOrder)
                this.#th.removeAttribute("aria-sort")
            }
        }, {
            signal: this.#controller.signal
        })
    }

    /**
     * @function connectedCallback Bulletproofing web component loading: https://gomakethings.com/bulletproof-web-component-loading/ Ensure component works even if script loaded in head without defer.
     */
    connectedCallback() {
        if (document.readyState !== 'loading') {
            this.#init();
            return;
        }
        document.addEventListener('DOMContentLoaded', () => { this.init() }, {
            signal: this.#controller.signal
        });
    }

    /**
    * @function disconnectedCallback Tidy up when component is removed
    */
    disconnectedCallback() {
        this.#controller.abort();
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

    /**
    * @function isReady 'getter' provide a public ready property on the class for external checking.
    */
    get isReady() {
        return this.#isReady
    }

    /**
     * @function Add a hidden table caption with screen reader guidance to the table. If a caption already exists, add hidden text within that caption.
     */
    #addCaption() {
        if (this.#table) {
            // Check for an existing caption. If no caption, create a hidden one. If one exists, assume it could be visible so add hidden spans to it.
            const captionText = "Use column header buttons to sort"

            if (!this.#table.querySelector("caption")) {
                const caption = document.createElement("caption")
                this.#visuallyHideElement(caption)
                caption.textContent = captionText
                caption.setAttribute("data-sort-caption-added", "")
                this.#table.prepend(caption)
            } else {
                const caption = this.#table.querySelector("caption")
                // check if span has already been added
                if (!caption.querySelector("span[data-sort-caption]") && !caption.hasAttribute("data-sort-caption-added")) {
                    const span = document.createElement("span")
                    span.setAttribute("data-sort-caption", "")
                    this.#visuallyHideElement(span)
                    span.textContent = captionText
                    caption.append(span)
                }
            }
        }
    }

    /**
     * @function setConversion connectedCallback #emits a custom event. When external code detects that event,
     * this function can be called to pass in a conversion function. The conversion function
     * will be applied to data before it is sorted. This allows for more flexible searching.
     * @param  {function} conversion a function used to prepare text before comparison for sorting
     * @see compare
    */
    setConversion(conversion) {
        this.#conversion = conversion
    }

    /**
     * @function compare Compare function to sort an array of rows.
     *
     * @param {object} _this passing class reference as arrow function didn't work.
     * @param {number} cellIndex The nth child cell of the row.
     * @param {string} query The query to target the text to sort in a cell.
     * @param {string} sortOrder The order or sorting :-)
     * @param {function} conversion A function applied to the sorted text
     * @return {boolean} The result of the sort comparison.
     */
    #compare(_this, cellIndex, sortOrder, query, conversion) {
        return function (rowA, rowB) {

            let textA = rowA.querySelector(`td:nth-child(${cellIndex}) ${query}`)?.textContent || ""
            let textB = rowB.querySelector(`td:nth-child(${cellIndex}) ${query}`)?.textContent || ""

            if (conversion) {
                const convertedText = conversion(textA, textB);
                textA = convertedText.newA
                textB = convertedText.newB
            }

            textA = textA.replaceAll(" ", "")
            textB = textB.replaceAll(" ", "")

            if (!textA) textA = "ZZZZZZZZ";
            if (!textB) textB = "ZZZZZZZZ";

            // sort null last
            // if (textA === "" && textB !== "") {
            //     return -1
            // }
            // if (textB === "" && textA !== "") {
            //     return 1
            // }

            if (sortOrder === _this.#SORT_A_Z) {
                return textA.localeCompare(textB);
            }
            else {
                return textB.localeCompare(textA);
            }
        }
    }

    /**
     * @function sortTable table rows on given cell target and sort order.
     *
     * @param {HTMLTableElement} table The table element to sort.
     * @param {number} columnIndex nth-child of <td>s to be sorted.
     * @param {string} sortOrder The order of sorting.
     * @param {string} query The query to target the text to sort in a cell.
     * @param {function} [conversion] (optional) A function to adapt the sortable text before sorting.
     * @return {HTMLTableElement} The table element with tbody element sorted.
     */
    #sortTable(table, columnIndex, sortOrder, query = "", conversion = null) {
        const tbodyOriginal = this.#table.querySelector("tbody")
        const tbodyClone = document.createElement("tbody")
        const rows = Array.from(tbodyOriginal.rows)
        rows.sort(this.#compare(this, columnIndex, sortOrder, query, conversion))
        tbodyClone.append(...rows)
        table.replaceChild(tbodyClone, tbodyOriginal)
    }

    /**
     * @function Create a button with the original cell text.
     * @param {String} text Text for the button.
     * @param {element} _button a button to be passed or if empty, one will be created.
     */
    #createButton(text, _button = null) {
        const button = _button ? _button : document.createElement("button")
        button.textContent = text
        // button.setAttribute("aria-label", `Sort the ${text} column`)
        if (this.sortOrder) {
            button.setAttribute("data-sort", this.sortOrder)
        } else {
            button.setAttribute("data-sort", "")
        }
        button.addEventListener("click", (event) => {
            event.preventDefault()
            this.#toggleSortOrder()
            this.#sortTable(this.#table, this.#columnIndex, this.#sortOrder, this.#textFind, this.#conversion)
            this.#emit('sort-clicked');
        }, {
            signal: this.#controller.signal
        });
        this.append(button)
        this.#button = button
    }

    /**
     * @function toggleSortOrder Toggle the sort order property and button data attribute.
     */
    #toggleSortOrder() {
        if (this.sortOrder === "") this.sortOrder = this.#SORT_Z_A;
        this.sortOrder = this.sortOrder === this.#SORT_A_Z ? this.#SORT_Z_A : this.#SORT_A_Z
        this.button.setAttribute("data-sort", this.sortOrder)
        const ariaSort = this.sortOrder === this.#SORT_A_Z ? "ascending" : "descending"
        this.#th.setAttribute("aria-sort", ariaSort)
    }

    /**
     * Public getters and setters.
     */

    get button() {
        return this.#button
    }

    get sortOrder() {
        return this.#sortOrder
    }

    set sortOrder(value) {
        this.#sortOrder = value
    }
}

NakedTableSort.register();