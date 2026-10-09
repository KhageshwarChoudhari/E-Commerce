const API = "https://dummyjson.com/products?limit=0";
const CATEGORY_API = "https://dummyjson.com/products/categories";

const productContainer = document.querySelector("#products-container");
const categoryContainer = document.querySelector("#category-filters");


function formateCategoryName(category){return category.replace("-", " ");};


async function fetchProducts() {
  try {
    const response = await fetch(API);
    const data = await response.json();
    console.log(data);
    renderProducts(data.products);
  } catch (error) {
    console.error("Error:", error);
  }
};

function renderProducts(data) {
  productContainer.innerHTML = "";
  data.forEach((p) => {
    let article = document.createElement("article");
    article.className =
      "bg-white border border-slate-200 rounded-lg p-4 flex flex-col justify-between hover:border-slate-300 hover:shadow-sm transition";

    let card = `
          <div class="h-48 w-full flex items-center justify-center p-3 mb-4 bg-white">
            <img src=${p.thumbnail}
              alt="${p.title}" class="max-h-full max-w-full object-contain" loading="lazy">
          </div>
          <div class="flex-grow flex flex-col">
            <span class="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
              ${formateCategoryName(p.category)}
            </span>
            <h2 class="font-semibold text-slate-900 text-sm mb-2 line-clamp-2" title="${p.title}">
              ${p.title}
            </h2>
            <div class="mt-auto pt-2">
              <span class="text-lg font-bold text-slate-900">
                ₹${(p.price * 20).toFixed(2)}
              </span>
            </div>
            <a href="product-details.html"
              class="mt-4 block w-full text-center bg-teal-700 hover:bg-teal-800 text-white text-sm font-medium py-2 px-4 rounded transition">
              View Details
            </a>
          </div>
    `;
    article.innerHTML = card;
    productContainer.append(article);
  });
};

async function fetchCategories() {
  try {
    const response = await fetch(CATEGORY_API);
    const data = await response.json();
    console.log(data);
    renderCategories(data);
  } catch (error) {
    console.error("Error:", error);
  }
};

function renderCategories(categories) {
  [{name : "All"}, ...categories].forEach((c) => {
    let button = document.createElement("button");
    button.className = "bg-white border border-slate-200 rounded-lg p-4 flex flex-col justify-between hover:border-slate-300 hover:shadow-sm transition";
    button.type = "button";
    button.textContent = c.name;
    categoryContainer.append(button);
  });
};


fetchProducts();
fetchCategories();
