import {
    Modal
} from '/modal.mjs';

let modal = new Modal();
modal.fetchRepositories(0, () => {
    console.log(modal.repositories);
});
// let modal = new Modal();
// console.log(modal.repositories);