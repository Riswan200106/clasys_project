document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".signup-form");

    //event listeners for real-time validation and submission
    form.addEventListener("input", (e) => validateField(e.target));
    form.addEventListener("submit", (e) => handleFormSubmission(e));


    // Validate a single field
    function validateField(field) {
        const errorElement = field.nextElementSibling;
        let isValid = true;

        // Validation rules based on field ID
        if (field.id === "first-name" || field.id === "last-name") {
            isValid = /^[A-Za-z]+$/.test(field.value.trim());
            errorElement.textContent = isValid ? "" : "Only alphabets are allowed.";
        } else if (field.id === "dob") {
            const age = calculateAge(new Date(field.value));
            isValid = field.value && age >= 18;
            errorElement.textContent = isValid ? "" : "You must be at least 18 years old.";
            if (isValid) document.getElementById("age").value = age;
        } else if (field.id === "phone") {
            isValid = /^[6-9]\d{9}$/.test(field.value.trim());
            errorElement.textContent = isValid ? "" : "Phone number must be 10 digits and start from 6-9 .";
        } else if (field.id === "email") {
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
            errorElement.textContent = isValid ? "" : "Enter a valid email address.";
        } else if (field.id === "address") {
            isValid = field.value.trim() !== "";
            errorElement.textContent = isValid ? "" : "Address cannot be empty.";
        } else if (field.id === "username") {
            isValid = field.value.trim().length >= 5;
            errorElement.textContent = isValid ? "" : "Username must be at least 5 characters long.";
        } else if (field.id === "password") {
            isValid = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(field.value.trim());
            errorElement.textContent = isValid
                ? ""
                : "Password must have 8 characters, one uppercase, one number, and one special character.";
        } else if (field.id === "confirm-password") {
            isValid = field.value.trim() === document.getElementById("password").value.trim();
            errorElement.textContent = isValid ? "" : "Passwords do not match.";
        }

        return isValid;
    }

    // Handle form submission
    function handleFormSubmission(e) {
        e.preventDefault(); // Prevent page reload
        let isValid = true;

        // Validate all fields
        document.querySelectorAll(".form-input, .form-radio, .form-textarea, .form-select").forEach((field) => {
            if (!validateField(field)) isValid = false;
        });

        // If valid, save user data and redirect
        if (isValid) {
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            alert("Sign-up successful!");
            window.location.href = "login.html";
        }
    }

    
    // Dynamically update city options when state changes
    const stateSelect = document.getElementById("state");
    stateSelect.addEventListener("change", updateCities);

    
    // Update city dropdown based on selected state
    function updateCities() {
        const state = stateSelect.value;
        const citySelect = document.getElementById("city");
        citySelect.innerHTML = '<option value="" disabled selected>Select a city</option>';

        const stateCities = {
            kerala: ["Kochi", "Calicut", "Trivandrum"],
            karnataka: ["Bangalore", "Mysore", "Hubli"],
            tamilnadu: ["Chennai", "Coimbatore", "Madurai"],
        };

        if (stateCities[state]) {
            stateCities[state].forEach((city) => {
                const option = document.createElement("option");
                option.value = city.toLowerCase();
                option.textContent = city;
                citySelect.appendChild(option);
            });
        }
    }

    // Calculate age from date of birth
    function calculateAge(dob) {
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        return monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate()) ? age - 1 : age;
    }
});
