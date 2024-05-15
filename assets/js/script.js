const omdbAPIkey = 'bd7078af';

async function omdbCall(title, key) {
    titleList = title.split(' ');
    title = titleList.join('+');
    const omdbLink = `https://www.omdbapi.com/?apikey=${key}&t=${title}&plot=full`;

    let hintArray = [];
    let response = await fetch(omdbLink);
    if (!response.ok) {
        alert('Network response was not ok :(');
        return;
    }
    let data = await response.json();
    let actors = data.Actors;
    let plot = data.Plot;
    let release = data.Released;
    let director = data.Director;
    hintArray.push(actors,plot,release,director);
    return hintArray;

}

const movieName = document.querySelector('#movieSearch');
const movieTitle = document.querySelector('#movieTitle');
const hintLocation = document.querySelector('#hintLocation');

function renderHint(hintArray) {
    movieTitle.textContent = movieName.value;
    hintLocation.innerHTML = `
        <p>Main Actors: ${hintArray[0]}</p>
        <br>
        <p>Director(s): ${hintArray[3]}</p>
        <br>
        <p>Plot: ${hintArray[1]}</p>
        <br>
        <p>Release Date: ${hintArray[2]}</p>
    `;
}

const movieSearchBtn = document.querySelector('.movieSearchBtn');
const movieSearchForm = document.querySelector('#movieSearchForm');

movieSearchForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const hintArray = await omdbCall(movieName.value, omdbAPIkey);
    renderHint(hintArray);
});

// Fetch data from trivia API
async function triviaCall(amount, category) {
    const triviaLink = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=easy&type=multiple`;
    let questionArray = [];

    let response = await fetch(triviaLink);
    if (!response.ok) {
        alert('Network response was not ok :(');
        return;
    }
    let data = await response.json();
    for (let question of data.results) {
        const individQuestion = {
            question: question.question,
            correct: question.correct_answer,
            incorrect: question.incorrect_answers,
        }

        questionArray.push(individQuestion);
    }
    console.log(questionArray);
    return questionArray;

}

const questionPos = document.querySelector('.question')

const answerOne = document.querySelector('.answer-one')
const answerTwo = document.querySelector('.answer-two')
const answerThree = document.querySelector('.answer-three')
const answerFour = document.querySelector('.answer-four')

let score = 0;
let quizIndex = 0;

// Renders quiz question on page
function renderQuetions(questionArray) {
    /*
    questionPos.innerHTML = questionArray[quizIndex].question;

    questionOne.innerHTML = `<button class= "quizBtn correctAns">${questionArray[quizIndex].correct}</button>`;
    questionTwo.innerHTML = `<button class= "quizBtn incorrectAns">${questionArray[quizIndex].incorrect[0]}</button>`;
    questionThree.innerHTML = `<button class= "quizBtn incorrectAns">${questionArray[quizIndex].incorrect[1]}</button>`;
    questionFour.innerHTML = `<button class= "quizBtn incorrectAns">${questionArray[quizIndex].incorrect[2]}</button>`;
    */
    const correctAnswerPosition = Math.floor(Math.random() * 4);

    // Shuffle incorrect answers to randomize their positions
    const incorrectAnswers = questionArray[quizIndex].incorrect.slice();
    for (let i = incorrectAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [incorrectAnswers[i], incorrectAnswers[j]] = [incorrectAnswers[j], incorrectAnswers[i]];
    }

    // Place the correct answer in its random position with the correct class
    const buttons = [answerOne, answerTwo, answerThree, answerFour];
    for (let i = 0; i < buttons.length; i++) {
        if (i === correctAnswerPosition) {
            buttons[i].innerHTML = `<button class="quizBtn correctAns">${questionArray[quizIndex].correct}</button>`;
        } else {
            buttons[i].innerHTML = `<button class="quizBtn incorrectAns">${incorrectAnswers.pop()}</button>`;
        }
    }

    // Render question
    questionPos.innerHTML = questionArray[quizIndex].question;
}

const scoreDisplay = document.querySelector('.score-card');
function updateScore() {
    scoreDisplay.textContent = score;
}

document.addEventListener('DOMContentLoaded', async function() {
    score = 0;
    quizIndex = 0;

    const amount = '10'; //change to test
    const category = '11'; //do NOT change
    let questionArray = await triviaCall(amount, category);
    renderQuetions(questionArray);
    updateScore();  

    document.addEventListener('click', async function(event) {
        const target = event.target;
        if (target.classList.contains('correctAns')) {
            if (quizIndex === 9) {
                score++;
                updateScore();
                window.alert(`Quiz complete. Score: ${score}/10
Reload page to take another quiz.`);
                return;
            }
            score++;
            quizIndex++;
            updateScore();
            renderQuetions(questionArray);
            
        } else if (target.classList.contains('incorrectAns')) {
            if (quizIndex === 9) {
                window.alert(`Quiz complete. Score: ${score}/10
Reload page to take another quiz.`);
                return;
            }
            quizIndex++;
            renderQuetions(questionArray);
            
        }
    });

});
