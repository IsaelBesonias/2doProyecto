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

retryButton.addEventListener("click", loadData);
loadData();