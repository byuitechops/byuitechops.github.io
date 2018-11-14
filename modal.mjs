export class Modal {
    constructor() {
        this.repositories = [];
    }

    fetchRepositories(page = 0, callback) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.responseText);
                if (data.length > 0) {
                    this.repositories.concat(JSON.parse(this.responseText));
                    this.fetchRepositories(page++);
                } else {
                    callback();
                }
            }
        };
        xhttp.open('GET', `https://api.github.com/orgs/byuitechops/repos?page=${page}`, true);
        xhttp.send();
    }
}