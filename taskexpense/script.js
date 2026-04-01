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
  const approvedList = document.getElementById("approvedList");
  const sidebarExpense = document.getElementById("sidebarExpense");
  const desktopExpense = document.getElementById("desktopExpense");
  const approvePageBtn = document.getElementById("approvePageBtn");
  const approvePage = document.getElementById("approvePage");
  const approvedListPage = document.getElementById("approvedListPage");
  const pendingPage = document.getElementById("pendingPage");
  const pendingListPage = document.getElementById("pendingListPage");
  const balancePageBtn = document.getElementById("balancePageBtn");
  const balancePage = document.getElementById("balancePage");

  let editIndex = -1;

  let isEditingApproved = false;
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let approvedExpenses = JSON.parse(localStorage.getItem("approved")) || [];

  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  add.style.display = "none";
  expenseFormWrapper.style.display = "none";
  approvePage.style.display = "none";
  pendingPage.style.display = "none";
  balancePage.style.display = "none";

  main.style.display = "grid";

  addBtn.addEventListener("click", () => {
    main.style.display = "none";
    add.style.display = "flex";
  });

  window.closeForm = function () {
    add.style.display = "none";
    main.style.display = "grid";
  };

  window.submitBalance = function () {
    const amountInput = document.getElementById("amount");
    let amount = parseFloat(amountInput.value);

    if (!amount || amount <= 0) {
      alert("Enter valid amount");
      return;
    }

    let totalAdd = getNumber(totalAddEl);
    totalAdd += amount;
    localStorage.setItem("totalAdd", totalAdd);

    totalAddEl.innerText = `$${totalAdd}`;
    updateNetBalance();

    amountInput.value = "";
    closeForm();
    updateTransactionTable();
  };

  function openExpenseForm() {
    main.style.display = "none";
    balancePage.style.display= "none"
    pendingPage.style.display= "none"
    expenseFormWrapper.style.display = "flex";


  }

  openExpenseBtn.addEventListener("click", openExpenseForm);
  sidebarExpense.addEventListener("click", openExpenseForm);

  window.closeExpenseForm = function () {
    expenseFormWrapper.style.display = "none";
    if (isEditingApproved) {
      approvePage.style.display = "block";
    } else {
      main.style.display = "grid";
    }
    resetForm();
  };

  window.addExpense = function () {
    const name = document.getElementById("expenseName").value;
    const amount = parseFloat(document.getElementById("expenseAmount").value);

    if (!name || !amount) {
      alert("Enter valid data");
      return;
    }

    if (editIndex === -1) {
      expenses.push({ name, amount });
    } else {
      expenses[editIndex] = { name, amount };
      editIndex = -1;
    }
    localStorage.setItem("expenses", JSON.stringify(expenses));

    renderExpenses();
    updateTotalExpense();
    closeExpenseForm();
    updateTransactionTable();
  };

  function renderExpenses() {
    expenseList.innerHTML = "";

    expenses.forEach((item, index) => {
      const li = document.createElement("li");

      li.innerHTML = `
       
        <strong class="dolar">${item.name} - <span>$${item.amount}</span></strong>
       <span class="btn-con">
          <button class="edit" onclick="editExpense(${index})">Edit</button>
          <button class="delete" onclick="deleteExpense(${index})">Delete</button>
          <button class= "approve" onclick="approveExpense(${index})">Approve</button>
        </span>
      `;

      expenseList.appendChild(li);
    });
  }

  window.editExpense = function (index) {
    const item = expenses[index];

    document.getElementById("expenseName").value = item.name;
    document.getElementById("expenseAmount").value = item.amount;

    editIndex = index;
    openExpenseForm();
  };

  window.deleteExpense = function (index) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();
    updateTotalExpense();
    updateTransactionTable();
  };

  window.approveExpense = function (index) {
    const item = expenses[index];

    approvedExpenses.push(item);
    expenses.splice(index, 1);

    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("approved", JSON.stringify(approvedExpenses));

    renderExpenses();
    renderApproved();
    updateTotalExpense();
    updateTransactionTable();
  };

  function renderApproved() {
    approvedList.innerHTML = "";
    let approvedExpensesLastThree = approvedExpenses.slice(-3);
    console.log("approvedExpensesLastThree", approvedExpensesLastThree);

    approvedExpensesLastThree.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong class="dolar">${item.name} - <span>$${item.amount}</span></strong>`;
      approvedList.appendChild(li);
    });
  }

  approvePageBtn.addEventListener("click", openApprovePage);
  desktopExpense.addEventListener("click", openApprovePage);

  function openApprovePage() {
    main.style.display = "none";
    approvePage.style.display = "block";
    pendingPage.style.display="none"
    balancePage.style.display="none"
    renderApprovedPage();
  }

  function renderApprovedPage() {
    approvedListPage.innerHTML = "";

    if (approvedExpenses.length === 0) {
      approvedListPage.innerHTML = "<p>No approved expenses</p>";
      return;
    }

    approvedExpenses.forEach((item, index) => {
      const li = document.createElement("li");

      li.innerHTML = `
        <strong>${item.name} - $${item.amount}</strong>
        <div>
        <button class="edit" onclick="editApproved(${index})">Edit</button>
        <button class="delete" onclick="deleteApproved(${index})">Delete</button>
        </div>
      `;

      approvedListPage.appendChild(li);
    });
  }

  window.editApproved = function (index) {
    const item = approvedExpenses[index];

    document.getElementById("expenseName").value = item.name;
    document.getElementById("expenseAmount").value = item.amount;

    editIndex = index;
    isEditingApproved = true;

    approvePage.style.display = "none";
    expenseFormWrapper.style.display = "flex";
    updateTransactionTable();
  };

  window.addExpense = function () {
    const name = document.getElementById("expenseName").value;
    const amount = parseFloat(document.getElementById("expenseAmount").value);

    if (!name || !amount) {
      alert("Enter valid data");
      return;
    }

    if (isEditingApproved) {
      approvedExpenses[editIndex] = { name, amount };
      localStorage.setItem("approved", JSON.stringify(approvedExpenses));
      isEditingApproved = false;
      renderApprovedPage();
      renderApproved();
      updateTotalExpense();
    } else {
      if (editIndex === -1) {
        expenses.push({ name, amount });
      } else {
        expenses[editIndex] = { name, amount };
      }
      localStorage.setItem("expenses", JSON.stringify(expenses));
      renderExpenses();
      updateTotalExpense();
    }

    editIndex = -1;
    closeExpenseForm();
    updateTransactionTable();
  };

  window.deleteExpense = function (index) {
    if (!confirm("Delete this approved expense?")) return;
    expenses.splice(index, 1);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    renderExpenses();
    updateTotalExpense();
    updateTransactionTable();
  };

  window.deleteApproved = function (index) {
    if (!confirm("Delete this approved expense?")) return;

    approvedExpenses.splice(index, 1);
    localStorage.setItem("approved", JSON.stringify(approvedExpenses));

    renderApprovedPage();
    renderApproved();
    updateTotalExpense();
    updateTransactionTable();
  };

  window.backToHome = function () {
    approvePage.style.display = "none";
    pendingPage.style.display = "none";
    balancePage.style.display = "none";
    main.style.display = "grid";
  };

  function updateTotalExpense() {
    let total = 0;

    approvedExpenses.forEach((item) => (total += item.amount));
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
  }

  function renderPendingPage() {
    pendingListPage.innerHTML = "";

    if (expenses.length === 0) {
      pendingListPage.innerHTML = "<p>No pending expenses</p>";
      return;
    }

    expenses.forEach((item, index) => {
      const li = document.createElement("li");

      li.innerHTML = `
      <strong>${item.name} - $${item.amount}</strong>
      <div>
        <button class="edit" onclick="editExpense(${index})">Edit</button>
        <button class="delete" onclick="deleteExpense(${index})">Delete</button>
        <button class="approve" onclick="approveExpense(${index})">Approve</button>
      </div>
    `;

      pendingListPage.appendChild(li);
    });
  }
  pendingex.addEventListener("click", () => {
    main.style.display = "none";
    approvePage.style.display = "none";
    pendingPage.style.display = "block";

    renderPendingPage();
  });

  function updateTransactionTable() {
    const table = document.getElementById("transactionTable");
    if (!table) return;

    table.innerHTML = "";

    let balance = getSavedBalance();
    table.innerHTML += `
    <tr>
      <td>Added Balance</td>
      <td>${balance}</td>
      <td>-</td>
      <td>${balance}</td>
    </tr>
  `;

    approvedExpenses.forEach((item) => {
      balance -= item.amount;

      table.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>-</td>
        <td>${item.amount}</td>
        <td>${balance}</td>
      </tr>
    `;
    });
  }
  function getSavedBalance() {
    return parseFloat(localStorage.getItem("totalAdd")) || 0;
  }

  balancePageBtn.addEventListener("click", () => {
    main.style.display = "none";
    approvePage.style.display = "none";
    pendingPage.style.display = "none";
    balancePage.style.display = "block";

    updateTransactionTable();
  });

  renderExpenses();
  renderApproved();
  updateTotalExpense();
  updateNetBalance();
});
