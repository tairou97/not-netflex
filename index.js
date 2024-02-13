const apiKey = "4493f45b";
const searchInput = document.getElementById("search");
const mainDiv = document.querySelector(".main");
const form = document.querySelector("form");
const loginForm = document.getElementById("loginForm");

mainDiv.classList.add("main");

async function fetchData(input) {
  try {
    const url = `https://www.omdbapi.com/?s=${input}&apikey=${apiKey}`;
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);

    if (result.Error) {
      console.error(result.Error);
      return;
    }

    displayMovies(result.Search);
  } catch (error) {
    console.error(error);
  }
}

function displayMovies(movies) {
  mainDiv.innerHTML = "";
  movies.forEach((movie) => mainDiv.appendChild(createMovieDiv(movie)));
}

function createMovieDiv(movie) {
  const movieDiv = document.createElement("div");
  movieDiv.classList.add("movie");
  movieDiv.innerHTML = `
    <img style="width: 100% ;" src="${movie.Poster}" alt="Movie Poster">
    <h5 class="movie-info" style="text-align: center; color:#ecececc5; padding:5px; font-size:15px">${movie.Title}</h5>
    <h5 class="movie-info" style="text-align: center; color:#ecececc5; font-size:15px"> ${movie.Type} ${movie.Year} </h5>
  `;
  return movieDiv;
}

searchInput.addEventListener("input", (e) => {
  e.preventDefault();
  fetchData(searchInput.value.trim());
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  fetchData(searchInput.value.trim());
  form.reset();
});

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const mainDiv = document.querySelector(".main");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (authenticateUser(username, password)) {
      mainDiv.innerHTML = ` "" ${username} "willkommen"`;
      fetchData(".all");
    }

    loginForm.reset();
  });

  function authenticateUser(username, password) {
    // Implement your authentication logic here
    // Example: Check against a database or any other secure method
    return true; // For this example, every user is accepted
  }
});
const genreLinks = document.querySelectorAll(".dropdown-item");
genreLinks.forEach((genreLink) => {
  genreLink.addEventListener("click", (event) => {
    event.preventDefault();
    fetchDataByGenre(event.target.textContent);
  });
});

async function fetchDataByGenre(genre) {
  try {
    const url = `https://www.omdbapi.com/?s=${genre}&apikey=${apiKey}&type=movie`;
    const response = await fetch(url);
    const result = await response.json();

    if (result.Error) {
      console.error(result.Error);
      return;
    }

    displayMovies(result.Search);
  } catch (error) {
    console.error(error);
  }
}

const navigationLinks = document.querySelectorAll(".nav-link");
navigationLinks.forEach((navLink) => {
  navLink.addEventListener("click", (event) => {
    event.preventDefault();
    fetchData(navLink.textContent);
  });
});
