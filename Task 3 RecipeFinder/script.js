document.addEventListener("DOMContentLoaded", () => {
  const tagsContainer = document.getElementById("tagsContainer");
  const modal = document.getElementById("modal");
  const modalInput = document.getElementById("allIngredientInput");
  const modalTags = document.getElementById("modalTags");
  const showMoreBtn = document.getElementById("showMoreBtn");
  const input = document.getElementById("ingredientInput");
  const searchInput = document.getElementById("recipeInputSearch");
  const name = document.getElementById("name");
  const confirm = document.getElementById("confirm");
  const conBox = document.querySelectorAll(".con-box");
  const loginInput = document.getElementById("loginInput");
  const logout = document.getElementById("logout");
  const loginform = document.getElementById("login");
  const div = document.getElementById("div");
  const showInd = document.getElementById("show-ind");

  const API = "https://dummyjson.com/recipes";

  let recipeData = [];
  let allIngredients = [];
  let selectedIngredients = [];
  let currentUser = "";
  let selectedRecipes =
    JSON.parse(localStorage.getItem("selectedRecipes")) || [];
  let login = false;

  const savedUser = localStorage.getItem("currentUser");

  div.classList.add("none");

  showInd.addEventListener("click", () => {
  if (showInd.innerText === "Fillter by Ingrident") {
    div.classList.remove("none");
    showInd.innerText = "Less";
  } else {
    div.classList.add("none");
    showInd.innerText = "Fillter by Ingrident";
  }
});

  if (!login) {
    conBox.forEach((v) => {
      v.classList.add("none");
    });
    document.getElementById("name").classList.add("none");
    document.getElementById("logout").classList.add("none");
  }

  if (login) {
    loginform.classList.add("none");
  }

  if (savedUser) {
    currentUser = savedUser;
    login = true;
    conBox.forEach((v) => v.classList.remove("none"));
    loginform.classList.add("none");
    document.getElementById("name").innerText = currentUser;
    document.getElementById("logout").classList.remove("none");
    document.getElementById("name").classList.remove("none");

    selectedIngredients = [];
    renderSelectedTags();
    renderTags("");
    filterRecipesByMultiple();
    selectedRecipes =
      JSON.parse(localStorage.getItem(`recipes_${currentUser}`)) || [];
  }

  logout.addEventListener("click", () => {
    login = false;
    document.getElementById("name").classList.add("none");
    document.getElementById("logout").classList.add("none");
    localStorage.removeItem("currentUser");
    currentUser = "";
    selectedRecipes = [];
    selectedIngredients = [];

    renderSelectedTags();
    renderTags("");
    filterRecipesByMultiple();

    loginform.classList.remove("none");
    conBox.forEach((v) => v.classList.add("none"));
  });

  confirm.addEventListener("click", (e) => {
    e.preventDefault();
    const inputValue = loginInput.value;

    if (inputValue.trim()) {
      login = true;
      currentUser = inputValue;
      localStorage.setItem("currentUser", currentUser);
      conBox.forEach((v) => {
        v.classList.remove("none");
      });

      document.getElementById("name").innerText = inputValue;
      document.getElementById("name").classList.remove("none");
      document.getElementById("logout").classList.remove("none");
      selectedRecipes =
        JSON.parse(localStorage.getItem(`recipes_${currentUser}`)) || [];
      document.getElementById("login").classList.add("none");
      loginInput.value = "";

      selectedIngredients = [];
      renderSelectedTags();
      renderTags("");
      filterRecipesByMultiple();

      renderRecipes(recipeData);
    } else {
      login = false;
      alert("Please Enter Your Name");
    }
  });

  window.getRecipes = async function () {
    try {
      const res = await fetch(API);
      const data = await res.json();

      recipeData = data.recipes;
      allIngredients = [...new Set(recipeData.flatMap((r) => r.ingredients))];
      renderRecipes(recipeData);
      renderTags();
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

  function renderSelectedTags() {
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

  function renderRecipes(recipes) {
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

    selectedRecipes =
      JSON.parse(localStorage.getItem(`recipes_${currentUser}`)) || [];

    recipes.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
  <img src="${item.image}" alt="${item.name}" />
  

  <div class="card-content">
    <h3>${item.name}</h3>

    <div class="meta">
      <span>⏱ ${item.cookTimeMinutes} min</span>
     <div id="liked-con">
     <span class="category">${item.cuisine}</span>
     <span id="liked"><i class="fa-solid fa-heart"></i></span>
     </div>
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

      const liked = card.querySelector("#liked");

      if (selectedRecipes.some((r) => r.name === item.name)) {
        card.classList.add("active-card");
        if (liked) liked.style.color = "#ff7a18";
      }

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

      liked.addEventListener("click", (e) => {
        const exists = selectedRecipes.some((r) => r.name === item.name);

        if (!exists) {
          selectedRecipes.push(item);
          card.classList.add("active-card");
          const liked = card.querySelector("#liked");
          liked.style.color = "#ff7a18";
        } else {
          selectedRecipes = selectedRecipes.filter((r) => r.name !== item.name);
          card.classList.remove("active-card");
          const liked = card.querySelector("#liked");
          liked.style.color = "";
        }

        localStorage.setItem(
          `recipes_${currentUser}`,
          JSON.stringify(selectedRecipes),
        );
      });

      container.appendChild(card);
    });
  }

  function toggleTag(item, span) {
    if (selectedIngredients.includes(item)) {
      selectedIngredients = selectedIngredients.filter((i) => i !== item);
      span.classList.remove("active");
      console.log("item", item);
    } else {
      selectedIngredients.push(item);
      span.classList.add("active");
    }

    document.getElementById("ingredientInput").value = "";
    renderSelectedTags();
    filterRecipesByMultiple();
    renderTags("");
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

  function renderTags(searchText = "") {
    tagsContainer.innerHTML = "";

    let filteredTags;

    if (searchText) {
      const search = searchText.toLowerCase();

      filteredTags = allIngredients.filter((tag) =>
        tag.toLowerCase().includes(search),
      );
    } else {
      filteredTags = [];
    }

    filteredTags.forEach((item) => {
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
  }

  function filterRecipesByMultiple() {
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
  }

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
    selectedIngredients = [];
    renderSelectedTags();
    renderTags("");
    renderModalTags("");
    filterRecipesByMultiple();
  });

  document.getElementById("menu-item").addEventListener("click", () => {
    openSavedModal();
  });

  function openSavedModal() {
    const modal = document.getElementById("savedModal");
    const container = document.getElementById("savedRecipesContainer");

    const savedRecipes =
      JSON.parse(localStorage.getItem(`recipes_${currentUser}`)) || [];
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
            <div class="liked-con">
            <span class="category">${item.cuisine}</span>
              <button class="remove-btn remove-btn-selected">X</button>
              </div>
          </div>


          <div class="ingredients">
            ${item.ingredients.map((i) => `<span>${i}</span>`).join("")}
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
      `;

        const liked = card.querySelector("#liked");

        if (selectedRecipes.some((r) => r.name === item.name)) {
          card.classList.add("active-card");
          if (liked) liked.style.color = "#ff7a18";
        }

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
    let saved =
      JSON.parse(localStorage.getItem(`recipes_${currentUser}`)) || [];
    saved = saved.filter((r) => r.name !== name);
    localStorage.setItem(`recipes_${currentUser}`, JSON.stringify(saved));
    renderRecipes(recipeData);
    openSavedModal();
  }

  document.getElementById("closeSavedBtn").addEventListener("click", () => {
    document.getElementById("savedModal").style.display = "none";
  });

  window.getRecipes();
});
