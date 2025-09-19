const pgDateSorter = document.querySelector(`#pgDateSorter`);

function reverseDate(textA, textB) {
    let newA = textA.split('-').reverse().join('-');
    let newB = textB.split('-').reverse().join('-');
    return { newA, newB }
}

pgDateSorter.addEventListener("naked-table-sort:get-conversion", (event) => {
    console.log("Adding conversion");
    pgDateSorter.setConversion(reverseDate)
})

const toggle = document.querySelector(`[data-style-toggle]`)
const stylesheetSticky = document.querySelector(`[data-demo-sticky]`)
const stylesheetSort = document.querySelector(`[data-demo-sort]`)
const stylesheetFilter = document.querySelector(`[data-demo-filter]`)
const demoStylesSticky = "./css/web-components/naked-sticky-overflow.css"
const demoStylesSort = "./css/web-components/naked-table-sort.css"
const demoStylesFilter = "./css/web-components/naked-filter.css"
const originalHref = stylesheetSticky.href
toggle.addEventListener("click", (event) => {
    if (stylesheetSticky.href === originalHref) {
        stylesheetSticky.href = demoStylesSticky
        stylesheetSort.href = demoStylesSort
        stylesheetFilter.href = demoStylesFilter
    } else {
        stylesheetSticky.href = originalHref
        stylesheetSort.href = originalHref
        stylesheetFilter.href = originalHref
    }
})

setTimeout(() => {
    document.querySelectorAll(`naked-table-sort > button`).forEach(button => {
        button.dataset.sort = ""
    })

}, 50)

const clear = document.querySelector(`button[data-clear-filters]`)
clear.addEventListener("click", (event) => {
    document.querySelectorAll(`naked-filter`).forEach(nakedFilter => {
        //         const input = nakedFilter.querySelector(`:scope >div> input`)
        //         if (input) input.value = ""
        //         const select = nakedFilter.querySelector(`:scope >div> select`)
        //         if (select) select.value = "all"
        nakedFilter.showAllItems()
    })
})