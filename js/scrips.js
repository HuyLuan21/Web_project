// Menu toggle functionality
const menuBtn = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

console.log(menuBtn);

menuBtn.addEventListener('click', function() {
    navbarCollapse.classList.toggle('show');
    this.classList.toggle('collapsed');
});

// Dark mode functionality
const darkModeToggle = document.querySelector('.fa-moon');
const body = document.body;

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    enableDarkMode();
} else {
    disableDarkMode();
}

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
    if (darkModeToggle.classList.contains('fa-moon')) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});

// Function to enable Dark Mode
function enableDarkMode() {
    body.classList.add('dark-mode');
    darkModeToggle.classList.remove('fa-moon');
    darkModeToggle.classList.add('fa-sun');
    localStorage.setItem('darkMode', 'enabled');
}

// Function to disable Dark Mode
function disableDarkMode() {
    body.classList.remove('dark-mode');
    darkModeToggle.classList.remove('fa-sun');
    darkModeToggle.classList.add('fa-moon');
    localStorage.setItem('darkMode', 'disabled');
}

