document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".signin-form");
    const usernameInput = document.getElementById("signin-username");
    const passwordInput = document.getElementById("signin-password");
    const errorMessage = document.querySelector(".error-message");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent form submission

        // use the stored username and password from localStorage
        const storedUsername = localStorage.getItem("username");
        const storedPassword = localStorage.getItem("password");

        // Get the input values
        const enteredUsername = usernameInput.value.trim();
        const enteredPassword = passwordInput.value.trim();

        // Check if the entered data match the stored data
        if (enteredUsername === storedUsername && enteredPassword === storedPassword) {
            window.location.href = "home.html";
        } else {
            // If data don't match, show error message
            errorMessage.style.display = "block";
        }
    });
});
