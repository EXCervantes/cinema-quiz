const omdbAPIkey = 'bd7078af';

/*
const triviaToken = getTriviaToken();
function getTriviaToken() {
    const getToken = 'https://opentdb.com/api_token.php?command=request';

    fetch(getToken)
    .then(function(response) {
        if (!response.ok) {
            alert('Network response was not ok :(');
        }
        return response.json();
    })
    .then(function(data) {
        //console.log(data);
        const token = data.token;

        //console.log(token);
        return token;
    });
}
*/

async function omdbCall(title, key) { //will add to params as we figure out what we need
    titleList = title.split(' ');
    title = titleList.join('+');
    console.log(title);
    const omdbLink = `http://www.omdbapi.com/?apikey=${key}&t=${title}&plot=full`;

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
    hintArray.push(actors,plot,release);
    return hintArray;
    
    /* fetch(omdbLink)
    .then(function(response) {
        if (!response.ok) {
            alert('Network response was not ok :(');
        }
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        let actors = data.Actors;
        let plot = data.Plot;
        let release = data.Released;
        //create more as needed
        //console.log(actors, plot, release);

        hintArray.push(actors,plot,release);
        return hintArray;
    });
    */
}

const movieName = document.querySelector('#movieSearch');
const movieTitle = document.querySelector('#movieTitle');
const hintLocation = document.querySelector('#hintLocation');

function renderHint(hintArray) {
    movieTitle.textContent = movieName.value;
    hintLocation.innerHTML = `
        <p>Main Actors: ${hintArray[0]}</p>
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
    //const movieName = document.querySelector('#movieSearch');
    console.log(movieName.value);
    const hintArray = await omdbCall(movieName.value, omdbAPIkey);
    renderHint(hintArray);
});

// Fetch data from trivia API
function triviaCall(amount, category) { //will add to params as we figure out what we need
    const triviaLink = `https://opentdb.com/api.php?amount=${amount}&category=${category}`;
    let questionArray = [];

    fetch(triviaLink)
    .then(function(response) {
        if (!response.ok) {
            alert('Network response was not ok :(');
        }
        return response.json();
    })
    .then(function(data) {
        //console.log(data.results);
        for (let question of data.results) {
            //console.log(question.question);
            //console.log(question.correct_answer);
            //console.log(question.incorrect_answers);
            //console.log(question);

            const individQuestion = {
                question: question.question,
                correct: question.correct_answer,
                incorrect: question.incorrect_answers,
            }

            questionArray.push(individQuestion);
        }
        //console.log(questionArray);
        return questionArray;
    });
}

// Renders quiz question on page
function renderQuetions(questionList) {

}


/*
document.addEventListener('DOMContentLoaded', function() {
    //console.log(getTriviaToken());
    //getTriviaToken();

    let movieTitleTest = 'iron man'; //change to test
    omdbCall(movieName, omdbAPIkey);

    const amount = '10'; //change to test
    const category = '11'; //do NOT change
    triviaCall(amount, category);

});
*/