"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// the array with voting report
const reportJoke = [];
//the variable that conforms all the info of the vote
const currentJoke = { id: "", score: 0, date: "", source: "" };
//* call the function on load
window.onload = function () {
    randomCall();
};
//* function that manages the fillRate process
const voting = (vote) => {
    currentJoke.id; //updated in displayDadJoke
    currentJoke.score = vote;
    currentJoke.date = dateIso();
};
//* function that manages the next process
const displayNextJoke = () => {
    if (currentJoke.score !== 0) {
        addScore();
    }
    randomCall();
    resertCurrentJoke();
};
// function that call the joke api
const displayDadJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    let jokeElement = document.getElementById("joke");
    fetch("https://icanhazdadjoke.com/", {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
        // If jokeElement exists => add a joke
        if (jokeElement) {
            jokeElement.innerHTML = `" ${data.joke} "`;
            currentJoke.id = data.id; // we update the id on each call
            currentJoke.source = "dad";
            console.log("current en api", currentJoke);
        }
    })
        .catch((error) => {
        console.error("Error fetching joke:", error);
        if (jokeElement) {
            jokeElement.innerHTML = "no jokes available";
        }
    });
});
// add Rate in array
const addScore = () => {
    //push in array
    reportJoke.push(Object.assign({}, currentJoke));
};
// convert the data in a ISO
const dateIso = () => {
    let date = new Date();
    return date.toISOString();
};
// resert currentJoke values
const resertCurrentJoke = () => {
    currentJoke.id; //updated in displayDadJoke
    currentJoke.score = 0;
    currentJoke.date = "";
};
/*CHUCK NORRIS JOKES */
const displayChuckJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    let jokeElement = document.getElementById("joke");
    fetch("https://api.chucknorris.io/jokes/random", {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => {
        // If jokeElement exists => add a joke
        if (jokeElement) {
            jokeElement.innerHTML = `" ${data.value} "`;
            currentJoke.id = data.id; // we update the id on each call
            currentJoke.source = "chuck";
            console.log("current en api", currentJoke);
        }
    })
        .catch((error) => {
        console.error("Error fetching joke:", error);
        if (jokeElement) {
            jokeElement.innerHTML = "no jokes available";
        }
    });
});
// call an joke api depends of a random number
const randomCall = () => {
    let num = Math.floor(Math.random() * 2) + 1;
    if (num % 2 == 0) {
        displayDadJoke();
    }
    else {
        displayChuckJoke();
    }
};
