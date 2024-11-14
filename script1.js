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
        question: "If the binnary tree has 50 nodes then the number of edges are?",
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
            { text: "binnary search tree", correct: true},
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
        question: "To perform file I/O operations,we must use which header file?",
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
const questionElement=document.getElementById("question");
const answerButton=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score=0;
function StartQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNumber=currentQuestionIndex+1;
    questionElement.innerHTML=questionNumber+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");//create a button
        button.innerHTML=answer.text;//we will add the answer
        button.classList.add("btn");//adding the class in the button
        answerButton.appendChild(button);//display button inside the div answer-buttons
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn=e.target;//store the selected answer
    const isCorrect=selectedBtn.dataset.correct==="true";//compare the selected button with true
    if(isCorrect){
        selectedBtn.classList.add("correct");//add className correct
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");//add className incorrect
    }
    Array.from(answerButton.children).forEach(button=>{//for each button will check the dataset if it is true will mark it green if it is false then it will be red and further marking is disbaled
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="PLAY AGAIN";
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

// btn.addEventListener("click",()=>{
    
// })
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('clicked');
  });
});

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex< questions.length ) {
    handleNextButton();
    }
    else{
        StartQuiz();
    }
});
StartQuiz();
