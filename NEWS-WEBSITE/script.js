let apiKey = "df3e3a0ab13a4092ace6d220e04dcaec";

window.addEventListener("load", () => fetchnews("india"));

async function fetchnews(query) {
  const result = await fetch(
    `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`
  );

  let data = await result.json();
  console.log(data);

  binddata(data.articles);
}

function binddata(articles) {
  const cardcontainer = document.getElementById("card-container");
  const newstemplate = document.getElementById("card-template");

  cardcontainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardclone = newstemplate.content.cloneNode(true);
    filldata(cardclone, article);
    cardcontainer.appendChild(cardclone);
  });
}

function filldata(cardclone, article) {
  const newsimg = cardclone.querySelector("#newsimage");
  const newstitle = cardclone.querySelector("#news-tite");
  const newssource = cardclone.querySelector("#news-source");
  const description = cardclone.querySelector("#description");

  newsimg.src = article.urlToImage;
  newstitle.innerHTML = article.title;

  description.innerHTML = article.description;

  const published_date = new Date(article.publishedAt).toLocaleString("en-US", {
    timezone: "Asia/jakarta",
  });
  newssource.innerHTML = `${article.source.name}.${published_date}`;
  cardclone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
    console.log(article.url);
  });
}

function handlesports() {
  fetchnews("sports");
}

function handlefinance() {
  fetchnews("finance");
}

function handlepolitics() {
  fetchnews("politics");
}

function handleolympics() {
  fetchnews("olympics");
}

// const sportsbtn = document.getElementById('sports');
// const financebtn = document.getElementById('finance');
//   const politicsbtn = document.getElementById('politics');
//   const olympics = document.getElementById('olympics');

function handlesearchbtn() {
  const input = document.getElementById("search").value;
  if (!input) {
    return;
  }

  fetchnews(input);
}
