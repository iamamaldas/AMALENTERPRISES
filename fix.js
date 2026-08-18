/* ================================
   AMAL ENTERPRISES - FIX
   No theme/layout changes
================================ */

/* Load Font Awesome */
const fa = document.createElement("link");
fa.rel = "stylesheet";
fa.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css";
document.head.appendChild(fa);


/* Remove unwanted purple underline */
const fixStyle = document.createElement("style");

fixStyle.textContent = `
h1, h2, h3, h4, h5, h6,
.section-title,
.title,
.heading,
a {
    text-decoration: none !important;
    border-bottom: none !important;
}
`;

document.head.appendChild(fixStyle);


/* Replace social media icons */
document.addEventListener("DOMContentLoaded", function () {

    const socialLinks = document.querySelectorAll(".social-links a");

    socialLinks.forEach(function (link) {

        const label = (link.getAttribute("aria-label") || "").toLowerCase();

        let icon = "";

        if (label.includes("youtube")) {
            icon = "fa-brands fa-youtube";
        }
        else if (label.includes("facebook")) {
            icon = "fa-brands fa-facebook-f";
        }
        else if (label.includes("instagram")) {
            icon = "fa-brands fa-instagram";
        }
        else if (label.includes("whatsapp")) {
            icon = "fa-brands fa-whatsapp";
        }
        else if (label.includes("linkedin")) {
            icon = "fa-brands fa-linkedin-in";
        }

        if (icon) {
            link.innerHTML = `<i class="${icon}"></i>`;
        }

    });

});
/* =========================================================
   LOAD QUOTATION SYSTEM WITHOUT EDITING index.html
========================================================= */

(function () {

    function loadQuotationSystem() {

        if (
            document.querySelector(
                'script[data-amal-quotation="true"]'
            )
        ) {
            return;
        }


        /* Load CSS */

        const css =
            document.createElement("link");

        css.rel = "stylesheet";

        css.href = "quotation.css";

        css.dataset.amalQuotation =
            "true";

        document.head.appendChild(css);


        /* Load JavaScript */

        const script =
            document.createElement("script");

        script.src =
            "quotation.js";

        script.dataset.amalQuotation =
            "true";

        document.body.appendChild(script);

    }


    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            loadQuotationSystem
        );

    } else {

        loadQuotationSystem();

    }

})();
