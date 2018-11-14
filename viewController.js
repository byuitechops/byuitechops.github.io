import {
    Modal
} from '/modal.mjs';

function createDOM() {

}

let modal = new Modal();
modal.fetchRepositories(0, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Repositories successfully retrieved.');
    console.log(modal.repositories);
    createDOM();
});