/* =========================================================
   AMAL ENTERPRISES
   FINAL QUOTATION SYSTEM
   =========================================================
   - No Admin Login
   - No MSME
   - Optional Email
   - Buyer / Supplier / Admin
   - Admin can WhatsApp any recipient
   - Buyer / Supplier -> Admin WhatsApp
   - Final quotation -> Google Sheet + Latest PDF
   - Negotiable -> Preview + WhatsApp only
========================================================= */

(function () {
    "use strict";

    /* ================= CONFIG ================= */

    const COMPANY_NAME = "AMAL ENTERPRISES";

    // Admin WhatsApp / default recipient
    const ADMIN_WHATSAPP = "916296471636";

    // Google Apps Script Web App URL
    const APPS_SCRIPT_URL =
        "PASTE_YOUR_WEB_APP_EXEC_URL_HERE";

    // Must match Code.gs
    const API_TOKEN =
        "CHANGE_THIS_TO_A_LONG_RANDOM_SECRET_9x7Qm2";

    let currentRole = "";


    /* ================= PRODUCT CATEGORIES ================= */

    const PRODUCT_CATEGORIES = [
        "Corrugated Carton Boxes",
        "Packaging Materials",
        "Polyethylene Carry Bags",
        "Biodegradable & Compostable Bags",
        "Other / Custom Product"
    ];


    /* ================= UNITS ================= */

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


    /* ================= HELPERS ================= */

    function numberValue(value) {

        const n = Number.parseFloat(value);

        return Number.isFinite(n) && n >= 0
            ? n
            : 0;
    }


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


    function formatQuantity(value) {

        return numberValue(value).toLocaleString(
            "en-IN",
            {
                maximumFractionDigits: 6
            }
        );
    }


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


    function escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    function quotationNumber() {

        const now = new Date();

        const date =
            now.getFullYear() +
            String(now.getMonth() + 1).padStart(2, "0") +
            String(now.getDate()).padStart(2, "0");

        const random =
            Math.floor(
                1000 + Math.random() * 9000
            );

        return "AE-" + date + "-" + random;
    }


    /* ================= WHATSAPP ================= */

    function normalizeMobile(value) {

        let number =
            String(value || "")
                .replace(/\D/g, "");

        if (number.length === 10) {
            return "91" + number;
        }

        if (
            number.length === 12 &&
            number.startsWith("91")
        ) {
            return number;
        }

        return "";
    }


    function openWhatsApp(
        recipient,
        message
    ) {

        const mobile =
            normalizeMobile(recipient);

        if (!mobile) {

            alert(
                "Please enter a valid 10 digit recipient mobile number."
            );

            return;
        }


        const url =
            "https://wa.me/" +
            mobile +
            "?text=" +
            encodeURIComponent(message);


        window.open(
            url,
            "_blank",
            "noopener"
        );
    }


    /* ================= MAIN HTML ================= */

    function createQuotationSystem() {

        const quotationArea =
            document.getElementById("quotation");

        if (!quotationArea) return;


        quotationArea.innerHTML = `

            <div class="ae-quotation-wrapper">

                <div class="ae-quotation-header">

                    <div>

                        <div class="ae-small-label">
                            B2B COMMERCIAL TOOL
                        </div>

                        <h2>Create Quotation</h2>

                        <p>
                            Prepare, review and share
                            quotations directly through WhatsApp.
                        </p>

                    </div>

                    <div
                        class="ae-admin-status"
                        id="aeAdminStatus">

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


                        <div class="ae-field">

                            <label>
                                Product Category *
                            </label>

                            <select id="aeCategory">

                                <option value="">
                                    Select Product Category
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


                    <!-- ADMIN RECIPIENT -->

                    <div
                        class="ae-field"
                        id="aeAdminRecipientBox"
                        hidden>

                        <label>
                            Send Quotation To Mobile *
                        </label>

                        <input
                            id="aeRecipientMobile"
                            type="tel"
                            inputmode="numeric"
                            maxlength="10"
                            placeholder="Buyer / Supplier / Other mobile number">

                        <small>
                            Admin can share this quotation with anyone.
                        </small>

                    </div>


                    <div
                        class="ae-field"
                        id="aeDefaultAdminRecipient"
                        hidden>

                        <label>
                            Send To
                        </label>

                        <input
                            type="text"
                            value="AMAL ENTERPRISES — 6296471636"
                            readonly>

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
                                    Select Unit
                                </option>

                                ${
                                    UNITS
                                        .map(function (unit) {

                                            return `
                                                <option value="${escapeHTML(unit)}">
                                                    ${escapeHTML(unit)}
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

                            <label class="ae-status-option">

                                <input
                                    type="radio"
                                    name="aeQuotationStatus"
                                    value="Final Quotation">

                                <span>
                                    Final Quotation
                                </span>

                            </label>


                            <label class="ae-status-option">

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


                    <button
                        type="button"
                        class="ae-generate-btn"
                        id="aeGenerateBtn">

                        Create Quotation

                    </button>


                    <div
                        class="ae-save-status"
                        id="aeSaveStatus">
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


    /* ================= EVENTS ================= */

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


    /* ================= ROLE ================= */

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


        const roleName =
            role === "buyer"
                ? "Buyer"
                : role === "supplier"
                    ? "Supplier"
                    : "Admin";


        document
            .getElementById("aeAdminStatus")
            .textContent =
            roleName + " Mode";


        document
            .getElementById("aeRoleTitle")
            .textContent =
            roleName + " Quotation";


        document
            .getElementById("aeFormPanel")
            .hidden = false;


        const adminRecipientBox =
            document.getElementById(
                "aeAdminRecipientBox"
            );


        const defaultAdminRecipient =
            document.getElementById(
                "aeDefaultAdminRecipient"
            );


        if (role === "admin") {

            adminRecipientBox.hidden = false;

            defaultAdminRecipient.hidden = true;

        }

        else {

            adminRecipientBox.hidden = true;

            defaultAdminRecipient.hidden = false;

        }

    }


    /* ================= CALCULATION ================= */

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
                selected.value ===
                "Negotiable"
            );

    }


    /* ================= DATA ================= */

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


        const mobile =
            document
                .getElementById("aeMobile")
                .value
                .replace(/\D/g, "")
                .slice(0, 10);


        const recipient =
            document
                .getElementById("aeRecipientMobile")
                .value
                .replace(/\D/g, "")
                .slice(0, 10);


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
                mobile,

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
                    : "",

            recipient:
                recipient

        };

    }


    /* ================= VALIDATION ================= */

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
                "Please select Unit."
            );

            return false;
        }


        if (!(data.price > 0)) {

            alert(
                "Please enter a valid Unit Price."
            );

            return false;
        }


        if (!data.status) {

            alert(
                "Please select Final Quotation or Negotiable."
            );

            return false;
        }


        /* ADMIN MUST CHOOSE RECIPIENT */

        if (
            data.roleName === "Admin" &&
            !/^[0-9]{10}$/.test(
                data.recipient
            )
        ) {

            alert(
                "Admin: please enter the recipient's 10 digit mobile number."
            );

            return false;
        }


        return true;

    }


    /* ================= GENERATE ================= */

    function generateQuotation() {

        if (!currentRole) {

            alert(
                "Please select Buyer, Supplier or Admin first."
            );

            return;
        }


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


        /* FINAL ONLY -> DATABASE */

        if (
            data.status ===
            "Final Quotation"
        ) {

            saveFinalQuotation(
                data,
                quoteNo
            );

        }

    }


    /* ================= PREVIEW ================= */

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

                        <small>
                            ${escapeHTML(data.category)}
                        </small>

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


    /* ================= ACTION BUTTONS ================= */

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

                ${
                    data.roleName === "Admin"
                        ? "WhatsApp Recipient"
                        : "WhatsApp Admin"
                }

            </button>


            <button
                type="button"
                class="ae-secondary-btn"
                id="aeCloseActionBtn">

                Close

            </button>

        `;


        document
            .getElementById("aeWhatsAppBtn")
            .addEventListener(
                "click",
                function () {

                    let recipient;


                    if (
                        data.roleName ===
                        "Admin"
                    ) {

                        recipient =
                            data.recipient;

                    }

                    else {

                        recipient =
                            ADMIN_WHATSAPP;

                    }


                    openWhatsApp(
                        recipient,
                        createWhatsAppMessage(
                            data,
                            quoteNo
                        )
                    );

                }
            );


        document
            .getElementById("aeCloseActionBtn")
            .addEventListener(
                "click",
                closePreview
            );

    }


    /* ================= WHATSAPP MESSAGE ================= */

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
Mobile: ${data.mobile}`;

        if (data.email) {

            message +=
                `\nEmail: ${data.email}`;

        }


        message +=

`

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


        if (
            data.roleName ===
            "Buyer"
        ) {

            message +=

`

Please confirm the requirement and commercial terms.`;

        }


        if (
            data.roleName ===
            "Admin"
        ) {

            message +=

`

Prepared by:
${COMPANY_NAME}`;

        }


        return message;

    }


    /* ================= GOOGLE SHEET + PDF ================= */

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
                "Quotation created. Google Sheet is not connected yet.";

            return;
        }


        status.textContent =
            "Saving final quotation...";


        const iframeName =
            "aeQuotationFrame_" +
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


        Object.keys(payload)
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
                "Final quotation submitted. Latest PDF is being saved.";

        }

        catch (error) {

            status.textContent =
                "Quotation created, but database submission failed.";

        }


        setTimeout(
            function () {

                form.remove();
                iframe.remove();

            },
            10000
        );

    }


    /* ================= CLOSE ================= */

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


    /* ================= INIT ================= */

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
