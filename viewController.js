import {
    Modal
} from '/modal.mjs';

let modal = new Modal();
modal.fetchRepositories(0, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('completed');
    console.log(modal.repositories);
});