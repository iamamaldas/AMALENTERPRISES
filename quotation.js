/* =========================================================
   AMAL ENTERPRISES
   QUOTATION SYSTEM
   Buyer / Supplier / Admin
   WhatsApp Only
========================================================= */

(function () {

    "use strict";

    const ADMIN_ID = "Amal.das.4930@gmail.com";
    const ADMIN_PASSWORD = "amal0706";

    const ADMIN_WHATSAPP = "916296471636";

    const COMPANY_NAME = "AMAL ENTERPRISES";
    const MSME_NUMBER = "XXXX";

    let quotationData = null;


    /* =====================================================
       INITIALIZE
    ===================================================== */

    function initQuotationSystem() {

        const quoteBox =
            document.querySelector(".quote-box");

        if (!quoteBox) {
            setTimeout(initQuotationSystem, 300);
            return;
        }

        if (document.getElementById("amalRole")) {
            return;
        }


        /* =================================================
           ROLE SELECT
        ================================================= */

        const roleGroup =
            document.createElement("div");

        roleGroup.className =
            "amal-field-group";

        roleGroup.innerHTML = `
            <label class="amal-label">
                Quotation Type
            </label>

            <select id="amalRole" class="amal-role">

                <option value="">
                    Select Buyer / Supplier / Admin
                </option>

                <option value="buyer">
                    Buyer
                </option>

                <option value="supplier">
                    Supplier
                </option>

                <option value="admin">
                    Admin
                </option>

            </select>

            <div id="amalRoleHint"
                 class="amal-role-hint">

                Select who is preparing this quotation.

            </div>
        `;

        quoteBox.insertBefore(
            roleGroup,
            quoteBox.firstElementChild
        );


        /* =================================================
           MOBILE NUMBER
        ================================================= */

        const mobileInput =
            document.createElement("input");

        mobileInput.type = "tel";
        mobileInput.id = "amalMobile";
        mobileInput.className = "amal-mobile";

        mobileInput.placeholder =
            "Mobile / WhatsApp Number";

        mobileInput.inputMode = "numeric";
        mobileInput.maxLength = 15;


        const buyerInput =
            document.getElementById("buyer");

        if (buyerInput) {

            buyerInput.placeholder =
                "Buyer / Supplier / Company Name";

            buyerInput.parentNode.insertBefore(
                mobileInput,
                buyerInput.nextSibling
            );

        }


        /* =================================================
           ADMIN LOGIN
        ================================================= */

        const adminBox =
            document.createElement("div");

        adminBox.id =
            "amalAdminBox";

        adminBox.className =
            "amal-admin-box";

        adminBox.style.display =
            "none";

        adminBox.innerHTML = `

            <div class="amal-admin-title">
                🔐 Admin Login
            </div>

            <input
                type="email"
                id="amalAdminId"
                placeholder="Admin Login ID"
                autocomplete="username"
            >

            <input
                type="password"
                id="amalAdminPassword"
                placeholder="Admin Password"
                autocomplete="current-password"
            >

            <button
                type="button"
                id="amalAdminLogin"
                class="amal-admin-login">

                Login as Admin

            </button>

            <div
                id="amalAdminStatus"
                class="amal-admin-status">
            </div>

        `;

        const textarea =
            quoteBox.querySelector("textarea");

        quoteBox.insertBefore(
            adminBox,
            textarea
        );


        /* =================================================
           ROLE CHANGE
        ================================================= */

        document
            .getElementById("amalRole")
            .addEventListener(
                "change",
                handleRoleChange
            );


        /* =================================================
           ADMIN LOGIN
        ================================================= */

        document
            .getElementById("amalAdminLogin")
            .addEventListener(
                "click",
                adminLogin
            );


        /* =================================================
           REPLACE OLD BUTTON
        ================================================= */

        const oldButton =
            quoteBox.querySelector(".quote-button");

        if (oldButton) {

            oldButton.removeAttribute("onclick");

            oldButton.textContent =
                "🧾 Generate Quotation";

            oldButton.addEventListener(
                "click",
                generateQuotation
            );

        }


        /* =================================================
           WHATSAPP BUTTON
        ================================================= */

        const previewButtons =
            document.querySelector(
                ".preview-buttons"
            );

        if (previewButtons) {

            previewButtons.innerHTML = `

                <button
                    type="button"
                    id="amalWhatsAppButton"
                    class="amal-whatsapp-button">

                    <i class="fa-brands fa-whatsapp"></i>
                    Send via WhatsApp

                </button>

            `;

            document
                .getElementById(
                    "amalWhatsAppButton"
                )
                .addEventListener(
                    "click",
                    sendWhatsApp
                );

        }


        /* =================================================
           ADMIN COMPANY INFORMATION
        ================================================= */

        const preview =
            document.querySelector(
                ".quote-preview"
            );

        if (preview) {

            const adminPreview =
                document.createElement("div");

            adminPreview.id =
                "amalAdminPreview";

            adminPreview.className =
                "amal-admin-preview";

            adminPreview.style.display =
                "none";

            adminPreview.innerHTML = `

                <div class="amal-company-name">
                    ${COMPANY_NAME}
                </div>

                <div>
                    MSME Registration No.:
                    <strong>${MSME_NUMBER}</strong>
                </div>

            `;

            preview.insertBefore(
                adminPreview,
                preview.firstChild
            );

        }

    }


    /* =====================================================
       ROLE CHANGE
    ===================================================== */

    function handleRoleChange() {

        const role =
            document.getElementById(
                "amalRole"
            ).value;

        const adminBox =
            document.getElementById(
                "amalAdminBox"
            );

        const hint =
            document.getElementById(
                "amalRoleHint"
            );

        const adminPreview =
            document.getElementById(
                "amalAdminPreview"
            );


        if (role === "admin") {

            adminBox.style.display =
                "block";

            hint.textContent =
                "Admin login is required.";

            if (adminPreview) {
                adminPreview.style.display =
                    "none";
            }

        } else {

            adminBox.style.display =
                "none";

            if (role === "supplier") {

                hint.textContent =
                    "Supplier will send their price directly to AMAL ENTERPRISES.";

            } else if (role === "buyer") {

                hint.textContent =
                    "Buyer requirement will be sent to AMAL ENTERPRISES.";

            } else {

                hint.textContent =
                    "Select Buyer, Supplier or Admin.";

            }

            if (adminPreview) {
                adminPreview.style.display =
                    "none";
            }

        }

    }


    /* =====================================================
       ADMIN LOGIN
    ===================================================== */

    function adminLogin() {

        const id =
            document
                .getElementById("amalAdminId")
                .value
                .trim();

        const password =
            document
                .getElementById("amalAdminPassword")
                .value;

        const status =
            document.getElementById(
                "amalAdminStatus"
            );


        if (
            id === ADMIN_ID &&
            password === ADMIN_PASSWORD
        ) {

            sessionStorage.setItem(
                "amalAdminLoggedIn",
                "true"
            );

            status.textContent =
                "✓ Admin verified successfully.";

            status.className =
                "amal-admin-status success";


            showPreviewFlash(
                "Admin Login Successful ✓",
                "success"
            );

        } else {

            sessionStorage.removeItem(
                "amalAdminLoggedIn"
            );

            status.textContent =
                "Invalid Admin ID or Password.";

            status.className =
                "amal-admin-status error";


            showPreviewFlash(
                "Invalid Admin Login",
                "error"
            );

        }

    }


    /* =====================================================
       ADMIN CHECK
    ===================================================== */

    function isAdminLoggedIn() {

        return (
            sessionStorage.getItem(
                "amalAdminLoggedIn"
            ) === "true"
        );

    }


    /* =====================================================
       GENERATE QUOTATION
    ===================================================== */

    function generateQuotation() {

        const role =
            document.getElementById(
                "amalRole"
            ).value;

        const name =
            document.getElementById(
                "buyer"
            ).value.trim();

        const mobile =
            document.getElementById(
                "amalMobile"
            ).value.trim();

        const product =
            document.getElementById(
                "product"
            ).value;

        const quantity =
            parseFloat(
                document.getElementById(
                    "quantity"
                ).value
            ) || 0;

        const price =
            parseFloat(
                document.getElementById(
                    "price"
                ).value
            ) || 0;

        const details =
            document.getElementById(
                "details"
            ).value.trim();


        /* =================================================
           VALIDATION
        ================================================= */

        if (!role) {

            showPreviewFlash(
                "Please select Buyer / Supplier / Admin",
                "error"
            );

            return;
        }


        if (!name) {

            showPreviewFlash(
                "Please enter Name / Company Name",
                "error"
            );

            return;
        }


        if (!mobile) {

            showPreviewFlash(
                "Please enter Mobile / WhatsApp Number",
                "error"
            );

            return;
        }


        if (!product) {

            showPreviewFlash(
                "Please select a Product",
                "error"
            );

            return;
        }


        if (
            role === "admin" &&
            !isAdminLoggedIn()
        ) {

            showPreviewFlash(
                "Please Login as Admin First",
                "error"
            );

            return;
        }


        /* =================================================
           TOTAL
        ================================================= */

        const total =
            quantity * price;


        /* =================================================
           UPDATE EXISTING PREVIEW
        ================================================= */

        const previewBuyer =
            document.getElementById(
                "previewBuyer"
            );

        const previewProduct =
            document.getElementById(
                "previewProduct"
            );

        const previewQuantity =
            document.getElementById(
                "previewQuantity"
            );

        const previewPrice =
            document.getElementById(
                "previewPrice"
            );

        const previewTotal =
            document.getElementById(
                "previewTotal"
            );


        if (previewBuyer) {

            previewBuyer.textContent =
                name;

        }


        if (previewProduct) {

            previewProduct.textContent =
                product;

        }


        if (previewQuantity) {

            previewQuantity.textContent =
                quantity
                    ? quantity.toLocaleString(
                        "en-IN"
                    )
                    : "—";

        }


        if (previewPrice) {

            previewPrice.textContent =
                price
                    ? "₹" +
                      price.toLocaleString(
                          "en-IN",
                          {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                          }
                      )
                    : "—";

        }


        if (previewTotal) {

            previewTotal.textContent =
                "₹" +
                total.toLocaleString(
                    "en-IN",
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }
                );

        }


        /* =================================================
           SAVE QUOTATION
        ================================================= */

        quotationData = {

            role: role,

            name: name,

            mobile: mobile,

            product: product,

            quantity: quantity,

            price: price,

            total: total,

            details: details,

            company: COMPANY_NAME,

            msme: MSME_NUMBER

        };


        window.amalQuotationData =
            quotationData;


        /* =================================================
           ADMIN PREVIEW
        ================================================= */

        const adminPreview =
            document.getElementById(
                "amalAdminPreview"
            );

        if (adminPreview) {

            adminPreview.style.display =
                role === "admin"
                    ? "block"
                    : "none";

        }


        /* =================================================
           SUCCESS FLASH INSIDE PREVIEW
        ================================================= */

        showPreviewFlash(
            "Quotation Generated Successfully ✓",
            "success"
        );

    }


    /* =====================================================
       WHATSAPP
    ===================================================== */

    function sendWhatsApp() {

        if (!quotationData) {

            showPreviewFlash(
                "Generate quotation first",
                "error"
            );

            return;
        }


        let targetNumber =
            ADMIN_WHATSAPP;


        /*
         Buyer:
         Buyer → AMAL ENTERPRISES
        */

        if (
            quotationData.role === "buyer"
        ) {

            targetNumber =
                ADMIN_WHATSAPP;

        }


        /*
         Supplier:
         Supplier → AMAL ENTERPRISES
         Supplier price is included
        */

        if (
            quotationData.role === "supplier"
        ) {

            targetNumber =
                ADMIN_WHATSAPP;

        }


        /*
         Admin:
         Admin → Buyer / Supplier
         Uses entered mobile number
        */

        if (
            quotationData.role === "admin"
        ) {

            targetNumber =
                normalizeNumber(
                    quotationData.mobile
                );

        }


        let message = "";


        /* =================================================
           SUPPLIER MESSAGE
        ================================================= */

        if (
            quotationData.role === "supplier"
        ) {

            message =
`*SUPPLIER PRICE QUOTATION*

Supplier / Company:
${quotationData.name}

WhatsApp:
${quotationData.mobile}

Product:
${quotationData.product}

Quantity:
${quotationData.quantity || "Not specified"}

Supplier Unit Price:
₹${formatMoney(quotationData.price)}

Estimated Total:
₹${formatMoney(quotationData.total)}

Specifications:
${quotationData.details || "Not specified"}

Please review the supplier price and negotiate if required.

*AMAL ENTERPRISES*`;

        }


        /* =================================================
           BUYER MESSAGE
        ================================================= */

        else if (
            quotationData.role === "buyer"
        ) {

            message =
`*BUYER REQUIREMENT / QUOTATION REQUEST*

Buyer / Company:
${quotationData.name}

WhatsApp:
${quotationData.mobile}

Product:
${quotationData.product}

Quantity:
${quotationData.quantity || "Not specified"}

Unit Price:
${quotationData.price
    ? "₹" + formatMoney(quotationData.price)
    : "Not specified"}

Specifications:
${quotationData.details || "Not specified"}

Please provide suitable quotation and commercial terms.

*AMAL ENTERPRISES*`;

        }


        /* =================================================
           ADMIN OFFICIAL QUOTATION
        ================================================= */

        else {

            message =
`*OFFICIAL QUOTATION*

*${COMPANY_NAME}*

MSME Registration No.:
${quotationData.msme}

Buyer / Supplier:
${quotationData.name}

Contact:
${quotationData.mobile}

Product:
${quotationData.product}

Quantity:
${quotationData.quantity || "Not specified"}

Unit Price:
₹${formatMoney(quotationData.price)}

Estimated Total:
₹${formatMoney(quotationData.total)}

Specifications:
${quotationData.details || "Not specified"}

This quotation is subject to commercial discussion, price negotiation and final confirmation.

Regards,
*${COMPANY_NAME}*`;

        }


        const url =
            "https://wa.me/" +
            targetNumber +
            "?text=" +
            encodeURIComponent(
                message
            );


        window.open(
            url,
            "_blank"
        );

    }


    /* =====================================================
       NUMBER FORMAT
    ===================================================== */

    function normalizeNumber(number) {

        let cleaned =
            String(number)
                .replace(/\D/g, "");

        if (
            cleaned.length === 10
        ) {

            cleaned =
                "91" + cleaned;

        }

        return cleaned;

    }


    /* =====================================================
       MONEY FORMAT
    ===================================================== */

    function formatMoney(value) {

        return Number(value || 0)
            .toLocaleString(
                "en-IN",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            );

    }


    /* =====================================================
       PREVIEW FLASH
       Appears INSIDE quotation preview box
    ===================================================== */

    function showPreviewFlash(
        message,
        type
    ) {

        const preview =
            document.querySelector(
                ".quote-preview"
            );

        if (!preview) {
            return;
        }


        const oldFlash =
            document.getElementById(
                "amalPreviewFlash"
            );

        if (oldFlash) {
            oldFlash.remove();
        }


        const flash =
            document.createElement("div");

        flash.id =
            "amalPreviewFlash";

        flash.className =
            "amal-preview-flash " +
            (type || "success");


        flash.innerHTML = `

            <span class="amal-flash-icon">

                ${
                    type === "error"
                        ? "!"
                        : "✓"
                }

            </span>

            <span>
                ${message}
            </span>

        `;


        preview.appendChild(
            flash
        );


        requestAnimationFrame(
            function () {

                flash.classList.add(
                    "show"
                );

            }
        );


        clearTimeout(
            window.amalPreviewFlashTimer
        );


        window.amalPreviewFlashTimer =
            setTimeout(
                function () {

                    flash.classList.remove(
                        "show"
                    );

                    setTimeout(
                        function () {

                            if (
                                flash.parentNode
                            ) {

                                flash.remove();

                            }

                        },
                        300
                    );

                },
                2800
            );

    }


    /* =====================================================
       START SYSTEM
    ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initQuotationSystem
        );

    } else {

        initQuotationSystem();

    }

})();
