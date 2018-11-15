export class Modal {
    constructor() {
        this.repositories = [];
    }

    sortRepositories(option = '') {
        this.repositories = this.repositories.sort((repo1, repo2) => {
            if (!option) {
                // Sort by last update date
                let date1 = new Date(repo1.updated_at);
                let date2 = new Date(repo2.updated_at);
                return date2.getTime() - date1.getTime();
            }
        });
    }

    findRepositories(query) {
        return this.repositories.filter(repository => repository.name.includes(query));
    }

    fetchRepositories(page, callback) {
        var xhttp = new XMLHttpRequest();
        let that = this;
        xhttp.open('GET', `https://api.github.com/orgs/byuitechops/repos?page=${page++}&per_page=100`, true);
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.responseText);
                if (data.length > 0) {
                    that.repositories = that.repositories.concat(data);
                    that.fetchRepositories(page, callback);
                } else {
                    console.log('Completed Concatenation of Pagination');
                    localStorage.setItem('techopsRepos', JSON.stringify(that.repositories));
                    callback();
                }
            } else if (this.status != 200 && this.status != 0) {
                try {
                    that.repositories = JSON.parse(localStorage.getItem('techopsRepos'));
                    if (!that.repositories) {
                        throw 'Localstorage is missing';
                    }
                } catch (err) {
                    console.error(err);
                    callback(`There was an error getting the list of repositories. Error Code: ${this.status}`);
                    return;
                }
                callback();
            }
        };
        xhttp.send();
    }
}