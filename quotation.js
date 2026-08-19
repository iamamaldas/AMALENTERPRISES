/* =========================================================
   AMAL ENTERPRISES
   SMART QUOTATION SYSTEM
   Loaded automatically by fix.js
   No index.html editing required
========================================================= */

(function () {

    "use strict";

    /* =====================================================
       CONFIGURATION
    ===================================================== */

    const ADMIN_LOGIN_ID = "office.amaldas@gmail.com";
    const ADMIN_PASSWORD = "amal0706";

    const ADMIN_WHATSAPP = "916296471636";

    const COMPANY_NAME = "AMAL ENTERPRISES";
    const MSME_NUMBER = "XXXX";

    let currentRole = "";
    let adminLoggedIn = false;

    let lastQuotation = null;


    /* =====================================================
       UNIT SYSTEM
       factor = value in base unit
    ===================================================== */

    const UNIT_GROUPS = {

        mass: {
            label: "Weight",
            base: "mg",

            units: {
                mg: {
                    name: "Milligram (mg)",
                    factor: 1
                },

                g: {
                    name: "Gram (g)",
                    factor: 1000
                },

                kg: {
                    name: "Kilogram (kg)",
                    factor: 1000000
                },

                tonne: {
                    name: "Metric Tonne (t)",
                    factor: 1000000000
                }
            }
        },

        volume: {
            label: "Volume",
            base: "ml",

            units: {

                ml: {
                    name: "Millilitre (ml)",
                    factor: 1
                },

                litre: {
                    name: "Litre (L)",
                    factor: 1000
                }
            }
        },

        length: {
            label: "Length",
            base: "mm",

            units: {

                mm: {
                    name: "Millimetre (mm)",
                    factor: 1
                },

                cm: {
                    name: "Centimetre (cm)",
                    factor: 10
                },

                metre: {
                    name: "Metre (m)",
                    factor: 1000
                }
            }
        },

        count: {
            label: "Count",
            base: "piece",

            units: {

                piece: {
                    name: "Piece",
                    factor: 1
                },

                pair: {
                    name: "Pair",
                    factor: 2
                },

                dozen: {
                    name: "Dozen",
                    factor: 12
                }
            }
        },

        packaging: {
            label: "Packaging Unit",
            base: null,

            units: {

                pack: {
                    name: "Pack",
                    factor: 1
                },

                box: {
                    name: "Box",
                    factor: 1
                },

                set: {
                    name: "Set",
                    factor: 1
                }
            }
        }

    };


    /* =====================================================
       HELPERS
    ===================================================== */

    function esc(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    function money(value) {

        return "₹" + Number(value || 0).toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

    }


    function numberFormat(value) {

        return Number(value).toLocaleString(
            "en-IN",
            {
                maximumFractionDigits: 6
            }
        );

    }


    function getUnitInfo(unit) {

        for (const groupKey in UNIT_GROUPS) {

            const group = UNIT_GROUPS[groupKey];

            if (group.units[unit]) {

                return {
                    group: groupKey,
                    groupLabel: group.label,
                    base: group.base,
                    factor: group.units[unit].factor,
                    name: group.units[unit].name
                };

            }

        }

        return null;

    }


    function areCompatibleUnits(unit1, unit2) {

        const a = getUnitInfo(unit1);
        const b = getUnitInfo(unit2);

        if (!a || !b) {
            return false;
        }

        return a.group === b.group;

    }


    /*
       Converts quantity from selected quantity unit
       into selected price unit.
    */

    function convertQuantity(quantity, fromUnit, toUnit) {

        const from = getUnitInfo(fromUnit);
        const to = getUnitInfo(toUnit);

        if (!from || !to) {
            return null;
        }

        if (from.group !== to.group) {
            return null;
        }

        /*
           Packaging units such as Pack / Box / Set
           cannot automatically convert between each other.
        */

        if (
            from.group === "packaging" &&
            fromUnit !== toUnit
        ) {

            return null;

        }

        return (
            quantity *
            from.factor /
            to.factor
        );

    }


    function getToday() {

        return new Date().toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    }


    function getTimeStamp() {

        const now = new Date();

        return now.toLocaleString(
            "en-IN",
            {
                dateStyle: "medium",
                timeStyle: "short"
            }
        );

    }


    function generateQuotationNumber() {

        const d = new Date();

        const date =
            d.getFullYear().toString() +
            String(d.getMonth() + 1).padStart(2, "0") +
            String(d.getDate()).padStart(2, "0");

        const random =
            Math.floor(
                1000 +
                Math.random() * 9000
            );

        return "AE-" + date + "-" + random;

    }


    /* =====================================================
       CREATE NEW QUOTATION SECTION
    ===================================================== */

    function createQuotationSection() {

        if (
            document.querySelector(
                ".amal-smart-quotation"
            )
        ) {

            return;

        }


        /*
           Hide original quotation builder
           from index.html.
        */

        const oldQuotation =
            document.getElementById("quotation");

        if (oldQuotation) {

            oldQuotation.style.display = "none";

        }


        const buyerSupplier =
            document.getElementById(
                "buyer-supplier"
            );


        const section =
            document.createElement("section");

        section.className =
            "amal-smart-quotation";

        section.id =
            "smart-quotation";


        section.innerHTML = `

            <div class="amal-quote-container">

                <div class="amal-quote-heading">

                    <span class="amal-quote-kicker">
                        BUSINESS QUOTATION
                    </span>

                    <h2>
                        Smart Quotation
                    </h2>

                    <p>
                        Select your role first, then enter
                        the required details.
                    </p>

                </div>


                <!-- ROLE SELECT -->

                <div class="amal-role-card">

                    <label>
                        QUOTATION PREPARED BY
                    </label>

                    <div class="amal-role-buttons">

                        <button
                            type="button"
                            class="amal-role-btn"
                            data-role="buyer">

                            👤 Buyer

                        </button>


                        <button
                            type="button"
                            class="amal-role-btn"
                            data-role="supplier">

                            🏭 Supplier

                        </button>


                        <button
                            type="button"
                            class="amal-role-btn"
                            data-role="admin">

                            🔐 Admin

                        </button>

                    </div>

                </div>


                <!-- ADMIN LOGIN -->

                <div
                    class="amal-admin-login"
                    id="amalAdminLogin"
                    style="display:none;">

                    <div class="amal-login-box">

                        <div class="amal-login-title">
                            🔐 Admin Login
                        </div>

                        <p>
                            Admin access is required to
                            create negotiated quotations.
                        </p>


                        <input
                            type="email"
                            id="amalAdminId"
                            placeholder="Login ID"
                            autocomplete="username"
                        >


                        <input
                            type="password"
                            id="amalAdminPassword"
                            placeholder="Password"
                            autocomplete="current-password"
                        >


                        <button
                            type="button"
                            id="amalLoginBtn">

                            Login as Admin

                        </button>


                        <div
                            id="amalLoginMessage"
                            class="amal-login-message">
                        </div>

                    </div>

                </div>


                <!-- QUOTATION WORK AREA -->

                <div
                    class="amal-quote-work"
                    id="amalQuoteWork"
                    style="display:none;">

                    <div class="amal-work-header">

                        <div>

                            <span
                                class="amal-current-role"
                                id="amalCurrentRole">
                            </span>

                            <h3 id="amalFormTitle">
                                Quotation Details
                            </h3>

                        </div>


                        <button
                            type="button"
                            class="amal-logout-btn"
                            id="amalLogoutBtn"
                            style="display:none;">

                            Logout

                        </button>

                    </div>


                    <!-- ADMIN RECIPIENT TYPE -->

                    <div
                        id="amalAdminRecipientWrap"
                        style="display:none;">

                        <label>
                            SEND QUOTATION TO
                        </label>

                        <select
                            id="amalAdminRecipient">

                            <option value="Buyer">
                                Buyer
                            </option>

                            <option value="Supplier">
                                Supplier
                            </option>

                        </select>

                    </div>


                    <div class="amal-form-grid">

                        <!-- NAME -->

                        <div class="amal-field">

                            <label>
                                Name *
                            </label>

                            <input
                                type="text"
                                id="amalName"
                                placeholder="Enter name"
                            >

                        </div>


                        <!-- COMPANY -->

                        <div class="amal-field">

                            <label>
                                Company Name
                            </label>

                            <input
                                type="text"
                                id="amalCompany"
                                placeholder="Enter company name"
                            >

                        </div>


                        <!-- MOBILE -->

                        <div class="amal-field">

                            <label>
                                WhatsApp Mobile Number *
                            </label>

                            <input
                                type="tel"
                                id="amalMobile"
                                inputmode="numeric"
                                maxlength="15"
                                placeholder="10 digit mobile number"
                            >

                        </div>


                        <!-- PRODUCT -->

                        <div class="amal-field">

                            <label>
                                Product / Material *
                            </label>

                            <select id="amalProduct">

                                <option value="">
                                    Select product
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

                        </div>


                        <!-- QUANTITY -->

                        <div class="amal-field">

                            <label>
                                Quantity *
                            </label>

                            <input
                                type="number"
                                id="amalQuantity"
                                min="0"
                                step="any"
                                placeholder="Enter quantity"
                            >

                        </div>


                        <!-- QUANTITY UNIT -->

                        <div class="amal-field">

                            <label>
                                Quantity Unit *
                            </label>

                            <select
                                id="amalQuantityUnit">

                                <optgroup label="Weight">

                                    <option value="mg">
                                        Milligram (mg)
                                    </option>

                                    <option value="g">
                                        Gram (g)
                                    </option>

                                    <option value="kg" selected>
                                        Kilogram (kg)
                                    </option>

                                    <option value="tonne">
                                        Metric Tonne (t)
                                    </option>

                                </optgroup>


                                <optgroup label="Volume">

                                    <option value="ml">
                                        Millilitre (ml)
                                    </option>

                                    <option value="litre">
                                        Litre (L)
                                    </option>

                                </optgroup>


                                <optgroup label="Length">

                                    <option value="mm">
                                        Millimetre (mm)
                                    </option>

                                    <option value="cm">
                                        Centimetre (cm)
                                    </option>

                                    <option value="metre">
                                        Metre (m)
                                    </option>

                                </optgroup>


                                <optgroup label="Count">

                                    <option value="piece">
                                        Piece
                                    </option>

                                    <option value="pair">
                                        Pair
                                    </option>

                                    <option value="dozen">
                                        Dozen
                                    </option>

                                </optgroup>


                                <optgroup label="Packaging">

                                    <option value="pack">
                                        Pack
                                    </option>

                                    <option value="box">
                                        Box
                                    </option>

                                    <option value="set">
                                        Set
                                    </option>

                                </optgroup>

                            </select>

                        </div>


                        <!-- PRICE -->

                        <div class="amal-field">

                            <label>
                                Unit Price *
                            </label>

                            <input
                                type="number"
                                id="amalPrice"
                                min="0"
                                step="any"
                                placeholder="Enter unit price"
                            >

                        </div>


                        <!-- PRICE UNIT -->

                        <div class="amal-field">

                            <label>
                                Price Per Unit *
                            </label>

                            <select
                                id="amalPriceUnit">

                                <optgroup label="Weight">

                                    <option value="mg">
                                        Per mg
                                    </option>

                                    <option value="g">
                                        Per g
                                    </option>

                                    <option value="kg" selected>
                                        Per kg
                                    </option>

                                    <option value="tonne">
                                        Per tonne
                                    </option>

                                </optgroup>


                                <optgroup label="Volume">

                                    <option value="ml">
                                        Per ml
                                    </option>

                                    <option value="litre">
                                        Per litre
                                    </option>

                                </optgroup>


                                <optgroup label="Length">

                                    <option value="mm">
                                        Per mm
                                    </option>

                                    <option value="cm">
                                        Per cm
                                    </option>

                                    <option value="metre">
                                        Per metre
                                    </option>

                                </optgroup>


                                <optgroup label="Count">

                                    <option value="piece">
                                        Per piece
                                    </option>

                                    <option value="pair">
                                        Per pair
                                    </option>

                                    <option value="dozen">
                                        Per dozen
                                    </option>

                                </optgroup>


                                <optgroup label="Packaging">

                                    <option value="pack">
                                        Per pack
                                    </option>

                                    <option value="box">
                                        Per box
                                    </option>

                                    <option value="set">
                                        Per set
                                    </option>

                                </optgroup>

                            </select>

                        </div>

                    </div>


                    <!-- SPECIFICATION -->

                    <div class="amal-field full">

                        <label>
                            Product Specification / Requirement
                        </label>

                        <textarea
                            id="amalDetails"
                            rows="4"
                            placeholder="Size, material, thickness, colour, printing, delivery requirement etc."
                        ></textarea>

                    </div>


                    <!-- CALCULATION STATUS -->

                    <div
                        class="amal-calculation"
                        id="amalCalculation">

                        Enter quantity and price to calculate.

                    </div>


                    <!-- ACTION -->

                    <button
                        type="button"
                        class="amal-generate-btn"
                        id="amalGenerateBtn">

                        🧾 Generate Quotation

                    </button>

                </div>


                <!-- FLASH PREVIEW -->

                <div
                    class="amal-preview-overlay"
                    id="amalPreviewOverlay"
                    style="display:none;">

                    <div class="amal-preview-modal">

                        <button
                            type="button"
                            class="amal-preview-close"
                            id="amalPreviewClose">

                            ×

                        </button>


                        <div
                            class="amal-quotation-paper"
                            id="amalQuotationPaper">

                            <div class="amal-paper-header">

                                <div>

                                    <div
                                        class="amal-paper-company">

                                        AMAL ENTERPRISES

                                    </div>

                                    <div
                                        class="amal-paper-msme">

                                        MSME Registration No:
                                        <strong>
                                            XXXX
                                        </strong>

                                    </div>

                                </div>


                                <div
                                    class="amal-paper-type"
                                    id="amalPreviewRole">

                                </div>

                            </div>


                            <div class="amal-paper-line"></div>


                            <div class="amal-paper-meta">

                                <div>
                                    <span>
                                        Quotation No.
                                    </span>

                                    <strong
                                        id="previewQuoteNo">
                                    </strong>
                                </div>


                                <div>
                                    <span>
                                        Date
                                    </span>

                                    <strong
                                        id="previewDate">
                                    </strong>
                                </div>

                            </div>


                            <div class="amal-paper-section">

                                <div class="amal-paper-section-title">
                                    DETAILS
                                </div>


                                <div class="amal-paper-row">

                                    <span>Name</span>

                                    <strong
                                        id="previewName">
                                    </strong>

                                </div>


                                <div class="amal-paper-row">

                                    <span>Company</span>

                                    <strong
                                        id="previewCompany">
                                    </strong>

                                </div>


                                <div class="amal-paper-row">

                                    <span>WhatsApp</span>

                                    <strong
                                        id="previewMobile">
                                    </strong>

                                </div>

                            </div>


                            <div class="amal-paper-section">

                                <div class="amal-paper-section-title">
                                    PRODUCT & PRICE
                                </div>


                                <div class="amal-paper-row">

                                    <span>Product</span>

                                    <strong
                                        id="previewProduct2">
                                    </strong>

                                </div>


                                <div class="amal-paper-row">

                                    <span>Quantity</span>

                                    <strong
                                        id="previewQuantity2">
                                    </strong>

                                </div>


                                <div class="amal-paper-row">

                                    <span>Unit Price</span>

                                    <strong
                                        id="previewUnitPrice2">
                                    </strong>

                                </div>


                                <div class="amal-paper-row">

                                    <span>Price Basis</span>

                                    <strong
                                        id="previewPriceUnit2">
                                    </strong>

                                </div>


                                <div class="amal-paper-total">

                                    <span>
                                        ESTIMATED TOTAL
                                    </span>

                                    <strong
                                        id="previewTotal2">
                                    </strong>

                                </div>

                            </div>


                            <div class="amal-paper-section">

                                <div class="amal-paper-section-title">
                                    SPECIFICATION
                                </div>

                                <div
                                    class="amal-paper-details"
                                    id="previewDetails">
                                </div>

                            </div>


                            <div class="amal-paper-footer">

                                This quotation is subject to
                                final commercial confirmation
                                and mutually agreed terms.

                            </div>

                        </div>


                        <!-- PREVIEW ACTIONS -->

                        <div class="amal-preview-actions">

                            <button
                                type="button"
                                id="amalWhatsappBtn"
                                class="amal-whatsapp-btn">

                                <i class="fa-brands fa-whatsapp"></i>
                                WhatsApp

                            </button>


                            <button
                                type="button"
                                id="amalPdfBtn"
                                class="amal-pdf-btn"
                                style="display:none;">

                                📄 Save PDF

                            </button>

                        </div>


                    </div>

                </div>

            </div>

        `;


        /*
           Place quotation section AFTER
           Buyer / Supplier Google Form section.
        */

        if (buyerSupplier) {

            buyerSupplier.insertAdjacentElement(
                "afterend",
                section
            );

        } else {

            document.body.appendChild(section);

        }


        bindEvents();

    }


    /* =====================================================
       EVENT BINDING
    ===================================================== */

    function bindEvents() {

        document
            .querySelectorAll(
                ".amal-role-btn"
            )
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
            .getElementById(
                "amalLoginBtn"
            )
            .addEventListener(
                "click",
                adminLogin
            );


        document
            .getElementById(
                "amalLogoutBtn"
            )
            .addEventListener(
                "click",
                adminLogout
            );


        document
            .getElementById(
                "amalGenerateBtn"
            )
            .addEventListener(
                "click",
                generateQuotation
            );


        document
            .getElementById(
                "amalPreviewClose"
            )
            .addEventListener(
                "click",
                closePreview
            );


        document
            .getElementById(
                "amalWhatsappBtn"
            )
            .addEventListener(
                "click",
                sendWhatsApp
            );


        document
            .getElementById(
                "amalPdfBtn"
            )
            .addEventListener(
                "click",
                savePDF
            );


        [
            "amalQuantity",
            "amalPrice",
            "amalQuantityUnit",
            "amalPriceUnit"
        ]
        .forEach(function (id) {

            const el =
                document.getElementById(id);

            el.addEventListener(
                "input",
                updateCalculation
            );

            el.addEventListener(
                "change",
                updateCalculation
            );

        });


        /*
           Close preview by clicking outside.
        */

        document
            .getElementById(
                "amalPreviewOverlay"
            )
            .addEventListener(
                "click",
                function (event) {

                    if (
                        event.target ===
                        this
                    ) {

                        closePreview();

                    }

                }
            );


        /*
           Escape closes preview.
        */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape"
                ) {

                    closePreview();

                }

            }
        );

    }


    /* =====================================================
       ROLE SELECTION
    ===================================================== */

    function selectRole(role) {

        currentRole = role;


        document
            .querySelectorAll(
                ".amal-role-btn"
            )
            .forEach(function (btn) {

                btn.classList.toggle(
                    "active",
                    btn.dataset.role === role
                );

            });


        const login =
            document.getElementById(
                "amalAdminLogin"
            );

        const work =
            document.getElementById(
                "amalQuoteWork"
            );


        if (role === "admin") {

            /*
               Admin always requires fresh login.
            */

            adminLoggedIn = false;

            login.style.display =
                "block";

            work.style.display =
                "none";

            document
                .getElementById(
                    "amalAdminId"
                )
                .value = "";

            document
                .getElementById(
                    "amalAdminPassword"
                )
                .value = "";

            document
                .getElementById(
                    "amalLoginMessage"
                )
                .textContent = "";

            return;

        }


        login.style.display =
            "none";

        work.style.display =
            "block";

        configureRoleUI();

    }


    /* =====================================================
       ADMIN LOGIN
    ===================================================== */

    function adminLogin() {

        const id =
            document
                .getElementById(
                    "amalAdminId"
                )
                .value
                .trim();


        const password =
            document
                .getElementById(
                    "amalAdminPassword"
                )
                .value;


        const message =
            document
                .getElementById(
                    "amalLoginMessage"
                );


        if (
            id === ADMIN_LOGIN_ID &&
            password === ADMIN_PASSWORD
        ) {

            adminLoggedIn = true;

            message.textContent =
                "✓ Admin verified successfully.";

            message.className =
                "amal-login-message success";


            document
                .getElementById(
                    "amalAdminLogin"
                )
                .style.display =
                "none";


            document
                .getElementById(
                    "amalQuoteWork"
                )
                .style.display =
                "block";


            configureRoleUI();

        } else {

            adminLoggedIn = false;

            message.textContent =
                "Invalid Admin Login ID or Password.";

            message.className =
                "amal-login-message error";

        }

    }


    /* =====================================================
       ADMIN LOGOUT
    ===================================================== */

    function adminLogout() {

        adminLoggedIn = false;

        currentRole = "";


        /*
           Hide entire quotation work area.
        */

        document
            .getElementById(
                "amalQuoteWork"
            )
            .style.display =
            "none";


        document
            .getElementById(
                "amalAdminLogin"
            )
            .style.display =
            "none";


        document
            .querySelectorAll(
                ".amal-role-btn"
            )
            .forEach(function (btn) {

                btn.classList.remove(
                    "active"
                );

            });


        clearForm();


        window.scrollTo({
            top:
                document
                    .getElementById(
                        "smart-quotation"
                    )
                    .offsetTop - 70,

            behavior: "smooth"
        });

    }


    /* =====================================================
       ROLE UI
    ===================================================== */

    function configureRoleUI() {

        const work =
            document.getElementById(
                "amalQuoteWork"
            );


        const title =
            document.getElementById(
                "amalFormTitle"
            );


        const current =
            document.getElementById(
                "amalCurrentRole"
            );


        const logout =
            document.getElementById(
                "amalLogoutBtn"
            );


        const recipient =
            document.getElementById(
                "amalAdminRecipientWrap"
            );


        if (currentRole === "buyer") {

            current.textContent =
                "BUYER";

            title.textContent =
                "Buyer Quotation";

            logout.style.display =
                "none";

            recipient.style.display =
                "none";

        }


        else if (currentRole === "supplier") {

            current.textContent =
                "SUPPLIER";

            title.textContent =
                "Supplier Quotation";

            logout.style.display =
                "none";

            recipient.style.display =
                "none";

        }


        else if (
            currentRole === "admin" &&
            adminLoggedIn
        ) {

            current.textContent =
                "ADMIN";

            title.textContent =
                "Admin Negotiation / Quotation";

            logout.style.display =
                "inline-flex";

            recipient.style.display =
                "block";

        }


        work.style.display =
            "block";

    }


    /* =====================================================
       CALCULATION
    ===================================================== */

    function calculateTotal() {

        const quantity =
            parseFloat(
                document
                    .getElementById(
                        "amalQuantity"
                    )
                    .value
            );


        const price =
            parseFloat(
                document
                    .getElementById(
                        "amalPrice"
                    )
                    .value
            );


        const quantityUnit =
            document
                .getElementById(
                    "amalQuantityUnit"
                )
                .value;


        const priceUnit =
            document
                .getElementById(
                    "amalPriceUnit"
                )
                .value;


        if (
            !Number.isFinite(quantity) ||
            quantity <= 0 ||
            !Number.isFinite(price) ||
            price < 0
        ) {

            return {
                valid: false
            };

        }


        const convertedQuantity =
            convertQuantity(
                quantity,
                quantityUnit,
                priceUnit
            );


        if (
            convertedQuantity === null
        ) {

            return {
                valid: false,
                error:
                    "Quantity Unit and Price Unit are not compatible."
            };

        }


        const total =
            convertedQuantity * price;


        return {

            valid: true,

            quantity,

            price,

            quantityUnit,

            priceUnit,

            convertedQuantity,

            total

        };

    }


    function updateCalculation() {

        const box =
            document.getElementById(
                "amalCalculation"
            );


        const result =
            calculateTotal();


        if (!result.valid) {

            box.textContent =
                result.error ||
                "Enter quantity and price to calculate.";

            box.classList.remove(
                "valid"
            );

            return;

        }


        box.classList.add(
            "valid"
        );


        box.innerHTML = `

            <span>
                ${numberFormat(result.quantity)}
                ${esc(result.quantityUnit)}
            </span>

            <span class="amal-calc-arrow">
                →
            </span>

            <span>
                ${numberFormat(result.convertedQuantity)}
                ${esc(result.priceUnit)}
            </span>

            <strong>
                ${money(result.total)}
            </strong>

        `;

    }


    /* =====================================================
       VALIDATE FORM
    ===================================================== */

    function validateForm() {

        const name =
            document
                .getElementById(
                    "amalName"
                )
                .value
                .trim();


        const mobile =
            document
                .getElementById(
                    "amalMobile"
                )
                .value
                .replace(/\D/g, "");


        const product =
            document
                .getElementById(
                    "amalProduct"
                )
                .value;


        const quantity =
            document
                .getElementById(
                    "amalQuantity"
                )
                .value;


        const price =
            document
                .getElementById(
                    "amalPrice"
                )
                .value;


        if (!name) {

            alert(
                "Please enter Name."
            );

            return false;

        }


        if (
            mobile.length < 10
        ) {

            alert(
                "Please enter a valid WhatsApp mobile number."
            );

            return false;

        }


        if (!product) {

            alert(
                "Please select Product / Material."
            );

            return false;

        }


        if (
            !quantity ||
            Number(quantity) <= 0
        ) {

            alert(
                "Please enter a valid Quantity."
            );

            return false;

        }


        if (
            price === "" ||
            Number(price) < 0
        ) {

            alert(
                "Please enter Unit Price."
            );

            return false;

        }


        const calculation =
            calculateTotal();


        if (
            !calculation.valid
        ) {

            alert(
                calculation.error ||
                "Please check Quantity and Price Unit."
            );

            return false;

        }


        return true;

    }


    /* =====================================================
       GENERATE QUOTATION
    ===================================================== */

    function generateQuotation() {

        if (
            currentRole === "admin" &&
            !adminLoggedIn
        ) {

            alert(
                "Admin login is required."
            );

            return;

        }


        if (!validateForm()) {

            return;

        }


        const name =
            document
                .getElementById(
                    "amalName"
                )
                .value
                .trim();


        const company =
            document
                .getElementById(
                    "amalCompany"
                )
                .value
                .trim();


        const mobile =
            document
                .getElementById(
                    "amalMobile"
                )
                .value
                .replace(/\D/g, "");


        const product =
            document
                .getElementById(
                    "amalProduct"
                )
                .value;


        const quantity =
            parseFloat(
                document
                    .getElementById(
                        "amalQuantity"
                    )
                    .value
            );


        const quantityUnit =
            document
                .getElementById(
                    "amalQuantityUnit"
                )
                .value;


        const price =
            parseFloat(
                document
                    .getElementById(
                        "amalPrice"
                    )
                    .value
            );


        const priceUnit =
            document
                .getElementById(
                    "amalPriceUnit"
                )
                .value;


        const details =
            document
                .getElementById(
                    "amalDetails"
                )
                .value
                .trim();


        const calculation =
            calculateTotal();


        let recipientRole =
            currentRole;


        if (currentRole === "admin") {

            recipientRole =
                document
                    .getElementById(
                        "amalAdminRecipient"
                    )
                    .value;

        }


        const quoteNumber =
            generateQuotationNumber();


        lastQuotation = {

            quoteNumber,

            date: getToday(),

            timestamp:
                getTimeStamp(),

            role: currentRole,

            recipientRole,

            name,

            company:
                company || "—",

            mobile,

            product,

            quantity,

            quantityUnit,

            price,

            priceUnit,

            convertedQuantity:
                calculation.convertedQuantity,

            total:
                calculation.total,

            details:
                details || "—"

        };


        fillPreview(
            lastQuotation
        );


        /*
           Admin gets PDF button.
           Buyer/Supplier do not.
        */

        const pdfBtn =
            document.getElementById(
                "amalPdfBtn"
            );


        if (
            currentRole === "admin" &&
            adminLoggedIn
        ) {

            pdfBtn.style.display =
                "inline-flex";

        } else {

            pdfBtn.style.display =
                "none";

        }


        /*
           Flash preview modal.
        */

        document
            .getElementById(
                "amalPreviewOverlay"
            )
            .style.display =
            "flex";

    }


    /* =====================================================
       FILL PREVIEW
    ===================================================== */

    function fillPreview(data) {

        const roleTitle =
            currentRole === "admin"
                ? "ADMIN QUOTATION"
                : currentRole.toUpperCase() +
                  " QUOTATION";


        document
            .getElementById(
                "amalPreviewRole"
            )
            .textContent =
            roleTitle;


        document
            .getElementById(
                "previewQuoteNo"
            )
            .textContent =
            data.quoteNumber;


        document
            .getElementById(
                "previewDate"
            )
            .textContent =
            data.date;


        document
            .getElementById(
                "previewName"
            )
            .textContent =
            data.name;


        document
            .getElementById(
                "previewCompany"
            )
            .textContent =
            data.company;


        document
            .getElementById(
                "previewMobile"
            )
            .textContent =
            data.mobile;


        document
            .getElementById(
                "previewProduct2"
            )
            .textContent =
            data.product;


        document
            .getElementById(
                "previewQuantity2"
            )
            .textContent =
            numberFormat(
                data.quantity
            ) +
            " " +
            data.quantityUnit;


        document
            .getElementById(
                "previewUnitPrice2"
            )
            .textContent =
            money(data.price);


        document
            .getElementById(
                "previewPriceUnit2"
            )
            .textContent =
            "Per " +
            data.priceUnit;


        document
            .getElementById(
                "previewTotal2"
            )
            .textContent =
            money(data.total);


        document
            .getElementById(
                "previewDetails"
            )
            .textContent =
            data.details;

    }


    /* =====================================================
       CLOSE PREVIEW
    ===================================================== */

    function closePreview() {

        const overlay =
            document.getElementById(
                "amalPreviewOverlay"
            );

        if (overlay) {

            overlay.style.display =
                "none";

        }

    }


    /* =====================================================
       WHATSAPP
    ===================================================== */

    function sendWhatsApp() {

        if (!lastQuotation) {

            return;

        }


        let targetNumber;


        /*
           Buyer / Supplier:
           Message goes to AMAL ENTERPRISES admin.
        */

        if (
            currentRole === "buyer" ||
            currentRole === "supplier"
        ) {

            targetNumber =
                ADMIN_WHATSAPP;

        }


        /*
           Admin:
           Message goes to entered
           Buyer/Supplier WhatsApp number.
        */

        else if (
            currentRole === "admin" &&
            adminLoggedIn
        ) {

            targetNumber =
                lastQuotation.mobile;

        }


        if (!targetNumber) {

            alert(
                "WhatsApp number not available."
            );

            return;

        }


        let message = "";


        if (
            currentRole === "admin"
        ) {

            message =

`*${COMPANY_NAME}*
MSME Registration No: ${MSME_NUMBER}

*${lastQuotation.recipientRole.toUpperCase()} QUOTATION*

Quotation No: ${lastQuotation.quoteNumber}
Date: ${lastQuotation.date}

Name: ${lastQuotation.name}
Company: ${lastQuotation.company}

Product: ${lastQuotation.product}

Quantity: ${numberFormat(lastQuotation.quantity)} ${lastQuotation.quantityUnit}

Unit Price: ${money(lastQuotation.price)}
Price Basis: Per ${lastQuotation.priceUnit}

*Estimated Total: ${money(lastQuotation.total)}*

Specification:
${lastQuotation.details}

This quotation is subject to final commercial confirmation and mutually agreed terms.

Regards,
${COMPANY_NAME}`;

        }


        else {

            message =

`*AMAL ENTERPRISES - ${currentRole.toUpperCase()}*

Name: ${lastQuotation.name}
Company: ${lastQuotation.company}

Product: ${lastQuotation.product}

Quantity: ${numberFormat(lastQuotation.quantity)} ${lastQuotation.quantityUnit}

Price: ${money(lastQuotation.price)} per ${lastQuotation.priceUnit}

Estimated Total: ${money(lastQuotation.total)}

Specification:
${lastQuotation.details}

I would like to discuss / confirm the above quotation.

Thank you.`;

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
       LOAD HTML2PDF
    ===================================================== */

    function loadPDFLibrary(callback) {

        if (
            typeof html2pdf !==
            "undefined"
        ) {

            callback();

            return;

        }


        const script =
            document.createElement(
                "script"
            );


        script.src =
            "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";


        script.onload =
            callback;


        script.onerror =
            function () {

                alert(
                    "PDF library could not be loaded. Please check your internet connection."
                );

            };


        document.body.appendChild(
            script
        );

    }


    /* =====================================================
       SAVE ADMIN PDF
    ===================================================== */

    function savePDF() {

        if (
            currentRole !== "admin" ||
            !adminLoggedIn
        ) {

            alert(
                "Only Admin can save quotation PDF."
            );

            return;

        }


        if (!lastQuotation) {

            alert(
                "Please generate a quotation first."
            );

            return;

        }


        loadPDFLibrary(
            function () {

                const element =
                    document.getElementById(
                        "amalQuotationPaper"
                    );


                const filename =
                    "AMAL-ENTERPRISES-" +
                    lastQuotation.quoteNumber +
                    ".pdf";


                const options = {

                    margin: 0,

                    filename,

                    image: {
                        type: "jpeg",
                        quality: 0.98
                    },

                    html2canvas: {

                        scale: 2,

                        useCORS: true,

                        backgroundColor:
                            "#ffffff"

                    },

                    jsPDF: {

                        unit: "mm",

                        format: "a4",

                        orientation:
                            "portrait"

                    }

                };


                html2pdf()
                    .set(options)
                    .from(element)
                    .save();

            }
        );

    }


    /* =====================================================
       CLEAR FORM
    ===================================================== */

    function clearForm() {

        [
            "amalName",
            "amalCompany",
            "amalMobile",
            "amalProduct",
            "amalQuantity",
            "amalPrice",
            "amalDetails"
        ]
        .forEach(function (id) {

            const el =
                document.getElementById(id);

            if (el) {

                el.value = "";

            }

        });


        document
            .getElementById(
                "amalCalculation"
            )
            .textContent =
            "Enter quantity and price to calculate.";

    }


    /* =====================================================
       START
    ===================================================== */

    function initQuotationSystem() {

        createQuotationSection();

    }


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
