import {
    Modal
} from '/modal.mjs';

let modal = new Modal();
let cardContainer = document.getElementById('repositories');
let filterContainer = document.getElementById('filters');
let spinner = document.getElementById('loader');
let filteredRepos = [];

function setupView() {
    createFilters();
    createCards();
}

function createFilters() {
    let filters = ['Creation Date', 'Last Updated', 'Language', 'Name', 'Open Issues'];
    let templateStr = '';
    filters.forEach(filter => {
        if (filter === 'Last Updated') {
            templateStr += `<option selected="selected" value="${filter.toLowerCase()}">${filter}</option>`;
        } else {
            templateStr += `<option value="${filter.toLowerCase()}">${filter}</option>`;
        }
    });
    filterContainer.innerHTML = templateStr;
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
}

function createCards(repositories = [], count = 8) {
    let templateStr = '';
    if (repositories.length === 0) {
        repositories = modal.repositories;
    }
    repositories.forEach((repository, i) => {
        if (i < count) {
            let cardTemplate = `<div class="card medium light-blue darken-4">
                            <div class="card-content white-text">
                                <span class="card-title">${repository.name}</span>
                                <p>${repository.description}</p>
                                <ul>
                                    <li>Date Created: ${repository.created_at}</li>
                                    <li>Language: ${repository.language}</li>
                                    <li>Last Updated: ${repository.updated_at}</li>
                                    <li>Open Issues: ${repository.open_issues_count}</li>
                                </ul>
                            </div>
                            <div class="card-action">
                                <a class="orange-text darken-1" href="${repository.html_url}">Repository Link</a>
                            </div>
                        </div>`;
            if (i === 0) {
                templateStr += '<div class="row">';
            } else if (i % 4 === 0) {
                templateStr += '</div><div class="row">';
            }
            templateStr += `<div class="col s12 m4 l3">${cardTemplate}</div>`;
        }
    });
    spinner.style.display = 'none';

    cardContainer.innerHTML = templateStr.replace(/null/gi, 'N/A');
}

document.getElementById('searchBar').addEventListener('keyup', event => {
    if (event.srcElement.value.length > 2) {
        spinner.style.display = 'block';
        filteredRepos = modal.findRepositories(event.srcElement.value);
        createCards(filteredRepos, filteredRepos.length);
    } else if (event.srcElement.value.length === 0) {
        filteredRepos = [];
        createCards();
    }
});

filterContainer.addEventListener('change', event => {
    modal.sortRepositories(event.srcElement.value);
    if (filteredRepos.length > 0) {
        createCards(filteredRepos, filteredRepos.length);
    } else {
        createCards();
    }
});

// Start Here
modal.fetchRepositories(1, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Repositories successfully retrieved.');
    modal.sortRepositories();
    setupView();
});