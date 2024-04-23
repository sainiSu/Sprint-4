const jokeURL: string = "https://icanhazdadjoke.com/";
const jokeElement: HTMLElement | null = document.getElementById("joke");
const btn: HTMLElement | null = document.getElementById("btn");
let reportJokes: { joke: string; score: number; date: string }[] = []; // contain all the report about joke.
let userInteractions: string[] = []; // Array to store user interactions

function getNextJoke(): void {
    fetch(jokeURL, { headers: { 'Accept': 'application/json' } }) // Header to obtain the data in the format we are interested in,
        .then((response: Response) => {
            return response.json();
        })
        .then((data: { joke: string }) => {
            if (jokeElement) jokeElement.innerText = data.joke;
            console.log(data);
        });
}

if (btn) {
    btn.addEventListener("click",getNextJoke);
}

let jokes: string[];

// function to get vote for a joke with the lowest(1) to highest score(3)
function vote(score: number): void {
    if (currentJokeIndex >= 0 && currentJokeIndex < jokes.length) {
        userInteractions.push(new Date().toISOString());
        // upgradation of joke score:
        if (reportJokes[currentJokeIndex]) {
            reportJokes[currentJokeIndex].score = score;
            reportJokes[currentJokeIndex].date = new Date().toISOString();
        } else {
            reportJokes[currentJokeIndex] = {
                joke: jokes[currentJokeIndex],
                score: score,
                date: new Date().toISOString()
            };
        }
    }
    console.log(reportJokes);
    console.log(userInteractions);
}

// creating a new function for the next joke:
function nextJoke(): void {
    if (currentJokeIndex < jokes.length - 1) {
        currentJokeIndex++;
        getNextJoke();
    }
}

jokes = [
    "Joke 1",
    "Joke 2",
    "Joke 3"
];

// Initialize currentJokeIndex.
let currentJokeIndex: number = 0;

// Display first joke
getNextJoke();
