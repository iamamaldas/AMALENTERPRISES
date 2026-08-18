```javascript
/* =========================================================
   AMAL ENTERPRISES
   WHATSAPP QUOTATION SYSTEM
   LOGO + MSME + IMAGE SHARING VERSION
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       BUSINESS CONFIGURATION
       CHANGE THESE VALUES
    ===================================================== */

    const CONFIG = {

        companyName: "AMAL ENTERPRISES",

        adminWhatsApp: "91XXXXXXXXXX",

        msmeNumber: "YOUR MSME REGISTRATION NUMBER",

        logoPath: "assets/logo.png",

        adminId: "admin",

        adminPassword: "CHANGE_THIS_PASSWORD"

    };


    /* =====================================================
       INITIALIZE
    ===================================================== */

    function initQuotationSystem() {

        const section =
            document.getElementById("quotation");

        if (!section) {
            return;
        }

        if (
            section.dataset.quotationSystemReady === "true"
        ) {
            return;
        }

        section.dataset.quotationSystemReady = "true";

        createQuotationInterface(section);

    }


    /* =====================================================
       CREATE INTERFACE
    ===================================================== */

    function createQuotationInterface(section) {

        section.innerHTML = `

        <div class="ae-quotation-wrapper">

            <div class="section-label">
                WHATSAPP QUOTATION SYSTEM
            </div>


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


            <!-- ================= BUYER ================= -->

            <div
                id="aeBuyerForm"
                class="ae-form-panel"
                style="display:none;"
            >

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
                    placeholder="Mobile / WhatsApp Number"
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
                    class="ae-whatsapp-button"
                >
                    <i class="fa-brands fa-whatsapp"></i>
                    Send Requirement on WhatsApp
                </button>

            </div>



            <!-- ================= SUPPLIER ================= -->

            <div
                id="aeSupplierForm"
                class="ae-form-panel"
                style="display:none;"
            >

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
                    placeholder="Supplier WhatsApp Number"
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
                    class="ae-whatsapp-button"
                >
                    <i class="fa-brands fa-whatsapp"></i>
                    Send Supplier Quote on WhatsApp
                </button>

            </div>



            <!-- ================= ADMIN LOGIN ================= -->

            <div
                id="aeAdminLogin"
                class="ae-form-panel"
                style="display:none;"
            >

                <div class="ae-form-title">
                    Admin Login
                </div>


                <input
                    id="aeAdminId"
                    type="text"
                    placeholder="Admin Login ID"
                >


                <input
                    id="aeAdminPassword"
                    type="password"
                    placeholder="Admin Password"
                >


                <button
                    type="button"
                    id="aeAdminLoginButton"
                    class="ae-admin-button"
                >
                    Admin Login
                </button>


                <div
                    id="aeLoginMessage"
                    class="ae-login-message"
                ></div>

            </div>



            <!-- ================= ADMIN PANEL ================= -->

            <div
                id="aeAdminPanel"
                class="ae-admin-panel"
                style="display:none;"
            >

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
                        class="ae-logout-button"
                    >
                        Logout
                    </button>

                </div>



                <!-- BUYER FINAL QUOTATION -->

                <div class="ae-admin-card">

                    <div class="ae-form-title">
                        Official Buyer Quotation
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
                        id="aeGenerateQuotation"
                        class="ae-whatsapp-button"
                    >
                        Generate Official Quotation
                    </button>


                    <!-- GENERATED QUOTATION -->

                    <div
                        id="aeQuotationPreview"
                        class="ae-quotation-preview"
                        style="display:none;"
                    >

                        <div class="ae-preview-buttons">

                            <button
                                type="button"
                                id="aeShareQuotation"
                            >
                                <i class="fa-brands fa-whatsapp"></i>
                                Share on WhatsApp
                            </button>


                            <button
                                type="button"
                                id="aeDownloadQuotation"
                            >
                                Download Image
                            </button>

                        </div>

                    </div>

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
                            placeholder="Current Supplier Price ₹"
                        >


                        <input
                            id="aeSupplierExpectedPrice"
                            type="number"
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
                        class="ae-whatsapp-button"
                    >
                        <i class="fa-brands fa-whatsapp"></i>
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
                        class="ae-whatsapp-button"
                    >
                        <i class="fa-brands fa-whatsapp"></i>
                        Negotiate With Buyer
                    </button>

                </div>

            </div>

        </div>
        `;


        bindEvents();

    }


    /* =====================================================
       EVENT BINDING
    ===================================================== */

    function bindEvents() {

        document
            .getElementById("aeRole")
            .addEventListener(
                "change",
                roleChanged
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
            .getElementById("aeGenerateQuotation")
            .addEventListener(
                "click",
                generateOfficialQuotation
            );


        document
            .getElementById("aeShareQuotation")
            .addEventListener(
                "click",
                shareQuotation
            );


        document
            .getElementById("aeDownloadQuotation")
            .addEventListener(
                "click",
                downloadQuotation
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
       ROLE
    ===================================================== */

    function roleChanged() {

        hideAll();

        const role =
            this.value;


        if (role === "buyer") {

            show("aeBuyerForm");

        }


        if (role === "supplier") {

            show("aeSupplierForm");

        }


        if (role === "admin") {

            show("aeAdminLogin");

        }

    }


    /* =====================================================
       BUYER
    ===================================================== */

    function sendBuyerRequirement() {

        const name =
            val("aeBuyerName");

        const mobile =
            val("aeBuyerMobile");

        const product =
            val("aeBuyerProduct");

        const quantity =
            val("aeBuyerQuantity");

        const targetPrice =
            val("aeBuyerTargetPrice");

        const details =
            val("aeBuyerDetails");


        if (
            !name ||
            !mobile ||
            !product ||
            !quantity
        ) {

            alert(
                "Please complete Buyer Name, Mobile, Product and Quantity."
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
                `\nTarget Price: ₹${targetPrice}`;

        }


        message +=

`

Specification:
${details || "Not provided"}

Please review this buyer requirement.`;


        openWhatsApp(
            CONFIG.adminWhatsApp,
            message
        );

    }


    /* =====================================================
       SUPPLIER
    ===================================================== */

    function sendSupplierQuote() {

        const name =
            val("aeSupplierName");

        const mobile =
            val("aeSupplierMobile");

        const product =
            val("aeSupplierProduct");

        const quantity =
            val("aeSupplierQuantity");

        const moq =
            val("aeSupplierMOQ");

        const price =
            val("aeSupplierPrice");

        const delivery =
            val("aeSupplierDelivery");

        const details =
            val("aeSupplierDetails");


        if (
            !name ||
            !mobile ||
            !product ||
            !price
        ) {

            alert(
                "Please complete Supplier Name, Mobile, Product and Price."
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

Specification:
${details || "Not provided"}

Please review and negotiate if required.`;


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
            val("aeAdminId");

        const password =
            val("aeAdminPassword");


        const msg =
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

            msg.textContent = "";

        } else {

            msg.textContent =
                "Invalid Admin Login ID or Password.";

        }

    }


    /* =====================================================
       LOGOUT
    ===================================================== */

    function adminLogout() {

        sessionStorage.removeItem(
            "aeAdminLoggedIn"
        );


        hide("aeAdminPanel");

        show("aeAdminLogin");

    }


    /* =====================================================
       GENERATE OFFICIAL QUOTATION
    ===================================================== */

    function generateOfficialQuotation() {

        const buyer =
            val("aeAdminBuyerName");

        const mobile =
            val("aeAdminBuyerMobile");

        const product =
            val("aeAdminProduct");

        const quantity =
            parseFloat(
                val("aeAdminQuantity")
            );

        const price =
            parseFloat(
                val("aeAdminFinalPrice")
            );

        const terms =
            val("aeAdminTerms");


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
            new Date()
                .toLocaleDateString(
                    "en-IN"
                );


        const preview =
            document.getElementById(
                "aeQuotationPreview"
            );


        preview.innerHTML = `

            <div
                id="aeQuotationImage"
                class="ae-official-quotation"
            >

                <div class="ae-company-header">

                    <img
                        src="${CONFIG.logoPath}"
                        class="ae-company-logo"
                        crossorigin="anonymous"
                        alt="AMAL ENTERPRISES"
                    >

                    <div>

                        <div class="ae-company-name">
                            ${escapeHTML(
                                CONFIG.companyName
                            )}
                        </div>

                        <div class="ae-company-tagline">
                            ECO &amp; PACKAGING SOURCING SOLUTIONS
                        </div>

                    </div>

                </div>


                <div class="ae-quotation-title">
                    OFFICIAL QUOTATION
                </div>


                <div class="ae-quotation-meta">

                    <div>
                        <strong>
                            Quotation No:
                        </strong>
                        ${quotationNumber}
                    </div>

                    <div>
                        <strong>
                            Date:
                        </strong>
                        ${date}
                    </div>

                </div>


                <div class="ae-msme-box">

                    <strong>
                        MSME Registration No:
                    </strong>

                    ${escapeHTML(
                        CONFIG.msmeNumber
                    )}

                </div>


                <div class="ae-buyer-section">

                    <div class="ae-small-heading">
                        BILL TO / BUYER
                    </div>

                    <div>
                        <strong>
                            ${escapeHTML(buyer)}
                        </strong>
                    </div>

                    <div>
                        WhatsApp:
                        ${escapeHTML(mobile)}
                    </div>

                </div>


                <table class="ae-quotation-table">

                    <thead>

                        <tr>

                            <th>
                                Product
                            </th>

                            <th>
                                Qty
                            </th>

                            <th>
                                Unit Price
                            </th>

                            <th>
                                Total
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        <tr>

                            <td>
                                ${escapeHTML(product)}
                            </td>

                            <td>
                                ${quantity.toLocaleString("en-IN")}
                            </td>

                            <td>
                                ₹${formatMoney(price)}
                            </td>

                            <td>
                                ₹${formatMoney(total)}
                            </td>

                        </tr>

                    </tbody>

                </table>


                <div class="ae-grand-total">

                    <span>
                        GRAND TOTAL
                    </span>

                    <strong>
                        ₹${formatMoney(total)}
                    </strong>

                </div>


                <div class="ae-terms">

                    <strong>
                        Terms &amp; Conditions
                    </strong>

                    <p>
                        ${escapeHTML(
                            terms ||
                            "Prices and commercial terms are subject to mutual confirmation."
                        )}
                    </p>

                </div>


                <div class="ae-authorized">

                    <strong>
                        Authorized by
                    </strong>

                    <br>

                    ${escapeHTML(
                        CONFIG.companyName
                    )}

                </div>


                <div class="ae-footer-line">

                    Thank you for your business.

                </div>

            </div>


            <div class="ae-preview-buttons">

                <button
                    type="button"
                    id="aeShareQuotation"
                >
                    <i class="fa-brands fa-whatsapp"></i>
                    Share on WhatsApp
                </button>


                <button
                    type="button"
                    id="aeDownloadQuotation"
                >
                    Download Image
                </button>

            </div>
        `;


        preview.style.display =
            "block";


        document
            .getElementById(
                "aeShareQuotation"
            )
            .addEventListener(
                "click",
                shareQuotation
            );


        document
            .getElementById(
                "aeDownloadQuotation"
            )
            .addEventListener(
                "click",
                downloadQuotation
            );


        window.aeQuotationData = {

            mobile: mobile,

            quotationNumber:
                quotationNumber,

            buyer: buyer,

            product: product,

            quantity: quantity,

            price: price,

            total: total

        };

    }


    /* =====================================================
       SHARE QUOTATION
    ===================================================== */

    async function shareQuotation() {

        const quotation =
            document.getElementById(
                "aeQuotationImage"
            );


        if (!quotation) {

            alert(
                "Please generate the quotation first."
            );

            return;

        }


        try {

            const canvas =
                await quotationToCanvas(
                    quotation
                );


            const blob =
                await canvasToBlob(
                    canvas
                );


            const file =
                new File(
                    [
                        blob
                    ],
                    "AMAL-ENTERPRISES-Quotation.png",
                    {
                        type:
                            "image/png"
                    }
                );


            /*
             * Mobile browsers supporting Web Share
             * can directly share the image to WhatsApp.
             */

            if (
                navigator.share &&
                navigator.canShare &&
                navigator.canShare({
                    files: [file]
                })
            ) {

                await navigator.share({

                    title:
                        "AMAL ENTERPRISES Quotation",

                    text:
                        "Official quotation from AMAL ENTERPRISES.",

                    files: [file]

                });


                return;

            }


            /*
             * Fallback:
             * Download image + open WhatsApp chat.
             */

            downloadBlob(
                blob,
                "AMAL-ENTERPRISES-Quotation.png"
            );


            const mobile =
                window.aeQuotationData &&
                window.aeQuotationData.mobile
                    ? window.aeQuotationData.mobile
                    : "";


            const message =

`Hello,

Please find our official quotation from AMAL ENTERPRISES.

Quotation No:
${window.aeQuotationData
    ? window.aeQuotationData.quotationNumber
    : ""}

Please refer to the attached quotation image.`;


            openWhatsApp(
                mobile,
                message
            );


            alert(
                "Quotation image downloaded. Please attach it in the WhatsApp chat."
            );

        }
        catch (error) {

            console.error(
                error
            );

            alert(
                "Unable to share quotation. Please use Download Image."
            );

        }

    }


    /* =====================================================
       DOWNLOAD QUOTATION IMAGE
    ===================================================== */

    async function downloadQuotation() {

        const quotation =
            document.getElementById(
                "aeQuotationImage"
            );


        if (!quotation) {

            alert(
                "Please generate the quotation first."
            );

            return;

        }


        try {

            const canvas =
                await quotationToCanvas(
                    quotation
                );


            const blob =
                await canvasToBlob(
                    canvas
                );


            downloadBlob(
                blob,
                "AMAL-ENTERPRISES-Quotation.png"
            );

        }
        catch (error) {

            console.error(
                error
            );

            alert(
                "Unable to generate quotation image."
            );

        }

    }


    /* =====================================================
       HTML → CANVAS
       Uses browser DOM + SVG foreignObject
    ===================================================== */

    async function quotationToCanvas(
        element
    ) {

        const rect =
            element.getBoundingClientRect();


        const width =
            Math.max(
                800,
                Math.ceil(rect.width)
            );


        const height =
            Math.ceil(
                element.scrollHeight
            );


        const svg =
`<svg xmlns="http://www.w3.org/2000/svg"
      width="${width}"
      height="${height}">

    <foreignObject
        width="100%"
        height="100%">

        <div
            xmlns="http://www.w3.org/1999/xhtml"
            style="
                width:${width}px;
                background:#ffffff;
            "
        >

            ${element.outerHTML}

        </div>

    </foreignObject>

</svg>`;


        const svgBlob =
            new Blob(
                [svg],
                {
                    type:
                        "image/svg+xml;charset=utf-8"
                }
            );


        const url =
            URL.createObjectURL(
                svgBlob
            );


        const image =
            new Image();


        return new Promise(
            function (
                resolve,
                reject
            ) {

                image.onload =
                    function () {

                        const canvas =
                            document.createElement(
                                "canvas"
                            );


                        canvas.width =
                            width * 2;


                        canvas.height =
                            height * 2;


                        const ctx =
                            canvas.getContext(
                                "2d"
                            );


                        ctx.scale(
                            2,
                            2
                        );


                        ctx.fillStyle =
                            "#ffffff";


                        ctx.fillRect(
                            0,
                            0,
                            width,
                            height
                        );


                        ctx.drawImage(
                            image,
                            0,
                            0,
                            width,
                            height
                        );


                        URL.revokeObjectURL(
                            url
                        );


                        resolve(
                            canvas
                        );

                    };


                image.onerror =
                    function () {

                        URL.revokeObjectURL(
                            url
                        );

                        reject(
                            new Error(
                                "Image generation failed"
                            )
                        );

                    };


                image.src =
                    url;

            }
        );

    }


    /* =====================================================
       CANVAS → BLOB
    ===================================================== */

    function canvasToBlob(canvas) {

        return new Promise(
            function (
                resolve
            ) {

                canvas.toBlob(
                    function (blob) {

                        resolve(
                            blob
                        );

                    },
                    "image/png",
                    1
                );

            }
        );

    }


    /* =====================================================
       DOWNLOAD BLOB
    ===================================================== */

    function downloadBlob(
        blob,
        filename
    ) {

        const url =
            URL.createObjectURL(
                blob
            );


        const a =
            document.createElement(
                "a"
            );


        a.href =
            url;

        a.download =
            filename;


        document.body.appendChild(
            a
        );


        a.click();


        a.remove();


        setTimeout(
            function () {

                URL.revokeObjectURL(
                    url
                );

            },
            1000
        );

    }


    /* =====================================================
       SUPPLIER NEGOTIATION
    ===================================================== */

    function negotiateSupplier() {

        const supplier =
            val("aeNegotiationSupplier");

        const mobile =
            val("aeNegotiationMobile");

        const product =
            val("aeNegotiationProduct");

        const currentPrice =
            val("aeSupplierCurrentPrice");

        const targetPrice =
            val("aeSupplierExpectedPrice");

        const customMessage =
            val(
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

${customMessage ||
"Please let us know your best possible price."}

Regards,
AMAL ENTERPRISES`;


        openWhatsApp(
            mobile,
            message
        );

    }


    /* =====================================================
       BUYER NEGOTIATION
    ===================================================== */

    function negotiateBuyer() {

        const buyer =
            val("aeNegotiationBuyer");

        const mobile =
            val(
                "aeNegotiationBuyerMobile"
            );

        const product =
            val(
                "aeNegotiationBuyerProduct"
            );

        const price =
            val(
                "aeNegotiationBuyerPrice"
            );

        const customMessage =
            val(
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

${customMessage ||
"Please let us know your feedback so we can discuss the best possible commercial terms."}

Regards,
AMAL ENTERPRISES`;


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
                .replace(
                    /\D/g,
                    ""
                );


        if (
            cleanPhone.length === 10
        ) {

            cleanPhone =
                "91" +
                cleanPhone;

        }


        const url =
            "https://wa.me/" +
            cleanPhone +
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
       HELPERS
    ===================================================== */

    function val(id) {

        const el =
            document.getElementById(id);

        return el
            ? el.value.trim()
            : "";

    }


    function show(id) {

        const el =
            document.getElementById(id);

        if (el) {

            el.style.display =
                "block";

        }

    }


    function hide(id) {

        const el =
            document.getElementById(id);

        if (el) {

            el.style.display =
                "none";

        }

    }


    function hideAll() {

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

        const d =
            new Date();


        return (
            "AE-" +
            d.getFullYear() +
            String(
                d.getMonth() + 1
            ).padStart(2, "0") +
            String(
                d.getDate()
            ).padStart(2, "0") +
            "-" +
            String(
                d.getHours()
            ).padStart(2, "0") +
            String(
                d.getMinutes()
            ).padStart(2, "0") +
            String(
                d.getSeconds()
            ).padStart(2, "0")
        );

    }


    function escapeHTML(text) {

        return String(text)
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

    }
    else {

        initQuotationSystem();

    }

})();
```
