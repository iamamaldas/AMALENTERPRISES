/* =========================================================
   AMAL ENTERPRISES - FINAL QUOTATION SYSTEM
   index.html / fix.js untouched
========================================================= */

(function () {
    "use strict";

    /* =====================================================
       CONFIGURATION
    ===================================================== */

    const COMPANY_NAME = "AMAL ENTERPRISES";

    // Admin WhatsApp number
    const ADMIN_WHATSAPP = "916296471636";

    /*
       AFTER DEPLOYING GOOGLE APPS SCRIPT:
       Paste the Web App /exec URL here.
    */
    const APPS_SCRIPT_URL =
        "PASTE_YOUR_WEB_APP_EXEC_URL_HERE";

    /*
       SAME TOKEN MUST BE USED IN Code.gs
       Change this to your own long random value.
    */
    const API_TOKEN =
        "CHANGE_THIS_TO_A_LONG_RANDOM_SECRET_9x7Qm2";


    /* =====================================================
       WEBSITE PRODUCT CATEGORIES
    ===================================================== */

    const PRODUCT_CATEGORIES = [
        "Corrugated Carton Boxes",
        "Packaging Materials",
        "Polyethylene Carry Bags",
        "Biodegradable & Compostable Bags",
        "Other / Custom Product"
    ];


    /* =====================================================
       UNITS
       mg kept as the smallest practical weight unit
    ===================================================== */

    const UNITS = [
        "mg",
        "g",
        "kg",
        "tonne",
        "ml",
        "litre",
        "piece",
        "box",
        "carton",
        "packet",
        "bag",
        "set",
        "metre",
        "cm",
        "dozen"
    ];


    let currentRole = "";


    /* =====================================================
       SAFE NUMBER
    ===================================================== */

    function numberValue(value) {

        const n =
            Number.parseFloat(value);

        return Number.isFinite(n) && n >= 0
            ? n
            : 0;
    }


    /* =====================================================
       MONEY
    ===================================================== */

    function formatMoney(value) {

        return "₹" +
            numberValue(value).toLocaleString(
                "en-IN",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            );
    }


    /* =====================================================
       QUANTITY
    ===================================================== */

    function formatQuantity(value) {

        return numberValue(value).toLocaleString(
            "en-IN",
            {
                maximumFractionDigits: 6
            }
        );
    }


    /* =====================================================
       DATE
    ===================================================== */

    function getDate() {

        return new Date().toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    }


    /* =====================================================
       HTML ESCAPE
    ===================================================== */

    function escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    /* =====================================================
       QUOTATION NUMBER
    ===================================================== */

    function quotationNumber() {

        const d = new Date();

        const stamp =
            d.getFullYear().toString() +
            String(d.getMonth() + 1).padStart(2, "0") +
            String(d.getDate()).padStart(2, "0");

        const random =
            Math.floor(
                1000 + Math.random() * 9000
            );

        return "AE-" +
            stamp +
            "-" +
            random;
    }


    /* =====================================================
       WHATSAPP
    ===================================================== */

    function openWhatsApp(message) {

        const url =
            "https://wa.me/" +
            ADMIN_WHATSAPP +
            "?text=" +
            encodeURIComponent(message);

        window.open(
            url,
            "_blank",
            "noopener"
        );
    }


    /* =====================================================
       CREATE MAIN QUOTATION SYSTEM
    ===================================================== */

    function createQuotationSystem() {

        const area =
            document.getElementById("quotation");

        if (!area) return;


        area.innerHTML = `

            <div class="ae-quotation-wrapper">

                <div class="ae-quotation-header">

                    <div>

                        <div class="ae-small-label">
                            B2B COMMERCIAL TOOL
                        </div>

                        <h2>
                            Create Quotation
                        </h2>

                        <p>
                            Prepare, review and share
                            quotations directly with
                            AMAL ENTERPRISES through WhatsApp.
                        </p>

                    </div>


                    <div
                        class="ae-admin-status"
                        id="aeRoleStatus">

                        Select Role

                    </div>

                </div>


                <!-- ROLE -->

                <div class="ae-role-box">

                    <div class="ae-field-label">
                        Select Role
                    </div>


                    <div class="ae-role-buttons">

                        <button
                            type="button"
                            class="ae-role-btn"
                            data-role="buyer">

                            Buyer

                        </button>


                        <button
                            type="button"
                            class="ae-role-btn"
                            data-role="supplier">

                            Supplier

                        </button>


                        <button
                            type="button"
                            class="ae-role-btn"
                            data-role="admin">

                            Admin

                        </button>

                    </div>

                </div>


                <!-- FORM -->

                <div
                    class="ae-form-panel"
                    id="aeFormPanel"
                    hidden>


                    <div
                        class="ae-form-role-title"
                        id="aeRoleTitle">
                    </div>


                    <div class="ae-form-grid">


                        <!-- NAME -->

                        <div class="ae-field">

                            <label>
                                Name *
                            </label>

                            <input
                                id="aeName"
                                type="text"
                                autocomplete="name"
                                placeholder="Enter name">

                        </div>


                        <!-- COMPANY -->

                        <div class="ae-field">

                            <label>
                                Company Name *
                            </label>

                            <input
                                id="aeCompany"
                                type="text"
                                autocomplete="organization"
                                placeholder="Enter company name">

                        </div>


                        <!-- MOBILE -->

                        <div class="ae-field">

                            <label>
                                Mobile Number *
                            </label>

                            <input
                                id="aeMobile"
                                type="tel"
                                inputmode="numeric"
                                maxlength="10"
                                placeholder="10 digit mobile number">

                        </div>


                        <!-- EMAIL -->

                        <div class="ae-field">

                            <label>
                                Email Address
                                <span>(Optional)</span>
                            </label>

                            <input
                                id="aeEmail"
                                type="email"
                                autocomplete="email"
                                placeholder="Email address (optional)">

                        </div>


                        <!-- CATEGORY -->

                        <div class="ae-field">

                            <label>
                                Product Category *
                            </label>

                            <select id="aeCategory">

                                <option value="">
                                    Select product category
                                </option>

                                ${
                                    PRODUCT_CATEGORIES
                                        .map(function (item) {

                                            return `
                                                <option value="${escapeHTML(item)}">
                                                    ${escapeHTML(item)}
                                                </option>
                                            `;

                                        })
                                        .join("")
                                }

                            </select>

                        </div>


                        <!-- PRODUCT -->

                        <div class="ae-field">

                            <label>
                                Product / Material *
                            </label>

                            <input
                                id="aeProduct"
                                type="text"
                                placeholder="Enter product or material">

                        </div>

                    </div>


                    <!-- DESCRIPTION -->

                    <div class="ae-field">

                        <label>
                            Description / Specification
                            <span>(Optional)</span>
                        </label>

                        <textarea
                            id="aeSpecification"
                            rows="3"
                            placeholder="Size, colour, thickness, GSM, quality, packing requirement, delivery details etc."></textarea>

                    </div>


                    <!-- QUANTITY -->

                    <div class="ae-quantity-row">


                        <div class="ae-field">

                            <label>
                                Quantity *
                            </label>

                            <input
                                id="aeQuantity"
                                type="number"
                                min="0.000001"
                                step="any"
                                placeholder="Quantity">

                        </div>


                        <div class="ae-field">

                            <label>
                                Unit *
                            </label>

                            <select id="aeUnit">

                                <option value="">
                                    Select unit
                                </option>

                                ${
                                    UNITS
                                        .map(function (item) {

                                            return `
                                                <option value="${escapeHTML(item)}">
                                                    ${escapeHTML(item)}
                                                </option>
                                            `;

                                        })
                                        .join("")
                                }

                            </select>

                        </div>


                        <div class="ae-field">

                            <label>
                                Unit Price (₹) *
                            </label>

                            <input
                                id="aePrice"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Price per unit">

                        </div>

                    </div>


                    <!-- LIVE TOTAL -->

                    <div
                        class="ae-live-total"
                        id="aeLiveTotal">

                        Estimated Total: ₹0.00

                    </div>


                    <!-- STATUS -->

                    <div class="ae-status-section">

                        <div class="ae-field-label">
                            Quotation Status *
                        </div>


                        <div class="ae-status-options">


                            <label
                                class="ae-status-option">

                                <input
                                    type="radio"
                                    name="aeQuotationStatus"
                                    value="Final Quotation">

                                <span>
                                    Final Quotation
                                </span>

                            </label>


                            <label
                                class="ae-status-option">

                                <input
                                    type="radio"
                                    name="aeQuotationStatus"
                                    value="Negotiable">

                                <span>
                                    Negotiable
                                </span>

                            </label>


                        </div>

                    </div>


                    <div
                        class="ae-negotiation-note"
                        id="aeNegotiationNote"
                        hidden>

                        Price is subject to negotiation
                        and commercial discussion.

                    </div>


                    <!-- CREATE -->

                    <button
                        type="button"
                        class="ae-generate-btn"
                        id="aeGenerateBtn">

                        Create Quotation

                    </button>


                    <!-- DATABASE STATUS -->

                    <div
                        class="ae-save-status"
                        id="aeSaveStatus"
                        aria-live="polite">
                    </div>


                </div>

            </div>


            <!-- FLASH PREVIEW -->

            <div
                class="ae-modal-overlay"
                id="aeModal"
                hidden>


                <div class="ae-modal-card">


                    <button
                        type="button"
                        class="ae-close-btn"
                        id="aeCloseModal">

                        ×

                    </button>


                    <div
                        class="ae-preview-document"
                        id="aePreviewDocument">
                    </div>


                    <div
                        class="ae-action-buttons"
                        id="aeActionButtons">
                    </div>


                </div>

            </div>

        `;


        bindEvents();
    }


    /* =====================================================
       EVENTS
    ===================================================== */

    function bindEvents() {


        document
            .querySelectorAll(".ae-role-btn")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        selectRole(
                            button.dataset.role
                        );

                    }
                );

            });


        document
            .getElementById("aeGenerateBtn")
            .addEventListener(
                "click",
                generateQuotation
            );


        document
            .getElementById("aeCloseModal")
            .addEventListener(
                "click",
                closePreview
            );


        document
            .getElementById("aeModal")
            .addEventListener(
                "click",
                function (event) {

                    if (
                        event.target ===
                        event.currentTarget
                    ) {

                        closePreview();

                    }

                }
            );


        [
            "aeQuantity",
            "aePrice",
            "aeUnit"
        ].forEach(function (id) {

            const element =
                document.getElementById(id);

            element.addEventListener(
                "input",
                updateLiveCalculation
            );

            element.addEventListener(
                "change",
                updateLiveCalculation
            );

        });


        document
            .querySelectorAll(
                'input[name="aeQuotationStatus"]'
            )
            .forEach(function (radio) {

                radio.addEventListener(
                    "change",
                    updateLiveCalculation
                );

            });

    }


    /* =====================================================
       SELECT ROLE
    ===================================================== */

    function selectRole(role) {

        currentRole = role;


        document
            .querySelectorAll(".ae-role-btn")
            .forEach(function (button) {

                button.classList.toggle(
                    "selected",
                    button.dataset.role === role
                );

            });


        const label =
            role === "buyer"
                ? "Buyer"
                : role === "supplier"
                    ? "Supplier"
                    : "Admin";


        document
            .getElementById("aeRoleStatus")
            .textContent =
            label + " Mode";


        document
            .getElementById("aeRoleTitle")
            .textContent =
            label + " Quotation";


        document
            .getElementById("aeFormPanel")
            .hidden = false;

    }


    /* =====================================================
       LIVE CALCULATION
    ===================================================== */

    function updateLiveCalculation() {

        const quantity =
            numberValue(
                document
                    .getElementById("aeQuantity")
                    .value
            );


        const price =
            numberValue(
                document
                    .getElementById("aePrice")
                    .value
            );


        const total =
            quantity * price;


        document
            .getElementById("aeLiveTotal")
            .textContent =
            "Estimated Total: " +
            formatMoney(total);


        const selected =
            document.querySelector(
                'input[name="aeQuotationStatus"]:checked'
            );


        document
            .getElementById("aeNegotiationNote")
            .hidden =
            !(
                selected &&
                selected.value === "Negotiable"
            );

    }


    /* =====================================================
       GET FORM DATA
    ===================================================== */

    function getFormData() {

        const status =
            document.querySelector(
                'input[name="aeQuotationStatus"]:checked'
            );


        const quantity =
            numberValue(
                document
                    .getElementById("aeQuantity")
                    .value
            );


        const price =
            numberValue(
                document
                    .getElementById("aePrice")
                    .value
            );


        return {

            role:
                currentRole,

            roleName:
                currentRole === "buyer"
                    ? "Buyer"
                    : currentRole === "supplier"
                        ? "Supplier"
                        : "Admin",

            name:
                document
                    .getElementById("aeName")
                    .value
                    .trim(),

            company:
                document
                    .getElementById("aeCompany")
                    .value
                    .trim(),

            mobile:
                document
                    .getElementById("aeMobile")
                    .value
                    .replace(/\D/g, "")
                    .slice(0, 10),

            email:
                document
                    .getElementById("aeEmail")
                    .value
                    .trim(),

            category:
                document
                    .getElementById("aeCategory")
                    .value,

            product:
                document
                    .getElementById("aeProduct")
                    .value
                    .trim(),

            specification:
                document
                    .getElementById("aeSpecification")
                    .value
                    .trim(),

            quantity:
                quantity,

            unit:
                document
                    .getElementById("aeUnit")
                    .value,

            price:
                price,

            total:
                quantity * price,

            status:
                status
                    ? status.value
                    : ""

        };

    }


    /* =====================================================
       VALIDATION
    ===================================================== */

    function validateData(data) {


        if (!data.role) {

            alert(
                "Please select Buyer, Supplier or Admin first."
            );

            return false;
        }


        if (!data.name) {

            alert(
                "Please enter Name."
            );

            return false;
        }


        if (!data.company) {

            alert(
                "Please enter Company Name."
            );

            return false;
        }


        if (
            !/^[0-9]{10}$/.test(
                data.mobile
            )
        ) {

            alert(
                "Please enter a valid 10 digit mobile number."
            );

            return false;
        }


        if (
            data.email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                .test(data.email)
        ) {

            alert(
                "Please enter a valid email address or leave it blank."
            );

            return false;
        }


        if (!data.category) {

            alert(
                "Please select Product Category."
            );

            return false;
        }


        if (!data.product) {

            alert(
                "Please enter Product / Material."
            );

            return false;
        }


        if (!(data.quantity > 0)) {

            alert(
                "Please enter a valid quantity."
            );

            return false;
        }


        if (!data.unit) {

            alert(
                "Please select a unit."
            );

            return false;
        }


        if (!(data.price > 0)) {

            alert(
                "Please enter a valid unit price greater than 0."
            );

            return false;
        }


        if (!data.status) {

            alert(
                "Please select Final Quotation or Negotiable."
            );

            return false;
        }


        return true;

    }


    /* =====================================================
       GENERATE QUOTATION
    ===================================================== */

    function generateQuotation() {

        const data =
            getFormData();


        if (!validateData(data)) {
            return;
        }


        const quoteNo =
            quotationNumber();


        showPreview(
            data,
            quoteNo
        );


        /*
           ONLY FINAL QUOTATION
           is stored in Google Sheet + Drive.
        */

        if (
            data.status ===
            "Final Quotation"
        ) {

            saveFinalQuotation(
                data,
                quoteNo
            );

        }

        else {

            document
                .getElementById("aeSaveStatus")
                .textContent =
                "Negotiable quotation — not saved as the latest final quotation.";

        }

    }


    /* =====================================================
       PREVIEW
    ===================================================== */

    function showPreview(
        data,
        quoteNo
    ) {

        const box =
            document.getElementById(
                "aePreviewDocument"
            );


        box.innerHTML = `

            <div class="ae-preview-top">

                <div>

                    <div class="ae-preview-company">
                        ${COMPANY_NAME}
                    </div>

                    <div class="ae-preview-subtitle">
                        Packaging & Sourcing Solutions
                    </div>

                </div>


                <div class="ae-preview-quote-info">

                    <strong>
                        QUOTATION
                    </strong>

                    <span>
                        ${escapeHTML(quoteNo)}
                    </span>

                    <span>
                        ${escapeHTML(getDate())}
                    </span>

                </div>

            </div>


            <div class="ae-preview-role">

                ${escapeHTML(data.roleName)}
                Quotation

            </div>


            <div class="ae-preview-contact-grid">

                <div>

                    <small>
                        Name
                    </small>

                    <strong>
                        ${escapeHTML(data.name)}
                    </strong>

                </div>


                <div>

                    <small>
                        Company
                    </small>

                    <strong>
                        ${escapeHTML(data.company)}
                    </strong>

                </div>


                <div>

                    <small>
                        Mobile
                    </small>

                    <strong>
                        ${escapeHTML(data.mobile)}
                    </strong>

                </div>


                ${
                    data.email
                        ? `
                            <div>

                                <small>
                                    Email
                                </small>

                                <strong>
                                    ${escapeHTML(data.email)}
                                </strong>

                            </div>
                          `
                        : ""
                }

            </div>


            <div class="ae-preview-table">

                <div class="ae-preview-table-head">

                    <span>
                        Product
                    </span>

                    <span>
                        Qty
                    </span>

                    <span>
                        Unit Price
                    </span>

                    <span>
                        Total
                    </span>

                </div>


                <div class="ae-preview-table-row">

                    <span>

                        ${escapeHTML(data.category)}

                        <br>

                        <b>
                            ${escapeHTML(data.product)}
                        </b>

                    </span>


                    <span>

                        ${formatQuantity(data.quantity)}
                        ${escapeHTML(data.unit)}

                    </span>


                    <span>

                        ${formatMoney(data.price)}
                        /
                        ${escapeHTML(data.unit)}

                    </span>


                    <strong>

                        ${formatMoney(data.total)}

                    </strong>

                </div>

            </div>


            ${
                data.specification
                    ? `
                        <div class="ae-preview-spec">

                            <small>
                                Description / Specification
                            </small>

                            <p>
                                ${escapeHTML(
                                    data.specification
                                )}
                            </p>

                        </div>
                      `
                    : ""
            }


            <div class="ae-preview-bottom">

                <div>

                    <small>
                        Quotation Status
                    </small>

                    <strong
                        class="${
                            data.status ===
                            "Negotiable"
                                ? "negotiable"
                                : "final"
                        }">

                        ${escapeHTML(data.status)}

                    </strong>

                </div>


                <div class="ae-preview-total">

                    <small>
                        Estimated Total
                    </small>

                    <strong>
                        ${formatMoney(data.total)}
                    </strong>

                </div>

            </div>


            ${
                data.status ===
                "Negotiable"
                    ? `
                        <div class="ae-preview-note">

                            Price is subject to negotiation
                            and commercial discussion.

                        </div>
                      `
                    : ""
            }

        `;


        createActionButtons(
            data,
            quoteNo
        );


        document
            .getElementById("aeModal")
            .hidden = false;


        document.body
            .classList
            .add("ae-modal-open");

    }


    /* =====================================================
       ACTION BUTTONS
    ===================================================== */

    function createActionButtons(
        data,
        quoteNo
    ) {

        const buttons =
            document.getElementById(
                "aeActionButtons"
            );


        buttons.innerHTML = `

            <button
                type="button"
                class="ae-whatsapp-btn"
                id="aeWhatsAppBtn">

                <i class="fa-brands fa-whatsapp"></i>

                WhatsApp Admin

            </button>


            <button
                type="button"
                class="ae-secondary-btn"
                id="aeCloseActionBtn">

                Close

            </button>

        `;


        document
            .getElementById(
                "aeWhatsAppBtn"
            )
            .addEventListener(
                "click",
                function () {

                    openWhatsApp(
                        createWhatsAppMessage(
                            data,
                            quoteNo
                        )
                    );

                }
            );


        document
            .getElementById(
                "aeCloseActionBtn"
            )
            .addEventListener(
                "click",
                closePreview
            );

    }


    /* =====================================================
       WHATSAPP MESSAGE
    ===================================================== */

    function createWhatsAppMessage(
        data,
        quoteNo
    ) {

        let message =

`*${COMPANY_NAME}*
*Quotation*

Quotation No: ${quoteNo}
Date: ${getDate()}

Role: ${data.roleName}

Name: ${data.name}
Company: ${data.company}
Mobile: ${data.mobile}${data.email
    ? `\nEmail: ${data.email}`
    : ""}

Product Category: ${data.category}
Product: ${data.product}
Quantity: ${formatQuantity(data.quantity)} ${data.unit}
Unit Price: ${formatMoney(data.price)} / ${data.unit}
Estimated Total: ${formatMoney(data.total)}

Quotation Status: *${data.status}*`;


        if (data.specification) {

            message +=

`

Description / Specification:
${data.specification}`;

        }


        if (
            data.status ===
            "Negotiable"
        ) {

            message +=

`

Price is negotiable.
Commercial terms can be discussed.`;

        }


        if (
            data.roleName ===
            "Supplier"
        ) {

            message +=

`

Please share/confirm your best supply price and commercial terms with AMAL ENTERPRISES.`;

        }


        else if (
            data.roleName ===
            "Buyer"
        ) {

            message +=

`

Please confirm the requirement and commercial terms.`;

        }


        else {

            message +=

`

Prepared by:
${COMPANY_NAME}`;

        }


        return message;

    }


    /* =====================================================
       SEND FINAL QUOTATION TO GOOGLE APPS SCRIPT
       Uses hidden form + iframe, avoiding browser CORS problems.
    ===================================================== */

    function saveFinalQuotation(
        data,
        quoteNo
    ) {

        const status =
            document.getElementById(
                "aeSaveStatus"
            );


        if (
            !APPS_SCRIPT_URL ||
            APPS_SCRIPT_URL.includes(
                "PASTE_YOUR"
            )
        ) {

            status.textContent =
                "Final quotation created. Google Sheet/Drive is not connected yet.";

            return;
        }


        status.textContent =
            "Saving final quotation to Google Sheet & Drive…";


        const iframeName =
            "aeQuotationSaveFrame_" +
            Date.now();


        const iframe =
            document.createElement(
                "iframe"
            );


        iframe.name =
            iframeName;


        iframe.style.display =
            "none";


        document.body.appendChild(
            iframe
        );


        const form =
            document.createElement(
                "form"
            );


        form.method =
            "POST";


        form.action =
            APPS_SCRIPT_URL;


        form.target =
            iframeName;


        form.style.display =
            "none";


        const payload = {

            token:
                API_TOKEN,

            action:
                "saveFinalQuotation",

            quoteNo:
                quoteNo,

            date:
                getDate(),

            role:
                data.roleName,

            name:
                data.name,

            company:
                data.company,

            mobile:
                data.mobile,

            email:
                data.email,

            category:
                data.category,

            product:
                data.product,

            specification:
                data.specification,

            quantity:
                data.quantity,

            unit:
                data.unit,

            price:
                data.price,

            total:
                data.total,

            status:
                data.status

        };


        Object
            .keys(payload)
            .forEach(function (key) {

                const input =
                    document.createElement(
                        "input"
                    );

                input.type =
                    "hidden";

                input.name =
                    key;

                input.value =
                    payload[key] == null
                        ? ""
                        : payload[key];

                form.appendChild(
                    input
                );

            });


        document.body.appendChild(
            form
        );


        try {

            form.submit();


            status.textContent =
                "Final quotation submitted. Latest PDF is being stored.";

        }

        catch (error) {

            status.textContent =
                "Quotation created, but database submission could not start.";

        }


        setTimeout(
            function () {

                form.remove();

                iframe.remove();

            },
            10000
        );

    }


    /* =====================================================
       CLOSE PREVIEW
    ===================================================== */

    function closePreview() {

        const modal =
            document.getElementById(
                "aeModal"
            );


        if (!modal) return;


        modal.hidden = true;


        document.body
            .classList
            .remove("ae-modal-open");

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    function init() {

        if (
            document.getElementById(
                "quotation"
            )
        ) {

            createQuotationSystem();

        }

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    }

    else {

        init();

    }

})();
