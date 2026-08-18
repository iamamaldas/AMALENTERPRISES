/* ==========================================
   AMAL ENTERPRISES
   Mobile Screen Force Fix
   Theme & Design Unchanged
========================================== */

(function () {

    function applyMobileFix() {

        /* Detect real mobile screen */
        if (window.screen.width <= 600) {

            /* Add mobile class */
            document.documentElement.classList.add("force-mobile");

            /* Set mobile viewport */
            let viewport = document.querySelector(
                'meta[name="viewport"]'
            );

            if (!viewport) {
                viewport = document.createElement("meta");
                viewport.name = "viewport";
                document.head.appendChild(viewport);
            }

            viewport.setAttribute(
                "content",
                "width=device-width, initial-scale=1.0"
            );

            /* Mobile CSS */
            if (!document.getElementById("force-mobile-style")) {

                const style = document.createElement("style");

                style.id = "force-mobile-style";

                style.textContent = `
                    html.force-mobile,
                    html.force-mobile body {
                        width: 100% !important;
                        min-width: 0 !important;
                        max-width: 100% !important;
                        overflow-x: hidden !important;
                    }

                    html.force-mobile body {
                        margin: 0 !important;
                    }

                    html.force-mobile img,
                    html.force-mobile video,
                    html.force-mobile iframe {
                        max-width: 100% !important;
                    }
                `;

                document.head.appendChild(style);
            }
        }
    }

    applyMobileFix();

    window.addEventListener("resize", applyMobileFix);

})();
