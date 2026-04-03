document.addEventListener("DOMContentLoaded", () => {
  const tagsContainer = document.getElementById("tagsContainer");
  const modal = document.getElementById("modal");
  const modalInput = document.getElementById("allIngredientInput");
  const modalTags = document.getElementById("modalTags");
  const showMoreBtn = document.getElementById("showMoreBtn");
  const input = document.getElementById("ingredientInput");
  const searchInput = document.getElementById("recipeInputSearch");
  const menuItem = document.getElementById("menu-item");

  const API = "https://dummyjson.com/recipes";

  let recipeData = [];
  let allIngredients = [];
  let selectedIngredients = [];
  let selectedRecipes =
    JSON.parse(localStorage.getItem("selectedRecipes")) || [];

  window.getRecipes = async function () {
    try {
      const res = await fetch(API);
      const data = await res.json();

      recipeData = data.recipes;
      allIngredients = [...new Set(recipeData.flatMap((r) => r.ingredients))];
      window.renderRecipes(recipeData);
      window.renderTags();
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase().trim();
    searchRecipes(value);
  });

  function searchRecipes(searchText) {
    if (!searchText) {
      renderRecipes(recipeData);
      return;
    }

    const filtered = recipeData.filter((recipe) => {
      const nameMatch = recipe.name.toLowerCase().includes(searchText);

      const tagMatch = recipe.tags?.some((tag) =>
        tag.toLowerCase().includes(searchText),
      );

      const ingredientMatch = recipe.ingredients?.some((ing) =>
        ing.toLowerCase().includes(searchText),
      );

      return nameMatch || tagMatch || ingredientMatch;
    });

    renderRecipes(filtered);
  }

  function renderModalTags(search = "") {
    modalTags.innerHTML = "";
    let filtered = [...allIngredients];

    if (search) {
      const s = search.toLowerCase();

      filtered = filtered
        .filter((tag) => tag.toLowerCase().includes(s))
        .sort((a, b) => {
          return b.toLowerCase().startsWith(s) - a.toLowerCase().startsWith(s);
        });
    }

    filtered.forEach((item) => {
      const span = document.createElement("span");
      span.innerText = item;

      if (selectedIngredients.includes(item)) {
        span.classList.add("active");
      }

      span.addEventListener("click", () => {
        toggleTag(item, span);

        renderModalTags(search);
      });

      modalTags.appendChild(span);
    });
  }

  modalInput.addEventListener("input", function () {
    renderModalTags(this.value);
  });

  window.renderRecipes = function (recipes) {
    const container = document.querySelector(".recipes");
    if (!container) return;

    container.innerHTML = "";

    if (recipes.length === 0) {
    container.innerHTML = `
      <div class="no-data">
         No recipes found
      </div>
    `;
    return;
  }

    recipes.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("card");

      if (selectedRecipes.some((r) => r.name === item.name)) {
        card.classList.add("active-card");
      }



      card.innerHTML = `
      
  <img src="${item.image}" alt="${item.name}" />

  <div class="card-content">
    <h3>${item.name}</h3>

    <div class="meta">
      <span>⏱ ${item.cookTimeMinutes} min</span>
      <span class="category">${item.cuisine}</span>
    </div>

    <div class="ingredients instructions">
  ${item.instructions.join(" ")}
</div>

    <button class="view-btn">View Recipe</button>


    <div class="ex">
      <div class="divider"></div>

      <p>Ingredients</p>
      <div class="ingredients">
        ${item.ingredients.map((ing) => `<span>${ing}</span>`).join("")}
      </div>

      <div class="divider"></div>

      <p>Instructions</p>
      <div class="ingredients">
        ${item.instructions.map((ing) => `<span>${ing}</span>`).join("")}
      </div>
      <button class="less-btn">Less</button>
    </div>
  </div>
`;

const viewBtn = card.querySelector(".view-btn");
const lessBtn = card.querySelector(".less-btn");

viewBtn.addEventListener("click", (e) => {
  e.stopPropagation(); 

  document.querySelectorAll(".card").forEach((c) => {
    if (c !== card) c.classList.remove("open");
  });

  card.classList.toggle("open");
});

lessBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  card.classList.remove("open");
});

      card.addEventListener("click", () => {
        const exists = selectedRecipes.some((r) => r.name === item.name);

        if (!exists) {
          selectedRecipes.push(item);
          card.classList.add("active-card");
        } else {
          selectedRecipes = selectedRecipes.filter((r) => r.name !== item.name);
          card.classList.remove("active-card");
        }

        localStorage.setItem(
          "selectedRecipes",
          JSON.stringify(selectedRecipes),
        );
      });

      container.appendChild(card);
    });
  };

  function toggleTag(item, span) {
    if (selectedIngredients.includes(item)) {
      selectedIngredients = selectedIngredients.filter((i) => i !== item);
      span.classList.remove("active");
    } else {
      selectedIngredients.push(item);
      span.classList.add("active");
    }

    document.getElementById("ingredientInput").value = "";

    filterRecipesByMultiple();
    renderTags("");
    renderSelectedTags();
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const value = input.value.trim().toLowerCase();

      if (!value) return;

      const match = allIngredients.find((tag) =>
        tag.toLowerCase().includes(value),
      );

      if (match) {
        if (!selectedIngredients.includes(match)) {
          selectedIngredients.push(match);
        }

        input.value = "";

        renderTags("");
        renderSelectedTags();
        filterRecipesByMultiple();
      }
    }
  });

  window.renderSelectedTags = function () {
    const container = document.getElementById("selectedTags");
    container.innerHTML = "";

    selectedIngredients.forEach((item) => {
      const span = document.createElement("span");
      span.classList.add("selected-item");
      span.innerHTML = `
      ${item}
      <span class="remove-btn">×</span>
    `;

      span.querySelector(".remove-btn").addEventListener("click", () => {
        selectedIngredients = selectedIngredients.filter((i) => i !== item);

        document.getElementById("ingredientInput").value = "";

        renderTags("");
        renderSelectedTags();
        filterRecipesByMultiple();
      });

      container.appendChild(span);
    });
  };

  window.renderTags = function (searchText = "") {
    tagsContainer.innerHTML = "";

    let filteredTags;

    if (searchText) {
      const search = searchText.toLowerCase();

      filteredTags = allIngredients.filter((tag) =>
        tag.toLowerCase().includes(search),
      );
    } else {
      filteredTags = allIngredients.slice(0, 20);
    }

    filteredTags.slice(0, 20).forEach((item) => {
      const span = document.createElement("span");
      span.innerText = item;
      span.classList.add("tag-item");
      span.innerHTML = `${item}<span class="remove-btn">×</span>`;

      if (selectedIngredients.includes(item)) {
        span.classList.add("active");
      }

      span.addEventListener("click", () => {
        if (selectedIngredients.includes(item)) {
          selectedIngredients = selectedIngredients.filter((i) => i !== item);
        } else {
          selectedIngredients.push(item);
        }
        document.getElementById("ingredientInput").value = "";
        renderSelectedTags();
        renderTags("");
        filterRecipesByMultiple();

        renderModalTags("");
      });

      span.querySelector(".remove-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        selectedIngredients = selectedIngredients.filter((i) => i !== item);
        span.classList.remove("active");
        document.getElementById("ingredientInput").value = "";
        renderSelectedTags();
        renderTags();
        filterRecipesByMultiple();
      });

      tagsContainer.appendChild(span);
    });
  };

  window.filterRecipesByMultiple = function () {
    if (selectedIngredients.length === 0) {
      renderRecipes(recipeData);
      return;
    }

    const filtered = recipeData.filter((recipe) =>
      selectedIngredients.every((selected) =>
        recipe.ingredients.some((ing) =>
          ing.toLowerCase().includes(selected.toLowerCase()),
        ),
      ),
    );

    renderRecipes(filtered);
  };

  window.showModal = function () {
    modal.style.display = "flex";
    renderModalTags();
  };

  window.closeModal = function () {
    modal.style.display = "none";
  };

  showMoreBtn.addEventListener("click", window.showModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) window.closeModal();
  });

  input.addEventListener("input", function () {
    const rawValues = this.value
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v !== "");

    const lastValue = rawValues[rawValues.length - 1] || "";

    renderTags(lastValue);
  });

  modalInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();

      const value = modalInput.value.trim().toLowerCase();
      if (!value) return;

      const match = allIngredients.find((tag) =>
        tag.toLowerCase().includes(value),
      );

      if (match && !selectedIngredients.includes(match)) {
        selectedIngredients.push(match);
      }

      modalInput.value = "";

      renderTags("");
      renderSelectedTags();
      filterRecipesByMultiple();
      renderModalTags("");
    }
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    if (confirm("Clear all selected ingredients?")) {
      selectedIngredients = [];

      renderSelectedTags();
      renderTags("");
      renderModalTags("");
      filterRecipesByMultiple();
    }
  });

  document.getElementById("menu-item").addEventListener("click", () => {
    openSavedModal();
  });

  function openSavedModal() {
    const modal = document.getElementById("savedModal");

    const container = document.getElementById("savedRecipesContainer");

    const savedRecipes =
      JSON.parse(localStorage.getItem("selectedRecipes")) || [];

    container.innerHTML = "";

    if (savedRecipes.length === 0) {
      container.innerHTML = "<p>No saved recipes</p>";
    } else {
      savedRecipes.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />

        <div class="card-content">
          <h3>${item.name}</h3>

          <div class="meta">
            <span>⏱ ${item.cookTimeMinutes} min</span>
            <span class="category">${item.cuisine}</span>
          </div>

          <div class="ingredients">
            ${item.ingredients.map((i) => `<span>${i}</span>`).join("")}
          </div>

          <button class="remove-btn">❌ Remove</button>
        </div>
      `;

        card.querySelector(".remove-btn").addEventListener("click", (e) => {
          e.stopPropagation();

          removeRecipe(item.name);
        });

        container.appendChild(card);
      });
    }

    modal.style.display = "grid";
  }

  function removeRecipe(name) {
    let saved = JSON.parse(localStorage.getItem("selectedRecipes")) || [];

    saved = saved.filter((r) => r.name !== name);

    localStorage.setItem("selectedRecipes", JSON.stringify(saved));

    openSavedModal();
  }

  document.getElementById("closeSavedBtn").addEventListener("click", () => {
    document.getElementById("savedModal").style.display = "none";
  });

  window.getRecipes();
});
