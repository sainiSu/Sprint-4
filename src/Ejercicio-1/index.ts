//joke will appear on screen when reload the page
window.onload = function () {
  displayRandomJoke();
};

const displayRandomJoke = async (): Promise<void> => {

  let jokeElement: HTMLElement | null = document.getElementById("joke");
  
  fetch("https://icanhazdadjoke.com/", {
    method: "GET",
    headers: {Accept: "application/json", }})

    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.joke);
      // If jokeElement exists, add a joke
      if (jokeElement) {
        jokeElement.innerHTML = data.joke;
      }
    })
    .catch((error) => {
      console.error("Error fetching joke:", error);
      if (jokeElement) {
        jokeElement.innerHTML = "No jokes available";
      }
    });
};