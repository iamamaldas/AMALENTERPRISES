/* =========================================================
   AMAL ENTERPRISES
   ADVANCED WHATSAPP QUOTATION SYSTEM
   Loaded automatically by fix.js
   No index.html quotation code modification required
========================================================= */

(function () {

    "use strict";

    const CONFIG = {

        companyName: "AMAL ENTERPRISES",

        companyTagline:
            "ECO & PACKAGING SOURCING SOLUTIONS",

        whatsappNumber:
            "916296471636",

        adminLoginId:
            "Amal.das.4930@gmail.com",

        adminPassword:
            "amal0706",

        msmeNumber:
            "XXXX",

        logo:
            "assets/logo.png"

    };


    /* =====================================================
       START
    ===================================================== */

    function initQuotationSystem() {

        if (document.getElementById("amalQuotationSystem")) {
            return;
        }

        const originalQuoteArea =
            document.querySelector(".quote-area");

        if (!originalQuoteArea) {
            return;
        }

        buildQuotationSystem(originalQuoteArea);

    }


    /* =====================================================
       BUILD SYSTEM
    ===================================================== */

    function buildQuotationSystem(originalArea) {

        originalArea.id = "amalQuotationSystem";

        originalArea.innerHTML = `

            <div class="amal-quote-wrapper">

                <!-- HEADER -->

                <div class="amal-quote-header">

                    <div class="amal-brand-small">

                        <img
                            src="${CONFIG.logo}"
                            alt="AMAL ENTERPRISES"
                        >

                        <div>

                            <strong>
                                ${CONFIG.companyName}
                            </strong>

                            <small>
                                ${CONFIG.companyTagline}
                            </small>

                        </div>

                    </div>

                </div>


                <!-- FORM -->

                <div class="amal-quote-form">


                    <!-- ROLE -->

                    <label>
                        Quotation By
                    </label>

                    <select id="amalRole">

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


                    <!-- ADMIN LOGIN -->

                    <div
                        id="amalAdminLogin"
                        class="amal-hidden"
                    >

                        <div class="amal-login-title">
                            🔐 Admin Verification
                        </div>

                        <input
                            type="email"
                            id="amalAdminId"
                            placeholder="Admin Login ID"
                            autocomplete="off"
                        >

                        <input
                            type="password"
                            id="amalAdminPassword"
                            placeholder="Admin Password"
                            autocomplete="off"
                        >

                        <button
                            type="button"
                            id="amalLoginButton"
                            class="amal-secondary-button"
                        >
                            Verify Admin
                        </button>

                        <div
                            id="amalLoginStatus"
                            class="amal-status"
                        ></div>

                    </div>


                    <!-- PERSON -->

                    <label id="amalPersonLabel">
                        Name
                    </label>

                    <input
                        type="text"
                        id="amalPerson"
                        placeholder="Buyer / Supplier Name"
                    >


                    <!-- MOBILE -->

                    <label>
                        Mobile / WhatsApp Number
                    </label>

                    <input
                        type="tel"
                        id="amalMobile"
                        inputmode="numeric"
                        maxlength="15"
                        placeholder="10 digit WhatsApp number"
                    >


                    <!-- ADMIN TARGET -->

                    <div
                        id="amalAdminTarget"
                        class="amal-hidden"
                    >

                        <label>
                            Send Quotation To
                        </label>

                        <select id="amalTargetType">

                            <option value="buyer">
                                Buyer
                            </option>

                            <option value="supplier">
                                Supplier
                            </option>

                        </select>

                    </div>


                    <!-- PRODUCT -->

                    <label>
                        Product / Material
                    </label>

                    <select id="amalProduct">

                        <option value="">
                            Select Product / Material
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


                    <!-- QUANTITY -->

                    <div class="amal-two-column">

                        <div>

                            <label>
                                Quantity
                            </label>

                            <input
                                type="number"
                                id="amalQuantity"
                                min="0"
                                placeholder="Quantity"
                            >

                        </div>


                        <div>

                            <label>
                                Unit
                            </label>

                            <select id="amalUnit">

                                <option>Piece</option>
                                <option>Bag</option>
                                <option>Box</option>
                                <option>Kg</option>
                                <option>Bundle</option>
                                <option>Carton</option>
                                <option>Other</option>

                            </select>

                        </div>

                    </div>


                    <!-- PRICE -->

                    <label>
                        Price / Unit
                    </label>

                    <input
                        type="number"
                        id="amalPrice"
                        min="0"
                        step="0.01"
                        placeholder="Enter price"
                    >


                    <!-- PRICE STATUS -->

                    <div
                        id="amalPriceNote"
                        class="amal-price-note"
                    >
                        Buyer can enter a target / reference price.
                    </div>


                    <!-- DETAILS -->

                    <label>
                        Specification / Requirement
                    </label>

                    <textarea
                        id="amalDetails"
                        rows="3"
                        placeholder="Size, material, GSM, printing, delivery, etc."
                    ></textarea>


                    <!-- NEGOTIATION -->

                    <label>
                        Negotiation Status
                    </label>

                    <select id="amalNegotiation">

                        <option>
                            Price Negotiable
                        </option>

                        <option>
                            Final Price
                        </option>

                        <option>
                            Need Supplier Price
                        </option>

                        <option>
                            Need Buyer Confirmation
                        </option>

                    </select>


                    <!-- GENERATE -->

                    <button
                        type="button"
                        id="amalGenerate"
                        class="amal-generate-button"
                    >

                        🧾 Generate WhatsApp Quotation

                    </button>


                </div>


                <!-- PREVIEW -->

                <div
                    id="amalPreview"
                    class="amal-preview"
                >

                    <div class="amal-preview-top">

                        <img
                            src="${CONFIG.logo}"
                            alt="Logo"
                        >

                        <div>

                            <strong>
                                ${CONFIG.companyName}
                            </strong>

                            <small>
                                MSME Registration:
                                ${CONFIG.msmeNumber}
                            </small>

                        </div>

                    </div>


                    <div class="amal-preview-title">
                        QUOTATION PREVIEW
                    </div>


                    <div class="amal-preview-row">
                        <span>Role</span>
                        <strong id="pvRole">—</strong>
                    </div>

                    <div class="amal-preview-row">
                        <span>Name</span>
                        <strong id="pvPerson">—</strong>
                    </div>

                    <div class="amal-preview-row">
                        <span>Mobile</span>
                        <strong id="pvMobile">—</strong>
                    </div>

                    <div class="amal-preview-row">
                        <span>Product</span>
                        <strong id="pvProduct">—</strong>
                    </div>

                    <div class="amal-preview-row">
                        <span>Quantity</span>
                        <strong id="pvQuantity">—</strong>
                    </div>

                    <div class="amal-preview-row">
                        <span>Price / Unit</span>
                        <strong id="pvPrice">—</strong>
                    </div>

                    <div class="amal-preview-row">
                        <span>Status</span>
                        <strong id="pvNegotiation">—</strong>
                    </div>

                    <div class="amal-preview-total">

                        <span>
                            Estimated Total
                        </span>

                        <strong id="pvTotal">
                            ₹0.00
                        </strong>

                    </div>


                    <div
                        id="pvDetails"
                        class="amal-preview-details"
                    >
                        —
                    </div>


                    <button
                        type="button"
                        id="amalWhatsApp"
                        class="amal-whatsapp-button"
                    >

                        <i class="fa-brands fa-whatsapp"></i>
                        Send via WhatsApp

                    </button>

                </div>

            </div>

        `;


        bindEvents();

    }


    /* =====================================================
       EVENTS
    ===================================================== */

    function bindEvents() {

        const role =
            document.getElementById("amalRole");

        const loginButton =
            document.getElementById("amalLoginButton");

        const generateButton =
            document.getElementById("amalGenerate");

        const whatsappButton =
            document.getElementById("amalWhatsApp");


        role.addEventListener(
            "change",
            handleRoleChange
        );


        loginButton.addEventListener(
            "click",
            verifyAdmin
        );


        generateButton.addEventListener(
            "click",
            generateQuotation
        );


        whatsappButton.addEventListener(
            "click",
            sendWhatsApp
        );

    }


    /* =====================================================
       ROLE CHANGE
    ===================================================== */

    let adminVerified = false;


    function handleRoleChange() {

        const selectedRole =
            document.getElementById("amalRole").value;

        const loginBox =
            document.getElementById("amalAdminLogin");

        const targetBox =
            document.getElementById("amalAdminTarget");

        const personLabel =
            document.getElementById("amalPersonLabel");

        const priceNote =
            document.getElementById("amalPriceNote");

        adminVerified = false;

        loginBox.classList.add("amal-hidden");
        targetBox.classList.add("amal-hidden");


        if (selectedRole === "admin") {

            loginBox.classList.remove("amal-hidden");

            targetBox.classList.remove("amal-hidden");

            personLabel.textContent =
                "Buyer / Supplier Name";

            priceNote.textContent =
                "Admin can negotiate price with both Buyer and Supplier.";

        }

        else if (selectedRole === "supplier") {

            personLabel.textContent =
                "Supplier Name";

            priceNote.textContent =
                "Supplier can submit their own price to AMAL ENTERPRISES.";

        }

        else if (selectedRole === "buyer") {

            personLabel.textContent =
                "Buyer Name";

            priceNote.textContent =
                "Buyer may enter a target/reference price, if available.";

        }

        else {

            personLabel.textContent =
                "Name";

            priceNote.textContent =
                "Select a role first.";

        }

    }


    /* =====================================================
       ADMIN LOGIN
    ===================================================== */

    function verifyAdmin() {

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
                "amalLoginStatus"
            );


        if (
            id === CONFIG.adminLoginId &&
            password === CONFIG.adminPassword
        ) {

            adminVerified = true;

            status.textContent =
                "✓ Admin verified successfully.";

            status.className =
                "amal-status success";

        }

        else {

            adminVerified = false;

            status.textContent =
                "✕ Invalid Admin Login ID or Password.";

            status.className =
                "amal-status error";

        }

    }


    /* =====================================================
       VALIDATION
    ===================================================== */

    function validateForm() {

        const selectedRole =
            document.getElementById("amalRole").value;

        const person =
            document.getElementById("amalPerson").value.trim();

        const mobile =
            document.getElementById("amalMobile").value.trim();

        const product =
            document.getElementById("amalProduct").value;

        const quantity =
            parseFloat(
                document.getElementById("amalQuantity").value
            ) || 0;


        if (!selectedRole) {

            flash(
                "⚠️ Please select Buyer, Supplier or Admin.",
                "error"
            );

            return false;

        }


        if (
            selectedRole === "admin" &&
            !adminVerified
        ) {

            flash(
                "🔐 Please verify Admin Login first.",
                "error"
            );

            return false;

        }


        if (!person) {

            flash(
                "⚠️ Please enter the name.",
                "error"
            );

            return false;

        }


        const cleanMobile =
            mobile.replace(/\D/g, "");

        if (
            cleanMobile.length < 10
        ) {

            flash(
                "⚠️ Please enter a valid WhatsApp number.",
                "error"
            );

            return false;

        }


        if (!product) {

            flash(
                "⚠️ Please select a product.",
                "error"
            );

            return false;

        }


        if (quantity <= 0) {

            flash(
                "⚠️ Please enter quantity.",
                "error"
            );

            return false;

        }


        return true;

    }


    /* =====================================================
       GENERATE
    ===================================================== */

    let currentWhatsAppText = "";


    function generateQuotation() {

        if (!validateForm()) {
            return;
        }


        const selectedRole =
            document.getElementById("amalRole").value;

        const person =
            document.getElementById("amalPerson").value.trim();

        const mobile =
            document.getElementById("amalMobile").value.trim();

        const product =
            document.getElementById("amalProduct").value;

        const quantity =
            parseFloat(
                document.getElementById("amalQuantity").value
            ) || 0;

        const unit =
            document.getElementById("amalUnit").value;

        const price =
            parseFloat(
                document.getElementById("amalPrice").value
            ) || 0;

        const details =
            document.getElementById("amalDetails").value.trim();

        const negotiation =
            document.getElementById(
                "amalNegotiation"
            ).value;

        const targetType =
            document.getElementById(
                "amalTargetType"
            ).value;


        const total =
            quantity * price;


        /* PREVIEW */

        document.getElementById("pvRole").textContent =
            roleName(selectedRole);

        document.getElementById("pvPerson").textContent =
            person;

        document.getElementById("pvMobile").textContent =
            mobile;

        document.getElementById("pvProduct").textContent =
            product;

        document.getElementById("pvQuantity").textContent =
            quantity.toLocaleString("en-IN") +
            " " +
            unit;

        document.getElementById("pvPrice").textContent =
            price > 0
                ? money(price)
                : "Price not specified";

        document.getElementById("pvNegotiation").textContent =
            negotiation;

        document.getElementById("pvTotal").textContent =
            price > 0
                ? money(total)
                : "To be negotiated";

        document.getElementById("pvDetails").textContent =
            details || "No additional specification";


        /* MESSAGE */

        currentWhatsAppText =
            createWhatsAppMessage({

                role:
                    selectedRole,

                person:
                    person,

                mobile:
                    mobile,

                product:
                    product,

                quantity:
                    quantity,

                unit:
                    unit,

                price:
                    price,

                total:
                    total,

                details:
                    details,

                negotiation:
                    negotiation,

                targetType:
                    targetType

            });


        /* SHOW PREVIEW */

        const preview =
            document.getElementById("amalPreview");

        preview.classList.add(
            "amal-preview-active"
        );


        /* FLASH */

        flash(
            "✓ Quotation Preview Ready",
            "success"
        );


        preview.scrollIntoView({

            behavior: "smooth",

            block: "nearest"

        });

    }


    /* =====================================================
       WHATSAPP MESSAGE
    ===================================================== */

    function createWhatsAppMessage(data) {

        let message = "";


        message +=
            "🏢 *" +
            CONFIG.companyName +
            "*\n";

        message +=
            CONFIG.companyTagline +
            "\n";

        message +=
            "━━━━━━━━━━━━━━━━━━\n";

        message +=
            "🧾 *QUOTATION / PRICE INQUIRY*\n";

        message +=
            "━━━━━━━━━━━━━━━━━━\n\n";


        message +=
            "👤 *Role:* " +
            roleName(data.role) +
            "\n";

        message +=
            "👤 *Name:* " +
            data.person +
            "\n";

        message +=
            "📱 *WhatsApp:* " +
            data.mobile +
            "\n\n";


        message +=
            "📦 *Product:* " +
            data.product +
            "\n";

        message +=
            "🔢 *Quantity:* " +
            Number(data.quantity)
                .toLocaleString("en-IN") +
            " " +
            data.unit +
            "\n";


        if (data.price > 0) {

            message +=
                "💰 *Price / Unit:* " +
                money(data.price) +
                "\n";

            message +=
                "💵 *Estimated Total:* " +
                money(data.total) +
                "\n";

        }

        else {

            message +=
                "💰 *Price:* To be discussed\n";

        }


        message +=
            "🤝 *Status:* " +
            data.negotiation +
            "\n";


        if (data.role === "supplier") {

            message +=
                "\n📌 *Supplier Price Submission*\n";

            message +=
                "Please review the above requirement and confirm your best price, availability and delivery terms.\n";

        }


        if (data.role === "buyer") {

            message +=
                "\n📌 *Buyer Requirement*\n";

            message +=
                "Please confirm your requirement and target/negotiable price if applicable.\n";

        }


        if (data.role === "admin") {

            message +=
                "\n🔐 *Admin Commercial Coordination*\n";

            message +=
                "AMAL ENTERPRISES may coordinate price negotiation with the ";

            message +=
                data.targetType === "supplier"
                    ? "supplier"
                    : "buyer";

            message +=
                ".\n";

        }


        if (data.details) {

            message +=
                "\n📝 *Specification:*\n" +
                data.details +
                "\n";

        }


        message +=
            "\n━━━━━━━━━━━━━━━━━━\n";

        message +=
            "MSME Registration: " +
            CONFIG.msmeNumber +
            "\n";

        message +=
            "📲 WhatsApp: +" +
            CONFIG.whatsappNumber.substring(2) +
            "\n";

        message +=
            "━━━━━━━━━━━━━━━━━━";


        return message;

    }


    /* =====================================================
       SEND WHATSAPP
    ===================================================== */

    function sendWhatsApp() {

        if (!currentWhatsAppText) {

            flash(
                "⚠️ First generate the quotation.",
                "error"
            );

            return;

        }


        const selectedRole =
            document.getElementById("amalRole").value;

        const recipientMobile =
            document
                .getElementById("amalMobile")
                .value
                .replace(/\D/g, "");


        let destination;


        /*
          SUPPLIER / BUYER:
          Their entered WhatsApp number receives
          the message.

          ADMIN:
          Message goes to AMAL ENTERPRISES
          WhatsApp number.
        */

        if (selectedRole === "admin") {

            destination =
                CONFIG.whatsappNumber;

        }

        else {

            if (recipientMobile.length === 10) {

                destination =
                    "91" +
                    recipientMobile;

            }

            else {

                destination =
                    recipientMobile;

            }

        }


        const url =
            "https://wa.me/" +
            destination +
            "?text=" +
            encodeURIComponent(
                currentWhatsAppText
            );


        window.open(
            url,
            "_blank"
        );


        flash(
            "✓ Opening WhatsApp...",
            "success"
        );

    }


    /* =====================================================
       FLASH MESSAGE
    ===================================================== */

    function flash(message, type) {

        const old =
            document.querySelector(
                ".amal-flash"
            );

        if (old) {
            old.remove();
        }


        const box =
            document.createElement("div");

        box.className =
            "amal-flash " +
            (type || "");


        box.innerHTML =
            message;


        document.body.appendChild(box);


        setTimeout(function () {

            box.classList.add(
                "show"
            );

        }, 20);


        setTimeout(function () {

            box.classList.remove(
                "show"
            );

            setTimeout(function () {

                box.remove();

            }, 300);

        }, 2800);

    }


    /* =====================================================
       HELPERS
    ===================================================== */

    function roleName(role) {

        if (role === "buyer") {
            return "Buyer";
        }

        if (role === "supplier") {
            return "Supplier";
        }

        if (role === "admin") {
            return "Admin";
        }

        return "—";

    }


    function money(value) {

        return "₹" +
            Number(value).toLocaleString(
                "en-IN",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            );

    }


    /* =====================================================
       DOM READY
    ===================================================== */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initQuotationSystem
        );

    }

    else {

        initQuotationSystem();

    }

})();
