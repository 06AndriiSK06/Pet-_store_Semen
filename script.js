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

  document.addEventListener("DOMContentLoaded", function () {
      let currentSlideIndex = 0; // Slide start index
      const slides = document.querySelectorAll('.slide1');// Get all slides
      const dots = document.querySelectorAll('.dot1'); // Get all indicators (circles)
    
     // Function to display the slide
      function showSlide(index) {
        slides.forEach((slide, i) => {
          slide.classList.remove('active');
          dots[i].classList.remove('active');
        });
        slides[index].classList.add('active');
        dots[index].classList.add('active');
      }
    
      // Function to switch to next slide
      function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        showSlide(currentSlideIndex);
      }
    
      
      function prevSlide() { //// Function for switching to the previous slide
        currentSlideIndex =
          (currentSlideIndex - 1 + slides.length) % slides.length;
        showSlide(currentSlideIndex);
      }
    
      
      function currentSlide(index) { //// Function for selecting a specific slide by indicator
        currentSlideIndex = index - 1; 
        showSlide(currentSlideIndex);
      }
    
      
      showSlide(currentSlideIndex);
    
      // Slide switching every 10 seconds
      // setInterval(nextSlide, 10000);
    
      // Export functions to the global context
      window.nextSlide = nextSlide;
      window.prevSlide = prevSlide;
      window.currentSlide = currentSlide;
    });
    const productContainers = [...document.querySelectorAll('.product-container')];
    const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
    const preBtn = [...document.querySelectorAll('.pre-btn')];
    
    productContainers.forEach((item, i) => {
        let containerDimensions = item.getBoundingClientRect();
        let containerWidth = containerDimensions.width;
    
        nxtBtn[i].addEventListener('click', () => {
            item.scrollLeft += containerWidth;
        })
    
        preBtn[i].addEventListener('click', () => {
            item.scrollLeft -= containerWidth;
        })
    })
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide-container');
    const totalSlides = slides.length;
    
    // Функция для отображения слайда
    function showSlide(index) {
      // Скрываем все слайды
      slides.forEach(slide => slide.classList.remove('active'));
      
      // Показываем только текущий слайд
      slides[index].classList.add('active');
    }
    
  
    showSlide(currentSlide);
 
    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
    }
    
   
    function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      showSlide(currentSlide);
    }
    
   
    document.querySelector('.next').addEventListener('click', nextSlide);
    document.querySelector('.prev').addEventListener('click', prevSlide);
    
     
      const slider = document.getElementById('slider');
      const catsButton = document.getElementById('catsButton');
      const dogsButton = document.getElementById('dogsButton');
      
      // Пример данных для слайдера
      const catsData = [
        { image: "photo/animal__food/cat__food.webp", price: "1000грн" },
        { image: "photo/animal__food/cat__food2.webp", price: "1000грн" },
        { image: "photo/animal__food/cat__food3.jpg", price: "1000грн" },
        { image: "photo/animal__food/cat__food4.png", price: "1000грн" },
        { image: "photo/animal__food/cat__food5.webp", price: "1000грн" },
        { image: "photo/animal__food/cat__food6.webp", price: "1000грн" },
        { image: "photo/animal__food/cat__food7.webp", price: "1000грн" },
        { image: "photo/animal__food/cat__food8.png", price: "1000грн" },
        { image: "photo/animal__food/cat__food9.jpg", price: "1000грн" },
        { image: "photo/animal__food/cat__food10.webp", price: "1000грн" },
      ];
      
      const dogsData = [
        { image: "path/to/dog1.jpg", price: "999грн" },
        { image: "path/to/dog2.jpg", price: "999грн" },
        { image: "path/to/dog3.jpg", price: "999грн" },
        { image: "path/to/dog4.jpg", price: "999грн" },
        { image: "path/to/dog5.jpg", price: "999грн" },
        { image: "path/to/dog6.jpg", price: "999грн" },
        { image: "path/to/dog7.jpg", price: "999грн" },
        { image: "path/to/dog8.jpg", price: "999грн" },
        { image: "path/to/dog9.jpg", price: "999грн" },
        { image: "path/to/dog10.jpg", price:"999грн" },
      ];
      
      // Функция для отрисовки слайдера
      function renderSlider(data) {
        slider.innerHTML = "";
        data.forEach(item => {
          const div = document.createElement('div');
          div.className = "slider-item__animal";
          div.innerHTML = `
            <img src="${item.image}" alt="Animal">
            <div class="price__animal">${item.price}</div>
            <button class="add-to-cart__animal">В корзину</button>
          `;
          slider.appendChild(div);
        });
      }
      
      // Переключение кнопок
      catsButton.addEventListener('click', () => {
        catsButton.classList.add('active__animal');
        dogsButton.classList.remove('active__animal');
        renderSlider(catsData);
      });
      
      dogsButton.addEventListener('click', () => {
        dogsButton.classList.add('active__animal');
        catsButton.classList.remove('active__animal');
        renderSlider(dogsData);
      });
      
      // Инициализация слайдера с кошками
      renderSlider(catsData);
      