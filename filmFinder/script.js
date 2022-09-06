const header = document.querySelector("h1");
const filterBar = document.querySelector(".filterBar");
const filters = filterBar.querySelectorAll(".filter");
const filterInputs = filterBar.querySelectorAll(".check");
const posterContainer = document.querySelector(".posterContainer");
const posterList = posterContainer.querySelector("#posterList");
const inputContainer = document.querySelector(".inputContainer");
const inputField = inputContainer.querySelector("input");
const inputBtn = inputContainer.querySelector("#inputBtn");

let showMovies = function (array) {
  // create elements from (filtered) movies array and appends to posterList
  posterList.textContent = "";
  array.map((e) => {
    let li = document.createElement("li");
    let link = document.createElement("a");
    let poster = document.createElement("img");

    link.href = `https://www.imdb.com/title/${e.imdbID}`;
    poster.src = e.poster;
    link.target = "_blank";

    link.appendChild(poster);
    li.appendChild(link);
    posterList.appendChild(li);
  });
};

const uncheckRadio = function () {
  // make radio buttons unchecked.
  filterInputs.forEach((e) => {
    if (e.checked) {
      e.checked = false;
    }
  });
};

const userFilter = function () {
  let userInput = inputField.value.toLowerCase();

  if (userInput != "") {
    showMovies(movies.filter((e) => e.title.toLowerCase().includes(userInput)));
    checkList();
    uncheckRadio();
    inputField.value = "";
  }
};

const checkList = function () {
  // Checks to see if posterList is not empty.
  let check = posterList.children;
  if (check.length == 0) {
    posterList.innerHTML = "<p>Please try another title.</p>";
  }
};

const searchTitle = function (e, title) {
  showMovies(
    movies.filter((e) => e.title.toLowerCase().includes(title.toLowerCase()))
  );
};

for (let filter of filters) {
  filter.addEventListener("change", (e) => {
    switch (e.target.defaultValue) {
      case "latestMovies":
        showMovies(movies.filter((e) => e.year > 2013));
        break;
      case "avengerMovies":
        searchTitle(e, "Avenger");
        break;
      case "xmenMovies":
        searchTitle(e, "X-Men");
        break;
      case "princessMovies":
        searchTitle(e, "Princess");
        break;
      case "batmanMovies":
        searchTitle(e, "Batman");
        break;
    }
  });
}

header.addEventListener("click", () => {
  showMovies(movies);
  uncheckRadio();
});

inputBtn.addEventListener("click", userFilter);

window.addEventListener("keypress", (e) => {
  if (e.key == "Enter") userFilter();
});

window.addEventListener("load", () => {
  showMovies(movies);
});
