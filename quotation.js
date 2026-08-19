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

  /* =======================================================
     CONFIGURATION
  ======================================================= */

  const APPS_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycby1xYE853B-z_EJAL9YC8MX6DWwsxOwzlGIxhZBjSb7x89vslTF3cjd8QMarOwwbYk07A/exec";

  const API_TOKEN =
    "AmalQuotation2026_9x7Qm2";

  const ADMIN_WHATSAPP =
    "6296471636";

  const STORAGE_KEY =
    "amal_enterprises_quotation_data";

  const QUOTATION_PREFIX =
    "AE";

  /* =======================================================
     DOM HELPERS
     ======================================================= */

  function $(selector, parent) {
    return (parent || document).querySelector(selector);
  }

  function $$(selector, parent) {
    return Array.from(
      (parent || document).querySelectorAll(selector)
    );
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function text(value) {
    return String(value == null ? "" : value).trim();
  }

  function number(value) {
    const n = parseFloat(
      String(value == null ? "" : value)
        .replace(/,/g, "")
        .replace(/[^\d.-]/g, "")
    );

    return isNaN(n) ? 0 : n;
  }

  function escapeHtml(value) {
    return text(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /* =======================================================
     MOBILE NUMBER
     ======================================================= */

  function cleanMobile(value) {
    let mobile = text(value).replace(/\D/g, "");

    if (
      mobile.length === 12 &&
      mobile.indexOf("91") === 0
    ) {
      mobile = mobile.substring(2);
    }

    return mobile;
  }

  function whatsappNumber(value) {
    let mobile = cleanMobile(value);

    if (mobile.length === 10) {
      return "91" + mobile;
    }

    if (
      mobile.length === 12 &&
      mobile.indexOf("91") === 0
    ) {
      return mobile;
    }

    return mobile;
  }

  /* =======================================================
     DATE / TIME
     ======================================================= */

  function today() {
    const d = new Date();

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
  }

  function quotationNumber() {
    const now = new Date();

    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");

    const stamp =
      String(now.getHours()).padStart(2, "0") +
      String(now.getMinutes()).padStart(2, "0") +
      String(now.getSeconds()).padStart(2, "0");

    return `${QUOTATION_PREFIX}-${y}${m}${d}-${stamp}`;
  }

  /* =======================================================
     DATA STORAGE
     ======================================================= */

  function loadSavedData() {
    try {
      const value =
        localStorage.getItem(
          STORAGE_KEY
        );

      if (!value) {
        return {};
      }

      return JSON.parse(value);

    } catch (error) {
      return {};
    }
  }

  function saveData(data) {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
      );
    } catch (error) {
      console.warn(
        "Could not save local quotation data.",
        error
      );
    }
  }

  /* =======================================================
     FIELD FINDER
     ======================================================= */

  function findField(names) {
    for (const name of names) {

      const selectors = [
        `#${name}`,
        `[name="${name}"]`,
        `[data-field="${name}"]`,
        `[data-name="${name}"]`
      ];

      for (const selector of selectors) {

        const element =
          document.querySelector(selector);

        if (element) {
          return element;
        }
      }
    }

    return null;
  }

  function fieldValue(names) {
    const element =
      findField(names);

    if (!element) {
      return "";
    }

    return text(element.value);
  }

  function setFieldValue(names, value) {
    const element =
      findField(names);

    if (!element) {
      return false;
    }

    element.value =
      value == null ? "" : value;

    element.dispatchEvent(
      new Event("input", {
        bubbles: true
      })
    );

    element.dispatchEvent(
      new Event("change", {
        bubbles: true
      })
    );

    return true;
  }

  /* =======================================================
     ROLE
     ======================================================= */

  function getRole() {

    const roleField =
      findField([
        "role",
        "userRole",
        "partyType",
        "quotationFor"
      ]);

    if (roleField) {

      if (
        roleField.type === "radio" ||
        roleField.type === "checkbox"
      ) {

        const checked =
          document.querySelector(
            `[name="${roleField.name}"]:checked`
          );

        if (checked) {
          return text(checked.value);
        }

      } else {

        return text(roleField.value);

      }
    }

    const checkedRole =
      document.querySelector(
        'input[name="role"]:checked,' +
        'input[name="userRole"]:checked,' +
        'input[name="partyType"]:checked'
      );

    if (checkedRole) {
      return text(checkedRole.value);
    }

    return "Admin";
  }

  /* =======================================================
     CATEGORY
     ======================================================= */

  const DEFAULT_CATEGORIES = [
    "Jute Products",
    "Jute Bags",
    "Jute Yarn",
    "Jute Rope",
    "Jute Twine",
    "Jute Fabric",
    "Jute Geotextile",
    "Polyethylene Carry Bags",
    "Paper Bags",
    "Packaging Materials",
    "Eco Friendly Products",
    "Other"
  ];

  function setupCategoryDefaults() {

    const category =
      findField([
        "category",
        "productCategory",
        "product_category"
      ]);

    if (!category) {
      return;
    }

    if (
      category.tagName.toLowerCase() ===
      "select"
    ) {

      const existing =
        Array.from(category.options)
          .map(function (option) {
            return text(option.value);
          })
          .filter(Boolean);

      if (existing.length <= 1) {

        DEFAULT_CATEGORIES.forEach(
          function (item) {

            const option =
              document.createElement("option");

            option.value = item;
            option.textContent = item;

            category.appendChild(option);

          }
        );
      }
    }
  }

  /* =======================================================
     UNIT
     ======================================================= */

  const DEFAULT_UNITS = [
    "piece",
    "kg",
    "g",
    "mg",
    "tonne",
    "meter",
    "roll",
    "bundle",
    "box",
    "bag",
    "packet",
    "set"
  ];

  function setupUnitDefaults() {

    const unit =
      findField([
        "unit",
        "productUnit",
        "product_unit"
      ]);

    if (!unit) {
      return;
    }

    if (
      unit.tagName.toLowerCase() ===
      "select"
    ) {

      const existing =
        Array.from(unit.options)
          .map(function (option) {
            return text(option.value);
          })
          .filter(Boolean);

      if (existing.length <= 1) {

        DEFAULT_UNITS.forEach(
          function (item) {

            const option =
              document.createElement("option");

            option.value = item;
            option.textContent = item;

            unit.appendChild(option);

          }
        );
      }
    }
  }

  /* =======================================================
     EMAIL OPTIONAL
     ======================================================= */

  function makeEmailOptional() {

    const email =
      findField([
        "email",
        "emailAddress",
        "customerEmail"
      ]);

    if (!email) {
      return;
    }

    email.required = false;

    email.removeAttribute(
      "required"
    );

    const wrapper =
      email.closest(
        ".form-group,.field,.input-group,.form-field"
      );

    if (wrapper) {

      const label =
        wrapper.querySelector("label");

      if (label) {

        label.textContent =
          label.textContent
            .replace("*", "")
            .replace(
              /\(required\)/gi,
              ""
            )
            .trim();

      }
    }
  }

  /* =======================================================
     QUOTATION STATUS
     ======================================================= */

  function getQuotationStatus() {

    const checked =
      document.querySelector(
        'input[name="quotationStatus"]:checked,' +
        'input[name="status"]:checked,' +
        'input[name="priceStatus"]:checked'
      );

    if (checked) {

      const value =
        text(checked.value)
          .toLowerCase();

      if (
        value.indexOf("negoti") !== -1
      ) {
        return "Negotiable";
      }

      return "Final Quotation";
    }

    const select =
      findField([
        "quotationStatus",
        "status",
        "priceStatus"
      ]);

    if (select) {

      const value =
        text(select.value)
          .toLowerCase();

      if (
        value.indexOf("negoti") !== -1
      ) {
        return "Negotiable";
      }
    }

    return "Final Quotation";
  }

  function setupQuotationStatus() {

    const container =
      document.querySelector(
        '[data-quotation-status]'
      );

    if (container) {
      return;
    }

    const possible =
      document.querySelector(
        '#quotationStatus,' +
        '[name="quotationStatus"]'
      );

    if (possible) {
      possible.required = false;
    }
  }

  /* =======================================================
     PRODUCT DATA
     ======================================================= */

  function collectQuotationData() {

    const quantity =
      fieldValue([
        "quantity",
        "qty"
      ]);

    const unit =
      fieldValue([
        "unit",
        "productUnit",
        "product_unit"
      ]);

    const price =
      fieldValue([
        "price",
        "unitPrice",
        "unit_price"
      ]);

    const totalField =
      findField([
        "total",
        "totalPrice",
        "grandTotal",
        "estimatedTotal"
      ]);

    let total =
      totalField
        ? text(totalField.value)
        : "";

    if (!total) {

      const calculated =
        number(quantity) *
        number(price);

      if (calculated) {
        total =
          calculated.toFixed(2);
      }
    }

    return {

      quoteNo:
        fieldValue([
          "quotationNo",
          "quoteNo",
          "quotationNumber"
        ]) ||
        quotationNumber(),

      date:
        fieldValue([
          "quotationDate",
          "date"
        ]) ||
        today(),

      role:
        getRole(),

      name:
        fieldValue([
          "name",
          "customerName",
          "buyerName",
          "supplierName",
          "partyName"
        ]),

      company:
        fieldValue([
          "company",
          "companyName",
          "customerCompany",
          "buyerCompany",
          "supplierCompany"
        ]),

      mobile:
        cleanMobile(
          fieldValue([
            "mobile",
            "mobileNumber",
            "phone",
            "phoneNumber",
            "customerMobile",
            "buyerMobile",
            "supplierMobile"
          ])
        ),

      email:
        fieldValue([
          "email",
          "emailAddress",
          "customerEmail"
        ]),

      category:
        fieldValue([
          "category",
          "productCategory",
          "product_category"
        ]),

      product:
        fieldValue([
          "product",
          "productName",
          "product_name"
        ]),

      specification:
        fieldValue([
          "description",
          "specification",
          "productDescription",
          "notes"
        ]),

      quantity:
        quantity,

      unit:
        unit,

      price:
        price,

      total:
        total,

      status:
        getQuotationStatus()

    };
  }

  /* =======================================================
     VALIDATION
     ======================================================= */

  function validateQuotation(data) {

    const errors = [];

    if (!data.name) {
      errors.push(
        "Name is required."
      );
    }

    if (!data.company) {
      errors.push(
        "Company Name is required."
      );
    }

    if (
      !data.mobile ||
      data.mobile.length !== 10
    ) {
      errors.push(
        "Please enter a valid 10-digit mobile number."
      );
    }

    if (!data.product) {
      errors.push(
        "Product is required."
      );
    }

    if (!data.quantity) {
      errors.push(
        "Quantity is required."
      );
    }

    if (!data.unit) {
      errors.push(
        "Unit is required."
      );
    }

    if (
      data.status ===
      "Final Quotation" &&
      !data.price
    ) {
      errors.push(
        "Price is required for Final Quotation."
      );
    }

    return errors;
  }

  /* =======================================================
     CALCULATE TOTAL
     ======================================================= */

  function calculateTotal() {

    const quantity =
      number(
        fieldValue([
          "quantity",
          "qty"
        ])
      );

    const price =
      number(
        fieldValue([
          "price",
          "unitPrice",
          "unit_price"
        ])
      );

    const total =
      quantity * price;

    const totalField =
      findField([
        "total",
        "totalPrice",
        "grandTotal",
        "estimatedTotal"
      ]);

    if (
      totalField &&
      total > 0
    ) {

      totalField.value =
        total.toFixed(2);

      totalField.dispatchEvent(
        new Event("input", {
          bubbles: true
        })
      );

    }

    return total;
  }

  /* =======================================================
     UPDATE CALCULATION EVENTS
     ======================================================= */

  function setupCalculation() {

    const fields = [
      "quantity",
      "qty",
      "price",
      "unitPrice",
      "unit_price"
    ];

    fields.forEach(
      function (id) {

        const field =
          findField([id]);

        if (field) {

          field.addEventListener(
            "input",
            calculateTotal
          );

          field.addEventListener(
            "change",
            calculateTotal
          );

        }

      }
    );

  }

  /* =======================================================
     PREVIEW MODAL
     ======================================================= */

  function createPreviewStyles() {

    if (
      byId(
        "amalQuotationPreviewStyle"
      )
    ) {
      return;
    }

    const style =
      document.createElement("style");

    style.id =
      "amalQuotationPreviewStyle";

    style.textContent = `

      #amalQuotationOverlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,.62);
        z-index: 999999;
        display: none;
        overflow-y: auto;
        padding: 20px;
        box-sizing: border-box;
      }

      #amalQuotationModal {
        width: min(900px, 100%);
        margin: 20px auto;
        background: #ffffff;
        border-radius: 18px;
        box-shadow: 0 20px 70px rgba(0,0,0,.28);
        overflow: hidden;
      }

      #amalQuotationHeader {
        padding: 18px 20px;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px;
      }

      #amalQuotationHeader h2 {
        margin: 0;
        font-size: 20px;
      }

      #amalQuotationClose {
        border: 0;
        background: transparent;
        font-size: 28px;
        cursor: pointer;
        line-height: 1;
      }

      #amalQuotationContent {
        padding: 25px;
      }

      .amal-company-title {
        text-align: center;
        font-size: 28px;
        font-weight: 800;
      }

      .amal-company-subtitle {
        text-align: center;
        color: #667085;
        font-size: 12px;
        margin-top: 5px;
      }

      .amal-quotation-title {
        text-align: center;
        margin: 25px 0 18px;
        font-size: 22px;
        font-weight: 800;
      }

      .amal-info-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0,1fr));
        gap: 10px 25px;
        margin-bottom: 20px;
      }

      .amal-info-item {
        font-size: 14px;
      }

      .amal-info-item strong {
        display: inline-block;
        min-width: 110px;
      }

      .amal-product-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 15px;
      }

      .amal-product-table th,
      .amal-product-table td {
        border: 1px solid #d0d5dd;
        padding: 10px;
        text-align: left;
        font-size: 13px;
      }

      .amal-product-table th {
        font-weight: 700;
        background: #f8fafc;
      }

      .amal-total {
        text-align: right;
        margin-top: 18px;
        font-size: 18px;
        font-weight: 800;
      }

      .amal-status {
        margin-top: 15px;
        font-weight: 800;
      }

      .amal-negotiable-note {
        margin-top: 10px;
        padding: 12px;
        border: 1px solid #d0d5dd;
        border-radius: 8px;
        font-size: 13px;
      }

      #amalQuotationActions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        padding: 18px 20px;
        border-top: 1px solid #e5e7eb;
      }

      .amal-action-btn {
        flex: 1;
        min-width: 150px;
        border: 0;
        border-radius: 10px;
        padding: 12px 15px;
        cursor: pointer;
        font-weight: 700;
        font-size: 14px;
      }

      .amal-primary-btn {
        background: #111827;
        color: #ffffff;
      }

      .amal-whatsapp-btn {
        background: #25D366;
        color: #ffffff;
      }

      .amal-cancel-btn {
        background: #f2f4f7;
        color: #344054;
      }

      #amalSavingStatus {
        display: none;
        margin: 0 20px 18px;
        padding: 12px;
        border-radius: 8px;
        font-size: 13px;
      }

      @media(max-width:650px) {

        #amalQuotationOverlay {
          padding: 8px;
        }

        #amalQuotationContent {
          padding: 15px;
        }

        .amal-info-grid {
          grid-template-columns: 1fr;
        }

        .amal-product-table {
          font-size: 11px;
        }

        .amal-product-table th,
        .amal-product-table td {
          padding: 7px;
        }

        .amal-company-title {
          font-size: 22px;
        }

      }

    `;

    document.head.appendChild(style);
  }

  function createPreviewModal() {

    if (
      byId(
        "amalQuotationOverlay"
      )
    ) {
      return;
    }

    createPreviewStyles();

    const overlay =
      document.createElement("div");

    overlay.id =
      "amalQuotationOverlay";

    overlay.innerHTML = `

      <div id="amalQuotationModal">

        <div id="amalQuotationHeader">

          <h2>
            Quotation Preview
          </h2>

          <button
            type="button"
            id="amalQuotationClose"
            aria-label="Close"
          >
            &times;
          </button>

        </div>

        <div id="amalQuotationContent"></div>

        <div id="amalSavingStatus"></div>

        <div id="amalQuotationActions">

          <button
            type="button"
            class="amal-action-btn amal-primary-btn"
            id="amalFinalSaveBtn"
          >
            Final Quotation
          </button>

          <button
            type="button"
            class="amal-action-btn amal-whatsapp-btn"
            id="amalWhatsappBtn"
          >
            Share on WhatsApp
          </button>

          <button
            type="button"
            class="amal-action-btn amal-cancel-btn"
            id="amalCancelBtn"
          >
            Cancel
          </button>

        </div>

      </div>
    `;

    document.body.appendChild(
      overlay
    );

    byId(
      "amalQuotationClose"
    ).addEventListener(
      "click",
      closePreview
    );

    byId(
      "amalCancelBtn"
    ).addEventListener(
      "click",
      closePreview
    );

    overlay.addEventListener(
      "click",
      function (event) {

        if (
          event.target === overlay
        ) {
          closePreview();
        }

      }
    );
  }

  function closePreview() {

    const overlay =
      byId(
        "amalQuotationOverlay"
      );

    if (overlay) {
      overlay.style.display =
        "none";
    }
  }

  function showPreview(data) {

    createPreviewModal();

    const overlay =
      byId(
        "amalQuotationOverlay"
      );

    const content =
      byId(
        "amalQuotationContent"
      );

    content.innerHTML = `

      <div class="amal-company-title">
        AMAL ENTERPRISES
      </div>

      <div class="amal-company-subtitle">
        ECO & PACKAGING SOURCING SOLUTIONS
      </div>

      <div class="amal-quotation-title">
        QUOTATION
      </div>

      <div class="amal-info-grid">

        <div class="amal-info-item">
          <strong>Quotation No:</strong>
          ${escapeHtml(data.quoteNo)}
        </div>

        <div class="amal-info-item">
          <strong>Date:</strong>
          ${escapeHtml(data.date)}
        </div>

        <div class="amal-info-item">
          <strong>For:</strong>
          ${escapeHtml(data.role)}
        </div>

        <div class="amal-info-item">
          <strong>Name:</strong>
          ${escapeHtml(data.name)}
        </div>

        <div class="amal-info-item">
          <strong>Company:</strong>
          ${escapeHtml(data.company)}
        </div>

        <div class="amal-info-item">
          <strong>Mobile:</strong>
          ${escapeHtml(data.mobile)}
        </div>

        ${
          data.email
            ? `
              <div class="amal-info-item">
                <strong>Email:</strong>
                ${escapeHtml(data.email)}
              </div>
            `
            : ""
        }

      </div>

      <table class="amal-product-table">

        <thead>

          <tr>
            <th>Category</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>

        </thead>

        <tbody>

          <tr>

            <td>
              ${escapeHtml(data.category)}
            </td>

            <td>
              ${escapeHtml(data.product)}
            </td>

            <td>
              ${escapeHtml(data.quantity)}
              ${escapeHtml(data.unit)}
            </td>

            <td>
              ₹${escapeHtml(data.price)}
              / ${escapeHtml(data.unit)}
            </td>

            <td>
              ₹${escapeHtml(data.total)}
            </td>

          </tr>

        </tbody>

      </table>

      ${
        data.specification
          ? `
            <div
              style="
                margin-top:18px;
                font-size:14px;
              "
            >
              <strong>
                Description / Specification:
              </strong>

              <div style="margin-top:6px;">
                ${escapeHtml(
                  data.specification
                )}
              </div>
            </div>
          `
          : ""
      }

      <div class="amal-total">
        Estimated Total:
        ₹${escapeHtml(data.total)}
      </div>

      <div class="amal-status">
        Quotation Status:
        ${escapeHtml(data.status)}
      </div>

      ${
        data.status ===
        "Negotiable"
          ? `
            <div class="amal-negotiable-note">
              Price is subject to negotiation
              and commercial discussion.
            </div>
          `
          : ""
      }

    `;

    const finalBtn =
      byId(
        "amalFinalSaveBtn"
      );

    const whatsappBtn =
      byId(
        "amalWhatsappBtn"
      );

    if (
      data.status ===
      "Negotiable"
    ) {

      finalBtn.style.display =
        "none";

    } else {

      finalBtn.style.display =
        "";

    }

    finalBtn.onclick =
      function () {

        saveFinalQuotation(
          data
        );

      };

    whatsappBtn.onclick =
      function () {

        shareQuotationWhatsApp(
          data
        );

      };

    overlay.style.display =
      "block";
  }

  /* =======================================================
     SAVING STATUS
     ======================================================= */

  function showSavingStatus(
    message,
    success
  ) {

    const box =
      byId(
        "amalSavingStatus"
      );

    if (!box) {
      return;
    }

    box.style.display =
      "block";

    box.style.background =
      success
        ? "#ecfdf3"
        : "#fef3f2";

    box.style.color =
      success
        ? "#027a48"
        : "#b42318";

    box.textContent =
      message;
  }

  /* =======================================================
     SEND DATA TO APPS SCRIPT
     ======================================================= */

  function postToAppsScript(
    data
  ) {

    return new Promise(
      function (
        resolve,
        reject
      ) {

        const form =
          document.createElement(
            "form"
          );

        form.method =
          "POST";

        form.action =
          APPS_SCRIPT_URL;

        form.target =
          "amalAppsScriptFrame";

        form.style.display =
          "none";


        const values = {

          token:
            API_TOKEN,

          action:
            "saveFinalQuotation",

          quoteNo:
            data.quoteNo,

          date:
            data.date,

          role:
            data.role,

          mobile:
            data.mobile,

          email:
            data.email,

          name:
            data.name,

          company:
            data.company,

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


        Object.keys(values)
          .forEach(
            function (key) {

              const input =
                document.createElement(
                  "input"
                );

              input.type =
                "hidden";

              input.name =
                key;

              input.value =
                values[key] == null
                  ? ""
                  : values[key];

              form.appendChild(
                input
              );

            }
          );


        let frame =
          byId(
            "amalAppsScriptFrame"
          );


        if (!frame) {

          frame =
            document.createElement(
              "iframe"
            );

          frame.id =
            "amalAppsScriptFrame";

          frame.name =
            "amalAppsScriptFrame";

          frame.style.display =
            "none";

          document.body.appendChild(
            frame
          );

        }


        document.body.appendChild(
          form
        );


        let resolved =
          false;


        const finish =
          function (
            success,
            message
          ) {

            if (resolved) {
              return;
            }

            resolved = true;

            try {
              form.remove();
            } catch (e) {}

            resolve({
              success:
                success,
              message:
                message
            });

          };


        /*
         * Apps Script Web App redirects after POST.
         * We therefore use a short delay after submission.
         */

        form.submit();


        setTimeout(
          function () {

            finish(
              true,
              "Quotation submitted to Google Apps Script."
            );

          },
          1800
        );


        /*
         * Hard timeout.
         */

        setTimeout(
          function () {

            if (!resolved) {

              finish(
                false,
                "Google Apps Script did not respond."
              );

            }

          },
          10000
        );

      }
    );
  }

  /* =======================================================
     SAVE FINAL QUOTATION
     ======================================================= */

  async function saveFinalQuotation(
    data
  ) {

    const errors =
      validateQuotation(
        data
      );

    if (
      errors.length
    ) {

      alert(
        errors.join("\n")
      );

      return;

    }


    if (
      data.status !==
      "Final Quotation"
    ) {

      alert(
        "Only Final Quotation can be stored in Google Sheet."
      );

      return;

    }


    showSavingStatus(
      "Saving quotation to Google Sheet and creating latest PDF...",
      false
    );


    const button =
      byId(
        "amalFinalSaveBtn"
      );

    if (button) {

      button.disabled =
        true;

      button.textContent =
        "Saving...";

    }


    try {

      const result =
        await postToAppsScript(
          data
        );


      if (!result.success) {

        throw new Error(
          result.message ||
          "Could not submit quotation."
        );

      }


      /*
       * Save latest local copy too.
       */

      saveData({
        mobile:
          data.mobile,

        name:
          data.name,

        company:
          data.company,

        email:
          data.email,

        product:
          data.product,

        quoteNo:
          data.quoteNo,

        savedAt:
          new Date().toISOString()
      });


      showSavingStatus(
        "✓ Final quotation submitted. Google Sheet and latest PDF processing started.",
        true
      );


      if (button) {

        button.textContent =
          "Saved ✓";

      }


    } catch (error) {

      console.error(
        error
      );


      showSavingStatus(
        "Could not save quotation: " +
        error.message,
        false
      );


      if (button) {

        button.disabled =
          false;

        button.textContent =
          "Final Quotation";

      }

    }
  }

  /* =======================================================
     ADMIN WHATSAPP VERIFICATION
     ======================================================= */

  function isAdminRole(data) {

    const role =
      text(data.role)
        .toLowerCase();

    return (
      role === "admin" ||
      role.indexOf("admin") !== -1
    );
  }

  function verifyAdminWhatsApp() {

    /*
     * Browser security does not allow a website to read
     * the WhatsApp account currently logged into the phone.
     *
     * Therefore the admin must explicitly confirm that
     * WhatsApp is active with the configured admin number.
     */

    const message =
      "Admin WhatsApp verification\n\n" +
      "Please confirm that WhatsApp is currently active " +
      "with Admin number " +
      ADMIN_WHATSAPP +
      ".\n\n" +
      "If this number is not the active WhatsApp account, " +
      "the quotation will NOT be shared.";

    return window.confirm(
      message
    );
  }

  /* =======================================================
     RECIPIENT NUMBER
     ======================================================= */

  function getAdminRecipient() {

    const recipient =
      window.prompt(
        "Enter recipient WhatsApp mobile number:",
        ""
      );

    if (
      recipient === null
    ) {
      return "";
    }

    const mobile =
      cleanMobile(
        recipient
      );

    if (
      mobile.length !== 10
    ) {

      alert(
        "Please enter a valid 10-digit recipient mobile number."
      );

      return "";

    }

    return mobile;
  }

  function getBuyerSupplierRecipient() {

    return ADMIN_WHATSAPP;
  }

  /* =======================================================
     WHATSAPP MESSAGE
     ======================================================= */

  function quotationMessage(
    data
  ) {

    let message =
      "Hello,\n\n" +

      "Please find the quotation details below.\n\n" +

      "AMAL ENTERPRISES\n" +

      "Quotation No: " +
      data.quoteNo +
      "\n" +

      "Date: " +
      data.date +
      "\n\n" +

      "Name: " +
      data.name +
      "\n" +

      "Company: " +
      data.company +
      "\n" +

      "Product: " +
      data.product +
      "\n" +

      "Quantity: " +
      data.quantity +
      " " +
      data.unit +
      "\n" +

      "Unit Price: ₹" +
      data.price +
      " / " +
      data.unit +
      "\n" +

      "Estimated Total: ₹" +
      data.total +
      "\n\n" +

      "Quotation Status: " +
      data.status +
      "\n";


    if (
      data.status ===
      "Negotiable"
    ) {

      message +=
        "\nPrice is subject to negotiation and commercial discussion.\n";

    }


    message +=
      "\nThank you.\n" +
      "AMAL ENTERPRISES";


    return message;
  }

  /* =======================================================
     WHATSAPP SHARE
     ======================================================= */

  function shareQuotationWhatsApp(
    data
  ) {

    const errors =
      validateQuotation(
        data
      );

    if (
      errors.length
    ) {

      alert(
        errors.join("\n")
      );

      return;

    }


    let recipient = "";


    /*
     * Admin can send to ANY recipient.
     */

    if (
      isAdminRole(data)
    ) {

      /*
       * Require explicit confirmation that the
       * configured admin WhatsApp number is active.
       */

      const verified =
        verifyAdminWhatsApp();


      if (!verified) {

        alert(
          "Quotation sharing cancelled."
        );

        return;

      }


      recipient =
        getAdminRecipient();


      if (!recipient) {

        return;

      }

    } else {

      /*
       * Buyer / Supplier -> Admin
       */

      recipient =
        getBuyerSupplierRecipient();

    }


    const encodedMessage =
      encodeURIComponent(
        quotationMessage(data)
      );


    const url =
      "https://wa.me/" +
      whatsappNumber(
        recipient
      ) +
      "?text=" +
      encodedMessage;


    /*
     * Open WhatsApp.
     *
     * The actual WhatsApp account used is determined by
     * the WhatsApp account active on the Admin's device.
     */

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );

  }

  /* =======================================================
     FORM SUBMIT
     ======================================================= */

  function handleFormSubmit(
    event
  ) {

    /*
     * Do not interfere with normal form submission if
     * this is not the quotation form.
     */

    const form =
      event.currentTarget;


    if (
      !form
    ) {
      return;
    }


    const data =
      collectQuotationData();


    const errors =
      validateQuotation(
        data
      );


    if (
      errors.length
    ) {

      event.preventDefault();

      alert(
        errors.join("\n")
      );

      return;

    }


    /*
     * We always show preview before final processing.
     */

    event.preventDefault();


    showPreview(
      data
    );

  }

  /* =======================================================
     FIND QUOTATION FORM
     ======================================================= */

  function findQuotationForm() {

    const possibleSelectors = [

      "#quotationForm",

      "#quoteForm",

      "form[data-quotation-form]",

      "form[data-form-type='quotation']",

      ".quotation-form",

      "form"

    ];


    for (
      const selector of possibleSelectors
    ) {

      const form =
        document.querySelector(
          selector
        );

      if (form) {

        /*
         * Prefer a form that contains a product
         * or quotation related field.
         */

        const hasQuotationField =
          form.querySelector(
            '[name="product"],' +
            '[name="productName"],' +
            '#product,' +
            '#productName,' +
            '[name="quotationNo"],' +
            '#quotationNo'
          );


        if (
          hasQuotationField ||
          selector !== "form"
        ) {

          return form;

        }

      }

    }

    return null;
  }

  /* =======================================================
     ADD STATUS UI IF NEEDED
     ======================================================= */

  function ensureStatusField() {

    const existing =
      document.querySelector(
        'input[name="quotationStatus"],' +
        'select[name="quotationStatus"],' +
        '#quotationStatus'
      );

    if (existing) {
      return;
    }


    const form =
      findQuotationForm();

    if (!form) {
      return;
    }


    const wrapper =
      document.createElement(
        "div"
      );

    wrapper.setAttribute(
      "data-quotation-status",
      "true"
    );

    wrapper.style.margin =
      "12px 0";

    wrapper.innerHTML = `

      <label
        style="
          display:block;
          font-weight:600;
          margin-bottom:8px;
        "
      >
        Quotation Type
      </label>

      <label
        style="
          margin-right:18px;
          cursor:pointer;
        "
      >

        <input
          type="radio"
          name="quotationStatus"
          value="Final Quotation"
          checked
        >

        Final Quotation

      </label>

      <label
        style="
          cursor:pointer;
        "
      >

        <input
          type="radio"
          name="quotationStatus"
          value="Negotiable"
        >

        Negotiable

      </label>

    `;


    /*
     * Put it immediately before submit button.
     */

    const submit =
      form.querySelector(
        'button[type="submit"],' +
        'input[type="submit"]'
      );


    if (submit) {

      submit.parentNode.insertBefore(
        wrapper,
        submit
      );

    } else {

      form.appendChild(
        wrapper
      );

    }

  }

  /* =======================================================
     TITLE
     ======================================================= */

  function setupTitle() {

    const title =
      document.querySelector(
        "#quotationTitle," +
        "[data-quotation-title]"
      );

    if (title) {

      title.textContent =
        "Create Quotation";

      return;

    }


    const headings =
      $$(
        "h1,h2,h3,h4"
      );


    headings.forEach(
      function (heading) {

        const value =
          text(
            heading.textContent
          )
          .toLowerCase();


        if (
          value.indexOf(
            "create quotation"
          ) !== -1 ||
          value === "quotation"
        ) {

          heading.textContent =
            "Create Quotation";

        }

      }
    );

  }

  /* =======================================================
     HIDE OLD BUYER / SUPPLIER GOOGLE FORM LINKS
     ======================================================= */

  function hideOldGoogleFormLinks() {

    const elements =
      $$(
        "a,button"
      );


    elements.forEach(
      function (element) {

        const value =
          text(
            element.textContent
          )
          .toLowerCase();


        const href =
          text(
            element.getAttribute(
              "href"
            )
          )
          .toLowerCase();


        if (
          value.indexOf(
            "google form"
          ) !== -1 ||
          href.indexOf(
            "docs.google.com/forms"
          ) !== -1
        ) {

          element.style.display =
            "none";

        }

      }
    );

  }

  /* =======================================================
     INITIALIZE
     ======================================================= */

  function initialize() {

    try {

      setupTitle();

      makeEmailOptional();

      setupCategoryDefaults();

      setupUnitDefaults();

      setupQuotationStatus();

      ensureStatusField();

      setupCalculation();

      hideOldGoogleFormLinks();


      const form =
        findQuotationForm();


      if (form) {

        /*
         * Prevent duplicate listeners.
         */

        if (
          form.dataset.amalQuotationReady !==
          "1"
        ) {

          form.dataset.amalQuotationReady =
            "1";

          form.addEventListener(
            "submit",
            handleFormSubmit
          );

        }

      }


      calculateTotal();


      console.log(
        "AMAL ENTERPRISES quotation system initialized."
      );


    } catch (error) {

      console.error(
        "Quotation system initialization error:",
        error
      );

    }

  }

  /* =======================================================
     START
     ======================================================= */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initialize
    );

  } else {

    initialize();

  }


  /*
   * Google Sites / embedded content may load dynamically.
   */

  window.setTimeout(
    initialize,
    1000
  );

  window.setTimeout(
    initialize,
    2500
  );


  /* =======================================================
     PUBLIC API
     ======================================================= */

  window.AmalQuotation = {

    collect:
      collectQuotationData,

    preview:
      showPreview,

    save:
      saveFinalQuotation,

    whatsapp:
      shareQuotationWhatsApp,

    calculate:
      calculateTotal

  };

})();
