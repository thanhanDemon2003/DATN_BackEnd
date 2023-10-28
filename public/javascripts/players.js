function init() {
  getAllUsers();
}

const token = JSON.parse(localStorage.getItem("token"));
var checked = {};

if (!token) {
  window.location.href = '/login';
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
  var fb_id = user.fb_id.toString();

  if (fb_id.length > 10) {
    fb_id = fb_id.slice(0, 10) + "...";
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
    <div class="fs-14">
      <span class="c-grey">FB:</span>
      <span>${fb_id}</span>
    </div>
    <div class="fs-14">
      <span class="c-grey">Vị trí game:</span>
      <span
        ><span>x:${user.positionX} </span>
        <span>y:${user.positionY} </span
        ><span>z:${user.positionZ} </span></span
      >
    </div>
    <div class="fs-14">
      <span class="c-grey">Tiền:</span>
      <span>${user.balance} </span>
    </div>
    <div class="fs-14">
      <span class="c-grey" id="gunskin">Skin súng</span>
      <span>${user.wardrobe.length}</span>
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
              <p>FB: ${data.fb_id} </p>
              <div class="form-group">
              <label>positionX</label>
              <input type="number" name="" id="positionX" value="${data.positionX}">
              </div>
              <div class="form-group">
              <label>positionY</label>
              <input type="number" name="" id="positionY" value="${data.positionY}">
              </div>
              <div class="form-group">
              <label>positionZ</label>
              <input type="number" name="" id="positionZ" value="${data.positionZ}">
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
                <div class="dialog-content1">
                <span class="fw-bold c-grey">STT: ${stt++}</span>
                <div class="form-group">
                <span class="fw-bold">id_Skin:  </span>
                <span class="fw-n">${skin.gunskinId}<span>
                </div>
                <div class="form-group">
                  <span class="fw-bold">Tên Skin:</span>
                   <span class="fw-n">${skin.nameSkin}<span>
                </div>
                <div class="form-group">

                   <span class="fw-bold">Màu: </span>
                   <span class="fw-n">${skin.color} </span>
                </div>
                <div class="form-group mb-15">

                    <span class="fw-bold">Category: </span>
                    <span class="fw-n">${skin.category} </span>
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
  }).then((result) => {
    if (result.isConfirmed) {
      updateStatus(userId, status);
    } else if (result.isDismissed) {
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
    .then((res) => {
      Swal.fire({
        title: "Đổi thành công",
        text: "Bạn đã thay đổi thành công trạng thái của người chơi",
        icon: "success",
      });
    })
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
  const positionX = document.getElementById("positionX").value;
  const positionY = document.getElementById("positionY").value;
  const positionZ = document.getElementById("positionZ").value;
  const balance = document.getElementById("balance").value;
  fetch(
    `/admin/updatePlayer/${id}?x=${positionX}&y=${positionY}&z=${positionZ}&balance=${balance}`,
    {
      method: "PUT",
      headers: {
        Authorization: `${token}`,
      },
    }
  )
    .then((res) => {
      user = res.json();
      if (res.status === 401) {
        handleUnauthorizedError();
      }
      Swal.fire({
        title: "Cập nhật thành công",
        text: "Bạn đã cập nhật thành công thông tin của người chơi",
        icon: "success",
      });
      if (user.error !== 200) {
        Swal.fire({
          title: "Cập nhật thất bại",
          text: "Bạn đã cập nhật thất bại thông tin của người chơi",
          icon: "error",
        });
      }
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
      window.location.reload();
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
