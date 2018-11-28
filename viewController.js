import {
    Model
} from '/model.mjs';

let model = new Model();
let cardContainer = document.getElementById('repositories');
let filterContainer = document.getElementById('filters');
let spinner = document.getElementById('loader');
let searchBar = document.getElementById('searchBar');
let resultCount = document.getElementById('resultCount');
let filteredRepos = [];
let dateFormat = 'DD, hh:mm A';

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
        repositories = model.repositories;
    }
    repositories.forEach((repository, i) => {
        if (i < count) {
            let dateCreated = moment(repository.created_at);
            let dateUpdated = moment(repository.updated_at);
            let cardTemplate = `<div class="card medium light-blue darken-4">
                            <div class="card-content white-text">
                                <span class="card-title">${repository.name}</span>
                                <p>${repository.description}</p>
                                <ul>
                                    <li>Date Created: ${dateCreated.format('YYYY')} ${dateCreated.format('MMMM').padEnd(9)} ${dateCreated.format(dateFormat)}</li>
                                    <li>Language: ${repository.language}</li>
                                    <li>Last Updated: ${dateUpdated.format('YYYY')} ${dateUpdated.format('MMMM').padEnd(9)} ${dateUpdated.format(dateFormat)}</li>
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

searchBar.addEventListener('keyup', event => {
    if (event.srcElement.value.length > 1) {
        spinner.style.display = 'block';
        filteredRepos = model.findRepositories(event.srcElement.value);
        resultCount.innerHTML = `${filteredRepos.length} Results`;
        createCards(filteredRepos, filteredRepos.length);
    } else if (event.srcElement.value.length === 0) {
        filteredRepos = [];
        createCards();
    }
});

filterContainer.addEventListener('change', event => {
    model.sortRepositories(event.srcElement.value);
    if (filteredRepos.length > 0) {
        filteredRepos = model.findRepositories(searchBar.value);
        createCards(filteredRepos, filteredRepos.length);
    } else {
        createCards();
    }
});

// Start Here
model.fetchRepositories(1, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Repositories successfully retrieved.');
    model.sortRepositories();
    setupView();
});
// Initializes the Materialize model
document.addEventListener('DOMContentLoaded', () => {
    var elems = document.querySelectorAll('.model');
    var instances = M.model.init(elems);
});