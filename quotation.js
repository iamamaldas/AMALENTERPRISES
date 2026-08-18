/* =========================================================
   AMAL ENTERPRISES
   WHATSAPP QUOTATION SYSTEM
   Version 1.0

   This file automatically replaces the existing quotation
   builder inside #quotation.

   index.html quotation HTML does NOT need to be edited.
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       BUSINESS CONFIGURATION
       >>> CHANGE ONLY THESE VALUES
    ===================================================== */

    const CONFIG = {

        companyName: "AMAL ENTERPRISES",

        /*
         * Put your official WhatsApp number here.
         * India example:
         * 919876543210
         *
         * Do NOT use +, spaces or brackets.
         */
        adminWhatsApp: "91XXXXXXXXXX",

        /*
         * Your MSME registration number
         */
        msmeNumber: "YOUR MSME REGISTRATION NUMBER",

        /*
         * Your logo path
         */
        logoPath: "assets/logo.png",

        /*
         * Frontend demo admin login.
         *
         * IMPORTANT:
         * This is NOT secure authentication.
         * Use backend authentication later.
         */
        adminId: "admin",

        adminPassword: "CHANGE_THIS_PASSWORD"

    };


    /* =====================================================
       WAIT UNTIL PAGE IS READY
    ===================================================== */

    function initQuotationSystem() {

        const quotationSection =
            document.getElementById("quotation");

        if (!quotationSection) {
            return;
        }


        /* Prevent duplicate initialization */

        if (
            quotationSection.dataset.quotationSystemReady === "true"
        ) {
            return;
        }

        quotationSection.dataset.quotationSystemReady = "true";


        createQuotationInterface(
            quotationSection
        );

    }


    /* =====================================================
       CREATE NEW QUOTATION INTERFACE
    ===================================================== */

    function createQuotationInterface(section) {

        section.innerHTML = `

            <div class="ae-quotation-wrapper">

                <div class="section-label">
                    WHATSAPP QUOTATION SYSTEM
                </div>


                <!-- ROLE SELECTOR -->

                <div class="ae-role-box">

                    <label>
                        Request Type
                    </label>

                    <select id="aeRole">

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

                </div>


                <!-- BUYER FORM -->

                <div
                    id="aeBuyerForm"
                    class="ae-form-panel"
                    style="display:none;">

                    <div class="ae-form-title">
                        Buyer Requirement
                    </div>

                    <input
                        id="aeBuyerName"
                        type="text"
                        placeholder="Buyer / Company Name"
                    >

                    <input
                        id="aeBuyerMobile"
                        type="tel"
                        placeholder="Mobile Number"
                    >

                    <select id="aeBuyerProduct">

                        <option value="">
                            Select Product
                        </option>

                        <option>
                            Biodegradable Bags
                        </option>

                        <option>
                            Compostable Bags
                        </option>

                        <option>
                            Polyethylene Carry Bags
                        </option>

                        <option>
                            Corrugated Carton Boxes
                        </option>

                        <option>
                            Packaging Materials
                        </option>

                        <option>
                            Jute / Natural Fibre Bags
                        </option>

                        <option>
                            Other
                        </option>

                    </select>

                    <div class="ae-two-column">

                        <input
                            id="aeBuyerQuantity"
                            type="number"
                            min="1"
                            placeholder="Quantity"
                        >

                        <input
                            id="aeBuyerTargetPrice"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="Target Price (Optional)"
                        >

                    </div>

                    <textarea
                        id="aeBuyerDetails"
                        rows="4"
                        placeholder="Product specification / requirements"
                    ></textarea>

                    <button
                        type="button"
                        id="aeBuyerSend"
                        class="ae-whatsapp-button">

                        Send Requirement on WhatsApp

                    </button>

                </div>


                <!-- SUPPLIER FORM -->

                <div
                    id="aeSupplierForm"
                    class="ae-form-panel"
                    style="display:none;">

                    <div class="ae-form-title">
                        Supplier Quotation
                    </div>

                    <input
                        id="aeSupplierName"
                        type="text"
                        placeholder="Supplier / Company Name"
                    >

                    <input
                        id="aeSupplierMobile"
                        type="tel"
                        placeholder="Supplier Mobile Number"
                    >

                    <select id="aeSupplierProduct">

                        <option value="">
                            Select Product
                        </option>

                        <option>
                            Biodegradable Bags
                        </option>

                        <option>
                            Compostable Bags
                        </option>

                        <option>
                            Polyethylene Carry Bags
                        </option>

                        <option>
                            Corrugated Carton Boxes
                        </option>

                        <option>
                            Packaging Materials
                        </option>

                        <option>
                            Jute / Natural Fibre Bags
                        </option>

                        <option>
                            Other
                        </option>

                    </select>

                    <div class="ae-two-column">

                        <input
                            id="aeSupplierQuantity"
                            type="number"
                            min="1"
                            placeholder="Available Quantity"
                        >

                        <input
                            id="aeSupplierMOQ"
                            type="number"
                            min="1"
                            placeholder="MOQ"
                        >

                    </div>


                    <!-- SUPPLIER PRICE -->

                    <input
                        id="aeSupplierPrice"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Supplier Quoted Unit Price (₹)"
                    >


                    <input
                        id="aeSupplierDelivery"
                        type="text"
                        placeholder="Delivery / Transport Details"
                    >


                    <textarea
                        id="aeSupplierDetails"
                        rows="4"
                        placeholder="Specification / Supply Details / Remarks"
                    ></textarea>


                    <button
                        type="button"
                        id="aeSupplierSend"
                        class="ae-whatsapp-button">

                        Send Supplier Quote on WhatsApp

                    </button>

                </div>


                <!-- ADMIN LOGIN -->

                <div
                    id="aeAdminLogin"
                    class="ae-form-panel"
                    style="display:none;">

                    <div class="ae-form-title">
                        Admin Login
                    </div>

                    <input
                        id="aeAdminId"
                        type="text"
                        placeholder="Admin Login ID"
                        autocomplete="username"
                    >

                    <input
                        id="aeAdminPassword"
                        type="password"
                        placeholder="Admin Password"
                        autocomplete="current-password"
                    >

                    <button
                        type="button"
                        id="aeAdminLoginButton"
                        class="ae-admin-button">

                        Admin Login

                    </button>

                    <div
                        id="aeLoginMessage"
                        class="ae-login-message">
                    </div>

                </div>


                <!-- ADMIN PANEL -->

                <div
                    id="aeAdminPanel"
                    class="ae-admin-panel"
                    style="display:none;">

                    <div class="ae-admin-header">

                        <div>

                            <div class="ae-admin-title">
                                AMAL ENTERPRISES
                            </div>

                            <div class="ae-admin-subtitle">
                                Admin Quotation &amp; Negotiation
                            </div>

                        </div>

                        <button
                            type="button"
                            id="aeAdminLogout"
                            class="ae-logout-button">

                            Logout

                        </button>

                    </div>


                    <!-- BUYER FINAL QUOTATION -->

                    <div class="ae-admin-card">

                        <div class="ae-form-title">
                            Final Buyer Quotation
                        </div>

                        <input
                            id="aeAdminBuyerName"
                            type="text"
                            placeholder="Buyer / Company Name"
                        >

                        <input
                            id="aeAdminBuyerMobile"
                            type="tel"
                            placeholder="Buyer WhatsApp Number"
                        >

                        <input
                            id="aeAdminProduct"
                            type="text"
                            placeholder="Product"
                        >

                        <div class="ae-two-column">

                            <input
                                id="aeAdminQuantity"
                                type="number"
                                min="1"
                                placeholder="Quantity"
                            >

                            <input
                                id="aeAdminFinalPrice"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Final Unit Price (₹)"
                            >

                        </div>

                        <textarea
                            id="aeAdminTerms"
                            rows="4"
                            placeholder="Terms & Conditions"
                        ></textarea>


                        <button
                            type="button"
                            id="aeSendFinalQuotation"
                            class="ae-whatsapp-button">

                            Send Official Quotation on WhatsApp

                        </button>

                    </div>


                    <!-- SUPPLIER NEGOTIATION -->

                    <div class="ae-admin-card">

                        <div class="ae-form-title">
                            Supplier Price Negotiation
                        </div>

                        <input
                            id="aeNegotiationSupplier"
                            type="text"
                            placeholder="Supplier / Company Name"
                        >

                        <input
                            id="aeNegotiationMobile"
                            type="tel"
                            placeholder="Supplier WhatsApp Number"
                        >

                        <input
                            id="aeNegotiationProduct"
                            type="text"
                            placeholder="Product"
                        >

                        <div class="ae-two-column">

                            <input
                                id="aeSupplierCurrentPrice"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Current Supplier Price ₹"
                            >

                            <input
                                id="aeSupplierExpectedPrice"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Your Target Price ₹"
                            >

                        </div>

                        <textarea
                            id="aeSupplierNegotiationMessage"
                            rows="3"
                            placeholder="Negotiation message"
                        ></textarea>

                        <button
                            type="button"
                            id="aeNegotiateSupplier"
                            class="ae-whatsapp-button">

                            Negotiate With Supplier

                        </button>

                    </div>


                    <!-- BUYER NEGOTIATION -->

                    <div class="ae-admin-card">

                        <div class="ae-form-title">
                            Buyer Price Negotiation
                        </div>

                        <input
                            id="aeNegotiationBuyer"
                            type="text"
                            placeholder="Buyer / Company Name"
                        >

                        <input
                            id="aeNegotiationBuyerMobile"
                            type="tel"
                            placeholder="Buyer WhatsApp Number"
                        >

                        <input
                            id="aeNegotiationBuyerProduct"
                            type="text"
                            placeholder="Product"
                        >

                        <input
                            id="aeNegotiationBuyerPrice"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="Proposed Unit Price ₹"
                        >

                        <textarea
                            id="aeBuyerNegotiationMessage"
                            rows="3"
                            placeholder="Negotiation message"
                        ></textarea>

                        <button
                            type="button"
                            id="aeNegotiateBuyer"
                            class="ae-whatsapp-button">

                            Negotiate With Buyer

                        </button>

                    </div>

                </div>

            </div>
        `;


        bindQuotationEvents();

    }


    /* =====================================================
       EVENT HANDLERS
    ===================================================== */

    function bindQuotationEvents() {

        const role =
            document.getElementById("aeRole");


        role.addEventListener(
            "change",
            function () {

                hideAllPanels();


                if (this.value === "buyer") {

                    show("aeBuyerForm");

                }


                if (this.value === "supplier") {

                    show("aeSupplierForm");

                }


                if (this.value === "admin") {

                    show("aeAdminLogin");

                }

            }
        );


        document
            .getElementById("aeBuyerSend")
            .addEventListener(
                "click",
                sendBuyerRequirement
            );


        document
            .getElementById("aeSupplierSend")
            .addEventListener(
                "click",
                sendSupplierQuote
            );


        document
            .getElementById("aeAdminLoginButton")
            .addEventListener(
                "click",
                adminLogin
            );


        document
            .getElementById("aeAdminLogout")
            .addEventListener(
                "click",
                adminLogout
            );


        document
            .getElementById("aeSendFinalQuotation")
            .addEventListener(
                "click",
                sendFinalQuotation
            );


        document
            .getElementById("aeNegotiateSupplier")
            .addEventListener(
                "click",
                negotiateSupplier
            );


        document
            .getElementById("aeNegotiateBuyer")
            .addEventListener(
                "click",
                negotiateBuyer
            );

    }


    /* =====================================================
       BUYER → ADMIN WHATSAPP
    ===================================================== */

    function sendBuyerRequirement() {

        const name =
            value("aeBuyerName");

        const mobile =
            value("aeBuyerMobile");

        const product =
            value("aeBuyerProduct");

        const quantity =
            value("aeBuyerQuantity");

        const targetPrice =
            value("aeBuyerTargetPrice");

        const details =
            value("aeBuyerDetails");


        if (
            !name ||
            !mobile ||
            !product ||
            !quantity
        ) {

            alert(
                "Please fill Buyer Name, Mobile Number, Product and Quantity."
            );

            return;

        }


        let message =

`*AMAL ENTERPRISES - BUYER REQUIREMENT*

Buyer / Company: ${name}

Mobile: ${mobile}

Product: ${product}

Quantity: ${quantity}`;


        if (targetPrice) {

            message +=
                `\nTarget / Budget Price: ₹${targetPrice}`;

        }


        message +=

`

Specification / Requirement:
${details || "Not provided"}

Please review this buyer requirement and contact the buyer if required.`;


        openWhatsApp(
            CONFIG.adminWhatsApp,
            message
        );

    }


    /* =====================================================
       SUPPLIER → ADMIN WHATSAPP
       SUPPLIER PRICE IS INCLUDED
    ===================================================== */

    function sendSupplierQuote() {

        const name =
            value("aeSupplierName");

        const mobile =
            value("aeSupplierMobile");

        const product =
            value("aeSupplierProduct");

        const quantity =
            value("aeSupplierQuantity");

        const moq =
            value("aeSupplierMOQ");

        const price =
            value("aeSupplierPrice");

        const delivery =
            value("aeSupplierDelivery");

        const details =
            value("aeSupplierDetails");


        if (
            !name ||
            !mobile ||
            !product ||
            !price
        ) {

            alert(
                "Please fill Supplier Name, Mobile, Product and Supplier Price."
            );

            return;

        }


        let message =

`*AMAL ENTERPRISES - SUPPLIER QUOTATION*

Supplier / Company: ${name}

Mobile: ${mobile}

Product: ${product}

Supplier Quoted Unit Price: ₹${price}`;


        if (quantity) {

            message +=
                `\nAvailable Quantity: ${quantity}`;

        }


        if (moq) {

            message +=
                `\nMOQ: ${moq}`;

        }


        if (delivery) {

            message +=
                `\nDelivery / Transport: ${delivery}`;

        }


        message +=

`

Specification / Supply Details:
${details || "Not provided"}

Please review and negotiate if required.`;


        /*
         * Supplier price goes ONLY to Admin.
         * It is not sent to buyer.
         */

        openWhatsApp(
            CONFIG.adminWhatsApp,
            message
        );

    }


    /* =====================================================
       ADMIN LOGIN
    ===================================================== */

    function adminLogin() {

        const id =
            value("aeAdminId");

        const password =
            value("aeAdminPassword");

        const message =
            document.getElementById(
                "aeLoginMessage"
            );


        if (
            id === CONFIG.adminId &&
            password === CONFIG.adminPassword
        ) {

            sessionStorage.setItem(
                "aeAdminLoggedIn",
                "true"
            );


            hide("aeAdminLogin");

            show("aeAdminPanel");

            message.textContent = "";

        } else {

            message.textContent =
                "Invalid Admin Login ID or Password.";

        }

    }


    /* =====================================================
       ADMIN LOGOUT
    ===================================================== */

    function adminLogout() {

        sessionStorage.removeItem(
            "aeAdminLoggedIn"
        );


        hide("aeAdminPanel");

        show("aeAdminLogin");

        document.getElementById(
            "aeAdminId"
        ).value = "";

        document.getElementById(
            "aeAdminPassword"
        ).value = "";

    }


    /* =====================================================
       ADMIN → OFFICIAL BUYER QUOTATION
    ===================================================== */

    function sendFinalQuotation() {

        const buyer =
            value("aeAdminBuyerName");

        const mobile =
            value("aeAdminBuyerMobile");

        const product =
            value("aeAdminProduct");

        const quantity =
            parseFloat(
                value("aeAdminQuantity")
            );

        const price =
            parseFloat(
                value("aeAdminFinalPrice")
            );

        const terms =
            value("aeAdminTerms");


        if (
            !buyer ||
            !mobile ||
            !product ||
            !quantity ||
            !price
        ) {

            alert(
                "Please complete Buyer, Product, Quantity and Final Price."
            );

            return;

        }


        const total =
            quantity * price;


        const quotationNumber =
            generateQuotationNumber();


        const date =
            new Date().toLocaleDateString(
                "en-IN"
            );


        let message =

`*${CONFIG.companyName}*

*OFFICIAL QUOTATION*

Quotation No: ${quotationNumber}
Date: ${date}

Buyer / Company:
${buyer}

Buyer Mobile:
${mobile}

Product:
${product}

Quantity:
${quantity.toLocaleString("en-IN")}

Final Unit Price:
₹${formatMoney(price)}

*TOTAL AMOUNT: ₹${formatMoney(total)}*

MSME Registration No:
${CONFIG.msmeNumber}

Terms & Conditions:
${terms || "As mutually agreed."}

Thank you for your business.

*${CONFIG.companyName}*`;


        openWhatsApp(
            mobile,
            message
        );

    }


    /* =====================================================
       ADMIN → SUPPLIER PRICE NEGOTIATION
    ===================================================== */

    function negotiateSupplier() {

        const supplier =
            value("aeNegotiationSupplier");

        const mobile =
            value("aeNegotiationMobile");

        const product =
            value("aeNegotiationProduct");

        const currentPrice =
            value("aeSupplierCurrentPrice");

        const targetPrice =
            value("aeSupplierExpectedPrice");

        const customMessage =
            value(
                "aeSupplierNegotiationMessage"
            );


        if (
            !supplier ||
            !mobile ||
            !product
        ) {

            alert(
                "Please enter Supplier Name, WhatsApp Number and Product."
            );

            return;

        }


        let message =

`Hello ${supplier},

This is AMAL ENTERPRISES.

Regarding:
${product}`;


        if (currentPrice) {

            message +=
                `

Your current quoted price:
₹${currentPrice}`;

        }


        if (targetPrice) {

            message +=
                `

Our target price:
₹${targetPrice}`;

        }


        message +=

`

${customMessage || "Please let us know your best possible price."}

Regards,
${CONFIG.companyName}`;


        openWhatsApp(
            mobile,
            message
        );

    }


    /* =====================================================
       ADMIN → BUYER NEGOTIATION
    ===================================================== */

    function negotiateBuyer() {

        const buyer =
            value("aeNegotiationBuyer");

        const mobile =
            value("aeNegotiationBuyerMobile");

        const product =
            value("aeNegotiationBuyerProduct");

        const price =
            value("aeNegotiationBuyerPrice");

        const customMessage =
            value(
                "aeBuyerNegotiationMessage"
            );


        if (
            !buyer ||
            !mobile ||
            !product
        ) {

            alert(
                "Please enter Buyer Name, WhatsApp Number and Product."
            );

            return;

        }


        let message =

`Hello ${buyer},

This is AMAL ENTERPRISES.

Regarding:
${product}`;


        if (price) {

            message +=
                `

Our proposed price:
₹${price}`;

        }


        message +=

`

${customMessage || "Please let us know your feedback so we can discuss the best possible commercial terms."}

Regards,
${CONFIG.companyName}`;


        openWhatsApp(
            mobile,
            message
        );

    }


    /* =====================================================
       WHATSAPP
    ===================================================== */

    function openWhatsApp(
        phone,
        message
    ) {

        let cleanPhone =
            String(phone)
                .replace(/\D/g, "");


        /*
         * If Indian 10 digit number is entered,
         * automatically add 91.
         */

        if (
            cleanPhone.length === 10
        ) {

            cleanPhone =
                "91" + cleanPhone;

        }


        const url =
            "https://wa.me/" +
            cleanPhone +
            "?text=" +
            encodeURIComponent(message);


        window.open(
            url,
            "_blank"
        );

    }


    /* =====================================================
       HELPERS
    ===================================================== */

    function value(id) {

        const element =
            document.getElementById(id);

        return element
            ? element.value.trim()
            : "";

    }


    function show(id) {

        const element =
            document.getElementById(id);

        if (element) {

            element.style.display =
                "block";

        }

    }


    function hide(id) {

        const element =
            document.getElementById(id);

        if (element) {

            element.style.display =
                "none";

        }

    }


    function hideAllPanels() {

        hide("aeBuyerForm");
        hide("aeSupplierForm");
        hide("aeAdminLogin");
        hide("aeAdminPanel");

    }


    function formatMoney(number) {

        return Number(number)
            .toLocaleString(
                "en-IN",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            );

    }


    function generateQuotationNumber() {

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

        const time =
            String(
                now.getHours()
            ).padStart(2, "0") +
            String(
                now.getMinutes()
            ).padStart(2, "0") +
            String(
                now.getSeconds()
            ).padStart(2, "0");


        return `AE-${year}${month}${day}-${time}`;

    }


    /* =====================================================
       START
    ===================================================== */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initQuotationSystem
        );

    } else {

        initQuotationSystem();

    }

})();
