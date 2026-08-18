(function () {

    function desktopScaleFix() {

        if (window.screen.width <= 600 && window.innerWidth > 600) {

            const designWidth = 1000;
            const scale = window.innerWidth / designWidth;

            document.documentElement.style.width = designWidth + "px";

            document.body.style.width = designWidth + "px";
            document.body.style.transformOrigin = "top left";
            document.body.style.transform = "scale(" + scale + ")";
            document.body.style.margin = "0";

            /* Fill the available screen */
            document.body.style.minHeight =
                (window.innerHeight / scale) + "px";

            document.body.style.display = "flex";
            document.body.style.flexDirection = "column";

            /* Keep footer at the bottom */
            const footer = document.querySelector("footer");

            if (footer) {
                footer.style.marginTop = "auto";
            }

            function updateHeight() {

                document.body.style.minHeight =
                    (window.innerHeight / scale) + "px";

            }

            updateHeight();

            window.addEventListener("resize", updateHeight);

        } else {

            document.documentElement.style.width = "";
            document.documentElement.style.minHeight = "";

            document.body.style.width = "";
            document.body.style.transform = "";
            document.body.style.transformOrigin = "";
            document.body.style.margin = "";
            document.body.style.minHeight = "";
            document.body.style.display = "";
            document.body.style.flexDirection = "";

            const footer = document.querySelector("footer");

            if (footer) {
                footer.style.marginTop = "";
            }
        }
    }

    desktopScaleFix();

    window.addEventListener("resize", desktopScaleFix);

})();
