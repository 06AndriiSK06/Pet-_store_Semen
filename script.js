document.addEventListener("DOMContentLoaded", () => {
    const categoriesHeader = document.querySelector(".categories__header");
    const categoriesList = document.querySelector(".categories__list");
    const mainArrow = categoriesHeader.querySelector(".categories__arrow"); // Стрелка главной категории
    const popup = document.querySelector(".popup");
    const popupClose = popup.querySelector(".popup__close");

    let activeArrow = null; // Хранит активную стрелку

    // Переключение видимости списка категорий + поворот стрелки
    categoriesHeader.addEventListener("click", () => {
        categoriesList.classList.toggle("hidden");

        // Переключаем поворот главной стрелки
        mainArrow.classList.toggle("rotated");
    });

    // Добавляем обработчик кликов для подкатегорий
    categoriesList.addEventListener("click", (event) => {
        const categoryItem = event.target.closest(".categories__item");
        const arrow = categoryItem?.querySelector(".categories__arrow"); // Найти стрелку в нажатом элементе

        if (categoryItem && arrow) {
            // Сброс предыдущей активной стрелки
            if (activeArrow && activeArrow !== arrow) {
                activeArrow.classList.remove("rotated");
            }

            // Повернуть текущую стрелку
            arrow.classList.toggle("rotated");

            // Обновляем активную стрелку
            activeArrow = arrow.classList.contains("rotated") ? arrow : null;

            // Позиционируем popup
            const rect = categoryItem.getBoundingClientRect();
            popup.style.top = `${rect.bottom + window.scrollY}px`;
            popup.style.left = `${rect.left}px`;
            popup.style.width = `${rect.width}px`;
            popup.style.display = "block";
        }
    });

    // Закрытие popup по клику на кнопку "закрыть"
    popupClose.addEventListener("click", () => {
        popup.style.display = "none"; // Скрываем popup

        // Сбрасываем поворот стрелки
        if (activeArrow) {
            activeArrow.classList.remove("rotated");
            activeArrow = null;
        }
    });

    // Закрытие popup при клике вне его
    document.addEventListener("click", (event) => {
        const isClickInsidePopup = popup.contains(event.target);
        const isClickOnCategories = categoriesList.contains(event.target);

        if (!isClickInsidePopup && !isClickOnCategories) {
            popup.style.display = "none"; // Скрываем popup

            // Сбрасываем поворот стрелки
            if (activeArrow) {
                activeArrow.classList.remove("rotated");
                activeArrow = null;
            }

            // Сброс поворота главной стрелки
            if (!categoriesList.classList.contains("hidden")) {
                mainArrow.classList.remove("rotated");
            }
        }
    });
});




let slideIndex = 0;
    showSlides();

    function showSlides() {
      let i;
      let slides = document.getElementsByClassName("mySlides");
      let dots = document.getElementsByClassName("dot");

      // Скрываем все слайды
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
      }

      // Увеличиваем индекс слайда
      slideIndex++;
      if (slideIndex > slides.length) {slideIndex = 1}    

      // Снимаем класс 'active' с всех точек
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }

      // Показываем текущий слайд и добавляем класс 'active' к точке
      slides[slideIndex-1].style.display = "block";  
      dots[slideIndex-1].className += " active";

      // Меняем изображение каждые 2 секунды
      setTimeout(showSlides, 2000); 
    }