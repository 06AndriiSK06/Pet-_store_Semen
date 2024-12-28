const products = [];
for (let i = 1; i <= 27; i++) {
  products.push({
    id: i,
    name: `Product ${i}`,
    price: Math.floor(Math.random() * 1000) + 1,
    image: `https://via.placeholder.com/150`,
  });
}

let currentPage = 1;
const itemsPerPage = 9;
let filteredProducts = [...products];

function renderProducts() {
  const container = document.getElementById("product-container");
  container.innerHTML = "";
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentProducts = filteredProducts.slice(start, end);

  currentProducts.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
              <img src="${product.image}" alt="${product.name}">
              <h3>${product.name}</h3>
              <p>Ціна: $${product.price}</p>
              <button>Додати в кошик</button>
          `;
    container.appendChild(productDiv);
  });
}

function updatePriceFilter() {
  const range = document.getElementById("price-range");
  const value = document.getElementById("price-value");
  value.textContent = range.value;
  const maxPrice = parseInt(range.value, 10);
  filteredProducts = products.filter(
    (product) => product.price <= maxPrice
  );
  currentPage = 1;
  renderProducts();
}

function sortProducts() {
  const sortButton = document.getElementById("sort-button");
  const isAscending = sortButton.textContent.includes("Low to High");
  filteredProducts.sort((a, b) =>
    isAscending ? a.price - b.price : b.price - a.price
  );
  sortButton.textContent = `Sort by: ${
    isAscending ? "High to Low" : "Low to High"
  }`;
  renderProducts();
}

document
  .getElementById("price-range")
  .addEventListener("input", updatePriceFilter);
document
  .getElementById("sort-button")
  .addEventListener("click", sortProducts);
document.getElementById("prev-button").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderProducts();
  }
});
document.getElementById("next-button").addEventListener("click", () => {
  if (currentPage < Math.ceil(filteredProducts.length / itemsPerPage)) {
    currentPage++;
    renderProducts();
  }
});

renderProducts();