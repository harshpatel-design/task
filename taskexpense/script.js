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

  window.filteredTransactions = [];
window.searchedTransactions = [];

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
    balanceName.value = "";
    amount.value = "";
  });

  function getValidDate(inputId) {
    const input = document.getElementById(inputId).value;

    if (!input) {
      alert("Please select date");
      return null;
    }

    const selectedDate = new Date(input);
    const today = new Date();

    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      alert("Date cannot be in future");
      return null;
    }

    const [year, month, day] = input.split("-");
    return `${day}/${month}/${year}`;
  }

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
    const date = getValidDate("incomeDate");
    if (!date) return;

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
    renderIncomeLastThree();

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
    const date = getValidDate("expenseDate");
    if (!date) return;

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

    main.style.display = "grid";
    pendingPage.style.display = "none";
    expenseFormWrapper.style.display = "none";

    renderExpenses();
    renderPendingPage();
    updateTotalExpense();
    updateTransactionTable();
    renderIncomeLastThree();

    closeExpenseForm();
  };

  function renderExpenses() {
    expenseList.innerHTML = "";

    let expensess = JSON.parse(localStorage.getItem("expenses")) || [];
    let threeEx = expensess.slice(-3).reverse();

    threeEx.forEach((item) => {
      const realIndex = expensess.findIndex(
        (e) =>
          e.name === item.name &&
          e.amount === item.amount &&
          e.date === item.date,
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

  function formatToInput(dateStr) {
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month}-${day}`;
  }

  window.editExpense = function (index) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    const item = expenses[index];
    document.getElementById("expenseDate").value = formatToInput(item.date);
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

  window.renderPendingPage = function () {
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

    let revEx = expenses.slice().reverse();

    revEx.forEach((item, index) => {
      const oriIndex = expenses.findIndex(
        (e) =>
          e.name === item.name &&
          e.amount === item.amount &&
          e.date === item.date,
      );
      const tr = document.createElement("tr");

      tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.date || "-"}</td>
      <td class="name">${item.name}</td>
      <td>$${item.amount}</td>
      <td class="action">
        <button class="edit" onclick="editExpense(${oriIndex})">Edit</button>
        <button class="delete" onclick="deleteExpense(${oriIndex})">Delete</button>
      </td>
    `;

      pendingListPage.appendChild(tr);
    });
  };

  pendingex.addEventListener("click", () => {
    main.style.display = "none";
    pendingPage.style.display = "block";

    renderPendingPage();
  });

  window.updateTransactionTable = function () {
    const table = document.getElementById("transactionTable");
    if (!table) return;
    table.innerHTML = "";
    let originalTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    let transactions = originalTransactions.slice().reverse();
    let balance = 0;

    transactions.forEach((item, index) => {
      const originalIndex = JSON.parse(
        localStorage.getItem("transactions"),
      ).findIndex(
        (t) =>
          t.name === item.name &&
          t.amount === item.amount &&
          t.type === item.type,
      );

      if (item.type === "income") {
        balance += item.amount;

        table.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${item.date || "-"}</td>
          <td>${item.name}</td>
          <td>${item.amount}</td>
          <td>-</td>
          <td>${balance}</td>
           <td>
            <button class="edit"  onclick="editTransaction(${originalIndex})">Edit</button>
            <button class="delete" onclick="deleteTransaction(${originalIndex})">Delete</button>
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
            <button class="edit" onclick="editTransaction(${originalIndex})">Edit</button>
            <button class="delete" onclick="deleteTransaction(${originalIndex})">Delete</button>
          </td>
        </tr>
      `;
      }
    });
  };

  window.deleteTransaction = function (index) {
    if (!confirm("Delete this transaction?")) return;
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

    document.getElementById("fromDate").value = "";
    document.getElementById("toDate").value = "";
    updateTransactionTable();
  });

  window.renderAllIncome = function () {
    const incomeList = document.getElementById("incomeList");
    incomeList.innerHTML = "";

    let originalTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    let incomes = originalTransactions.filter((item) => item.type === "income");

    if (incomes.length === 0) {
      incomeList.innerHTML = `
      <tr>
        <td colspan="5">No pending expenses</td>
      </tr>
    `;
      return;
    }

    let rev = incomes.slice().reverse();

    rev.forEach((item, index) => {
      const oriIndex = incomes.findIndex(
        (t) =>
          t.name === item.name &&
          t.amount === item.amount &&
          t.date === item.date,
      );
      const tr = document.createElement("tr");

      tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.date || "-"}</td>
      <td class= "name">${item.name}</td>
      <td>$${item.amount}</td>
      <td class="action">
        <button class="edit" onclick="editIncome(${oriIndex})">Edit</button>
        <button class="delete" onclick="deleteIncome(${oriIndex})">Delete</button>
      </td>
    `;

      incomeList.appendChild(tr);
    });
  };

  allIncomeBtn.addEventListener("click", () => {
    main.style.display = "none";
    pendingPage.style.display = "none";
    balancePage.style.display = "none";
    incomePage.style.display = "block";

    renderAllIncome();
  });

  function renderIncomeLastThree() {
    const incomeList = document.getElementById("incomeListLastThree");
    incomeList.innerHTML = "";

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    let incomes = transactions.filter((item) => item.type === "income");

    let lastThree = incomes.slice(-3).reverse();

    lastThree.forEach((item) => {
      const realIndex = incomes.findIndex(
        (i) =>
          i.name === item.name &&
          i.amount === item.amount &&
          i.date === item.date,
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
    document.getElementById("incomeDate").value = formatToInput(item.date);
    document.getElementById("balanceName").value = item.name;
    document.getElementById("amount").value = item.amount;
    incomeEditIndex = index;

    document.getElementById("incomeTitle").innerText = "Update Income";
    document.getElementById("incomeBtn").innerText = "Update";
  };

  window.searchTransaction = function (value) {
    if (!value) {
       window.searchedTransactions = [];
      updateTransactionTable();
      return;
    }

    const table = document.getElementById("transactionTable");
    table.innerHTML = "";

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    let filtered = transactions.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.amount.toString().includes(value),
    );

  window.searchedTransactions = filtered;
    let balance = 0;

    filtered.forEach((item, index) => {
      if (item.type === "income") {
        balance += item.amount;

        table.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.date || "-"}</td>
        <td>${item.name}</td>
        <td style="color:#4caf50; font-weight:500;">${item.amount}</td>
        <td>-</td>
        <td>${balance}</td>
        <td>
          <button class="edit" onclick="editTransaction(${index})">Edit</button>
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
        <td style="color:#ff5252; font-weight:500;">${item.amount}</td>
        <td>${balance}</td>
        <td>
          <button class="edit" onclick="editTransaction(${index})">Edit</button>
          <button class="delete" onclick="deleteTransaction(${index})">Delete</button>
        </td>
      </tr>
    `;
      }
    });
  };

  window.searchIncome = function (value) {
    if (!value) {
      renderAllIncome();
      return;
    }

    const incomeList = document.getElementById("incomeList");
    incomeList.innerHTML = "";

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    let incomes = transactions.filter((item) => item.type === "income");

    let filtered = incomes.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.amount.toString().includes(value),
    );

    filtered.forEach((item) => {
      const realIndex = incomes.findIndex(
        (i) => i.name === item.name && i.amount === item.amount,
      );

      const tr = document.createElement("tr");

      tr.innerHTML = `
      <td>${realIndex + 1}</td>
      <td>${item.date || "-"}</td>
      <td>${item.name}</td>
      <td class="income">${item.amount}</td>
      <td>
        <button class="edit" onclick="editIncome(${realIndex})">Edit</button>
        <button class="delete" onclick="deleteIncome(${realIndex})">Delete</button>
      </td>
    `;

      incomeList.appendChild(tr);
    });
  };

  window.searchExpense = function (value) {
    if (!value) {
      renderPendingPage();
      return;
    }

    const pendingListPage = document.getElementById("pendingListPage");
    pendingListPage.innerHTML = "";

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    let filtered = expenses.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.amount.toString().includes(value),
    );

    filtered.forEach((item) => {
      const realIndex = expenses.findIndex(
        (e) => e.name === item.name && e.amount === item.amount,
      );

      const tr = document.createElement("tr");

      tr.innerHTML = `
      <td>${realIndex + 1}</td>
      <td>${item.date || "-"}</td>
      <td>${item.name}</td>
      <td class="expense">${item.amount}</td>
      <td>
        <button class="edit" onclick="editExpense(${realIndex})">Edit</button>
        <button class="delete" onclick="deleteExpense(${realIndex})">Delete</button>
      </td>
    `;

      pendingListPage.appendChild(tr);
    });
  };

  window.filterTransactionsByDate = function () {
    const from = document.getElementById("fromDate").value;
    const to = document.getElementById("toDate").value;

    if (!from || !to) {
      alert("Select both dates");
      return;
    }

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    function convert(dateStr) {
      const [d, m, y] = dateStr.split("/");
      return `${y}-${m}-${d}`;
    }

    let filtered = transactions.filter((item) => {
      const itemDate = convert(item.date);
      return itemDate >= from && itemDate <= to;
    });


  window.filteredTransactions = filtered;
   window.searchedTransactions = [];
    renderFilteredTransactions(filtered);
  };

  function renderFilteredTransactions(data) {
    const table = document.getElementById("transactionTable");
    table.innerHTML = "";

    let originalTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];

    let balance = 0;

    data.forEach((item, index) => {
      const originalIndex = originalTransactions.findIndex(
        (t) =>
          t.name === item.name &&
          t.amount === item.amount &&
          t.type === item.type &&
          t.date === item.date,
      );

      if (item.type === "income") {
        balance += item.amount;

        table.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${item.date}</td>
          <td>${item.name}</td>
          <td style="color:#4caf50;">${item.amount}</td>
          <td>-</td>
          <td>${balance}</td>
          <td>
            <button class="edit" onclick="editTransaction(${originalIndex})">Edit</button>
            <button class="delete" onclick="deleteTransaction(${originalIndex})">Delete</button>
          </td>
        </tr>
      `;
      } else {
        balance -= item.amount;

        table.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${item.date}</td>
          <td>${item.name}</td>
          <td>-</td>
          <td style="color:#ff5252;">${item.amount}</td>
          <td>${balance}</td>
          <td>
            <button class="edit" onclick="editTransaction(${originalIndex})">Edit</button>
            <button  class="delete" onclick="deleteTransaction(${originalIndex})">Delete</button>
          </td>
        </tr>
      `;
      }
    });
  }

  window.exportTransactions = function () {
  let transactions = [];

  if (window.searchedTransactions && window.searchedTransactions.length > 0) {
    transactions = window.searchedTransactions;
  }

  else if (window.filteredTransactions && window.filteredTransactions.length > 0) {
    transactions = window.filteredTransactions;
  }

  else {
    transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  }

  if (transactions.length === 0) {
    alert("No data to export");
    return;
  }

  let csv = "Number,Date,Name,Credit,Debit,Balance\n";
  let balance = 0;

  transactions.forEach((item, index) => {
    let credit = "";
    let debit = "";

    if (item.type === "income") {
      balance += item.amount;
      credit = item.amount;
    } else {
      balance -= item.amount;
      debit = item.amount;
    }

    csv += `${index + 1},${item.date},${item.name},${credit},${debit},${balance}\n`;
  });

  let blob = new Blob([csv], { type: "text/csv" });
  let url = URL.createObjectURL(blob);

  let a = document.createElement("a");
  a.href = url;
  a.download = "transactions_report.csv";
  a.click();

  URL.revokeObjectURL(url);
};
window.resetTra = function () {

  const fromDate = document.getElementById("fromDate");
  const toDate = document.getElementById("toDate");
  const searchInput = document.getElementById("input");

  if (fromDate) fromDate.value = "";
  if (toDate) toDate.value = "";
  if (searchInput) searchInput.value = "";

  window.filteredTransactions = [];
  window.searchedTransactions = [];

  updateTransactionTable();
};

  renderExpenses();
  updateTotalExpense();
  updateNetBalance();
  renderIncomeLastThree();
});

