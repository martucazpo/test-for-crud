document.addEventListener("DOMContentLoaded", function () {
    const catTitle = document.getElementById('catTitle');
    const catAge = document.getElementById('catAge');
    let name = catTitle.getAttribute('data-name');
    let age = catAge.getAttribute('data-age');
    console.log(name, age);
});