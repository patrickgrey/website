(() => {
    const container = document.querySelector(`header .pg-profile-container>div.pg-profile-container-inner`);
    const profileTop = container.querySelector(`div.pg-profile-image-top`);
    const profileBottom = container.querySelector(`div.pg-profile-image-bottom`);
    const profileSVG = container.querySelector(`svg`);

    const specs1 = profileSVG.querySelector(`#specs-1`);
    const tash1 = profileSVG.querySelector(`#tash-1`);
    const beard1 = profileSVG.querySelector(`#beard-1`);
    const hat1 = profileSVG.querySelector(`#hat-1`);

    const bodyStyles = window.getComputedStyle(document.body);
    const blue = bodyStyles.getPropertyValue('--pg-colour-blue');
    const pink = bodyStyles.getPropertyValue('--pg-colour-pink');
    const darkGrey = bodyStyles.getPropertyValue('--pg-colour-dark-grey');

    const colourArray = [blue, pink, "black"]


    function pickDisguise() {
        const partsArray = [specs1, tash1, beard1, hat1]
        let chosenCount = 0
        partsArray.forEach(item => {
            item.style.display = "none"
            if (Math.round(Math.random()) === 1) {
                chosenCount++
                item.style.display = "block"
            }
        })

        const colour = colourArray[Math.floor(Math.random() * colourArray.length)]
        profileSVG.style.color = colour


        if (chosenCount === 0) {
            let random = Math.floor(Math.random() * partsArray.length)
            let item = partsArray[random]
            item.style.display = "block"
        }
    }

    function initProfile() {
        profileTop?.addEventListener("transitionend", (event) => {
            // console.log("event: ", event.target);
            const top = event.target
            // console.log("profileTop: ", top.getBoundingClientRect());
            // console.log("profileBottom: ", profileBottom.getBoundingClientRect());

            if (
                profileTop.getBoundingClientRect().x <= (profileBottom.getBoundingClientRect().x + 10)
                &&
                profileTop.getBoundingClientRect().x >= (profileBottom.getBoundingClientRect().x - 10)
            ) {
                pickDisguise()
            }

        })
    }

    function init() {
        initProfile()
    }

    init()
})();