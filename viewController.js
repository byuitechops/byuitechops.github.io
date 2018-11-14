import {
    Modal
} from '/modal.mjs';

let modal = new Modal();
modal.fetchRepositories(0, repositories => {
    console.log(repositories);
});
// let modal = new Modal();
// console.log(modal.repositories);