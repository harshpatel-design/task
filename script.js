const optionsContainer = document.getElementById("options");
const marksElement = document.getElementById("marks");
const questionElement = document.getElementById("question");
const questionNumber = document.getElementById("progress");
const sidebarList = document.getElementById("sidebar-list");
const quizBox = document.querySelector(".container");
const startBox = document.querySelector(".start-box");
const question = document.getElementById("question");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");

const resultBox = document.getElementById("result");
const finalScore = document.getElementById("final-score");
const report = document.getElementById("report");
const term = document.querySelector(".term");
const heading = document.querySelector(".heading");
const body = document.querySelector("body");

body.preventDefault = true;

let currentQuestionIndex = 0;
let marks = 0;
let wrongCount = 0;

const quizData = [
  {
    question: "What is the capital of India?",
    options: ["Mumbai", "Delhi", "Chennai", "Kolkata"],
    answer: "Delhi",
  },
  {
    question: "Which language runs in browser?",
    options: ["Python", "Java", "C++", "JavaScript"],
    answer: "JavaScript",
  },
  {
    question: "HTML stands for?",
    options: ["Hyper Text Markup Language", "High Text", "Hyper Tool", "None"],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "React developed by?",
    options: ["Google", "Facebook", "Amazon", "Microsoft"],
    answer: "Facebook",
  },
  {
    question: "Paragraph tag?",
    options: ["<h1>", "<p>", "<div>", "<span>"],
    answer: "<p>",
  },
  {
    question: "Not JS datatype?",
    options: ["String", "Boolean", "Float", "Undefined"],
    answer: "Float",
  },
  {
    question: "CSS color property?",
    options: ["text-color", "font-color", "color", "bg"],
    answer: "color",
  },
  {
    question: "who is not a Variable keyword?",
    options: ["var", "let", "const", "All"],
    answer: "All",
  },
  {
    question: "Console print?",
    options: ["log()", "console.log()", "print()", "echo()"],
    answer: "console.log()",
  },
  {
    question: "JS comment?",
    options: ["//", "#", "<!-- -->", "**"],
    answer: "//",
  },
];

let userAnswers = new Array(quizData.length).fill(null);

quizData.forEach((_, i) => {
  const li = document.createElement("li");
  li.innerText = i + 1;

  li.onclick = () => {
    currentQuestionIndex = i;
    loadQuestion();
  };

  sidebarList.appendChild(li);
});

function loadQuestion() {
  const q = quizData[currentQuestionIndex];

  questionElement.innerText = q.question;
  questionNumber.innerText = currentQuestionIndex + 1;

  optionsContainer.innerHTML = "";

  let number = document.querySelectorAll(".sidebar li");

  number.forEach((e) => e.classList.remove("active"));
  sidebarList.children[currentQuestionIndex].classList.add("active");

  q.options.forEach((e) => {
    const li = document.createElement("li");
    li.innerText = e;

    if (userAnswers[currentQuestionIndex] === e) {
      li.classList.add("selected");
    }

    li.onclick = () => {
      handleAnswer(e);

      const allOptions = optionsContainer.querySelectorAll("li");
      allOptions.forEach((el) => el.classList.remove("selected"));

      li.classList.add("selected");
    };

    optionsContainer.appendChild(li);
  });
  disableOptions();
  checkAllAnswered();
  rememberUnanswered();
  }

function handleAnswer(selected) {
  userAnswers[currentQuestionIndex] = selected;
  console.log("userAnswers", userAnswers);
  checkAllAnswered();
  disableOptions();
}

nextBtn.onclick = () => {
  if (currentQuestionIndex < quizData.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  }
};

prevBtn.onclick = () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
};

submitBtn.onclick = () => {
  calculateResult();
};

function disableOptions() {
  if (!userAnswers.every((ans) => ans !== null)) {
    submitBtn.classList.add("disable");
  } else {
    submitBtn.classList.remove("disable");
  }
}

function calculateResult() {
  let marks = 0;
  let penalty = 0;

  report.innerHTML = "";

  quizData.forEach((q, i) => {
    const userAns = userAnswers[i];
    const container = document.createElement("div");
    container.classList.add("box");

    const question = document.createElement("h3");
    question.classList.add("report-question");
    question.innerText = `Q${i + 1}: ${q.question}`;

    const ul = document.createElement("ul");
    ul.classList.add("options-list");

    q.options.forEach((v) => {
      const li = document.createElement("li");
      li.classList.add("report-option");
      li.innerText = v;

      if (v === q.answer) {
        li.style.backgroundColor = "green";
        li.style.color = "white";
      }

      if (v === userAns && v !== q.answer) {
        li.style.backgroundColor = "red";
        li.style.color = "white";
      }

      ul.appendChild(li);
    });

    if (userAns === q.answer) {
      marks++;
    } else {
      if (i < 5 && userAns !== null) {
        penalty += 0.5;
      }
    }

    container.appendChild(question);
    container.appendChild(ul);
    report.appendChild(container);

    const p = document.createElement("p");
    container.append(p);

    p.innerHTML = `
  <strong>Your Answer:</strong> ${userAns || "Not Answered"} 
  | 
  <strong>Correct Answer:</strong> ${q.answer}
`;
  });

  let finalMarks = marks - penalty;

  finalScore.innerText = `Final Score: ${finalMarks} / ${quizData.length}`;

  document.querySelector(".quiz-box").style.display = "none";
  document.querySelector(".sidebar").style.display = "none";
  resultBox.style.display = "block";
  quizBox.classList.add("none");
  term.classList.add("none");
  heading.classList.add("none");

  const start = document.createElement("button");
  start.innerText = "Start Again";
  startBox.appendChild(start);

  start.onclick = () => {
    location.reload();
    quizBox.classList.remove("none");
  };
}

loadQuestion();

function checkAllAnswered() {
  const allAnswered = userAnswers.every((ans) => ans !== null);

  if (allAnswered) {
    submitBtn.style.display = "inline-block";
  }
}

function rememberUnanswered() {
  const remaining = userAnswers
  .map((ans, i) => (ans === null ? i + 1 : null))
  .filter((val) => val !== null);

  const remainingBox = document.createElement("p");
  remainingBox.classList.add("remaining-box");

if (remaining.length > 0) {
  remainingBox.innerHTML = `
    Unanswered Questions: <span>[${remaining.join(", ")}]</span>`;
} else {
  remainingBox.innerHTML = `
    <span style="color:green;">All questions answered ✅</span>
  `;
}

question.prepend(remainingBox);
}