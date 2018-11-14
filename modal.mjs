export class Modal {
    constructor() {
        this.repositories = [];
    }

    fetchRepositories(page, callback) {
        var xhttp = new XMLHttpRequest();
        let that = this;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.responseText);
                if (data.length > 0) {
                    console.log(that.repositories);
                    that.repositories = that.repositories.concat(data);
                    that.fetchRepositories(page++, callback);
                } else {
                    console.log('Completed Concatination of Pagination');
                    callback();
                }
            } else if (this.status != 200 && this.status != 0) {
                callback(`There was an error getting the list of repositories. Error Code: ${this.status}`);
            }
        };
        console.log(page);
        xhttp.open('GET', `https://api.github.com/orgs/byuitechops/repos?page=${page}&per_page=100`, true);
        xhttp.send();
    }
}