
function init() {
  getAllUsers();
}

const token = JSON.parse(localStorage.getItem("token"));
var checked = {};

if (!token) {
  window.location.href = "/login";
}
init();

async function getAllUsers() {
  const res = await fetch("/admin/getAllPlayers", {
    headers: {
      Authorization: `${token}`,
    },
  });
  if (res.status === 401) {
    handleUnauthorizedError();
  }
  const user = await res.json();
  data = user.data;
  data.forEach((user) => {
    handleNewData(user);
  });
}

function handleNewData(user) {
  const newPlayer = document.createElement("user");
  newPlayer.id = user._id;
  newPlayer.status = user.status;

  if (user.fb_id) {
    newPlayer.idData1 = user.fb_id;
  }
  else if (user.id_discord) {
    newPlayer.idData1 = user.id_discord;
  }
  else if(user.id_discord && user.fb_id){
    newPlayer.idData1 = user.id_discord;
  }
  var dataIDShow = newPlayer.idData1;
  if (dataIDShow.length > 10) {
    dataIDShow = dataIDShow.slice(0, 10) + "...";
  }
  var name = user.name;
  if (name.length > 10) {
    name = name.slice(0, 10) + "...";
  }
  if (user.status === 0) {
    checked = "checked";
  } else if (user.status === 1) {
    checked = "unchecked";
  }
  newPlayer.innerHTML = `
  <div class="info-box d-flex align-c p-20">
  <h4 class="c-grey w-full m-0">Người chơi</h4>
  <div class="one d-flex" id="xemdialog">
  <div class="one d-flex" >
    <div class="fs-14 >
      <span class="c-grey">Tên:</span>
      <span >${name}</span>
    </div>
    <div class="fs-14">
    <span class="c-grey">ID Đối tác:</span>
    <span >${dataIDShow}</span>
  </div>
    <div class="fs-14">
      <span class="c-grey">DotCoin:</span>
      <span>${user.balance} </span>
    </div>
    <div class="fs-14">
      <span class="c-grey" id="gunskin">Sở hữu</span>
      <span>${user.wardrobe.length} Skin</span>
    </div>
    </div>
    <div class="toggle mt-10" id="myCheckbox">
      <label>
        <input class="toggle-checkbox" type="checkbox" ${checked} />
        <div class="toggle-switch"></div>
      </label>
    </div>
    <span id="giveSkin">
    <i class="fa-solid fa-gift fa-beat-fade fa-lg" style="color: #ffd500; margin-top: 25px"></i>
    </span>
    </div>  
    `;

  const container = document.getElementById("user-container");
  container.appendChild(newPlayer);

  const checkbox = newPlayer.querySelector("#myCheckbox");
  const giveSkin = newPlayer.querySelector("#giveSkin");
  newPlayer.addEventListener("click", (e) => {
    console.log("User clicked:", newPlayer.id);
    handleGetPlayer(newPlayer.id);
  });

  checkbox.addEventListener("click", (e) => {
    closeDialog();
    e.stopPropagation();
    handleChangeCheckbox(newPlayer.id, newPlayer.status);
  });
  giveSkin.addEventListener("click", (e) => {
    closeDialog();
    e.stopPropagation();
    handleShowDialogGiveSkin(newPlayer.id);
  });
}
function closeDialog() {
  var dialog = document.getElementById("dialog");
  dialog.style.display = "none";
}

async function handleGetPlayer(userId) {
  const res = await fetch(`/admin/getPlayer/${userId}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  if (res.status === 401) {
    handleUnauthorizedError();
  }
  const user = await res.json();
  data = user.data;
  skins = data.wardrobe;
  console.log(skins);
  console.log(data);
  handleShowDialog(data, skins);
}
function handleShowDialog(data, skins) {
  const dialog = document.getElementById("dialog");
  dialog.style.display = "block";

  let html = `
        <div class="dialog-content">
          <span class="close" onclick="closeDialog()">
            <i class="fa-sharp fa-solid fa-xmark fa-xl"></i>
            </span>
          <h2>Dữ liệu chi tiết của người chơi</h2>
          <div class="box-dialog-chil">
            <div class="dialog-content1">
              <p class="btn-shape c-white bg-green center-flex">Thông tin người chơi</p>
              <p>Tên người chơi: ${data.name} </p>
              <div class="form-group">
              <label>Google UID</label>
              <p>${data.fb_id}</p>
              </div>
              <div class="form-group">
              <label>Discord ID</label>
              <p>${data.id_discord}</p>
              </div>
              <div class="form-group">
              <label>balance</label>
              <input type="number" name="" id="balance" value="${data.balance}">
              </div>
              <button class="btn-shape c-white bg-red center-flex" onclick="handleUpdatePlayer('${data._id}')">Cập nhật</button>
            </div>
            `;
  if (skins.length > 0) {
    let stt = 1;
    let temphtml = `<div class="dialog-content1">
    <p class="btn-shape c-white bg-blue center-flex">Skin đã sở hữu</p>`;
    skins.forEach((skin) => {
      let skinData = `
                <div class="dialog-content1-player">
                <div class="fw-bold c-grey">Skin: ${stt++}</div>
                <div class="form-group">
                  <span class="fw-bold">Tên Skin</span>
                   <span class="fw-n w-max">${skin.nameSkin}<span>
                </div>
                <div class="form-group">
                   <span class="fw-bold">Màu </span>
                   <span class="fw-n w-max">${skin.color} </span>
                </div>
                <div class="form-group mb-15">

                    <span class="fw-bold">Category </span>
                    <span class="fw-n w-max">${skin.category} </span>
                </div>

                    </div>
                    `;
      skinHTML = temphtml += skinData;
    });
    html += skinHTML;
  } else {
    html += `
              <div class="dialog-content1">
                <p class="btn-shape c-white bg-blue center-flex">Skin đã sở hữu</p>
                <span>Không có skin nào</span>
              </div>
            </div>
          </div>
    `;
  }
  dialog.innerHTML = html;
}
function handleChangeCheckbox(userId, status) {
  Swal.fire({
    title: "Bạn có chắc?",
    text: "Bạn có muốn cập nhật status không?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Có",
    cancelButtonText: "Không",
  }).then((result) => {
    if (result.isConfirmed) {
      updateStatus(userId, status);
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      location.reload();
    }
  });
}
function updateStatus(userId, status) {
  let check;
  if (status === 0) {
    check = 1;
  } else if (status === 1) {
    check = 0;
  }

  fetch(`/admin/lockPlayer/${userId}?status=${check}`, {
    method: "PUT",
    headers: {
      Authorization: `${token}`,
    },
  })
    .then((res) =>
      res.json().then((data) => {
        if (data.success === 1) {
          Swal.fire({
            title: "Đổi thành công",
            text: "Bạn đã thay đổi thành công trạng thái của người chơi",
            icon: "success",
          });
        }
      })
    )
    .catch((err) => {
      if (err.code === 401) {
        handleUnauthorizedError();
      }
      Swal.fire({
        title: "Đổi thất bại",
        text: "Bạn đã thay đổi thất bại trạng thái của người chơi",
        icon: "error",
      });
    });
}
function handleUpdatePlayer(id) {
  const balance = document.getElementById("balance").value;
  fetch(`/admin/updatePlayer/${id}?x=0&y=0&z=0&balance=${balance}`, {
    method: "PUT",
    headers: {
      Authorization: `${token}`,
    },
  })
    .then((res) => {
      console.log(res);
      if (res.status === 401) {
        handleUnauthorizedError();
      }
      Swal.fire({
        title: "Cập nhật thành công",
        text: "Bạn đã cập nhật thành công thông tin của người chơi",
        icon: "success",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    })
    .catch((err) => {
      if (err.code === 401) {
        handleUnauthorizedError();
      }
      Swal.fire({
        title: "Cập nhật thất bại",
        text: "Bạn đã cập nhật thất bại thông tin của người chơi",
        icon: "error",
      });
    });
}
async function handleShowDialogGiveSkin(id_Player) {
  const dialog = document.getElementById("dialog");
  dialog.style.display = "block";
  const html = `
  <div class="dialog-content">
        <span class="close" onclick="closeDialog()">
          <i class="fa-sharp fa-solid fa-xmark fa-xl"></i>
        </span>
        <span class="btn-shape c-white bg-red w-git fs-25">Tặng Skin Cho Người Chơi</span>
        <div class="box-dialog-chil">
          <div class="dialog-content1">
            <label class="form-label">Tên Skin</label>
            <select class="form-control" id="gunskinId">
            </select>
            <label class="form-label">ID Skin</label>
            <input class="form-control w-full" type="text" id="nameSkin" readonly>
          </div>
        </div>
        <button
          class="btn-shape c-white bg-blue width-fit left-flex mt-10"
          id="btnGive"
        >Tặng skin</button>
      </div>`;
  dialog.innerHTML = html;
  const response = await fetch("/admin/getallgunskin", {
    method: "GET",
    headers: {
      Authorization: `${token}`,
    },
  });
  const data = await response.json();
  if (response.status === 401) {
    handleUnauthorizedError();
    return;
  }
  const gunskins = data.data;
  const selectEl = document.getElementById("gunskinId");
  gunskins.forEach((gunskin) => {
    const option = document.createElement("option");
    option.value = gunskin._id;
    option.text = gunskin.name;
    selectEl.add(option);
  });
  selectEl.addEventListener("change", (e) => {
    const nameSkin = document.getElementById("nameSkin");
    nameSkin.value = e.target.value;
  });
  document.getElementById("btnGive").addEventListener("click", (e) => {
    e.preventDefault();
    const gunskinId = document.getElementById("gunskinId").value;
    console.log(gunskinId);
    console.log(id_Player);
    handleGiveSkin(id_Player, gunskinId);
  });
}
function handleGiveSkin(id_Player, gunskinId) {
  fetch(`/admin/giveSkin?id_Player=${id_Player}&id_GunSkin=${gunskinId}`, {
    method: "PUT",
    headers: {
      Authorization: `${token}`,
    },
  })
    .then((res) => {
      if (res.status === 401) {
        handleUnauthorizedError();
      }
      Swal.fire({
        title: "Tặng skin thành công",
        text: "Bạn đã tặng skin thành công cho người chơi",
        icon: "success",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    })
    .catch((err) => {
      if (err.code === 401) {
        handleUnauthorizedError();
      }
      error = err.json();
      Swal.fire({
        title: "Tặng skin thất bại",
        text: error.notification,
        icon: "error",
      });
      window.location.reload();
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
