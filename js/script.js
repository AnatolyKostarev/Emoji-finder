"use strict";

const $cards = document.querySelector(".js-cards-emoji");
const $findEmoji = document.querySelector(".js-header-search");
const url = "emoji.json";

async function getResponse() {
  const data = await fetch(url).then((data) => data.json());

  renderCard(data);

  $findEmoji.addEventListener("input", () => searchEmoji(data));
}

getResponse();

function renderCard(arr) {
  $cards.innerHTML = "";
  arr.forEach((item) => {
    let keyWords = item.keywords
      .split(" ")
      .filter((value, index, allItems) => index == allItems.indexOf(value))
      .join(" ");
    let divCard = document.createElement("div");
    divCard.classList.add("cards__item");
    divCard.innerHTML = `<p class="cards__symbol">${item.symbol}</p>
      <p class="cards__title">${item.title}</p>
      <p class="cards__keywords">${keyWords}</p>`;
    $cards.append(divCard);
  });
}

function searchEmoji(arr) {
  let $title = $findEmoji.value.toLowerCase().trim();
  let filtered = arr.filter((item) =>
    item.keywords.toLowerCase().includes($title)
  );
  renderCard(filtered);
}
