document.addEventListener("DOMContentLoaded", () => {
    const palivoFilter = document.getElementById("palivo-filter");
    const cenaSort = document.getElementById("cena-sort");
    const carGrid = document.getElementById("car-grid");

    // Pokud nejsme na stránce s auty, ukonči skript
    if (!carGrid || !palivoFilter || !cenaSort) return;

    const updateGrid = () => {
        // Získání aktuálních elementů jako pole
        const cards = Array.from(carGrid.getElementsByClassName("car-card"));
        const emptyState = carGrid.querySelector(".empty-state");
        const selectedPalivo = palivoFilter.value;
        const selectedSort = cenaSort.value;
        
        let visibleCount = 0;

        // 1. Krok: Filtrování
        cards.forEach(card => {
            if (selectedPalivo === "vse" || card.dataset.palivo === selectedPalivo) {
                card.style.display = "block";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        // Obsluha chybějících výsledků (pokud neexistuje DOM pro empty-state, vytvoříme ho)
        if (visibleCount === 0) {
            if (!emptyState) {
                const emptyDiv = document.createElement("div");
                emptyDiv.className = "empty-state";
                emptyDiv.innerHTML = "<h3>Zvoleným filtrům neodpovídá žádný vůz.</h3>";
                carGrid.appendChild(emptyDiv);
            } else {
                emptyState.style.display = "block";
            }
        } else if (emptyState) {
            emptyState.style.display = "none";
        }

        // 2. Krok: Řazení zobrazených položek
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

        // 3. Krok: Přeskládání DOMu
        // AppendChild automaticky přesune existující element na konec rodiče
        visibleCards.forEach(card => carGrid.appendChild(card));
    };

    // Event listenery pro změnu selectboxů
    palivoFilter.addEventListener("change", updateGrid);
    cenaSort.addEventListener("change", updateGrid);
});