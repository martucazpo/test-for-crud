console.log("I'm in app.js");
document.addEventListener('DOMContentLoaded', () => {
    const nameDiv = document.getElementById("name");
    const ageDiv = document.getElementById("age");
    const idDiv = document.getElementById("id");
    const fciDiv = document.getElementById("fci");
    const  name = nameDiv.getAttribute('data-value');
    const age = ageDiv.getAttribute('data-value');
    const id = idDiv.getAttribute('data-value');
    const fci = fciDiv.getAttribute('data-value');
    console.log(name, age, id, fci);
});