(function () {

    // Vars from root:

    // imageID = int // image id number
    // altDictionary = obj{id: string alt text}
    // currentAlt = string //current alt text

    const picture = document.querySelector(`.pg-img-container > picture`);
    const source = picture.querySelector(`source`);
    const image = picture.querySelector(`img`);
    const altTextContainer = document.querySelector(`.pg-image-info-content > p`);
    const magButton = document.querySelector(`button[data-id="photoMagnify"]`);
    const svgZoomIn = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentcolor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
    <path d="M7 10l6 0" />
    <path d="M10 7l0 6" />
    <path d="M21 21l-6 -6" />
    </svg>`
    const svgZoomOut = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentcolor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
    <path d="M7 10l6 0" />
    <path d="M21 21l-6 -6" />
    </svg>`


    const filepath = `/_shared/images/header/optimised/header-`;
    const filenameArray = [
        { id: 0, name: "NwElcWcWut" },
        { id: 1, name: "6QJVUxvRil" },
        { id: 2, name: "3OEOWBJnNt" },
        { id: 3, name: "gXuGLBSXHb" },
        { id: 4, name: "XrEtwUEgUP" },
        { id: 5, name: "aYLdLHyn9e" },
        { id: 6, name: "DwQ-5ronmn" },
        { id: 7, name: "9Tbc1N6u4Z" },
        { id: 8, name: "jLb2YEjBGS" },
        { id: 9, name: "zWKsdXSRmI" },
        { id: 10, name: "1Lsm_4MP4a" },
        { id: 11, name: "HEzR2VpFSL" },
        { id: 12, name: "VkipUVT9XT" },
        { id: 13, name: "HMLD8G7g4P" },
        { id: 14, name: "Rg5flMPWJU" },
        { id: 15, name: "zAG4pYmwj9" },
        { id: 16, name: "P1sgPmppbe" },
        { id: 17, name: "iibt2i3Do3" }
    ];
    let isZoom = false;

    function updatePhoto(id) {
        const filename = filenameArray[id].name;
        const srcset = `${filepath}${id}/${filename}-600.webp 600w, ${filepath}${id}/${filename}-1000.webp 1000w, ${filepath}${id}/${filename}-2000.webp 2000w`;

        const imgSrc = `${filepath}${id}/${filename}-600.jpeg`
        currentAlt = altDictionary[id]
        const imgSrcset = `${filepath}${id}/${filename}-600.jpeg 600w, ${filepath}${id}/${filename}-1000.jpeg 1000w, ${filepath}${id}/${filename}-2000.jpeg 2000w`;

        source.setAttribute("srcset", srcset)
        image.setAttribute("src", imgSrc)
        image.setAttribute("alt", currentAlt)
        image.setAttribute("srcset", imgSrcset)
        altTextContainer.textContent = currentAlt
    }

    function previousPhoto() {
        imageID--
        if (imageID < 0) imageID = Object.keys(altDictionary).length - 1;
        updatePhoto(imageID)
    }

    function nextPhoto() {
        imageID++
        if (imageID > Object.keys(altDictionary).length - 1) imageID = 0;
        updatePhoto(imageID)
    }

    function initPhotoSteps() {
        const previous = document.querySelector(`button[aria-label="Previous image"]`);
        const next = document.querySelector(`button[aria-label="Next image"]`);
        previous.addEventListener("click", function (event) {
            previousPhoto();
        })
        next.addEventListener("click", function (event) {
            nextPhoto();
        })
    }

    function initZoomButton() {
        const photoMagnify = document.querySelector(`button[data-id="photoMagnify"]`);
        photoMagnify.addEventListener("click", function (event) {
            isZoom = !isZoom;
            image.style.objectFit = isZoom ? "contain" : "cover";
            magButton.innerHTML = isZoom ? svgZoomIn : svgZoomOut;
        })
    }

    function init() {
        initZoomButton()
        initPhotoSteps()
    }

    init()


})();