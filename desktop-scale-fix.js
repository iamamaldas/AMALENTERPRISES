(function () {

    function desktopScaleFix() {

        /*
         * Only activate when:
         * - Real device is a mobile phone
         * - Chrome Desktop Site is ON
         */
        if (window.screen.width <= 600 && window.innerWidth > 600) {

            const designWidth = 1000;
            const scale = window.innerWidth / designWidth;

            document.documentElement.style.width = designWidth + "px";

            document.body.style.width = designWidth + "px";
            document.body.style.transformOrigin = "top left";
            document.body.style.transform = "scale(" + scale + ")";

            document.body.style.margin = "0";

            /* Keep page height correct after scaling */
            function updateHeight() {
                const height = document.body.scrollHeight * scale;
                document.documentElement.style.minHeight = height + "px";
            }

            updateHeight();

            window.addEventListener("resize", updateHeight);

        } else {

            /* Normal mobile / normal desktop */
            document.documentElement.style.width = "";
            document.documentElement.style.minHeight = "";

            document.body.style.width = "";
            document.body.style.transform = "";
            document.body.style.transformOrigin = "";
            document.body.style.margin = "";

        }
    }

    desktopScaleFix();

    window.addEventListener("resize", desktopScaleFix);

})();
