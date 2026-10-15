const page = document.querySelector("main[data-page]");
const statusMessage = document.querySelector("#load-status");
const errorMessage = document.querySelector("#api-error");
const retryButton = document.querySelector("#retry-button");

async function loadData() {
    statusMessage.hidden = false;
    statusMessage.textContent = "Conectando con la API...";
    errorMessage.hidden = true;

    const endpoint = page.dataset.page === "personal"
        ? "/api/datospersonales"
        : "/api/mascotas";

    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`La API respondió con estado ${response.status}`);
        }

        const data = await response.json();
        if (page.dataset.page === "personal") {
            showPersonalData(data);
        } else {
            showPets(data);
        }

        statusMessage.hidden = true;
    } catch {
        statusMessage.hidden = true;
        errorMessage.hidden = false;
    }
}

function showPersonalData(data) {
    for (const [field, value] of Object.entries(data)) {
        const output = document.querySelector(`[data-field="${field}"]`);
        if (output) {
            output.textContent = value;
        }
    }
}

function showPets(pets) {
    const tableBody = document.querySelector("#pets-table");
    tableBody.replaceChildren();

    for (const pet of pets) {
        const row = document.createElement("tr");
        for (const value of [pet.id, pet.nombre, pet.edad, pet.raza]) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.append(cell);
        }
        tableBody.append(row);
    }
}

if (page.dataset.page === "sumadora") {
    const sumForm = document.querySelector("#sum-form");
    const sumResult = document.querySelector("#sum-result");
    const sumError = document.querySelector("#sum-error");

    sumForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        sumResult.hidden = true;
        sumError.hidden = true;

        const numero1 = sumForm.elements.numero1.valueAsNumber;
        const numero2 = sumForm.elements.numero2.valueAsNumber;
        if (!Number.isFinite(numero1) || !Number.isFinite(numero2)) {
            sumError.textContent = "Ingresa dos números válidos.";
            sumError.hidden = false;
            return;
        }

        try {
            const response = await fetch("/api/sumadora", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ numero1, numero2 })
            });

            if (!response.ok) {
                throw new Error("La API no pudo realizar la suma.");
            }

            const data = await response.json();
            sumResult.textContent = `Resultado: ${data.resultado}`;
            sumResult.hidden = false;
        } catch {
            sumError.textContent = "No se pudo conectar con la API. Inténtalo de nuevo.";
            sumError.hidden = false;
        }
    });
} else {
    retryButton.addEventListener("click", loadData);
    loadData();
}