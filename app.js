// ===============================
// REVSCENE - CAR SHOW EVENTS
// ===============================

const data = [
  {
    date: "SAT • 26 SEP 2026",
    title: "Hyderabad Auto Expo",
    location: "HITEX Exhibition Centre",
    cars: ["BMW M4", "Porsche 911", "Toyota Supra"],
    count: "50+",
    category: "modern"
  },
  {
    date: "SUN • 27 SEP 2026",
    title: "Deccan Classic Motor Meet",
    location: "Gachibowli",
    cars: ["1967 Mustang", "VW Beetle", "Mini Cooper"],
    count: "30+",
    category: "classic"
  }
];

let activeFilter = "all";

// ===============================
// ELEMENTS
// ===============================

const eventsContainer = document.getElementById("events-container");

const dialog = document.getElementById("event-dialog");

const searchForm = document.getElementById("search-form");

const cityInput = document.getElementById("city-input");

// ===============================
// FILTER EVENTS
// ===============================

function getVisibleEvents() {
  if (activeFilter === "classic") {
    return data.filter(
      (event) => event.category === "classic"
    );
  }

  if (activeFilter === "modern") {
    return data.filter(
      (event) => event.category === "modern"
    );
  }

  return data;
}

// ===============================
// DISPLAY EVENTS
// ===============================

function renderEvents() {
  const events = getVisibleEvents();

  if (!eventsContainer) return;

  if (!events.length) {
    eventsContainer.innerHTML = `
      <div class="empty-state">
        No events match this filter yet.
      </div>
    `;

    return;
  }

  eventsContainer.innerHTML = events
    .map(
      (event, index) => `
        <article class="card">

          <p class="date">${event.date}</p>

          <h2>${event.title}</h2>

          <p class="location">
            📍 ${event.location}
          </p>

          <div class="cars">
            ${event.cars
              .map((car) => `<span>${car}</span>`)
              .join("")}

            <span>${event.count} expected</span>
          </div>

          <button
            type="button"
            class="view-event"
            data-event-index="${index}"
          >
            VIEW EVENT
          </button>

        </article>
      `
    )
    .join("");
}

// ===============================
// FILTER BUTTONS
// ===============================

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    renderEvents();
  });
});

// ===============================
// VIEW EVENT
// ===============================

if (eventsContainer) {
  eventsContainer.addEventListener("click", (event) => {
    const button = event.target.closest(".view-event");

    if (!button) return;

    const index = Number(button.dataset.eventIndex);

    const selectedEvent = getVisibleEvents()[index];

    if (!selectedEvent) return;

    if (dialog) {
      dialog.innerHTML = `
        <h2>${selectedEvent.title}</h2>

        <p>📅 ${selectedEvent.date}</p>

        <p>📍 ${selectedEvent.location}</p>

        <h3>Cars expected</h3>

        <p>${selectedEvent.cars.join(", ")}</p>

        <p>${selectedEvent.count} cars expected.</p>

        <button
          type="button"
          id="close-dialog"
        >
          CLOSE
        </button>
      `;

      dialog.showModal();
    }
  });
}

// ===============================
// CLOSE DIALOG
// ===============================

if (dialog) {
  dialog.addEventListener("click", (event) => {
    if (event.target.id === "close-dialog") {
      dialog.close();
    }
  });
}

// ===============================
// SEARCH EVENTS
// ===============================

if (searchForm) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const searchText = cityInput
      ? cityInput.value.toLowerCase().trim()
      : "";

    const filteredEvents = data.filter((event) => {
      return (
        event.title.toLowerCase().includes(searchText) ||
        event.location.toLowerCase().includes(searchText)
      );
    });

    if (!eventsContainer) return;

    eventsContainer.innerHTML = filteredEvents
      .map(
        (event) => `
          <article class="card">

            <p class="date">${event.date}</p>

            <h2>${event.title}</h2>

            <p class="location">
              📍 ${event.location}
            </p>

            <div class="cars">
              ${event.cars
                .map((car) => `<span>${car}</span>`)
                .join("")}

              <span>${event.count} expected</span>
            </div>

          </article>
        `
      )
      .join("");
  });
}

// ===============================
// INITIAL DISPLAY
// ===============================

renderEvents();