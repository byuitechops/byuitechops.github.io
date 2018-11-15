import {
    Modal
} from '/modal.mjs';

let modal = new Modal();
let cardContainer = document.getElementById('repositories');

function createCards() {
    let templateStr = '';
    modal.repositories.forEach((repository, i) => {
        if (i < 8) {
            let cardTemplate = `<div class="card medium blue darken-1">
                            <div class="card-content white-text">
                                <span class="card-title">${repository.name}</span>
                                <p>${repository.description}</p>
                                <ul>
                                    <li>Date Created: ${repository.created_at}</li>
                                    <li>Language: ${repository.language}</li>
                                    <li>Last Update: ${repository.updated_at}</li>
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
    cardContainer.innerHTML += templateStr;
}

// Start Here
modal.fetchRepositories(1, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Repositories successfully retrieved.');
    modal.sortRepositories();
    createCards();
});