// API base URL:
const API_BASE_URL = "https://api.noroff.dev/api/v1/auction/listings";

// Getting Data from API:
async function fetchAuctions() {
  try {
    const response = await fetch(`${API_BASE_URL}?_bids=true`);
    const data = await response.json();
    console.log(data); // checks the data in the console.
    displayAuctions(data);
  } catch (error) {
    console.error("Error getting auctions:", error);
  }
}

// Function that let actions shows as cards:
function displayAuctions(auctions) {
  const row = document.querySelector(".row"); // Finds where the cards will shows.
  row.innerHTML = ""; // Trows exsisting content.

  auctions.forEach((auction) => {
    const col = document.createElement("div");
    col.className = "col-md-4";

    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.className = "card-img-top";
    img.src = auction.media
      ? auction.media[0] || "/img/placeholder.jpg"
      : "/img/placeholder.jpg";
    img.alt = auction.title || "Auction";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const title = document.createElement("h5");
    title.className = "card-title";
    const titleText = auction.title || "Uten tittel";
    const maxLength = 15;
    title.textContent =
      titleText.length > maxLength
        ? titleText.substring(0, maxLength) + "..."
        : titleText;

    const description = document.createElement("p");
    description.className = "card-text";
    let descriptionText = auction.description || "Ingen beskrivelse";
    const maxDescriptionLength = 50;
    description.textContent =
      descriptionText.length > maxDescriptionLength
        ? descriptionText.substring(0, maxDescriptionLength) + "..."
        : descriptionText;

    const bid = document.createElement("p");
    bid.className = "card-text";
    bid.textContent = `Current bid: ${
      auction.bids ? auction.bids[0]?.amount || "0 kr" : "0 kr"
    }`;

    const button = document.createElement("a");
    button.className = "btn btn-primary";
    button.href = "#";
    button.textContent = "Bid now";

    cardBody.appendChild(title);
    cardBody.appendChild(description);
    cardBody.appendChild(bid);
    cardBody.appendChild(button);
    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);
    row.appendChild(col);
  });
}

// Runs the function when loading the page:
document.addEventListener("DOMContentLoaded", fetchAuctions);
