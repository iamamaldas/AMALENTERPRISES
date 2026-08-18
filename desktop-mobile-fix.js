(function () {

    if (window.screen.width > 600) return;

    const style = document.createElement("style");

    style.textContent = `
        .nav-links {
            display: none !important;
            position: absolute !important;
            top: 62px !important;
            left: 0 !important;
            width: 100% !important;
            flex-direction: column !important;
            gap: 0 !important;
        }

        .nav-links.show {
            display: flex !important;
        }

        .nav-links a {
            width: 100% !important;
            text-align: center !important;
            padding: 14px !important;
        }

        .menu-button {
            display: block !important;
        }

        .hero-content {
            flex-direction: column !important;
            align-items: flex-start !important;
            min-height: 650px !important;
            padding: 32px 20px !important;
        }

        .hero-left {
            width: 100% !important;
        }

        .hero-info {
            width: 100% !important;
            margin: 24px 0 0 !important;
        }

        .hero {
            min-height: 650px !important;
        }

        .hero-title {
            font-size: 25px !important;
        }

        .hero-description {
            font-size: 12px !important;
        }

        .hero-buttons {
            flex-wrap: wrap !important;
        }

        .product-grid {
            grid-template-columns: 1fr !important;
        }

        .lower-grid {
            grid-template-columns: 1fr !important;
        }

        .products-inner {
            flex-direction: column !important;
        }

        .products-heading {
            width: 100% !important;
            padding-left: 5px !important;
        }

        .steps {
            flex-wrap: wrap !important;
        }

        .step {
            flex: 50% !important;
            margin-bottom: 20px !important;
        }

        .step:not(:last-child)::after {
            display: none !important;
        }

        .quote-area {
            grid-template-columns: 1fr !important;
        }

        .form-links {
            grid-template-columns: 1fr !important;
        }

        .form-card {
            flex-direction: column !important;
            align-items: flex-start !important;
        }

        .form-button {
            width: 100% !important;
            text-align: center !important;
        }

        .footer-inner {
            flex-direction: column !important;
            gap: 15px !important;
            text-align: center !important;
        }

        .copyright {
            text-align: center !important;
        }

        html,
        body {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            overflow-x: hidden !important;
        }

        img,
        video,
        iframe {
            max-width: 100% !important;
        }
    `;

    document.head.appendChild(style);

})();
