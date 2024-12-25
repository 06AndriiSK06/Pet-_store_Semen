const starContainer = document.getElementById("star-container");
const reviewForm = document.getElementById("review-form");
const reviewsContainer = document.getElementById("reviews-container");
const reviewTextarea = document.getElementById("review");
let selectedRating = 0;

// Default reviews
const defaultReviews = [
    {
        name: "Олена",
        review: "Дуже гарний магазин! Великий вибір кормів для собак.",
        rating: 5,
    },
    {
        name: "Анна",
        review: "Замовляла іграшку для кота. Все прийшло швидко.",
        rating: 4,
    },
    {
        name: "Ігор",
        review: "Ціни трохи вищі, але якість товарів чудова.",
        rating: 4,
    },
    {
        name: "Марія",
        review: "Дуже привітний персонал, допомогли з вибором аксесуарів для папуги.",
        rating: 5,
    },
];

// Load reviews from local storage, ensuring default reviews are preserved
const loadReviews = () => {
    const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const combinedReviews = [
    ...defaultReviews,
    ...storedReviews.filter(
        (sr) => !defaultReviews.some((dr) => dr.review === sr.review)
    ),
];
localStorage.setItem("reviews", JSON.stringify(combinedReviews));

reviewsContainer.innerHTML = "";
combinedReviews.forEach(({ name, review, rating }) => {
    const reviewItem = document.createElement("div");
    reviewItem.classList.add("review-item");

    const nameElement = document.createElement("h4");
    nameElement.textContent = name;

    const starDiv = document.createElement("div");
    starDiv.classList.add("stars");

    for (let i = 1; i <= 5; i++) {
        const star = document.createElement("span");
        star.textContent = "★";
        if (i <= rating) {
            star.classList.add("selected");
        }
        starDiv.appendChild(star);
    }

    const reviewText = document.createElement("p");
    reviewText.textContent = review;

    reviewItem.appendChild(nameElement);
    reviewItem.appendChild(starDiv);
    reviewItem.appendChild(reviewText);
    reviewsContainer.appendChild(reviewItem);
});
};

      // Handle star selection
      starContainer.addEventListener("click", (e) => {
        if (e.target.tagName === "SPAN") {
          selectedRating = parseInt(e.target.getAttribute("data-value"));

          Array.from(starContainer.children).forEach((star, index) => {
            if (index < selectedRating) {
              star.classList.add("selected");
            } else {
              star.classList.remove("selected");
            }
          });
        }
      });

      // Handle form submission
      reviewForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const reviewText = reviewTextarea.value.trim();
        const name = prompt("Введіть ваше ім'я:").trim();

        if (!reviewText || !selectedRating || !name) {
          alert("Будь ласка, заповніть всі поля та поставте оцінку.");
          return;
        }

        const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviews.unshift({ name, review: reviewText, rating: selectedRating });
        localStorage.setItem("reviews", JSON.stringify(reviews));

        reviewTextarea.value = "";
        selectedRating = 0;
        Array.from(starContainer.children).forEach((star) =>
          star.classList.remove("selected")
        );

        loadReviews();
      });

      // Initial load
      loadReviews();