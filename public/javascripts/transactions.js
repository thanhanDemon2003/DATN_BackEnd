function init() {
  getAllTransactions();
}

const token = JSON.parse(localStorage.getItem("token"));
if (!token) {
  window.location.href = "/login";
}
init();

async function getAllTransactions() {
  const res = await fetch("/admin/getalltransaction", {
    headers: {
      Authorization: `${token}`,
    },
  });
  if (res.statusCode === 401) {
    handleUnauthorizedError();
  }
  const transactions = await res.json();
  data = transactions.data;
  data.forEach((transaction) => {
    handleNewData(transaction);
  });
}
function handleNewData(transaction) {
  const newTransaction = document.createElement("transaction");
  newTransaction.id = transaction._id;
  const currentTime = new Date(transaction.Date);
  const momentDate = moment(currentTime);
  const vietnamDate = momentDate.tz("Asia/Ho_Chi_Minh");
  const formatted = vietnamDate.format("YYYY-MM-DD HH:mm:ss");
  if(transaction.price == -1){
    transaction.price = "Dot Team Tặng"
  }else{
    transaction.price = transaction.price + " - " + "DotCoin"
  }
  console.log(formatted);
  newTransaction.innerHTML = `
    <div class="projects-box bg-white rad-10 align-c p-20 p-relative">
    <span class="c-grey fs-13">${formatted}</span>
    <h4 class="mt-0 mb-0">Người chơi: ${transaction.namePlayer}</h4>
    <p class="c-grey fs-14">Loại súng: ${transaction.category}</p>
    <div
      class="team-skills d-flex flex-start pt-15 pt-15 pb-15 mt-15 border-bottom border-top gap-5"
    >
      <p class="c-grey fs-14 fw-bold">Tên skin súng: ${transaction.nameSkin}</p>
    </div>
    <div class="between-flex gap-20 pt-20">
      <div class="gap-20">
        <span id="player" data=${transaction.id_Player} class="btn-shape rad-6 c-white bg-green pointer">xem
          player</span>
        <span id="skin" data=${transaction.id_GunSkin} class="btn-shape rad-6 c-white bg-red pointer">xem skin</span>
      </div>
      <span class="c-grey">${transaction.price}</span>
    </div>
  </div>
      `;

  const container = document.getElementById("transaction-container");
  container.appendChild(newTransaction);

  const player = newTransaction.querySelector("#player");
  player.addEventListener("click", (e) => {
    const userId = player.getAttribute("data");
    console.log(userId);
    handleGetPlayer(userId);
  });
  const skin = newTransaction.querySelector("#skin");
  skin.addEventListener("click", (e) => {
    const skinId = skin.getAttribute("data");
    console.log(skinId);
    handleGetSkin(skinId);
  });
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
        <label>Dot Coin</label>
        <p> ${data.balance}</p>
        </div>
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
function closeDialog() {
  var dialog = document.getElementById("dialog");
  dialog.style.display = "none";
}

async function handleGetSkin(skinId) {
  const res = await fetch(`/admin/getgunskin/${skinId}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  if (res.status === 401) {
    handleUnauthorizedError();
  }
  const skin = await res.json();
  data = skin.data;
  handleShowDialogSkin(data);
}
function handleShowDialogSkin(skin) {
  const dialog = document.getElementById("dialog");
  dialog.style.display = "block";

  let html = `
            <div class="dialog-content h-100">
              <span class="close" onclick="closeDialog()">
                <i class="fa-sharp fa-solid fa-xmark fa-xl"></i>
                </span>
              <h2 btn-shape c-white bg-green center-flex>Dữ Liệu Skin Súng</h2>
              <div class="box-dialog-chil mt-30 ">
                  <p>Tên: ${skin.name} </p>
                  <p>Màu: ${skin.color}</p>
                  <p>Giá tiền: ${skin.price}</p>
                <p>Đang giảm: ${skin.percent}</p>

                </div>
                `;
  dialog.innerHTML = html;
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
