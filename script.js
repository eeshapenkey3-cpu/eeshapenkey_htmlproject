        function displayError(elementId, isVisible, message = '') {
            const errorElement = document.getElementById(elementId);
            if (isVisible) {
                errorElement.textContent = message;
                errorElement.classList.remove('hidden');
            } else {
                errorElement.classList.add('hidden');
            }
        }


        function validateForm(event) {
            event.preventDefault(); 
            let isValid = true;

            const requiredTextFields = [
                { id: 'fullName', errorId: 'fullNameError', message: 'Full name cannot be empty.' },
                { id: 'message', errorId: 'messageError', message: 'A message is required.' }
            ];

            requiredTextFields.forEach(field => {
                const value = document.getElementById(field.id).value.trim();
                if (value === '') {
                    displayError(field.errorId, true, field.message);
                    isValid = false;
                } else {
                    displayError(field.errorId, false);
                }
            });

            const emailInput = document.getElementById('email');
            const emailValue = emailInput.value.trim();
            if (emailValue === '') {
                displayError('emailError', true, 'Email cannot be empty.');
                isValid = false;
            } else if (!emailRegex.test(emailValue)) {
                displayError('emailError', true, 'Please enter a valid email address (e.g., user@example.com).');
                isValid = false;
            } else {
                displayError('emailError', false);
            }

            const robotCheck = document.getElementById('robotCheck').checked;
            if (!robotCheck) {
                isValid = false;
            }
            if (isValid) {

                console.log('Form is valid. Submitting data:', { 
                    fullName: document.getElementById('fullName').value.trim(), 
                    email: emailValue, 
                    message: document.getElementById('message').value.trim() 
                });
                console.log('SUCCESS: Form submitted and reset.'); 
                

                document.getElementById('contactForm').reset();
            } else {

                const firstInvalid = document.querySelector('.input-group p:not(.hidden)').previousElementSibling;
                if (firstInvalid) {
                    firstInvalid.focus();
                }
            }

            return false; 
        }