document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("jobForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let salaryInput = document.getElementById("salary").value.trim();
        const currency = document.getElementById("currency").value;
        const email = document.getElementById("email").value.toLowerCase();
        let website = document.getElementById("website").value.trim().toLowerCase();
        const description = document.getElementById("description").value.toLowerCase();
        const fee = document.querySelector('input[name="fee"]:checked')?.value;

        let score = 0;
        let reasons = [];

        // 🔥 Remove commas from salary
        salaryInput = salaryInput.replace(/,/g, "");

        // Salary Validation
        const validFormat = /^[0-9]+(-[0-9]+)?$/;

        if (!validFormat.test(salaryInput)) {
            alert("Invalid salary format. Use 50000 or 30000-70000");
            return;
        }

        let avgSalary = 0;

        if (salaryInput.includes("-")) {
            let [min, max] = salaryInput.split("-").map(Number);
            if (min > max) {
                alert("Min salary cannot be greater than max salary");
                return;
            }
            avgSalary = (min + max) / 2;
        } else {
            avgSalary = parseInt(salaryInput);
        }

        // Currency conversion
        if (currency === "USD") avgSalary *= 83;
        if (currency === "EUR") avgSalary *= 90;

        // Salary Check
        if (avgSalary > 200000) {
            score += 2;
            reasons.push("Unrealistic salary for given role");
        }

        // Email Domain Check
        const freeDomains = ["@gmail.com", "@yahoo.com", "@outlook.com", "@hotmail.com"];
        let emailDomain = email.split("@")[1];

        if (freeDomains.some(d => email.includes(d))) {
            score += 2;
            reasons.push("Use of free email domain");
        }

        // Website Normalization
        if (website && !website.startsWith("http")) {
            website = "https://" + website;
        }

        let websiteDomain = "";
        try {
            websiteDomain = new URL(website).hostname.replace("www.", "");
        } catch {
            websiteDomain = "";
        }

        // Domain Match Check
        if (websiteDomain && emailDomain && !emailDomain.includes(websiteDomain)) {
            score += 2;
            reasons.push("Email domain does not match company website");
        }

        // Registration Fee Check
        if (fee === "yes") {
            score += 3;
            reasons.push("Registration fee required");
        }

        // Suspicious Keywords Check
        const keywords = [
            "urgent hiring",
            "no interview",
            "limited seats",
            "pay registration fee",
            "guaranteed job",
            "earn fast"
        ];

        if (keywords.some(word => description.includes(word))) {
            score += 2;
            reasons.push("Suspicious phrases in job description");
        }

        // Risk Decision
        let risk = "";
        let riskClass = "";

        if (score <= 2) {
            risk = "SAFE";
            riskClass = "safe";
        } else if (score <= 5) {
            risk = "MEDIUM RISK";
            riskClass = "medium";
        } else {
            risk = "HIGH RISK";
            riskClass = "high";
        }

        // Confidence Calculation
        let confidence = Math.round((score / 9) * 100);

        // Store in localStorage for result page
        localStorage.setItem("risk", risk);
        localStorage.setItem("riskClass", riskClass);
        localStorage.setItem("reasons", JSON.stringify(reasons));
        localStorage.setItem("score", score.toString());
        localStorage.setItem("confidence", confidence.toString());

        // Redirect to result page
        window.location.href = "result.html";
    });

});