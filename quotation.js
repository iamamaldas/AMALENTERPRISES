/* =========================================================
   AMAL ENTERPRISES
   FINAL QUOTATION SYSTEM
   Buyer / Supplier / Admin
   WhatsApp + Admin PDF
========================================================= */

(function () {

    "use strict";

    /* =====================================================
       CONFIGURATION
    ===================================================== */

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
                Quotation Prepared For
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
           GENERATE BUTTON
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
           REPLACE PREVIEW BUTTONS
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
                    WhatsApp

                </button>

                <button
                    type="button"
                    id="amalPDFButton"
                    class="amal-pdf-button"
                    style="display:none;">

                    <i class="fa-solid fa-file-pdf"></i>
                    Save PDF

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


            document
                .getElementById(
                    "amalPDFButton"
                )
                .addEventListener(
                    "click",
                    saveAdminPDF
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

        const pdfButton =
            document.getElementById(
                "amalPDFButton"
            );


        if (role === "admin") {

            adminBox.style.display =
                "block";

            hint.textContent =
                "Admin login is required to create an official quotation.";

            if (adminPreview) {
                adminPreview.style.display =
                    "none";
            }

            if (pdfButton) {
                pdfButton.style.display =
                    "none";
            }

        } else {

            adminBox.style.display =
                "none";

            if (role === "supplier") {

                hint.textContent =
                    "Supplier can provide their price to AMAL ENTERPRISES for review and negotiation.";

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

            if (pdfButton) {
                pdfButton.style.display =
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
       ADMIN LOGIN CHECK
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
           SAVE DATA
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

            msme: MSME_NUMBER,

            date: new Date()

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
           PDF BUTTON
        ================================================= */

        const pdfButton =
            document.getElementById(
                "amalPDFButton"
            );

        if (pdfButton) {

            pdfButton.style.display =
                role === "admin"
                    ? "block"
                    : "none";

        }


        /* =================================================
           SUCCESS FLASH
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


        /* =================================================
           BUYER → ADMIN
        ================================================= */

        if (
            quotationData.role === "buyer"
        ) {

            targetNumber =
                ADMIN_WHATSAPP;

        }


        /* =================================================
           SUPPLIER → ADMIN
        ================================================= */

        if (
            quotationData.role === "supplier"
        ) {

            targetNumber =
                ADMIN_WHATSAPP;

        }


        /* =================================================
           ADMIN → ENTERED BUYER/SUPPLIER
        ================================================= */

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

Date:
${formatDate(quotationData.date)}

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
       ADMIN SAVE PDF
       Uses browser print → Save as PDF
    ===================================================== */

    function saveAdminPDF() {

        if (!quotationData) {

            showPreviewFlash(
                "Generate Admin quotation first",
                "error"
            );

            return;
        }


        if (
            quotationData.role !== "admin"
        ) {

            showPreviewFlash(
                "PDF is available only for Admin quotation",
                "error"
            );

            return;
        }


        if (!isAdminLoggedIn()) {

            showPreviewFlash(
                "Admin login required",
                "error"
            );

            return;
        }


        const quotationNumber =
            createQuotationNumber();


        const pdfWindow =
            window.open(
                "",
                "_blank"
            );


        if (!pdfWindow) {

            showPreviewFlash(
                "Please allow pop-ups to save PDF",
                "error"
            );

            return;
        }


        const date =
            formatDate(
                quotationData.date
            );


        const price =
            quotationData.price
                ? "₹" +
                  formatMoney(
                      quotationData.price
                  )
                : "—";


        const total =
            "₹" +
            formatMoney(
                quotationData.total
            );


        pdfWindow.document.write(`

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<title>
${COMPANY_NAME} - Quotation ${quotationNumber}
</title>

<style>

@page {
    size: A4;
    margin: 18mm;
}

* {
    box-sizing: border-box;
}

body {

    margin: 0;

    font-family:
        Arial,
        Helvetica,
        sans-serif;

    color: #222;

    background: #fff;

}

.container {

    max-width: 760px;

    margin: auto;

}

.header {

    display: flex;

    justify-content: space-between;

    align-items: flex-start;

    padding-bottom: 18px;

    border-bottom:
        2px solid #222;

}

.company {

    font-size: 25px;

    font-weight: 700;

    letter-spacing: .4px;

}

.msme {

    margin-top: 7px;

    font-size: 11px;

    color: #555;

}

.title {

    margin-top: 25px;

    font-size: 21px;

    font-weight: 700;

    letter-spacing: .5px;

}

.meta {

    margin-top: 18px;

    display: grid;

    grid-template-columns:
        1fr 1fr;

    gap: 8px;

}

.meta-box {

    padding: 10px;

    border:
        1px solid #ddd;

}

.label {

    font-size: 9px;

    color: #777;

    text-transform: uppercase;

}

.value {

    margin-top: 4px;

    font-size: 12px;

    font-weight: 600;

}

table {

    width: 100%;

    margin-top: 25px;

    border-collapse: collapse;

}

th {

    padding: 11px;

    text-align: left;

    background: #eeeeee;

    border:
        1px solid #d5d5d5;

    font-size: 10px;

}

td {

    padding: 11px;

    border:
        1px solid #d5d5d5;

    font-size: 11px;

}

.total-row td {

    font-size: 13px;

    font-weight: 700;

}

.specification {

    margin-top: 20px;

    padding: 12px;

    border:
        1px solid #ddd;

}

.spec-title {

    font-size: 10px;

    color: #777;

    margin-bottom: 6px;

    text-transform: uppercase;

}

.spec-text {

    font-size: 11px;

    line-height: 1.5;

}

.note {

    margin-top: 25px;

    padding: 12px;

    background: #f6f6f6;

    border-left:
        3px solid #555;

    font-size: 10px;

    line-height: 1.5;

}

.footer {

    margin-top: 45px;

    padding-top: 12px;

    border-top:
        1px solid #ddd;

    display: flex;

    justify-content: space-between;

    font-size: 9px;

    color: #666;

}

@media print {

    body {
        background: #fff;
    }

}

</style>

</head>


<body>

<div class="container">


    <div class="header">

        <div>

            <div class="company">
                ${COMPANY_NAME}
            </div>

            <div class="msme">
                MSME Registration No.:
                <strong>${MSME_NUMBER}</strong>
            </div>

        </div>

        <div style="text-align:right;">

            <div style="font-size:11px;">
                Quotation No.
            </div>

            <div style="font-size:13px;font-weight:700;margin-top:4px;">
                ${quotationNumber}
            </div>

            <div style="font-size:10px;margin-top:5px;color:#666;">
                ${date}
            </div>

        </div>

    </div>


    <div class="title">
        OFFICIAL QUOTATION
    </div>


    <div class="meta">

        <div class="meta-box">

            <div class="label">
                Buyer / Supplier
            </div>

            <div class="value">
                ${escapeHTML(
                    quotationData.name
                )}
            </div>

        </div>


        <div class="meta-box">

            <div class="label">
                Contact
            </div>

            <div class="value">
                ${escapeHTML(
                    quotationData.mobile
                )}
            </div>

        </div>

    </div>


    <table>

        <thead>

            <tr>

                <th>
                    Product / Material
                </th>

                <th>
                    Quantity
                </th>

                <th>
                    Unit Price
                </th>

                <th>
                    Estimated Total
                </th>

            </tr>

        </thead>


        <tbody>

            <tr>

                <td>
                    ${escapeHTML(
                        quotationData.product
                    )}
                </td>

                <td>
                    ${
                        quotationData.quantity
                            ? quotationData.quantity.toLocaleString("en-IN")
                            : "—"
                    }
                </td>

                <td>
                    ${price}
                </td>

                <td>
                    ${total}
                </td>

            </tr>


            <tr class="total-row">

                <td colspan="3"
                    style="text-align:right;">

                    Estimated Total

                </td>

                <td>

                    ${total}

                </td>

            </tr>

        </tbody>

    </table>


    <div class="specification">

        <div class="spec-title">
            Product Specification / Requirement
        </div>

        <div class="spec-text">

            ${
                escapeHTML(
                    quotationData.details ||
                    "Not specified"
                )
            }

        </div>

    </div>


    <div class="note">

        <strong>
            Commercial Note:
        </strong>

        This quotation is subject to
        commercial discussion, price negotiation,
        availability and final confirmation
        between the concerned parties.

    </div>


    <div class="footer">

        <div>
            Prepared by ${COMPANY_NAME}
        </div>

        <div>
            MSME No. ${MSME_NUMBER}
        </div>

    </div>


</div>


<script>

window.onload = function () {

    setTimeout(function () {

        window.print();

    }, 500);

};

<\/script>


</body>

</html>

        `);


        pdfWindow.document.close();


        showPreviewFlash(
            "PDF quotation opened — choose Save as PDF",
            "success"
        );

    }


    /* =====================================================
       QUOTATION NUMBER
    ===================================================== */

    function createQuotationNumber() {

        const now =
            new Date();

        const year =
            now.getFullYear();

        const month =
            String(
                now.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                now.getDate()
            ).padStart(2, "0");

        const random =
            Math.floor(
                1000 +
                Math.random() * 9000
            );

        return (
            "AE-" +
            year +
            month +
            day +
            "-" +
            random
        );

    }


    /* =====================================================
       DATE
    ===================================================== */

    function formatDate(date) {

        return new Date(date)
            .toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );

    }


    /* =====================================================
       NUMBER NORMALIZATION
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
       HTML ESCAPE
    ===================================================== */

    function escapeHTML(value) {

        return String(value || "")
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    /* =====================================================
       FLASH MESSAGE
       Inside quotation preview box
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
            document.createElement(
                "div"
            );

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
                ${escapeHTML(message)}
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
       START
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
