const button = document.getElementById('myButton');

// Add event listeners for mouseover and mouseout
button.addEventListener('mouseover', () => {
    button.classList.add('hovered');
});

button.addEventListener('mouseout', () => {
    button.classList.remove('hovered');
});