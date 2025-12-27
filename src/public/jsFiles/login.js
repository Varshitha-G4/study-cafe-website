// Focus and Blur functionality for inputs in both forms
const inputs = document.querySelectorAll(".input");

function addFocus() {
    this.parentNode.parentNode.classList.add("focus"); // input-box
}

function removeFocus() {
    if (this.value === "") {
        this.parentNode.parentNode.classList.remove("focus");
    }
}

inputs.forEach((input) => {
    input.addEventListener("focus", addFocus);
    input.addEventListener("blur", removeFocus);
});


// ScrollReveal animation
const sr = ScrollReveal({
    distance: "20px",
    duration: 2000,
    reset: true,
});

// Apply ScrollReveal animations to both forms
sr.reveal(`#login-form`, { interval: 200, origin: "right" });
sr.reveal(`#registration-form`, { interval: 200, origin: "right" });
