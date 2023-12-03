const token = localStorage.getItem('token');

if (!token) {
    window.location.href = '/login';
    Storage.clear();
}
const avatar = document.getElementById('avatar');
const userInfo = document.getElementById('user-info');
const logoutButton = document.getElementById('logout-button');
let isShown = false;

avatar.addEventListener('click', () => {

    isShown = !isShown;
    if (isShown) {
        userInfo.style.display = 'block';
    } else {
        userInfo.style.display = 'none';
    }
});
logoutButton.addEventListener('click', () => {
    window.location.href = '/login';
    Storage.clear();
});


document.addEventListener("DOMContentLoaded", function() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const role = document.getElementById('role');
    if(user.role == 1) {
        role.innerHTML = 'Admin';
    } else {
        role.innerHTML = 'User cPanel';
    }

    username.innerHTML = user.username;
    email.innerHTML = user.email;
});

function handleUnauthorizedError() {
    Swal.fire({
      title: "Hết hạn token",
      text: "Token đã hết hạn, vui lòng đăng nhập lại",
      icon: "error",
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/login";
        localStorage.clear();
      }
    });
  }