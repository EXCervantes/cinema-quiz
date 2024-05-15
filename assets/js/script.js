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

const questionOne = document.querySelector('.answer-one')
const questionTwo = document.querySelector('.answer-two')
const questionThree = document.querySelector('.answer-three')
const questionFour = document.querySelector('.answer-four')

let score = 0;
let quizIndex = 0;

// Renders quiz question on page
function renderQuetions(questionArray) {
    questionPos.innerHTML = questionArray[quizIndex].question;

    questionOne.innerHTML = `<button class=quizBtn correctAns>${questionArray[quizIndex].correct}<button>`;
    questionTwo.innerHTML = `<button class=quizBtn incorrectAns>${questionArray[quizIndex].incorrect[0]}<button>`;
    questionThree.innerHTML = `<button class=quizBtn incorrectAns>${questionArray[quizIndex].incorrect[1]}<button>`;
    questionFour.innerHTML = `<button class=quizBtn incorrectAns>${questionArray[quizIndex].incorrect[2]}<button>`;

}

const scoreDisplay = document.querySelector('.score-card');
function updateScore() {
    scoreDisplay.textContent = score;
}

document.addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('correctAns')) {
        console.log('before');
        score++;
        quizIndex++;
        updateScore();
        console.log('after');
    } else if (target.classList.contains('incorrectAns')) {
        quizIndex++;
    }
});


document.addEventListener('DOMContentLoaded', async function() {
    score = 0;
    quizIndex = 0;

    const amount = '10'; //change to test
    const category = '11'; //do NOT change
    let questionArray = await triviaCall(amount, category);
    renderQuetions(questionArray);
    updateScore();  

});
