const questions = [
    {
        question: "In hashing a record is located using?",
        answers: [
            { text: "key", correct: false},
            { text: "function", correct: true},
            { text: "index", correct: false},
            { text: "none of these", correct: false},
        ]
    },
    {
        question: "Which of the following is a collision resolution method?",
        answers: [
            { text: "Open addressing", correct: true},
            { text: "Division method", correct: false},
            { text: "folding", correct: false},
            { text: "All of the above", correct: false},
        ]
    },
    {
        question: "The degree of each node in a general tree is?",
        answers: [
            { text: "at most two", correct: false},
            { text: "exactly two", correct: false},
            { text: "more than two", correct: true},
            { text: "exactly three", correct: false},
        ]
    },
    {
        question: "If the binary tree has 50 nodes then the number of edges are?",
        answers: [
            { text: "51", correct: false},
            { text: "55", correct: false},
            { text: "49", correct: true},
            { text: "50", correct: false},
        ]
    },
    {
        question: "Graph is a collection of?",
        answers: [
            { text: "rows and columns", correct: false},
            { text: "vertices and edges", correct: true},
            { text: "equations", correct: false},
            { text: "none of these", correct: false},
        ]
    },
    {
        question: "Adjacency matrix of digraph is?",
        answers: [
            { text: "sparse matrix", correct: false},
            { text: "symmetric matrix", correct: false},
            { text: "asymmetric matrix", correct: true},
            { text: "identity matrix", correct: false},
        ]
    },
    {
        question: "AVL Tree is a?",
        answers: [
            { text: "binary tree", correct: false},
            { text: "binary search tree", correct: true},
            { text: "expression tree", correct: false},
            { text: "complete binary tree", correct: false},
        ]
    },
    {
        question: "In compiler the variable names are stored in?",
        answers: [
            { text: "linked list", correct: false},
            { text: "graph", correct: false},
            { text: "file", correct: false},
            { text: "symbol table", correct: true},
        ]
    },
    {
        question: "To perform file I/O operations, we must use which header file?",
        answers: [
            { text: "&lt; ifstream &gt;", correct: false},
            { text: "&lt; ofstream &gt;", correct: false},
            { text: "&lt; fstream &gt;", correct: true},
            { text: "any of these", correct: false},
        ]
    },
    {
        question: "The index of consists?",
        answers: [
            { text: "list of keys", correct: false},
            { text: "pointers to the master list", correct: false},
            { text: "both(a) and (b)", correct: true},
            { text: "none of these", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;
let userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage after login

function StartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button"); // Create a button
        button.innerHTML = answer.text; // We will add the answer
        button.classList.add("btn"); // Adding the class in the button
        answerButton.appendChild(button); // Display button inside the div answer-buttons
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target; // Store the selected answer
    const isCorrect = selectedBtn.dataset.correct === "true"; // Compare the selected button with true
    if (isCorrect) {
        selectedBtn.classList.add("correct"); // Add className correct
        score++;
    } else {
        selectedBtn.classList.add("incorrect"); // Add className incorrect
    }
    Array.from(answerButton.children).forEach(button => { // For each button, will check the dataset if it is true will mark it green, if false then red, and further marking is disabled
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "PLAY AGAIN";
    nextButton.style.display = "block";

    // Send the score to the backend
    fetch('http://localhost:3000/quiz', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId,  // Send the userId to identify the user
            score    // Send the score
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Score stored successfully:', data);
    })
    .catch(error => {
        console.error('Error storing score:', error);
    });
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        StartQuiz();
    }
});

StartQuiz();
