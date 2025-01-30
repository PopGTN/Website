
const username = 'PopGTN';
const perPage = 6;
let currentPage = 1;
// Function to handle the "Next" button
function setCurrentPage(page) {
    currentPage = page;
}

function nextPage() {
    currentPage++;
    getRepositories();
    updatePaginationButtons();
}

// Function to handle the "Previous" button
function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        getRepositories();
        updatePaginationButtons();
    }
}

// Function to update the state of pagination buttons
function updatePaginationButtons() {
    const previousPageButton = document.getElementById('previous-page');
    const nextPageButton = document.getElementById('next-page');

    // Enable/disable the "Previous" button based on the current page
    previousPageButton.classList.toggle('disabled', currentPage === 1);

    // You can implement additional logic to disable the "Next" button if needed
    // For example, check if the current page has reached the last page of repositories
}


// Initial call to fetch repositories
getRepositories();// Function to get repositories for the current page
function getRepositories() {
    fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=${perPage}&page=${currentPage}`)
        .then((response) => response.json())
        .then((data) => displayRepositories(data));
}

// Function to handle the "Next" button
function nextPage() {
    currentPage++;
    getRepositories();
    updatePaginationButtons();
}

// Function to handle the "Previous" button
function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        getRepositories();
        updatePaginationButtons();
    }
}

// Function to update the state of pagination buttons
function updatePaginationButtons() {
    const previousPageButton = document.getElementById('previous-page');
    const nextPageButton = document.getElementById('next-page');

    // Enable/disable the "Previous" button based on the current page
    previousPageButton.classList.toggle('disabled', currentPage === 1);


    // You can implement additional logic to disable the "Next" button if needed
    // For example, check if the current page has reached the last page of repositories
}

// Function to sort repositories by last modified


// Function to display repositories in cards
function displayRepositories(repositories) {
    const repositoriesList = document.getElementById('repositories-list');
    repositoriesList.innerHTML = '';

    // Sort repositories by last modified

    if (currentPage <= 0) {
        // Handle the case where there are no repositories to display
        /*repositoriesList.innerHTML = '<p>No repositories to display.</p>';*/
        previousPage()
        repositoriesList.innerHTML = 'Error Something Went Wrong!';
    } else  if (repositories.length === 0) {
        // Handle the case where there are no repositories to display
        /*repositoriesList.innerHTML = '<p>No repositories to display.</p>';*/
        previousPage()
    } else {
        repositories.forEach((repo) => {
            const card = document.createElement('div');
            card.className = 'col-md-12 mb-4'; // Display one card per row
            card.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${repo.name}</h5>
            <p class="card-text">${repo.description || 'No description available'}</p>
            <a href="${repo.html_url}" class="btn btn-primary">View on GitHub</a>
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