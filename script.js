let allEmployees;

// Fetch 12 random users using randomuser.me api and loop through the results.

fetch('https://randomuser.me/api/?results=12')
    .then(res => res.json())
    .then(data => {

        allEmployees = data.results;
        console.log('allEmployees ' , allEmployees);

        for (let i = 0; i < data.results.length; i++) {
            createEmployeesMarkup(data.results[i], i);
            addEventListenerToEmployee(i);
        }
    })

// Creates gallery containers for every employee and displays their image, name, email, city and country.
// Appends this markup with insertAdjacentHTML.

function createEmployeesMarkup(employee, i) {
    const markup =
    `<div class="card" id="employee_id_${i}">
        <div class="card-img-container">
            <img class="card-img" src="${employee['picture']['large']}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${employee['name']['first']} ${employee['name']['last']}</h3>
            <p class="card-text">${employee['email']}</p>
            <p class="card-text cap">${employee['location']['city']}</p>
        </div>
    </div>`;

    const gallery = document.getElementById('gallery');
    gallery.insertAdjacentHTML('beforeend', markup);
}


// Adds event listener to employee container and on click calls the modalEmployee(i) function.

function addEventListenerToEmployee(i) {
    let container = document.getElementById(`employee_id_${i}`);
    container.addEventListener('click' , (e) => {
        modalEmployee(i);
    })
};

// Creates markup for modal employee.
// Appends markup to body with insertAdjacentHTML.
// Adds event listener to the 'x' button that closes the modal window by removing myModalWindow element (removeChild).

function modalEmployee(i) {
    let clickedEmployeeModalDisplay =
        `<div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${allEmployees[i]['picture']['large']}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${allEmployees[i]['name']['first']} ${allEmployees[i]['name']['last']}</h3>
                        <p class="modal-text">${allEmployees[i]['email']}</p>
                        <p class="modal-text cap">${allEmployees[i]['location']['city']}</p>
                        <hr>
                            <p class="modal-text">${formatPhoneNo(allEmployees[i]['phone'])}</p>
                            <p class="modal-text">${allEmployees[i]['location']['street']['number']} ${allEmployees[i]['location']['street']['name']}, ${allEmployees[i]['location']['state']}, ${allEmployees[i]['location']['postcode']}, ${allEmployees[i]['location']['country']}</p>
                            <p class="modal-text">Birthday: ${parseDate(allEmployees[i]['dob']['date'])}</p>
                </div>
            </div>`

    const body = document.getElementsByTagName("body")[0];
    body.insertAdjacentHTML('beforeend', clickedEmployeeModalDisplay);

    const exitButton = document.getElementById("modal-close-btn");
    exitButton.addEventListener('click' , (e) => {

        const myModalWindow = document.getElementsByClassName("modal-container")[0];
        body.removeChild(myModalWindow);
    })
}


// Formats phone numbers to be displayed as (XXX)-XXX-XXXX. If phone number is too long it does not display it.

function formatPhoneNo(phone) {
    let cleaned = ('' + phone).replace(/\D/g, '');
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return '';
}

// Parses date to be correct format: MM/DD/YYYY.

function parseDate(dateString) {
    let date = new Date(dateString);
    let year = date.getFullYear();

    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return month + '/' + day + '/' + year;
}
