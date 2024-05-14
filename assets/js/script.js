const omdbAPIkey = 'bd7078af';
const triviaToken = 'e3bb47480ed68b6435669ec523a4c57f31be30a663ee24fa6948a4ea360192f5';

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

function omdbCall(title, key) { //will add to params as we figure out what we need
    titleList = title.split(' ');
    title = titleList.join('+');
    //console.log(title);
    const omdbLink = `http://www.omdbapi.com/?apikey=${key}&t=${title}&plot=full`;

    fetch(omdbLink)
    .then(function(response) {
        if (!response.ok) {
            alert('Network response was not ok :(');
        }
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    });
}

function triviaCall(amount, category, token) { //will add to params as we figure out what we need
    const triviaLink = `https://opentdb.com/api.php?amount=${amount}&token=${token}&category=${category}`;

    fetch(triviaLink)
    .then(function(response) {
        if (!response.ok) {
            alert('Network response was not ok :(');
        }
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    });
}


document.addEventListener('DOMContentLoaded', function() {
    //console.log(getTriviaToken());
    getTriviaToken();

    let movieTitle = 'iron man'; //change to test
    omdbCall(movieTitle, omdbAPIkey);

    let amount = '10'; //change to test
    const category = '11'; //do NOT change
    triviaCall(amount, category, getTriviaToken());

});