const header = `<a href="home.html"><img src="./assets/logo.png"></a><nav><ul><a href="applications.html"><li>Applications</li></a><a href="time.html"><li>Time</li></a><a href="store.html"><li>Store</li></a><a href="profile.html"><li>Profile</li></a></ul></nav>`;
export function addHeader() {
    document.getElementsByTagName('header')[0].insertAdjacentHTML("afterbegin", header);
}