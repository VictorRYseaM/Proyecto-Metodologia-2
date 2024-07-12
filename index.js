const inputs = document.querySelectorAll("form input");
const resultCard = document.querySelector('.result-card');
const card = document.querySelector(".card");
const form = document.querySelector('.form');
const submitBtn = document.querySelector('.submit-button');
const infoText = document.querySelector('.info-text');
console.log(infoText);

submitBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Previene el envío del formulario

    const weight = parseFloat(document.querySelector("#weight").value); // Seleccionar peso por id
    const height = parseFloat(document.querySelector("#height").value); // Seleccionar altura por id
    const resultText = document.querySelector("#imc-value");
    const imc = weight / ((height / 100) * (height / 100)); // Convertir cm a metros

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        alert("Por favor, ingrese valores válidos para peso y altura.");
        return;
    }

    form.classList.remove('show');
    form.classList.add('hidden');
    resultCard.classList.remove('hidden');
    resultCard.classList.add('show');

    const imcRanges = [
        { max: 17, message: 'Estás muy por debajo del peso.' },
        { max: 18.5, message: 'Estás por debajo del peso.' },
        { max: 25, message: 'Estás en el peso ideal.' },
        { max: 30, message: 'Estás en sobrepeso.' },
        { max: 35, message: 'Estás en obesidad.' },
        { max: 40, message: 'Estás en obesidad severa.' },
        { max: Infinity, message: 'Estás en obesidad mórbida.' },
    ];

    let message = '';

    for (const range of imcRanges) {
        if (imc <= range.max) {
            message = `${imc.toFixed(1)} - ${range.message}`;
            break;
        }
    }

    resultText.innerHTML = message;
});

const changeThemeBtn = document.querySelector('#switch');

changeThemeBtn.addEventListener("click", () => {
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const body = document.querySelector("body");

    body.classList.toggle('dark-mode');
    header.classList.toggle('dark-mode');
    footer.classList.toggle('dark-section');
    card.classList.toggle('dark-section');
});

const returnBtn = document.querySelector('.return-btn');

returnBtn.addEventListener('click', () => {
    form.classList.add('show');
    form.classList.remove('hidden');
    resultCard.classList.add('hidden');
    resultCard.classList.remove('show');
});

const modal = document.getElementById('modal');

function showModal() {
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}

function showWelcomeModal() {
    const modalShown = sessionStorage.getItem('modalShown');

    if (!modalShown) {
        showModal();
        sessionStorage.setItem('modalShown', 'true');
    }
}

window.onload = function () {
    showWelcomeModal();
};
