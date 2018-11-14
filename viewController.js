import {
    Modal
} from '/modal.mjs';

let modal = new Modal();
let cardContainer = document.getElementById('repositories');

function createCards() {
    let templateStr = '';
    let cardTemplate = `<div class="card blue-grey darken-1">
                            <div class="card-content white-text">
                                <span class="card-title">Card Title</span>
                                <p>I am a very simple card. I am good at containing small bits of information.
                                I am convenient because I require little markup to use effectively.</p>
                            </div>
                            <div class="card-action">
                                <a href="#">This is a link</a>
                                <a href="#">This is a link</a>
                            </div>
                        </div>`;

    modal.repositories.forEach((repository, i) => {
        if (i === 0) {
            templateStr += '<div class="row">';
        } else if (i % 4 === 0) {
            templateStr += '</div><div class="row">';
        }
        templateStr += `<div class="col s12 m4 l3">${cardTemplate}</div>`;
        cardContainer.innerHTML += cardTemplate;
    });
}

// Start Here
modal.fetchRepositories(1, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Repositories successfully retrieved.');
    createCards();
});