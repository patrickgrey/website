/**
 * @class NakedTableSort
 * @classdesc This component converts the text of a table header into a button
 * that will sort the contents of its column. Hidden caption text is added
 * to the table to assist screen readers. The button will automatically
 * sort table cells with plain text. Data attributes can be added to the component
 * to alter the sorting. The following data-attributes can be added:
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
class NakedTableSort extends HTMLElement {

    SORT_A_Z = "a-z"
    SORT_Z_A = "z-a"
    _sortOrder = ""
    _button = null
    _th = null
    _tableFind = "table"
    _table = null
    _columnIndex = null
    _textFind = ""
    _conversion = null

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
    emit(type, detail = {}) {

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
     * @description Initiate class properties and build component.
     */
    connectedCallback() {
        if (this.dataset.table) {
            this._tableFind = this.dataset.table
            this._table = document.querySelector(this._tableFind)
        } else {
            this._table = this.closest("table")
        }

        if (!this._table) {
            return console.warn("A table could not be found.")
        }

        if (this.dataset.columnIndex) {
            this._columnIndex = this.dataset.columnIndex
            this._th = document.querySelector(this._tableFind)
        } else {
            this._th = this.closest("th")
        }

        //If column index hasn't been provided, see if we can detect it 
        if (!this._columnIndex && this._th) {
            if (this._th != -1) this._columnIndex = this._th.cellIndex + 1
        }

        if (!this._th) {
            return console.warn("A column to sort on could not be found.")
        }


        if (this.dataset.sortOrder) this._sortOrder = this.dataset.sortOrder
        if (this._th && this._sortOrder != "") {
            const ariaSort = this.sortOrder === this.SORT_A_Z ? "ascending" : "descending"
            this._th.setAttribute("aria-sort", ariaSort)
        }

        if (this.dataset.columnIndex) this._columnIndex = this.dataset.columnIndex
        if (this.dataset.textFind) this._textFind = this.dataset.textFind

        this.emit('get-conversion');

        if (this.querySelector(`button, a`)) {
            const button = this.querySelector(`button, a`)
            const originalText = button.textContent
            this.createButton(originalText, button)
        } else {
            const originalText = this.textContent
            this.textContent = ""
            this.createButton(originalText)
        }




        this.addCaption()
        // Listen for other sort buttons and remove sort order attribute
        this._table.addEventListener("naked-table-sort:sort-clicked", (event) => {
            if (event.target != this) {
                this.sortOrder = "";
                this.button.setAttribute("data-sort", this.sortOrder)
                this._th.removeAttribute("aria-sort")
            }
        })
    }

    /**
     * @description Decorate the styles of an element to make it visually hidden.
     * @param  {element} element The element to be decorated
     */
    visuallyHideElement(element) {
        element.style.position = "absolute"
        element.style.top = "auto"
        element.style.overflow = "hidden"
        element.style.clip = "rect(1px, 1px, 1px, 1px)"
        element.style.width = "1px"
        element.style.height = "1px"
        element.style.whiteSpace = "nowrap"
    }

    /**
     * @description Add a hidden table caption with screen reader guidance to the table. If a caption already exists, add hidden text within that caption.
     */
    addCaption() {
        if (this._table) {
            // Check for an existing caption. If no caption, create a hidden one. If one exists, assume it could be visible so add hidden spans to it.
            const captionText = "Use column header buttons to sort"

            if (!this._table.querySelector("caption")) {
                const caption = document.createElement("caption")
                this.visuallyHideElement(caption)
                caption.textContent = captionText
                caption.setAttribute("data-sort-caption-added", "")
                this._table.prepend(caption)
            } else {
                const caption = this._table.querySelector("caption")
                // check if span has already been added
                if (!caption.querySelector("span[data-sort-caption]") && !caption.hasAttribute("data-sort-caption-added")) {
                    const span = document.createElement("span")
                    span.setAttribute("data-sort-caption", "")
                    this.visuallyHideElement(span)
                    span.textContent = captionText
                    caption.append(span)
                }
            }
        }
    }

    /**
         * @description connectedCallback emits a custom event. When external code detects that event,
         * this function can be called to pass in a conversion function. The conversion function
         * will be applied to data before it is sorted. This allows for more flexible searching.
         * @param  {function} conversion a function used to prepare text before comparison for sorting
         * @see compare
    */
    setConversion(conversion) {
        this._conversion = conversion
    }

    /**
     * @description Compare function to sort an array of rows.
     *
     * @param {object} _this passing class reference as arrow function didn't work.
     * @param {number} cellIndex The nth child cell of the row.
     * @param {string} query The query to target the text to sort in a cell.
     * @param {string} sortOrder The order or sorting :-)
     * @param {function} conversion A function applied to the sorted text
     * @return {boolean} The result of the sort comparison.
     */
    compare(_this, cellIndex, sortOrder, query, conversion) {
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

            if (sortOrder === _this.SORT_A_Z) {
                return textA.localeCompare(textB);
            }
            else {
                return textB.localeCompare(textA);
            }
        }
    }

    /**
     * @description Sorts table rows on given cell target and sort order.
     *
     * @param {HTMLTableElement} table The table element to sort.
     * @param {number} columnIndex nth-child of <td>s to be sorted.
     * @param {string} sortOrder The order of sorting.
     * @param {string} query The query to target the text to sort in a cell.
     * @param {function} [conversion] (optional) A function to adapt the sortable text before sorting.
     * @return {HTMLTableElement} The table element with tbody element sorted.
     */
    sortTable(table, columnIndex, sortOrder, query = "", conversion = null) {
        const tbodyOriginal = this._table.querySelector("tbody")
        const tbodyClone = document.createElement("tbody")
        const rows = Array.from(tbodyOriginal.rows)
        rows.sort(this.compare(this, columnIndex, sortOrder, query, conversion))
        tbodyClone.append(...rows)
        table.replaceChild(tbodyClone, tbodyOriginal)
    }

    /**
     * @description Create a button with the original cell text.
     */
    createButton(text, _button = null) {
        const button = _button ? _button : document.createElement("button")
        button.textContent = text
        button.setAttribute("aria-label", `Sort the ${text} column`)
        if (this.sortOrder) {
            button.setAttribute("data-sort", this.sortOrder)
        } else {
            button.setAttribute("data-sort", "")
        }
        button.addEventListener("click", (event) => {
            event.preventDefault()
            this.toggleSortOrder()
            this.sortTable(this._table, this._columnIndex, this._sortOrder, this._textFind, this._conversion)
            this.emit('sort-clicked');
        });
        this.append(button)
        this._button = button
    }

    /**
     * @description Toggle the sort order property and button data attribute.
     */
    toggleSortOrder() {
        if (this.sortOrder === "") this.sortOrder = this.SORT_Z_A;
        this.sortOrder = this.sortOrder === this.SORT_A_Z ? this.SORT_Z_A : this.SORT_A_Z
        this.button.setAttribute("data-sort", this.sortOrder)
        const ariaSort = this.sortOrder === this.SORT_A_Z ? "ascending" : "descending"
        this._th.setAttribute("aria-sort", ariaSort)
    }

    /**
     * Public getters and setters.
     */

    get button() {
        return this._button;
    }

    get sortOrder() {
        return this._sortOrder;
    }

    set sortOrder(value) {
        this._sortOrder = value
    }
}

NakedTableSort.register();