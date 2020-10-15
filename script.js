

fetch('https://randomuser.me/api/?results=12')
    .then(res => res.json())
    .then(data => {
        console.log(data.results)
        for (let i = 0; i < data.results.length; i++) {
            createEmployeesMarkup(data.results[i]);
        }
    })


// Creates gallery containers for every employee and displays their image, name, email, city and country.
// Appends this markup with innerHTML

function createEmployeesMarkup(employee) {
    const markup =
    `<div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${employee['picture']['large']}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${employee['name']['title']} ${employee['name']['first']} ${employee['name']['last']}</h3>
            <p class="card-text">${employee['email']}</p>
            <p class="card-text cap">${employee['location']['city']} ${employee['location']['country']}</p>
        </div>
    </div>`;

    const gallery = document.getElementById('gallery');
    gallery.innerHTML += markup;
    return markup;
}



// TODO 1:
// - Fetch 12 random users using randomuser.me api.
// - Loop through the response data
// - Build html markup for each user
// - Append the built html markup into the gallery div