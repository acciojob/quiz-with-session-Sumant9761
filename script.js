// your JS code here.

const questionsElement = document.getElementById("questions");
const scoreElement = document.getElementById("score");

// Load saved answers
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Load previous score if present
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of 5.`;
}

// Submit button
document.getElementById("submit").addEventListener("click", () => {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  scoreElement.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
});

// Do not change code below this line
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display questions
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];

    const questionElement = document.createElement("div");
    questionElement.appendChild(
      document.createTextNode(question.question)
    );

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const choiceElement = document.createElement("input");
      choiceElement.type = "radio";
      choiceElement.name = `question-${i}`;
      choiceElement.value = choice;

      // Restore saved answer
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
        choiceElement.setAttribute("checked", "true");
      }

      choiceElement.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem(
          "progress",
          JSON.stringify(userAnswers)
        );

        // Remove checked attribute from other radios
        document
          .querySelectorAll(`input[name="question-${i}"]`)
          .forEach((radio) => {
            radio.removeAttribute("checked");
          });

        choiceElement.setAttribute("checked", "true");
      });

      questionElement.appendChild(choiceElement);
      questionElement.appendChild(
        document.createTextNode(choice)
      );
    }

    questionsElement.appendChild(questionElement);
  }
}

renderQuestions();