document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("addBalanceBtn");
  const main = document.querySelector(".main");
  const add = document.querySelector(".add");
  const totalAddEl = document.getElementById("totalAdd");
  const totalExpenseEl = document.getElementById("totalExpense");
  const netBalanceEl = document.getElementById("netBalance");
  const openExpenseBtn = document.getElementById("openExpenseForm");
  const expenseFormWrapper = document.getElementById("expenseFormWrapper");
  const expenseList = document.getElementById("expenseList");
  const sidebarExpense = document.getElementById("sidebarExpense");
  const desktopExpense = document.getElementById("desktopExpense");
  const pendingPage = document.getElementById("pendingPage");
  const pendingListPage = document.getElementById("pendingListPage");
  const balancePageBtn = document.getElementById("balancePageBtn");
  const balancePage = document.getElementById("balancePage");
  const balanceName = document.getElementById("balanceName");
  const sidebarAdd = document.getElementById("sidebarAdd");
  const allIncomeBtn = document.getElementById("allIncome");
  const incomePage = document.getElementById("incomePage");

  let editIndex = -1;
  let incomeEditIndex = -1;

  let isEdit = false;
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  let savedTotal = parseFloat(localStorage.getItem("totalAdd")) || 0;
  totalAddEl.innerText = `$${savedTotal}`;

  add.style.display = "none";
  expenseFormWrapper.style.display = "none";
  pendingPage.style.display = "none";
  balancePage.style.display = "none";
  incomePage.style.display = "none";

  main.style.display = "grid";

  addBtn.addEventListener("click", () => {
    balanceName.innerText = "";
    main.style.display = "none";
    add.style.display = "flex";
  });

  sidebarAdd.addEventListener("click", () => {
    balanceName.innerText = "";
    main.style.display = "none";
    add.style.display = "flex";
  });

  window.closeForm = function () {
    add.style.display = "none";
    main.style.display = "grid";
  };

  window.submitBalance = function () {
    const amountInput = document.getElementById("amount");
    const nameInput = document.getElementById("balanceName");
    const date = new Date().toLocaleDateString("en-GB");

    let name = nameInput.value.trim();
    let amount = parseFloat(amountInput.value);

    if (!name) {
      alert("Enter valid name");
      return;
    }

    if (!amount || amount <= 0) {
      alert("Enter valid amount");
      return;
    }

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    let totalAdd = parseFloat(localStorage.getItem("totalAdd")) || 0;

    if (incomeEditIndex === -1) {
      transactions.push({
        type: "income",
        name,
        amount,
        date,
      });

      totalAdd += amount;
    } else {
      let incomes = transactions.filter((item) => item.type === "income");
      let oldItem = incomes[incomeEditIndex];

      let realIndex = transactions.findIndex(
        (item) =>
          item.type === "income" &&
          item.name === oldItem.name &&
          item.amount === oldItem.amount,
      );

      if (realIndex !== -1) {
        let oldAmount = transactions[realIndex].amount;

        transactions[realIndex] = {
          type: "income",
          name,
          amount,
          date,
        };

        totalAdd = totalAdd - oldAmount + amount;
      }

      incomeEditIndex = -1;
    }

    localStorage.setItem("transactions", JSON.stringify(transactions));
    localStorage.setItem("totalAdd", totalAdd);

    totalAddEl.innerText = `$${totalAdd}`;

    updateNetBalance();
    updateTransactionTable();
    renderAllIncome();
    renderIncomeLastThree()

    amountInput.value = "";
    nameInput.value = "";

    document.getElementById("incomeTitle").innerText = "Add Income";
document.getElementById("incomeBtn").innerText = "Add";

    closeForm();
  };

  function openExpenseForm() {
    main.style.display = "none";
    balancePage.style.display = "none";
    pendingPage.style.display = "none";
    expenseFormWrapper.style.display = "flex";
    if (!isEdit) {
      document.getElementById("expenseTitle").innerText = "Add Expense";
      document.getElementById("expenseBtn").innerText = "Add";
    }
  }

  openExpenseBtn.addEventListener("click", openExpenseForm);
  sidebarExpense.addEventListener("click", openExpenseForm);

  window.closeExpenseForm = function () {
    expenseFormWrapper.style.display = "none";
    main.style.display = "grid";
    resetForm();
  };

  window.addExpense = function () {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const date = new Date().toLocaleDateString("en-GB");

    const name = document.getElementById("expenseName").value;
    const amount = parseFloat(document.getElementById("expenseAmount").value);

    if (!name || !amount) {
      alert("Enter valid data");
      return;
    }

    if (isEdit) {
      let oldItem = expenses[editIndex];

      expenses[editIndex] = { name, amount, date };

      let realIndex = transactions.findIndex(
        (item) =>
          item.type === "expense" &&
          item.name === oldItem.name &&
          item.amount === oldItem.amount,
      );

      if (realIndex !== -1) {
        transactions[realIndex] = {
          type: "expense",
          name,
          amount,
          date,
        };
      }
    } else {
      expenses.push({ name, amount, date });

      transactions.push({
        type: "expense",
        name,
        amount,
        date,
      });
    }

    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("transactions", JSON.stringify(transactions));

    isEdit = false;
    editIndex = -1;

    document.getElementById("expenseTitle").innerText = "Add Expense";
    document.getElementById("expenseBtn").innerText = "Add";

    renderExpenses();
    renderPendingPage();
    updateTotalExpense();
    updateTransactionTable();
    renderIncomeLastThree()

    closeExpenseForm();
  };

  function renderExpenses() {
    expenseList.innerHTML = "";

    let expensess = JSON.parse(localStorage.getItem("expenses")) || [];
    let threeEx = expensess.slice(-3);

    threeEx.forEach((item, index) => {
      const realIndex = expensess.findIndex(
        (e) => e.name === item.name && e.amount === item.amount,
      );
      const li = document.createElement("li");

      li.innerHTML = `
       
       <div class="expenss-con">
           <strong class="dolar">${item.date}</strong>
           <strong class="dolar">${item.name} - <span>$${item.amount}</span></strong>

       <span class="btn-con">
          <button class="edit" onclick="editExpense(${realIndex})">Edit</button>
          <button class="delete" onclick="deleteExpense(${realIndex})">Delete</button>
        </span>
       </div>
      `;

      expenseList.appendChild(li);
    });
  }

  window.editExpense = function (index) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    const item = expenses[index];

    document.getElementById("expenseName").value = item.name;
    document.getElementById("expenseAmount").value = item.amount;

    isEdit = true;
    editIndex = index;

    document.getElementById("expenseTitle").innerText = "Update Expense";
    document.getElementById("expenseBtn").innerText = "Update";

    openExpenseForm();
  };

  window.deleteExpense = function (index) {
    if (!confirm("Delete this expense?")) return;

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    const deletedItem = expenses[index];

    expenses.splice(index, 1);

    let realIndex = transactions.findIndex(
      (item) =>
        item.type === "expense" &&
        item.name === deletedItem.name &&
        item.amount === deletedItem.amount,
    );

    if (realIndex !== -1) {
      transactions.splice(realIndex, 1);
    }

    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("transactions", JSON.stringify(transactions));

    renderExpenses();
    renderIncomeLastThree();
    renderPendingPage();
    updateTotalExpense();
    updateTransactionTable();
  };

  window.backToHome = function () {
    pendingPage.style.display = "none";
    balancePage.style.display = "none";
    main.style.display = "grid";
    incomePage.style.display = "none";
  };

  function updateTotalExpense() {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let total = 0;
    expenses.forEach((item) => {
      total += item.amount;
    });

    totalExpenseEl.innerText = `$${total}`;
    updateNetBalance();
  }

  function updateNetBalance() {
    let totalAdd = getNumber(totalAddEl);
    let totalExpense = getNumber(totalExpenseEl);
    netBalanceEl.innerText = `$${totalAdd - totalExpense}`;
  }

  function getNumber(el) {
    return (
      parseFloat(el.innerText.replace("$", "").replace(",", "").trim()) || 0
    );
  }

  function resetForm() {
    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";

    isEdit = false;

    editIndex = -1;

    document.getElementById("expenseTitle").innerText = "Add Expense";
    document.getElementById("expenseBtn").innerText = "Add";
  }

  function renderPendingPage() {
    pendingListPage.innerHTML = "";
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    if (expenses.length === 0) {
      pendingListPage.innerHTML = `
      <tr>
        <td colspan="5">No pending expenses</td>
      </tr>
    `;
      return;
    }

    expenses.forEach((item, index) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.date || "-"}</td>
      <td class="name">${item.name}</td>
      <td>$${item.amount}</td>
      <td class="action">
        <button class="edit" onclick="editExpense(${index})">Edit</button>
        <button class="delete" onclick="deleteExpense(${index})">Delete</button>
      </td>
    `;

      pendingListPage.appendChild(tr);
    });
  }

  pendingex.addEventListener("click", () => {
    main.style.display = "none";
    pendingPage.style.display = "block";

    renderPendingPage();
  });

  function updateTransactionTable() {
    const table = document.getElementById("transactionTable");
    if (!table) return;
    table.innerHTML = "";
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    let balance = 0;

    transactions.forEach((item, index) => {
      if (item.type === "income") {
        balance += item.amount;

        table.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${item.date || "-"}</td>
          <td>${item.name}</td>
          <td>+${item.amount}</td>
          <td>-</td>
          <td>${balance}</td>
           <td>
            <button class="edit"  onclick="editTransaction(${index})">Edit</button>
            <button class="delete" onclick="deleteTransaction(${index})">Delete</button>
          </td>
        </tr>
      `;
      } else {
        balance -= item.amount;

        table.innerHTML += `
        <tr>
         <td>${index + 1}</td>
         <td>${item.date || "-"}</td>
          <td>${item.name}</td>
          <td>-</td>
          <td>${item.amount}</td>
          <td>${balance}</td>
           <td>
            <button class="edit" onclick="editTransaction(${index})">Edit</button>
            <button class="delete" onclick="deleteTransaction(${index})">Delete</button>
          </td>
        </tr>
      `;
      }
    });
  }

  window.deleteTransaction = function (index) {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    let totalAdd = parseFloat(localStorage.getItem("totalAdd")) || 0;

    const item = transactions[index];

    if (item.type === "income") {
      totalAdd -= item.amount;
    }
    transactions.splice(index, 1);

    localStorage.setItem("transactions", JSON.stringify(transactions));
    localStorage.setItem("totalAdd", totalAdd);

    totalAddEl.innerText = `$${totalAdd}`;
    if (item.type === "expense") {
      let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

      let expIndex = expenses.findIndex(
        (e) => e.name === item.name && e.amount === item.amount,
      );

      if (expIndex !== -1) {
        expenses.splice(expIndex, 1);
        localStorage.setItem("expenses", JSON.stringify(expenses));
      }
    }

    renderExpenses();
    renderIncomeLastThree();
    renderPendingPage();
    updateTotalExpense();
    updateTransactionTable();
    updateNetBalance();
  };

  window.editTransaction = function (index) {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const item = transactions[index];

    if (item.type === "income") {
      document.getElementById("balanceName").value = item.name;
      document.getElementById("amount").value = item.amount;

      incomeEditIndex = transactions
        .filter((t) => t.type === "income")
        .findIndex((t) => t.name === item.name && t.amount === item.amount);

      main.style.display = "none";
      add.style.display = "flex";
    } else {
      document.getElementById("expenseName").value = item.name;
      document.getElementById("expenseAmount").value = item.amount;

      let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

      editIndex = expenses.findIndex(
        (e) => e.name === item.name && e.amount === item.amount,
      );

      isEdit = true;

      document.getElementById("expenseTitle").innerText = "Edit Expense";
      document.getElementById("expenseBtn").innerText = "Update";

      openExpenseForm();
    }
  };

  balancePageBtn.addEventListener("click", () => {
    main.style.display = "none";
    pendingPage.style.display = "none";
    balancePage.style.display = "block";

    updateTransactionTable();
  });

  allIncomeBtn.addEventListener("click", () => {
    main.style.display = "none";
    pendingPage.style.display = "none";
    balancePage.style.display = "none";
    incomePage.style.display = "block";

    renderAllIncome();
  });

  function renderAllIncome() {
    const incomeList = document.getElementById("incomeList");
    incomeList.innerHTML = "";

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    let incomes = transactions.filter((item) => item.type === "income");

    if (incomes.length === 0) {
      incomeList.innerHTML = `
      <tr>
        <td colspan="5">No pending expenses</td>
      </tr>
    `;
      return;
    }

    incomes.forEach((item, index) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.date || "-"}</td>
      <td class= "name">${item.name}</td>
      <td>$${item.amount}</td>
      <td class="action">
        <button class="edit" onclick="editIncome(${index})">Edit</button>
        <button class="delete" onclick="deleteIncome(${index})">Delete</button>
      </td>
    `;

      incomeList.appendChild(tr);
    });
  }

  function renderIncomeLastThree() {
    const incomeList = document.getElementById("incomeListLastThree");
    incomeList.innerHTML = "";

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    let incomes = transactions.filter((item) => item.type === "income");

    let lastThree = incomes.slice(-3);

    lastThree.forEach((item) => {
      const realIndex = incomes.findIndex(
        (i) => i.name === item.name && i.amount === item.amount,
      );

      const li = document.createElement("li");

      li.innerHTML = `
      <div class="expenss-con">
        <strong class="dolar">
          ${item.date} </span>
        </strong>
        <strong class="dolar">
          ${item.name} - <span>$${item.amount}</span>
        </strong>


        <span class="btn-con">
          <button class="edit" onclick="editIncome(${realIndex})">Edit</button>
          <button class="delete" onclick="deleteIncome(${realIndex})">Delete</button>
        </span>
      </div>
    `;

      incomeList.appendChild(li);
    });
  }

  window.deleteIncome = function (index) {
    if (!confirm("Delete this income?")) return;

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    let incomes = transactions.filter((item) => item.type === "income");

    const itemToDelete = incomes[index];

    let realIndex = transactions.findIndex(
      (item) =>
        item.type === "income" &&
        item.name === itemToDelete.name &&
        item.amount === itemToDelete.amount,
    );

    if (realIndex !== -1) {
      transactions.splice(realIndex, 1);
    }

    let totalAdd = parseFloat(localStorage.getItem("totalAdd")) || 0;
    totalAdd -= itemToDelete.amount;

    localStorage.setItem("totalAdd", totalAdd);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    totalAddEl.innerText = `$${totalAdd}`;

    renderAllIncome();
    updateTransactionTable();
    updateNetBalance();
  };

  window.editIncome = function (index) {
    main.style.display = "none";
    add.style.display = "flex";
    incomePage.style.display = "none";
    pendingPage.style.display = "none";

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    let incomes = transactions.filter((item) => item.type === "income");

    const item = incomes[index];

    document.getElementById("balanceName").value = item.name;
    document.getElementById("amount").value = item.amount;
    incomeEditIndex = index;

    document.getElementById("incomeTitle").innerText = "Update Income";
  document.getElementById("incomeBtn").innerText = "Update";
  };

  renderExpenses();
  updateTotalExpense();
  updateNetBalance();
  renderIncomeLastThree();
});
