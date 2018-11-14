export class Modal {
    constructor() {
        this.repositories = [];
    }

    fetchRepositories(page = 0, callback) {
        var xhttp = new XMLHttpRequest();
        let that = this;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(data);
                let data = JSON.parse(this.responseText);
                that.repositories.push(data);
                console.log(that.repositories);
                callback();
            }
        };
        xhttp.open('GET', `https://api.github.com/orgs/byuitechops/repos?page=${page}&per_page=100`, true);
        xhttp.send();
    }
}