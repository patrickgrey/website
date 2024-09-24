(function () {

    let isZoom = false;
    const headerPhoto = document.querySelector(`img[data-id="headerPhoto"]`);

    function initZoomButton() {
        const photoMagnify = document.querySelector(`button[data-id="photoMagnify"]`);
        photoMagnify.addEventListener("click", function (event) {
            isZoom = !isZoom;
            headerPhoto.style.objectFit = isZoom ? "contain" : "cover";
        })
    }

    function init() {
        initZoomButton()
    }

    init()


})();