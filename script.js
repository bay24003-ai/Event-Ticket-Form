const form = document.querySelector("#ticketForm");
const typeSelect = document.querySelector("#type");
const extraInfo = document.querySelector("#extraInfo");
const extraLabel = document.querySelector("#extraLabel");
const extraInput = document.querySelector("#extraInput");
const errors = document.querySelector("#errors");
const ticketInfo = document.querySelector("#ticketInfo");

typeSelect.addEventListener("change", function () {

    extraInfo.classList.remove("hidden");

    if (typeSelect.value === "student") {
        extraLabel.textContent = "Student I#";
        extraInput.value = "";
    }

    if (typeSelect.value === "guest") {
        extraLabel.textContent = "Access Code";
        extraInput.value = "";
    }

    if (typeSelect.value === "") {
        extraInfo.classList.add("hidden");
    }
});

form.addEventListener("submit", function (event) {

    event.preventDefault();

    errors.innerHTML = "";
    ticketInfo.innerHTML = "";

    let errorList = [];

    const name = document.querySelector("#fullName").value;
    const dateValue = document.querySelector("#eventDate").value;

    const selectedDate = new Date(dateValue);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (selectedDate <= today) {
        errorList.push("Please choose a future date.");
    }

    if (typeSelect.value === "student") {

        const studentId = extraInput.value;

        if (!/^\d{9}$/.test(studentId)) {
            errorList.push("Student I# must be exactly 9 digits.");
        }
    }

    if (typeSelect.value === "guest") {

        if (extraInput.value !== "EVENT131") {
            errorList.push("Access Code must be EVENT131.");
        }
    }

    if (errorList.length > 0) {
        errors.innerHTML = errorList.join("<br>");
        return;
    }

    ticketInfo.innerHTML =
        `<h2>Ticket Confirmed!</h2>
         <p>Name: ${name}</p>
         <p>Date: ${dateValue}</p>
         <p>Type: ${typeSelect.value}</p>`;

    form.reset();
    extraInfo.classList.add("hidden");
});