/*

const bbUsername = 'joshuamckenna';
const bbPerPage = 6;
let bbCurrentPage = 1;
let nextLink
let PreviousLink

let apilink= `https://api.bitbucket.org/2.0/repositories/${bbUsername}?role=member&sort=pushed&pagelen=${bbPerPage}&page=${bbCurrentPage}`


// Function to handle the "Next" button
function bbSetbbCurrentPage(page) {
    bbCurrentPage = page;
}

function bbGetbbCurrentPage() {
    return bbCurrentPage
}

// Function to handle the "Previous" button
function bbPreviousPage() {
    if (bbCurrentPage > 1) {
        bbCurrentPage--;
        getRepositories();
        bbDisplayRepositories();
    }
}

// Function to update the state of pagination buttons
function bbUpdatePaginationButtons() {
    const previousPageButton = document.getElementById('previous-page');
    const nextPageButton = document.getElementById('next-page');

    // Enable/disable the "Previous" button based on the current page
    previousPageButton.classList.toggle('disabled', bbCurrentPage === 1);

    // You can implement additional logic to disable the "Next" button if needed
    // For example, check if the current page has reached the last page of repositories
}


// Initial call to fetch repositories
bbGetRepositories();// Function to get repositories for the current page
function bbGetRepositories() {
    fetch(`https://api.bitbucket.org/2.0/repositories/${bbUsername}?pagelen=${bbPerPage}&page=${bbCurrentPage}`)
        .then((response) => response.json())
        .then((data) => bbUpdatePaginationButtons(data));
}

function bbGetRepositories(url) {
    fetch(url)
        .then((response) => response.json())
        .then((data) => bbUpdatePaginationButtons(data));
}

// Function to handle the "Next" button
function bbNextPage() {
    bbCurrentPage++;
    bbGetRepositories();
    bbUpdatePaginationButtons();
}

// Function to handle the "Previous" button
function bbPreviousPage() {
    if (bbCurrentPage > 1) {
        bbCurrentPage--;
        bbGetRepositories();
        bbUpdatePaginationButtons();
    }
}

// Function to update the state of pagination buttons
function bbUpdatePaginationButtons() {
    const previousPageButton = document.getElementById('previous-page');
    const nextPageButton = document.getElementById('next-page');

    // Enable/disable the "Previous" button based on the current page
    previousPageButton.classList.toggle('disabled', bbCurrentPage === 1);


    // You can implement additional logic to disable the "Next" button if needed
    // For example, check if the current page has reached the last page of repositories
}

// Function to sort repositories by last modified


// Function to display repositories in cards
function bbDisplayRepositories(repositories) {
    const repositoriesList = document.getElementById('repositories-list');
    repositoriesList.innerHTML = '';



    // Sort repositories by last modified
    if (bbCurrentPage <= 0) {
        // Handle the case where there are no repositories to display
        /!*repositoriesList.innerHTML = '<p>No repositories to display.</p>';*!/
        previousPage()
        repositoriesList.innerHTML = 'Error Something Went Wrong!';
    } else  if (repositories.length === 0) {
        // Handle the case where there are no repositories to display
        /!*repositoriesList.innerHTML = '<p>No repositories to display.</p>';*!/
        previousPage()
    } else {
        repositories.forEach((repo) => {
            const card = document.createElement('div');
            card.className = 'col'; // Display one card per row
            card.innerHTML = `
        <div class="card">
          <div class="card-body">
            <div class="card-description my-2">
                <h5 class="card-title">${repo.name}</h5>
                 <p class="card-text">${repo.description || 'No description available'}</p>
            </div>
            
            <div class="card-body">
                <a href="${repo.html_url}" class="btn btn-primary">View on GitHub</a>
            </div>
          </div>
        </div>
      `;
            repositoriesList.appendChild(card);
        });
    }

    // Update the state of pagination buttons
    updatePaginationButtons();
}


// Initial call to fetch repositories
getRepositories();
*/

const bbUsername = 'joshuamckenna';
const bbPerPage = 4;
let bbCurrentPage = 1;

// Function to handle the "Next" button
function bbSetCurrentPage(page) {
    bbCurrentPage = page;
}

function bbGetCurrentPage() {
    return bbCurrentPage;
}

function bbNextPage() {
    bbCurrentPage++;
    bbGetRepositories();
    bbUpdatePaginationButtons();
}

// Function to handle the "Previous" button
function bbPreviousPage() {
    if (bbCurrentPage > 1) {
        bbCurrentPage--;
        bbGetRepositories();
        bbUpdatePaginationButtons();
    }
}

// Function to update the state of pagination buttons
function bbUpdatePaginationButtons() {
    const bbPreviousPageButton = document.getElementById('bb-previous-page');
    const bbNextPageButton = document.getElementById('bb-next-page');

    // Enable/disable the "Previous" button based on the current page
    bbPreviousPageButton.classList.toggle('disabled', bbCurrentPage === 1);

    // Implement additional logic to disable the "Next" button if needed
}


// Initial call to fetch repositories
bbGetRepositories(); // Function to get repositories for the current page

function bbGetRepositories() {
    fetch(`https://api.bitbucket.org/2.0/repositories/${bbUsername}?pagelen=${bbPerPage}&page=${bbCurrentPage}`)
        .then((response) => response.json())
        .then((data) => bbDisplayRepositories(data));
}

// Function to display repositories in cards
function bbDisplayRepositories(data) {
    const bbRepositoriesList = document.getElementById('bb-repositories-list');
    bbRepositoriesList.innerHTML = '';

    // Check if there are repositories
    if (!data.values || data.values.length === 0) {
        bbRepositoriesList.innerHTML = 'No repositories to display.';
        bbPreviousPage();
        return;
    }

    data.values.forEach((repo) => {
        const bbCard = document.createElement('div');
        bbCard.className = 'col'; // Display one card per row
        bbCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <div class="card-description my-2">
                        <h5 class="card-title">${repo.name}</h5>
                        <p class="card-text">${repo.description || 'No description available'}</p>
                    </div>
                    
                    <div class="card-body">
                        <a href="${repo.links.html.href}" class="btn btn-primary">View on Bitbucket</a>
                    </div>
                </div>
            </div>
        `;
        bbRepositoriesList.appendChild(bbCard);
    });

    // Update the state of pagination buttons
    bbUpdatePaginationButtons();
}
