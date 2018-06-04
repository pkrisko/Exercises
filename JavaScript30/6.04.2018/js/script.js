const inputs = document.querySelectorAll('.controls input');

/**
 * Handles the update of the CSS variables which exist in the :root element
 * in the file ../css/style.css. Note the use of backticks.
 */
function handleUpdate() {
    const suffix = this.dataset.sizing || ''; // If undefined, no suffix added ''
    // Only updates the variable which matches the related input's 'name' field.
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

/**
 * Listens on each of the input elements that exist inside of the .controls
 * class, and then calls handleUpdate on each of them. This ensures that a change
 * happens, regardless of input type (slider vs. color).
 */
inputs.forEach((input) => {
    input.addEventListener('change', handleUpdate);
})

/**
 * Similar to above, but gives a more dynamic feel and responsive DOM update for
 * the two slider inputs.
 */
inputs.forEach((input) => {
    input.addEventListener('mousemove', handleUpdate);
})