document.addEventListener("DOMContentLoaded", async () => {
    const palivoFilter = document.getElementById("palivo-filter");
    const cenaSort = document.getElementById("cena-sort");
    const carGrid = document.getElementById("car-grid");
    const carCount = document.getElementById("car-count");

    // Pokud nejsme na stránce s auty, ukonči skript
    if (!carGrid || !palivoFilter || !cenaSort) return;

    // Nacteni aut z JSONu vygenerovaneho build scriptem
    try {
        const response = await fetch("data/cars.json");
        if (!response.ok) throw new Error("HTTP " + response.status);
        const cars = await response.json();
        renderCars(cars, carGrid, carCount);
    } catch (err) {
        carGrid.innerHTML = '<div class="empty-state"><h3>Nepodarilo se nacist seznam vozu.</h3></div>';
        if (carCount) carCount.textContent = "0 vozů skladem";
        return;
    }

    const updateGrid = () => {
        // Ziskani aktualnich elementu jako pole
        const cards = Array.from(carGrid.getElementsByClassName("car-card"));
        const emptyState = carGrid.querySelector(".empty-state");
        const selectedPalivo = palivoFilter.value;
        const selectedSort = cenaSort.value;

        let visibleCount = 0;

        // 1. Krok: Filtrovani
        cards.forEach(card => {
            if (selectedPalivo === "vse" || card.dataset.palivo === selectedPalivo) {
                card.style.display = "block";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        // Aktualizace poctu vozu
        if (carCount) {
            carCount.textContent = `${visibleCount} vozů skladem`;
        }

        // Obsluha chybejicich vysledku
        if (visibleCount === 0) {
            if (!emptyState) {
                const emptyDiv = document.createElement("div");
                emptyDiv.className = "empty-state";
                emptyDiv.innerHTML = "<h3>Zvolenym filtrum neodpovida zadny vuz.</h3>";
                carGrid.appendChild(emptyDiv);
            } else {
                emptyState.style.display = "block";
            }
        } else if (emptyState) {
            emptyState.style.display = "none";
        }

        // 2. Krok: Razeni zobrazenych polozek
        const visibleCards = cards.filter(card => card.style.display !== "none");

        if (selectedSort !== "výchozí") {
            visibleCards.sort((a, b) => {
                const cenaA = parseInt(a.dataset.cena, 10);
                const cenaB = parseInt(b.dataset.cena, 10);

                if (selectedSort === "vzestupne") return cenaA - cenaB;
                if (selectedSort === "sestupne") return cenaB - cenaA;
                return 0;
            });
        }

        // 3. Krok: Preskladani DOMu
        visibleCards.forEach(card => carGrid.appendChild(card));
    };

    // Event listenery pro zmenu selectboxu
    palivoFilter.addEventListener("change", updateGrid);
    cenaSort.addEventListener("change", updateGrid);
});

function renderCars(cars, grid, countEl) {
    if (cars.length === 0) {
        grid.innerHTML = '<div class="empty-state"><h3>Zadne vozy nejsou k dispozici.</h3></div>';
        if (countEl) countEl.textContent = "0 vozů skladem";
        return;
    }

    for (const car of cars) {
        const card = document.createElement("div");
        card.className = "car-card";
        card.dataset.palivo = car.palivo;
        card.dataset.cena = car.cena;

        const priceFormatted = String(car.cena).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " Kč";

        let imageHtml;
        if (car.foto) {
            imageHtml = `<img src="${car.foto}" alt="${car.title}">`;
        } else {
            imageHtml = '<div class="img-placeholder">Bez fotografie</div>';
        }

        card.innerHTML = `
            <div class="car-image">
                ${imageHtml}
            </div>
            <div class="car-content">
                <h3>${car.title}</h3>
                <div class="car-specs">
                    <span>📅 ${car.rok}</span>
                    <span>⛽ ${car.palivo}</span>
                    <span>🛣️ ${car.najezd} km</span>
                </div>
                <div class="car-price">${priceFormatted}</div>
            </div>
        `;

        grid.appendChild(card);
    }

    if (countEl) {
        countEl.textContent = `${cars.length} vozů skladem`;
    }
}
