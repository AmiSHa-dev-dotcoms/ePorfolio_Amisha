document.addEventListener("DOMContentLoaded", function() {
    // Fade-in animation
    const mainContent = document.querySelector(".main-content");
    if (mainContent) mainContent.classList.add("fade-in");

    // Active navigation item persistence using localStorage
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    localStorage.setItem("lastVisitedPage", currentPage);

    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

    // Bootstrap tooltips activation
    if (typeof bootstrap !== "undefined") {
        document.querySelectorAll("[data-bs-toggle='tooltip']").forEach(tooltip => {
            new bootstrap.Tooltip(tooltip);
        });
    }

    // Improved smooth scrolling (supports dynamic elements)
    document.addEventListener("click", function(event) {
        if (event.target.tagName === "A" && event.target.getAttribute("href").startsWith("#")) {
            event.preventDefault();
            const target = document.querySelector(event.target.getAttribute("href"));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        }
    });

    // Copy button functionality for code snippets
    document.querySelectorAll(".code-example pre").forEach(block => {
        const copyButton = document.createElement("button");
        copyButton.className = "btn btn-sm btn-primary copy-btn";
        copyButton.textContent = "Copy";
        block.style.position = "relative";
        block.appendChild(copyButton);

        copyButton.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(block.textContent);
                copyButton.textContent = "Copied!";
                setTimeout(() => copyButton.textContent = "Copy", 2000);
            } catch (err) {
                copyButton.textContent = "Failed";
            }
        });
    });

    // Theme toggler with button icon change
    document.getElementById("theme-toggle").addEventListener("click", function() {
        const body = document.body;
        const isDark = body.classList.toggle("dark-theme");
        localStorage.setItem("dark-theme", isDark);

        // Change icon based on theme
        this.innerHTML = isDark ? "🌙" : "☀️";
    });

    // Enhanced form validation with messages
    document.querySelectorAll("form").forEach(form => {
        form.addEventListener("submit", function(event) {
            let isValid = true;
            this.querySelectorAll("input[required], textarea[required]").forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add("is-invalid");
                    input.nextElementSibling.textContent = "This field is required.";
                } else {
                    input.classList.remove("is-invalid");
                    input.nextElementSibling.textContent = "";
                }
            });

            if (!isValid) event.preventDefault();
        });
    });

    // Code execution preview (avoiding eval for security)
    document.querySelectorAll(".run-code").forEach(button => {
        button.addEventListener("click", function() {
            const codeId = this.getAttribute("data-code-id");
            const outputId = this.getAttribute("data-output-id");
            const codeElement = document.getElementById(codeId);
            const outputElement = document.getElementById(outputId);

            if (codeElement && outputElement) {
                try {
                    const result = new Function(codeElement.textContent)();
                    outputElement.textContent = result;
                    outputElement.classList.remove("text-danger");
                } catch (error) {
                    outputElement.textContent = `Error: ${error.message}`;
                    outputElement.classList.add("text-danger");
                }
            }
        });
    });
});