const questions = [
    {
        question: "Melyik ország nyerte meg a legtöbb labdarúgó-világbajnoki címet?",
        answers:[
            {text: "Franciaország", correct: false},
            {text: "Németország", correct: false},
            {text: "Brazília", correct: true},
            {text: "Olaszország",correct: false},
        ]
    },
    {
        question: "Melyik sportágban használják a 'kétkezes szervát'?",
        answers:[
            {text: "Kézilabda", correct: false},
            {text: "Kosárlabda", correct: false},
            {text: "Röplabda", correct: false},
            {text: "Tenisz",correct: true},
        ]
    },
    {
        question: "Milyen színű a jégkorongpálya középső vonala?",
        answers:[
            {text: "Zőld", correct: false},
            {text: "Piros", correct: true},
            {text: "Kék", correct: false},
            {text: "Fehér",correct: false},
        ]
    },
    {
        question: "Ki nyerte az első Tour de France-t?",
        answers:[
            {text: "Eddy Merckx", correct: false},
            {text: "Gino Bartali", correct: false},
            {text: "Jacques Anquetil", correct: false},
            {text: "Maurice Garin",correct: true},
        ]
    },
    {
        question: "Melyik sportágban versenyeznek 'tízpróbában'?",
        answers:[
            {text: "Kosárlabda", correct: false},
            {text: "Atlétika", correct: true},
            {text: "Röplabda", correct: false},
            {text: "Úszás",correct: false},
        ]
    },
    {
        question: "Melyik hangszer tartozik a vonós családba?",
        answers:[
            {text: "Fagott", correct: false},
            {text: "Cselló", correct: true},
            {text: "Klarinét", correct: false},
            {text: "Trombita",correct: false},
        ]
    },
    {
        question: "Mi a neve a zenekar vezetőjének, aki az 'Orchestrát' vezeti?",
        answers:[
            {text: "Zongorista", correct: false},
            {text: "Gitáros", correct: false},
            {text: "Karmester", correct: true},
            {text: "Basszusgitáros",correct: false},
        ]
    },
    {
        question: "Melyik hangszer a legnagyobb a fafúvós hangszerek közül?",
        answers:[
            {text: "Fagott", correct: true},
            {text: "Fuvola", correct: false},
            {text: "Oboe", correct: false},
            {text: "Klarinét",correct: false},
        ]
    },
    {
        question: "Melyik zeneszámot játszanak gyakran zongorán, és Mozart egyik legismertebb műve?",
        answers:[
            {text: "Für Elise", correct: false},
            {text: "Tavaszi Szimfónia", correct: false},
            {text: "Rondo Alla Turca", correct: true},
            {text: "Requiem",correct: false},
        ]
    },
    {
        question: "Mi a neve annak a hangszernek, ami a gotárhoz hasonlóan húrokkal van ellátva, de szimfonikus zenekarban használják?",
        answers:[
            {text: "Zongora", correct: false},
            {text: "Hegedű", correct: true},
            {text: "Harfa", correct: false},
            {text: "Ukulele",correct: false},
        ]
    } 
];

const questionElemet = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function StartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}


function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElemet.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState() {
    nextButton.style.display = "none"
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}

function showScore() {
    resetState();
    questionElemet.innerHTML = `Elért pont ${score} össz pont ${questions.length}!`;
    nextButton.innerHTML = "Játssz újra!";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",() =>{
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else{
        StartQuiz();
    }
});

StartQuiz();