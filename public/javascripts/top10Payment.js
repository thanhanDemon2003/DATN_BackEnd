function init() {
  getTop10Payment();
  GetAllPlayer();
  tongDonate();
  handleThongKe();
}
init();
async function getTop10Payment() {
  fetch("/admin/Top10UseMonth", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.error == 4) {
        handleUnauthorizedErrorRole(data.msg);
      }
      if (data.error == 5) {
        Swal.fire({
          title: "Donate",
          text: data.msg,
          icon: "warning",
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/";
          }
        });
      }
      const top10PaymentAll = data.top10;
      renderTop10Payment(top10PaymentAll);
    });
}
function renderTop10Payment(top10PaymentAll) {
  const monthNow = document.getElementById("monthNow");
  const date = new Date();
  const dateMonment = moment(date);
  const formatValue = dateMonment.format("MM/YYYY");
  monthNow.textContent = "Xếp hạng nạp tiền tháng " + formatValue;
  let rank = 1;
  top10PaymentAll.forEach((element) => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    nameCell.setAttribute("data-label", "Tên");

    nameCell.innerText = element.buyerName;

    const dateCell = document.createElement("td");
    dateCell.setAttribute("data-label", "Ngày nạp gần nhất");
    const currentTime = new Date(element.date);
    const momentDate = moment(currentTime);
    const vietnamDate = momentDate.tz("Asia/Ho_Chi_Minh");
    const formatted = vietnamDate.format("YYYY-MM-DD HH:mm:ss");

    dateCell.innerText = formatted;

    const amountCell = document.createElement("td");
    amountCell.setAttribute("data-label", "Số tiền");
    const amount = element.total
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    amountCell.innerText = amount + " VNĐ";

    const rankCell = document.createElement("td");
    rankCell.setAttribute("data-label", "Xếp hạng");
    const rankPaymment = rank++;
    if (rankPaymment == 1) {
      rankCell.innerHTML = `<span
    class="btn-shape c-white bg-red"
  >TOP 1</span>`;
    } else if (rankPaymment == 2) {
      rankCell.innerHTML = `<span
        class="btn-shape c-white bg-orange"
        >TOP 2</span>`;
    } else if (rankPaymment == 3) {
      rankCell.innerHTML = `<span
        class="btn-shape c-white bg-yellow"
        >TOP 3</span>`;
    } else {
      rankCell.innerHTML = `<span
        class="btn-shape c-white bg-green"
        >TOP ${rankPaymment}</span>`;
    }
    row.appendChild(nameCell);
    row.appendChild(dateCell);
    row.appendChild(amountCell);
    row.appendChild(rankCell);
    const tableBody = document.querySelector("tbody");
    tableBody.appendChild(row);
  });
}
async function GetAllPlayer() {
  fetch("/admin/getAllPlayers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.error == 4) {
        handleUnauthorizedErrorRole(data.msg);
      }
      const allPlayer = data.data;
      const playerLength = allPlayer.length;
      const playerNum = playerLength.toString();
      console.log(playerNum);
      const playerLenghtElement = document.getElementById("playerLenght");
      playerLenghtElement.textContent = playerNum;
    });
}
async function tongDonate() {
  fetch("/admin/tongDonate", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.error == 4) {
        handleUnauthorizedErrorRole(data.msg);
      }
      const tongDonate = data.data;
      const tongDonateElement = document.getElementById("tongDonate");
      const amount = tongDonate
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      tongDonateElement.textContent = amount + " VNĐ";
    });
}
function handleThongKe(year) {
  fetch("/admin/ThongKePayment?year=" + year, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error == 4) {
        handleUnauthorizedErrorRole(data.msg);
      }
      const thongKe = data.thongKe;
      let arrMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      thongKe.forEach((tk) => {
        const index = arrMonth.indexOf(tk.month);
        if (index > -1) {
          arrMonth.splice(index, 1);
        }
      });
      arrMonth.forEach((month) => {
        const obj = {
          month: month,
          sumSuc: 0,
          sumCan: 0,
          sumPen: 0,
          pending: 0,
          cancel: 0,
          success: 0,
          totalTransactions: 0,
          totalAmount: 0,
        };
        thongKe.push(obj);
      });
      thongKe.sort((a, b) => {
        return a.month - b.month;
      });
      thongKe.forEach((tk) => {
        renderThongKe(tk);
      });
      console.log(thongKe, "thongkePayment");
    });
}
function renderThongKe(tk) {
  const thongKeDiv = document.createElement("div");
  thongKeDiv.classList.add("bar");
  let percentSuc = (tk.sumSuc / tk.totalAmount) * 100;
  let percentCan = (tk.sumCan / tk.totalAmount) * 100;
  let percentPen = (tk.sumPen / tk.totalAmount) * 100;
  const amountTong = tk.totalAmount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const amountSuc = tk.sumSuc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const amountCan = tk.sumCan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const amountPen = tk.sumPen.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  if (tk.totalAmount > 500000) {
    percentCan = (percentCan * 250) / 100 + "px;";
    percentSuc = (percentSuc * 250) / 100 + "px;";
    percentPen = (percentPen * 250) / 100 + "px;";
  } else if (tk.totalAmount < 500000) {
    let percentAmount = (tk.totalAmount / 500000) * 100 * 2.3;
    percentCan = (percentCan * percentAmount) / 100 + "px;";
    percentSuc = (percentSuc * percentAmount) / 100 + "px;";
    percentPen = (percentPen * percentAmount) / 100 + "px;";
  }

  console.log(percentSuc, percentCan, percentPen);
  thongKeDiv.innerHTML = `
              <div class="bar-item">
              <span class="bg-orange" style="height:${percentPen};"></span>
                <span class="bg-red" style="height:${percentCan}"></span>
                <span class="bg-green" style="height:${percentSuc}"></span>
              </div>

              <div class="value-hover">
                <div>Số giao dịch: ${tk.totalTransactions}</div>
                <div>Tổng:${amountTong} </div>
                <div>Đã thanh toán: ${amountSuc}</div>
                <div>Chờ thanh toán: ${amountPen}</div>
                <div>Đã hủy:${amountCan}</div>
              </div>
    `;
  const containerThongKe = document.getElementById("thongke");
  containerThongKe.appendChild(thongKeDiv);
}
const slectNam = document.getElementById("charNam");
slectNam.addEventListener("change", (e) => {
const year = e.target.value;
console.log(year);
  const thongke = document.getElementById("thongke");
  thongke.innerHTML = "";
  handleThongKe(year);
});
function handleUnauthorizedErrorRole(msg) {
  Swal.fire({
    title: "Lỗi",
    text: msg,
    icon: "error",
    showConfirmButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "/login";
      localStorage.clear();
    }
  });
}
