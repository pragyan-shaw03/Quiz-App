let questions = [
    {
        question: "1. Which country recently won the FIFA Women's World Cup 2023??",
        answers: ['USA', 'Germany', 'Spain', 'Brazil'],
        correctAns: 'Spain'
    },
    {
        question: '2. Who is the current Secretary-General of the United Nations as of 2024?',
        answers: ['Ban Ki-moon', 'António Guterres', 'Kofi Annan', 'Jens Stoltenberg'],
        correctAns: 'António Guterres'
    },
    {
        question: '3. Which country hosted the 2024 Summer Olympics?',
        answers: ['Japan', 'USA', 'France', 'Brazil'],
        correctAns: 'France'
    },
    {
        question: '4. What is the name of the mission India launched to study the Sun in 2023?',
        answers: ['Mangalyaan', 'Chandrayaan-3', 'Aditya-L1', 'Gaganyaan'],
        correctAns: 'Aditya-L1'
    },
    {
        question: '5. Who won the Nobel Prize in Literature in 2023?',
        answers: ['Kazuo Ishiguro', 'Olga Tokarczuk', 'Abdulrazak Gurnah', 'Jon Fosse'],
        correctAns: 'Jon Fosse'
    }
];
let currentQuestion = 0, score = 0;
let question = document.querySelector('.question h2');
let ansButtons = document.querySelectorAll('.ans');
let nextButton = document.querySelector('.next');


function startGame() {
    let i = 0;
    question.textContent = questions[currentQuestion].question;
    ansButtons.forEach((button) => {
        button.classList.remove('rightAns');
        button.classList.remove('wrongAns');
        button.disabled = false;
        button.textContent = questions[currentQuestion].answers[i++];
    });
    nextButton.style.display = 'none';
}
startGame();

ansButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.innerHTML == questions[currentQuestion].correctAns) {
            correctOptionSelected();
        } else {
            button.classList.add('wrongAns');
            wrongOptionSelected();
        }
        nextButton.style.display = 'block';
    });
});

nextButton.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion == questions.length) {
        endGame();
    } else {
        startGame();
    }
});

function correctOptionSelected() {
    score++;
    ansButtons.forEach((button) => {
        if (questions[currentQuestion].correctAns == button.innerHTML) {
            button.classList.add('rightAns');
        }
        button.disabled = true;
    });
}

function wrongOptionSelected() {
    ansButtons.forEach((button) => {
        if (questions[currentQuestion].correctAns == button.innerHTML) {
            button.classList.add('rightAns');
        }
        button.disabled = true;
    });
}

function endGame() {
    document.querySelector('.container').style.display = 'none';
    let displayScore = document.createElement('div');
    displayScore.className = 'container';
    displayScore.innerHTML = `<h1>Your Score is ${score}/${questions.length}</h1>`;
    document.querySelector('body').appendChild(displayScore);

    let play = document.createElement('button');
    play.className = 'play-btn';
    play.textContent = 'Play Again';
    displayScore.appendChild(play);
    
    play.addEventListener('click', () => {
        displayScore.remove();
        play.remove();
        document.querySelector('.container').style.display = '';
        currentQuestion = 0;
        startGame();
    });
}