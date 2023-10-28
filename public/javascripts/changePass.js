const tokenID = JSON.parse(localStorage.getItem("token"));

const user = JSON.parse(localStorage.getItem("user"));
username = user.username;

function clickOpenChangePass() {
  var dialog = document.getElementById("dialogChangePass");
  dialog.style.display = "block";
}

function closeDialogChangePass() {
  var dialog = document.getElementById("dialogChangePass");
  dialog.style.display = "none";
}

function changePassword() {
  const oldPass = document.getElementById("ipOldPass");
  const newPass = document.getElementById("ipNewPass");
  const reNewPass = document.getElementById("ipReNewPass");
  const errValue = document.getElementById("errValue");
  if (!newPass.value || !reNewPass.value || !oldPass.value) {
    return (errValue.innerHTML = "Không được để trống");
  }

  if (newPass.value.length < 8) {
    return (errValue.innerHTML = "Mật khẩu mới tối thiểu 8 ký tự");
  }

  if (newPass.value !== reNewPass.value) {
    return (errValue.innerHTML = "Mật khẩu mới không khớp");
  }
  changePasswordApi(oldPass.value, newPass.value);
}
async function changePasswordApi(password, newPassword) {
  const res = await fetch("/admin/changePassword", {
    method: "POST",
    headers: {
      Authorization: `${tokenID}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
      newPassword: newPassword,
    }),
  });
  pass = await res.json();
  if (res.status === 401) {
    handleUnauthorizedError();
    return;
  }
  if (res.status !== 200) {
    console.log(res);
    Swal.fire({
      title: "Thất bại",
      text: pass.notification,
      icon: "error",
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
    return;
  }
  Swal.fire({
    title: "Thành công",
    text: "Đổi mật khẩu thành công",
    icon: "success",
    showConfirmButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Đăng xuất",
        text: "Đổi mật khẩu thành công, bạn cần đăng nhập lại",
        icon: "question",
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
    }
  });
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
