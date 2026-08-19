/* =========================================================
   AMAL ENTERPRISES
   FINAL QUOTATION SYSTEM
   ---------------------------------------------------------
   DO NOT EDIT index.html
   DO NOT EDIT fix.js
========================================================= */

(function () {

    "use strict";

    /* =====================================================
       CONFIGURATION
    ===================================================== */

    const ADMIN_LOGIN = "office.amaldas@gmail.com";
    const ADMIN_PASSWORD = "amal0706";

    const WHATSAPP_NUMBER = "916296471636";

    const COMPANY_NAME = "AMAL ENTERPRISES";
    const MSME_NUMBER = "XXXX";

    let currentRole = "";
    let adminLoggedIn = false;


    /* =====================================================
       UNIT DEFINITIONS
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


    /* =====================================================
       SAFE NUMBER
    ===================================================== */

    function numberValue(value) {

        const number = parseFloat(value);

        return Number.isFinite(number) && number >= 0
            ? number
            : 0;

    }


    /* =====================================================
       FORMAT MONEY
    ===================================================== */

    function formatMoney(value) {

        return "₹" + Number(value || 0).toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

    }


    /* =====================================================
       FORMAT QUANTITY
    ===================================================== */

    function formatQuantity(value) {

        const n = numberValue(value);

        if (!n) return "0";

        return n.toLocaleString(
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
       ESCAPE HTML
    ===================================================== */

    function escapeHTML(value) {

        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       WHATSAPP
    ===================================================== */

    function openWhatsApp(message) {

        const url =
            "https://wa.me/" +
            WHATSAPP_NUMBER +
            "?text=" +
            encodeURIComponent(message);

        window.open(url, "_blank");

    }


    /* =====================================================
       CREATE QUOTATION NUMBER
    ===================================================== */

    function quotationNumber() {

        const now = new Date();

        const year =
            now.getFullYear();

        const month =
            String(now.getMonth() + 1)
                .padStart(2, "0");

        const day =
            String(now.getDate())
                .padStart(2, "0");

        const random =
            Math.floor(
                1000 + Math.random() * 9000
            );

        return "AE-" +
            year +
            month +
            day +
            "-" +
            random;

    }


    /* =====================================================
       MAIN HTML
    ===================================================== */

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
                            Prepare, negotiate and share
                            quotations directly through WhatsApp.
                        </p>
                    </div>

                    <div class="ae-admin-status"
                         id="aeAdminStatus">
                        Admin Locked
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


                <!-- ADMIN LOGIN -->

                <div
                    class="ae-admin-login"
                    id="aeAdminLogin"
                    hidden>

                    <div class="ae-field-label">
                        Admin Login
                    </div>

                    <input
                        type="email"
                        id="aeAdminEmail"
                        placeholder="Login ID">

                    <input
                        type="password"
                        id="aeAdminPassword"
                        placeholder="Password">

                    <button
                        type="button"
                        class="ae-login-btn"
                        id="aeLoginBtn">

                        Admin Login

                    </button>

                    <div
                        class="ae-login-message"
                        id="aeLoginMessage">
                    </div>

                </div>


                <!-- FORM -->

                <div
                    class="ae-form-panel"
                    id="aeFormPanel"
                    hidden>

                    <div class="ae-form-role-title"
                         id="aeRoleTitle">
                    </div>


                    <div class="ae-form-grid">

                        <div class="ae-field">

                            <label>Name</label>

                            <input
                                id="aeName"
                                type="text"
                                placeholder="Enter name">

                        </div>


                        <div class="ae-field">

                            <label>Company Name</label>

                            <input
                                id="aeCompany"
                                type="text"
                                placeholder="Enter company name">

                        </div>


                        <div class="ae-field">

                            <label>Mobile Number</label>

                            <input
                                id="aeMobile"
                                type="tel"
                                inputmode="numeric"
                                maxlength="10"
                                placeholder="10 digit mobile number">

                        </div>


                        <div class="ae-field">

                            <label>Product / Material</label>

                            <input
                                id="aeProduct"
                                type="text"
                                placeholder="Product or material">

                        </div>


                    </div>


                    <div class="ae-field">

                        <label>Product Specification</label>

                        <textarea
                            id="aeSpecification"
                            rows="3"
                            placeholder="Size, colour, thickness, GSM, quality, packing requirement etc."></textarea>

                    </div>


                    <!-- QUANTITY -->

                    <div class="ae-quantity-row">

                        <div class="ae-field">

                            <label>Quantity</label>

                            <input
                                id="aeQuantity"
                                type="number"
                                min="0"
                                step="any"
                                placeholder="Enter quantity">

                        </div>


                        <div class="ae-field">

                            <label>Unit</label>

                            <select id="aeUnit">

                                <option value="">
                                    Select Unit
                                </option>

                                ${UNITS.map(unit => `
                                    <option value="${unit}">
                                        ${unit}
                                    </option>
                                `).join("")}

                            </select>

                        </div>


                        <div class="ae-field">

                            <label>Unit Price</label>

                            <input
                                id="aePrice"
                                type="number"
                                min="0"
                                step="any"
                                placeholder="Price per selected unit">

                        </div>

                    </div>


                    <!-- STATUS -->

                    <div class="ae-status-section">

                        <div class="ae-field-label">
                            Quotation Status
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


                    <div class="ae-negotiation-note"
                         id="aeNegotiationNote">

                        Negotiable quotations may be discussed
                        directly between the relevant parties.

                    </div>


                    <button
                        type="button"
                        class="ae-generate-btn"
                        id="aeGenerateBtn">

                        Generate Quotation

                    </button>

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


                    <div class="ae-action-buttons"
                         id="aeActionButtons">

                    </div>

                </div>

            </div>

        `;


        bindEvents();

    }


    /* =====================================================
       ROLE BUTTONS
    ===================================================== */

    function bindEvents() {

        document
            .querySelectorAll(".ae-role-btn")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const role =
                            button.dataset.role;

                        selectRole(role);

                    }
                );

            });


        document
            .getElementById("aeLoginBtn")
            .addEventListener(
                "click",
                adminLogin
            );


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
                        event.target === this
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


        const loginBox =
            document.getElementById("aeAdminLogin");

        const form =
            document.getElementById("aeFormPanel");


        if (role === "admin") {

            form.hidden = true;

            loginBox.hidden =
                adminLoggedIn;

            if (adminLoggedIn) {

                showForm("Admin");

            }

        }
        else {

            loginBox.hidden = true;

            adminLoggedIn = false;

            showForm(
                role === "buyer"
                    ? "Buyer"
                    : "Supplier"
            );

        }

    }


    /* =====================================================
       ADMIN LOGIN
    ===================================================== */

    function adminLogin() {

        const email =
            document
                .getElementById("aeAdminEmail")
                .value
                .trim();

        const password =
            document
                .getElementById("aeAdminPassword")
                .value;


        const message =
            document.getElementById(
                "aeLoginMessage"
            );


        if (
            email === ADMIN_LOGIN &&
            password === ADMIN_PASSWORD
        ) {

            adminLoggedIn = true;

            message.textContent =
                "Admin login successful.";

            message.className =
                "ae-login-message success";


            document
                .getElementById(
                    "aeAdminLogin"
                )
                .hidden = true;


            showForm("Admin");

        }
        else {

            adminLoggedIn = false;

            message.textContent =
                "Invalid Admin login details.";

            message.className =
                "ae-login-message error";

        }

    }


    /* =====================================================
       SHOW FORM
    ===================================================== */

    function showForm(roleName) {

        const form =
            document.getElementById(
                "aeFormPanel"
            );

        form.hidden = false;


        document
            .getElementById("aeRoleTitle")
            .textContent =
            roleName + " Quotation";


        const status =
            document.getElementById(
                "aeAdminStatus"
            );


        if (roleName === "Admin") {

            status.textContent =
                "Admin Unlocked";

            status.classList.add(
                "unlocked"
            );

        }
        else {

            status.textContent =
                roleName + " Mode";

            status.classList.remove(
                "unlocked"
            );

        }

    }


    /* =====================================================
       LIVE CALCULATION
    ===================================================== */

    function updateLiveCalculation() {

        const quantity =
            numberValue(
                document.getElementById(
                    "aeQuantity"
                ).value
            );

        const price =
            numberValue(
                document.getElementById(
                    "aePrice"
                ).value
            );

        const total =
            quantity * price;


        const note =
            document.getElementById(
                "aeNegotiationNote"
            );


        const selected =
            document.querySelector(
                'input[name="aeQuotationStatus"]:checked'
            );


        if (
            selected &&
            selected.value === "Negotiable"
        ) {

            note.style.display = "block";

        }
        else {

            note.style.display = "none";

        }

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
                document.getElementById(
                    "aeQuantity"
                ).value
            );


        const price =
            numberValue(
                document.getElementById(
                    "aePrice"
                ).value
            );


        return {

            role:
                currentRole,

            roleName:
                currentRole === "admin"
                    ? "Admin"
                    : currentRole === "buyer"
                        ? "Buyer"
                        : "Supplier",

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
                    .trim(),

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

        if (!data.name) {

            alert("Please enter Name.");

            return false;

        }


        if (!data.company) {

            alert("Please enter Company Name.");

            return false;

        }


        if (
            !/^[0-9]{10}$/.test(
                data.mobile.replace(/\D/g, "")
            )
        ) {

            alert(
                "Please enter a valid 10 digit mobile number."
            );

            return false;

        }


        if (!data.product) {

            alert(
                "Please enter Product / Material."
            );

            return false;

        }


        if (!data.quantity || data.quantity <= 0) {

            alert("Please enter a valid quantity.");

            return false;

        }


        if (!data.unit) {

            alert("Please select a unit.");

            return false;

        }


        if (!data.price || data.price < 0) {

            alert("Please enter a valid unit price.");

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
       GENERATE
    ===================================================== */

    function generateQuotation() {

        if (
            currentRole === "admin" &&
            !adminLoggedIn
        ) {

            alert("Please login as Admin first.");

            return;

        }


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

    }


    /* =====================================================
       PREVIEW
    ===================================================== */

    function showPreview(
        data,
        quoteNo
    ) {

        const documentBox =
            document.getElementById(
                "aePreviewDocument"
            );


        const roleLabel =
            escapeHTML(
                data.roleName
            );


        documentBox.innerHTML = `

            <div class="ae-preview-top">

                <div>

                    <div class="ae-preview-company">
                        ${COMPANY_NAME}
                    </div>

                    ${
                        data.roleName === "Admin"
                            ? `
                                <div class="ae-preview-msme">
                                    MSME Registration No.:
                                    ${MSME_NUMBER}
                                </div>
                              `
                            : ""
                    }

                </div>

                <div class="ae-preview-quote-info">

                    <strong>
                        QUOTATION
                    </strong>

                    <span>
                        ${quoteNo}
                    </span>

                    <span>
                        ${getDate()}
                    </span>

                </div>

            </div>


            <div class="ae-preview-role">

                ${roleLabel} Quotation

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

            </div>


            <div class="ae-preview-table">

                <div class="ae-preview-table-head">

                    <span>Product</span>
                    <span>Qty</span>
                    <span>Unit Price</span>
                    <span>Total</span>

                </div>


                <div class="ae-preview-table-row">

                    <span>
                        ${escapeHTML(data.product)}
                    </span>

                    <span>
                        ${formatQuantity(data.quantity)}
                        ${escapeHTML(data.unit)}
                    </span>

                    <span>
                        ${formatMoney(data.price)}
                        / ${escapeHTML(data.unit)}
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
                                Specification
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
                            data.status === "Negotiable"
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
                data.status === "Negotiable"
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


        const modal =
            document.getElementById(
                "aeModal"
            );

        modal.hidden = false;

        document.body.classList.add(
            "ae-modal-open"
        );

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


        let html = `

            <button
                type="button"
                class="ae-whatsapp-btn"
                id="aeWhatsAppBtn">

                <i class="fa-brands fa-whatsapp"></i>
                WhatsApp

            </button>

        `;


        if (
            data.roleName === "Admin"
        ) {

            html += `

                <button
                    type="button"
                    class="ae-pdf-btn"
                    id="aePdfBtn">

                    Save PDF

                </button>

            `;

        }


        html += `

            <button
                type="button"
                class="ae-secondary-btn"
                id="aeCloseActionBtn">

                Close

            </button>

        `;


        buttons.innerHTML = html;


        document
            .getElementById("aeWhatsAppBtn")
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


        const pdfButton =
            document.getElementById(
                "aePdfBtn"
            );


        if (pdfButton) {

            pdfButton.addEventListener(
                "click",
                function () {

                    savePDF(
                        data,
                        quoteNo
                    );

                }
            );

        }


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
Mobile: ${data.mobile}

Product: ${data.product}
Quantity: ${formatQuantity(data.quantity)} ${data.unit}
Unit Price: ${formatMoney(data.price)} / ${data.unit}
Estimated Total: ${formatMoney(data.total)}

Quotation Status: *${data.status}*`;


        if (data.specification) {

            message +=

`

Specification:
${data.specification}`;

        }


        if (
            data.status ===
            "Negotiable"
        ) {

            message +=

`

Price is negotiable.
Commercial terms can be discussed.`

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
AMAL ENTERPRISES
MSME Registration No.: ${MSME_NUMBER}`;

        }


        return message;

    }


    /* =====================================================
       SAVE PDF
       Uses browser print dialog → Save as PDF
       No external library required.
    ===================================================== */

    function savePDF(
        data,
        quoteNo
    ) {

        const preview =
            document.getElementById(
                "aePreviewDocument"
            );


        const printWindow =
            window.open(
                "",
                "_blank",
                "width=900,height=900"
            );


        if (!printWindow) {

            alert(
                "Please allow pop-ups to save the PDF."
            );

            return;

        }


        printWindow.document.write(`

            <!DOCTYPE html>

            <html>

            <head>

                <title>
                    ${COMPANY_NAME} - ${quoteNo}
                </title>

                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0">

                <style>

                    * {
                        box-sizing:border-box;
                    }

                    body {
                        margin:0;
                        padding:35px;
                        font-family:
                            Arial,
                            Helvetica,
                            sans-serif;
                        color:#222;
                        background:#fff;
                    }

                    .pdf-page {
                        max-width:850px;
                        margin:auto;
                    }

                    .ae-preview-top {
                        display:flex;
                        justify-content:space-between;
                        border-bottom:2px solid #222;
                        padding-bottom:18px;
                    }

                    .ae-preview-company {
                        font-size:25px;
                        font-weight:700;
                    }

                    .ae-preview-msme {
                        margin-top:6px;
                        font-size:12px;
                        color:#555;
                    }

                    .ae-preview-quote-info {
                        text-align:right;
                        display:flex;
                        flex-direction:column;
                        gap:4px;
                        font-size:12px;
                    }

                    .ae-preview-quote-info strong {
                        font-size:18px;
                    }

                    .ae-preview-role {
                        margin:20px 0;
                        font-size:16px;
                        font-weight:700;
                    }

                    .ae-preview-contact-grid {
                        display:grid;
                        grid-template-columns:
                            repeat(3,1fr);
                        gap:15px;
                        margin-bottom:25px;
                    }

                    .ae-preview-contact-grid div {
                        border:1px solid #ddd;
                        padding:12px;
                    }

                    small {
                        display:block;
                        color:#777;
                        font-size:10px;
                        margin-bottom:5px;
                    }

                    .ae-preview-table {
                        border:1px solid #ccc;
                    }

                    .ae-preview-table-head,
                    .ae-preview-table-row {
                        display:grid;
                        grid-template-columns:
                            2fr 1fr 1.3fr 1.2fr;
                    }

                    .ae-preview-table-head span,
                    .ae-preview-table-row span,
                    .ae-preview-table-row strong {
                        padding:12px;
                        border-right:1px solid #ddd;
                    }

                    .ae-preview-table-head {
                        background:#eee;
                        font-weight:700;
                    }

                    .ae-preview-spec {
                        margin-top:20px;
                        border:1px solid #ddd;
                        padding:12px;
                    }

                    .ae-preview-spec p {
                        margin:0;
                        white-space:pre-wrap;
                        line-height:1.5;
                    }

                    .ae-preview-bottom {
                        display:flex;
                        justify-content:space-between;
                        margin-top:25px;
                        padding-top:18px;
                        border-top:1px solid #ccc;
                    }

                    .ae-preview-total {
                        text-align:right;
                    }

                    .ae-preview-total strong {
                        font-size:20px;
                    }

                    .ae-preview-note {
                        margin-top:18px;
                        padding:12px;
                        border:1px solid #ccc;
                        font-size:12px;
                    }

                    @media print {

                        body {
                            padding:0;
                        }

                    }

                </style>

            </head>

            <body>

                <div class="pdf-page">

                    ${preview.innerHTML}

                </div>

                <script>

                    window.onload = function () {
                        setTimeout(function () {
                            window.print();
                        }, 300);
                    };

                <\/script>

            </body>

            </html>

        `);


        printWindow.document.close();

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

        document.body.classList.remove(
            "ae-modal-open"
        );

    }


    /* =====================================================
       ADMIN LOGOUT WHEN PAGE/QUOTATION WINDOW IS CLOSED
    ===================================================== */

    window.addEventListener(
        "beforeunload",
        function () {

            adminLoggedIn = false;
            currentRole = "";

        }
    );


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
