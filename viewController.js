import {
    Modal
} from '/modal.mjs';

let modal = new Modal();
modal.fetchRepositories(0, repositories => {
    console.log(modal.repositories);
});
// let modal = new Modal();
// console.log(modal.repositories);