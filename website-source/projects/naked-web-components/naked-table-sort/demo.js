const convertMe = document.querySelector(`#convertMe`);

function removePhrases(textA, textB) {
    let newA = textA.replaceAll("A plate of ", "")
    newA = newA.replaceAll("A hipster slate of ", "")
    newA = newA.replaceAll("A chip wrapper of ", "")
    newA = newA.replaceAll("A bowl of ", "")
    let newB = textB.replaceAll("A plate of ", "")
    newB = newB.replaceAll("A hipster slate of ", "")
    newB = newB.replaceAll("A chip wrapper of ", "")
    newB = newB.replaceAll("A bowl of ", "")
    return { newA, newB }
}

convertMe.addEventListener("naked-table-sort:get-conversion", (event) => {
    convertMe.setConversion(removePhrases)
})
