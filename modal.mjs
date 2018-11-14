export class Modal {
    constructor() {
        this.repositories = [];
    }

    fetchRepositories(page = 0, callback) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.responseText);
                this.repositories.concat(data);
                callback();
            }
        };
        xhttp.open('GET', `https://api.github.com/orgs/byuitechops/repos?page=${page}`, true);
        xhttp.send();
    }
}