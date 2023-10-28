function init() {
  getalltransactionplayer();
}

const token = JSON.parse(localStorage.getItem("token"));
init();

async function getalltransactionplayer() {
  const response = await fetch("/admin/getalltransactionplayer", {
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
  gettransactionsplayer(data.data);
}

function gettransactionsplayer(data) {
  let row;
  let count = 0;
  const tableBody = document.querySelector("tbody");

  data.forEach((item) => {
    count++;
    console.log("lần duyệt player", count, item.id_Player);

    row = document.createElement("tr");
    
    playerCell = document.createElement("td");
    playerCell.setAttribute("data-label", "id_Player");
    playerCell.textContent = item.id_Player;
    playerCell.rowSpan += item.giaoDich.length;

    row.appendChild(playerCell);
    tableBody.appendChild(row);
    count = 0
    item.giaoDich.forEach((transaction) => {

      count++;
      console.log("lần duyệt súng", count, transaction.id_GunSkin);
      row = document.createElement("tr");
      console.log(transaction);
      const gunSkinCell = document.createElement("td");
      gunSkinCell.setAttribute("data-label", "Màu sắc");
      gunSkinCell.textContent = transaction.id_GunSkin;

      const nameSkinCell = document.createElement("td");
      nameSkinCell.setAttribute("data-label", "Tên Skin");
      nameSkinCell.textContent = transaction.nameSkin;

      const priceCell = document.createElement("td");
      priceCell.setAttribute("data-label", "Giá Mua");
      priceCell.textContent = transaction.price;

      const dateCell = document.createElement("td");
      dateCell.setAttribute("data-label", "Ngày Mua");
      const currentTime = new Date(transaction.Date);
      const momentDate = moment(currentTime);
      const vietnamDate = momentDate.tz("Asia/Ho_Chi_Minh");
      dateCell.textContent = vietnamDate.format("YYYY-MM-DD HH:mm:ss");
      row.appendChild(gunSkinCell);
      row.appendChild(nameSkinCell);
      row.appendChild(priceCell);
      row.appendChild(dateCell);
      tableBody.appendChild(row);

    });
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
