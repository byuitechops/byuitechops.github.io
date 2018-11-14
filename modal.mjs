class Modal {
    Modal() {
        this.repositories = [];
        this.fetchRepositories();
    }

    fetchRepositories(page = 0) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.responseText);
                if (data.length > 0) {
                    this.repositories.concat(JSON.parse(this.responseText));
                    this.fetchRepositories(page++);
                }
            }
        };
        xhttp.open('GET', `https://api.github.com/orgs/byuitechops/repos?page=${page}`, true);
        xhttp.send();
    }
}

export default Modal;