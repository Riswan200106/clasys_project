document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");

    // Function to validate each field in the form
    function validateField(field) {
        const id = field.id;
        const value = field.value.trim(); 
        const errorElement = document.getElementById(`${id}-error`);

        let isValid = true; 

    
        if (id === "name") {
            if (value.length < 3) {
                errorElement.textContent = "Name must be at least 3 characters long.";
                errorElement.style.display = "block"; 
                isValid = false; 
            } else {
                errorElement.style.display = "none"; 
            }
        }


        if (id === "email") {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
            if (!emailPattern.test(value)) {
                errorElement.textContent = "Enter a valid email address.";
                errorElement.style.display = "block";
                isValid = false;
            } else {
                errorElement.style.display = "none"; 
            }
        }


        if (id === "message") {
            if (value.length < 10) {
                errorElement.textContent = "Message must be at least 10 characters long.";
                errorElement.style.display = "block";
                isValid = false;
            } else {
                errorElement.style.display = "none"; 
            }
        }

        // Return the validity status of the field
        return isValid;
    }

    form.addEventListener("input", function (event) {
        validateField(event.target);
    });



    // Event listener for when the form is submitted
    form.addEventListener("submit", function (event) {
        event.preventDefault(); 

        let isFormValid = true; 


        ["name", "email", "message"].forEach(function (fieldId) {
            const field = document.getElementById(fieldId); 
            if (!validateField(field)) {
                isFormValid = false;
            }
        });

        // If the form is valid, show a success message
        if (isFormValid) {
            alert("Your message has sented successgully!");
            form.reset(); 
        }
    });
});
