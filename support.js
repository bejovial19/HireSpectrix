document.addEventListener("DOMContentLoaded", function () {

    const stars = document.querySelectorAll("#ratingStars span");
    const ratingText = document.getElementById("ratingText");

    let selectedRating = 0;

    const ratingLabels = [
        "Very Bad😞",
        "Bad😕",
        "Okay😐",
        "Good🙂",
        "Excellent🔥"
    ];

    stars.forEach((star, index) => {

        // ⭐ Hover effect
        star.addEventListener("mouseover", function () {
            resetStars();
            for (let i = 0; i <= index; i++) {
                stars[i].classList.add("active");
            }
            ratingText.innerText = ratingLabels[index];
        });

        // ⭐ Click (final selection)
        star.addEventListener("click", function () {
            selectedRating = index + 1;
        });

        // ⭐ Mouse leave (restore selected state)
        star.addEventListener("mouseout", function () {
            resetStars();

            if (selectedRating > 0) {
                for (let i = 0; i < selectedRating; i++) {
                    stars[i].classList.add("active");
                }
                ratingText.innerText = `You rated us ${selectedRating} / 5⭐`;
            } else {
                ratingText.innerText = "No rating given";
            }
        });

    });

    function resetStars() {
        stars.forEach(s => s.classList.remove("active"));
    }

});