export class Modal {
    constructor() {
        this.repositories = [];
    }

    fetchRepositories(page = 0, callback) {
        var xhttp = new XMLHttpRequest();
        let that = this;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.responseText);
                that.repositories.push(data);
                callback();
            } else {
                callback(`There was an error getting the list of repositories. Error Code: ${this.status}`);
            }
        };
        xhttp.open('GET', `https://api.github.com/orgs/byuitechops/repos?page=${page}&per_page=100`, true);
        xhttp.send();
    }
}