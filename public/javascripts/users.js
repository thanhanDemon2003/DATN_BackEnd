function init() {
  getAllUsers();
}

const token = JSON.parse(localStorage.getItem("token"));

init();

async function getAllUsers() {
  const res = await fetch("/admin/getAllUsers", {
    headers: {
      Authorization: `${token}`,
    },
  });
  const user = await res.json();
  if (res.status === 401) {
    handleUnauthorizedError();
  } else if (res.status === 403) {
    handleUnauthorizedErrorRole(user.msg);
  }
  data = user.data;
  data.forEach((user) => {
    handleNewUser(user);
  });
}

function handleNewUser(user) {
  let newUser = document.createElement("user");
  newUser.id = user._id;
  const currentTime = new Date(user.date);
  const momentDate = moment(currentTime);
  const vietnamDate = momentDate.tz("Asia/Ho_Chi_Minh");
  const formatted = vietnamDate.format("DD-MM-YYYY");

  if (user.role === 0) {
    newUser.innerHTML = `
    <div class="friends-box bg-white rad-10 p-relative overflow-h p-20">
    <div class="friends-contact">
    <a href="mailto:${user.email}"><i class="fa-regular fa-envelope"></i></a>
    </div>
    <div class="person txt-c">
      <img src="images/friend-05.jpg" alt="" />
      <h3 class="mb-0 mt-10">${user.username}</h3>
      <p class="fs-14 c-grey mt-5">User</p>
    </div>
    <div class="pt-15 pb-15 border-bottom border-top p-relative">
      <div class="fs-13 mb-10" id="email">
        <i class="fa-regular fa-envelope fa-fw mr-5" id="email"></i>
        ${user.email}
      </div>
      <div class="fs-13 mb-10">
        <i class="fa-solid fa-link fa-fw mr-5"></i>
        ${user.role}
      </div>
      <div class="fs-13 mb-10">
        <i class="fa-regular fa-newspaper fa-fw mr-5"></i>
        Đã Tham gia ${formatted}
      </div>
    </div>
    <div class="pt-15 border-top between-flex btn-remove">
      <div class="fs-13">
        <span class="one btn-shape rad-6 c-white bg-green" data-email=${user.email} onclick="clickOpen(this)">Kích hoạt</span>
      </div>
    </div>
  </div>
        `;
  } else if (user.role === 1) {
    newUser.innerHTML = `
    <div class="friends-box bg-custom rad-10 p-relative overflow-h p-20">
    <div class="friends-contact2">
    <a href="mailto:${user.email}">
  <i class="fa-regular fa-envelope"></i>
    </a>
    </div>
    <div class="person txt-c">
      <img src="images/friend-05.jpg" alt="" />
      <h3 class="mb-0 mt-10">${user.username}</h3>
      <p class="fs-14 c-grey mt-5">Admin</p>
    </div>
    <div class="pt-15 pb-15 border-bottom border-top p-relative">
      <div class="fs-13 mb-10" id="email">
        <i class="fa-regular fa-envelope fa-fw mr-5" id="email"></i>
        ${user.email}
      </div>
      <div class="fs-13 mb-10">
        <i class="fa-solid fa-link fa-fw mr-5"></i>
        ${user.role}
      </div>
      <div class="fs-13 mb-10">
        <i class="fa-regular fa-newspaper fa-fw mr-5"></i>
        Đã Tham gia ${formatted}
      </div>
    </div>
    <div class="pt-15 border-top between-flex btn-remove">
      <div class="fs-13">
        <span class="one btn-shape rad-6 c-white bg-blue" id="rsPass">Cấp lại mật
          khẩu</span>
     </div>
    </div>
  </div>
        `;
  } else {
    newUser.innerHTML = `
    <div class="friends-box bg-white rad-10 p-relative overflow-h p-20">
    <div class="friends-contact">
    <a href="mailto:${user.email}"><i class="fa-regular fa-envelope"></i></a>
    </div>
    <div class="person txt-c">
      <img src="images/friend-05.jpg" alt="" />
      <h3 class="mb-0 mt-10">${user.username}</h3>
      <p class="fs-14 c-grey mt-5">User</p>
    </div>
    <div class="pt-15 pb-15 border-bottom border-top p-relative">
      <div class="fs-13 mb-10" id="email">
        <i class="fa-regular fa-envelope fa-fw mr-5" id="email"></i>
        ${user.email}
      </div>
      <div class="fs-13 mb-10">
        <i class="fa-solid fa-link fa-fw mr-5"></i>
        ${user.role}
      </div>
      <div class="fs-13 mb-10">
        <i class="fa-regular fa-newspaper fa-fw mr-5"></i>
        Đã Tham gia ${formatted}
      </div>
    </div>
    <div class="pt-15 border-top between-flex btn-remove">
      <div class="fs-13">
        <span class="one btn-shape rad-6 c-white bg-blue" data-email=${user.email} onclick="clickResetPass(this)">Cấp lại mật
          khẩu</span>
        <span class="one btn-shape rad-6 c-white bg-red data-email=${user.email} onclick="clickBlock(this)">Vô hiệu hóa</span>
      </div>
    </div>
  </div>
        `;
  }
  const container = document.getElementById("user-container");
  container.appendChild(newUser);
}
function handleShowDialog() {
  var dialog = document.getElementById("dialog");
  dialog.style.display = "block";
}
function clickBlock(e) {
  const email = e.getAttribute("data-email");
  console.log(email);
  const role = 0;
  handleBlockUser(email, role);
}
function clickOpen(e) {
  const email = e.getAttribute("data-email");
  console.log(email);
  const role = 2;
  handleBlockUser(email, role);
}
function clickResetPass(e) {
  const email = e.getAttribute("data-email");
  console.log(email);
  handleResetPass(email);
}
function handleBlockUser(email, role) {
  Swal.fire({
    title: "Bạn có chắc chắn muốn vô hiệu hóa người chơi này?",
    text: "Người chơi sẽ không thể đăng nhập vào game nữa",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Vô hiệu hóa",
    cancelButtonText: "Hủy",
  }).then((result) => {
    if (result.isConfirmed) {
      handleBlockUserAPI(email, role);
    }
  });
}
function handleResetPass(email) {
  Swal.fire({
    title: "Bạn có chắc chắn muốn cấp lại mật khẩu cho người chơi này?",
    text: "Mật khẩu mới sẽ được gửi vào email của người chơi",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Cấp lại mật khẩu",
    cancelButtonText: "Hủy",
  }).then((result) => {
    if (result.isConfirmed) {
      handleResetPassAPI(email);
    }
  });
}
async function handleResetPassAPI(email) {
  const res = await fetch(`/admin/resetPassword?email=${email}`, {
    method: "POST",
    headers: {
      Authorization: `${token}`,
    },
  });
  if (res.status === 401) {
    handleUnauthorizedError();
  }
  if (res.status === 200) {
    Swal.fire({
      title: "Thành công",
      text: "Mật khẩu đã được gửi vào email của người chơi",
      icon: "success",
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  } else {
    Swal.fire({
      title: "Thất bại",
      text: "Mật khẩu chưa được gửi vào email của người chơi",
      icon: "error",
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }
}
async function handleBlockUserAPI(email, role) {
  const res = await fetch(`/admin/banUser?email=${email}&role=${role}`, {
    method: "POST",
    headers: {
      Authorization: `${token}`,
    },
  });
  if (res.status === 401) {
    handleUnauthorizedError();
  }
  if (res.status === 200) {
    Swal.fire({
      title: "Thành công",
      text: "Quyền đã được thay đổi",
      icon: "success",
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  } else {
    Swal.fire({
      title: "Thất bại",
      text: "Người chơi chưa bị thay đổi quyền",
      icon: "error",
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }
}
function handleAddUser(email) {
  const newEmail = document.getElementById("newEmail");
  email = newEmail.value;
  console.log(email);
  handleNewUserAPI(email);
}
async function handleNewUserAPI(email) {
  const res = await fetch(`/admin/createAdminUser?email=${email}`, {
    method: "POST",
    headers: {
      Authorization: `${token}`,
    },
  });
  data = await res.json();
  if (res.status === 401) {
    handleUnauthorizedError();
  }
  if (res.status === 200) {
    Swal.fire({
      title: "Người chơi đã được thêm vào danh sách",
      text: "Tài khoản và email đã được gửi vào email của biên tập viên",
      icon: "success",
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  } else {
    Swal.fire({
      title: "Thất bại",
      text: data.notification,
      icon: "error",
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }
}
function closeDialog() {
  var dialog = document.getElementById("dialog");
  dialog.style.display = "none";
}
function handleUnauthorizedError() {
  Swal.fire({
    title: "Hết hạn token",
    text: "Token đã hết hạn, vui lòng đăng nhập lại",
    icon: "error",
    showConfirmButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "/login";
    }
  });
}
function handleUnauthorizedErrorRole(error) {
  Swal.fire({
    title: error,
    text: "Vui lòng quay lại trang chủ",
    icon: "error",
    showConfirmButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "/";
    }
  });
}
