document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const messageDiv = document.getElementById("contactMessage");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Add message with animation class
        messageDiv.innerHTML = "✅ Thank you! Your message has been received.";
        messageDiv.classList.add("show-message");

        // Reset form
        form.reset();

        // Remove message after 4 seconds
        setTimeout(() => {
            messageDiv.classList.remove("show-message");
            messageDiv.classList.add("hide-message");

            setTimeout(() => {
                messageDiv.innerHTML = "";
                messageDiv.classList.remove("hide-message");
            }, 500); // fade out duration
        }, 4000);
    });
});