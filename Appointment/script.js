document.addEventListener('DOMContentLoaded', function () {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const hospitalSelect = document.getElementById('hospital');
    const hospitalSearchContainer = document.getElementById('hospital-search-container');
    const hospitalSearchInput = document.getElementById('hospital-search');
    const hospitalSearchResults = document.getElementById('hospital-search-results');
    const serviceSelect = document.getElementById('service');
    const dateInput = document.getElementById('date');
    const bookButton = document.getElementById('book-button');
    const bookingConfirmationDiv = document.getElementById('booking-confirmation');
    const confirmationMessage = document.getElementById('confirmation-message');
    const hospitalInfoPrompt = document.getElementById('hospital-info-prompt');
    const hospitalInfoButtons = document.getElementById('hospital-info-buttons');
    const closeConfirmationButton = document.getElementById('close-confirmation');
    const closeConfirmationOnlyButton = document.getElementById('close-confirmation-only');
    const selectedHospitalNameSpan = document.getElementById('selected-hospital-name');

    const allHospitals = [
        "City General Hospital",
        "Metro Medical Clinic",
        "Sunrise Health Center",
        "Premier Medical Institute",
        "CareWell Hospital",
        "Global Healthplex",
        "Apollo Prime Healthcare",
        "Lifeline Medical Center",
        "Unity Community Hospital",
        "Peak Health Solutions",
        "St. Jude's Hospital",
        "Mount Sinai Annex",
        "Riverside Medical Center",
        "Oakhaven Clinic",
        "Pineview General"
    ];

    let selectedHospital = '';

    function validateForm() {
        return nameInput.value && emailInput.value && selectedHospital && serviceSelect.value && dateInput.value;
    }

    function updateButtonState() {
        bookButton.disabled = !validateForm();
    }

    function handleHospitalSelection() {
        if (hospitalSelect.value === 'other') {
            hospitalSearchContainer.classList.remove('hidden');
            selectedHospital = '';
        } else {
            hospitalSearchContainer.classList.add('hidden');
            selectedHospital = hospitalSelect.value;
        }
        updateButtonState();
    }

    function handleHospitalSearch() {
        const searchTerm = hospitalSearchInput.value.toLowerCase();
        const results = allHospitals.filter(hospital =>
            hospital.toLowerCase().includes(searchTerm)
        );

        hospitalSearchResults.innerHTML = '';
        if (searchTerm && results.length > 0) {
            const list = document.createElement('ul');
            results.forEach(hospital => {
                const listItem = document.createElement('li');
                listItem.textContent = hospital;
                listItem.style.cursor = 'pointer';
                listItem.addEventListener('click', function () {
                    selectedHospital = this.textContent;
                    hospitalSearchInput.value = this.textContent;
                    hospitalSearchResults.innerHTML = '';
                    hospitalSearchContainer.classList.add('hidden');
                    hospitalSelect.value = 'other';
                    updateButtonState();
                });
                list.appendChild(listItem);
            });
            hospitalSearchResults.appendChild(list);
        } else if (searchTerm) {
            hospitalSearchResults.textContent = 'No hospitals found.';
        } else {
            hospitalSearchResults.textContent = '';
        }
        updateButtonState();
    }

    nameInput.addEventListener('input', updateButtonState);
    emailInput.addEventListener('input', updateButtonState);
    hospitalSelect.addEventListener('change', handleHospitalSelection);
    hospitalSearchInput.addEventListener('input', handleHospitalSearch);
    serviceSelect.addEventListener('change', updateButtonState);
    dateInput.addEventListener('input', updateButtonState);

    bookButton.addEventListener('click', function () {
        if (validateForm()) {
            const name = nameInput.value;
            const email = emailInput.value;
            const service = serviceSelect.options[serviceSelect.selectedIndex].text;
            const date = dateInput.value;

            const confirmationText = `Appointment booked for ${name} (${email}) for ${service} on ${date}.`;
            confirmationMessage.textContent = confirmationText;
            selectedHospitalNameSpan.textContent = selectedHospital;
            hospitalInfoPrompt.classList.remove('hidden');
            hospitalInfoButtons.classList.remove('hidden');
            closeConfirmationOnlyButton.classList.add('hidden'); // Hide the single close button
            bookingConfirmationDiv.classList.remove('hidden');

            console.log('Booking Details:', { name, email, hospital: selectedHospital, service, date });

            document.getElementById('appointment-form').reset();
            bookButton.disabled = true;
            selectedHospital = '';
            hospitalSearchContainer.classList.add('hidden');
            hospitalSelect.value = '';
        } else {
            alert('Please fill in all the required fields and select a hospital.');
        }
    });

    closeConfirmationButton.addEventListener('click', function () {
        bookingConfirmationDiv.classList.add('hidden');
    });

    closeConfirmationOnlyButton.addEventListener('click', function () {
        bookingConfirmationDiv.classList.add('hidden');
    });

    document.getElementById('view-hospital-info').addEventListener('click', function () {
        const selectedHospitalForInfo = selectedHospital;
        bookingConfirmationDiv.classList.add('hidden'); // Hide the dialog
        alert(`Navigating to information page for ${selectedHospitalForInfo}... (This is a placeholder)`);
        // In a real application, you would redirect the user to a page
        // displaying details about the selected hospital.
    });
});