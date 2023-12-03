function init() {
  GetAllDonate();
}
const token = JSON.parse(localStorage.getItem("token"));
init();
if (!token) {
  window.location.href = "/login";
  Storage.clear();
}
async function GetAllDonate() {
  fetch("/admin/getalldonate", {
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
      const donateAll = data.data;

      renderAllDonate(donateAll);
    });
}
var count = 1;
function renderAllDonate(donateAll) {
  donateAll.forEach((donate) => {
    const row = document.createElement("tr");
    row.id = donate._id;
    row.nameDonate = donate.name;
    row.Date = donate.Date;
    row.method = donate.method;
    row.amount = donate.amount;
    const sttCell = document.createElement("td");
    sttCell.setAttribute("data-label", "STT");
    sttCell.innerText = count++;
    const nameCell = document.createElement("td");
    nameCell.setAttribute("data-label", "Tên");
    nameCell.innerText = donate.name;

    const DateTimeCell = document.createElement("td");
    DateTimeCell.setAttribute("data-label", "Thời gian");
    DateTimeCell.innerText = donate.Date;

    const methodCell = document.createElement("td");
    methodCell.setAttribute("data-label", "Phương thức");
    methodCell.innerText = donate.method;

    const amountCell = document.createElement("td");
    amountCell.setAttribute("data-label", "Số tiền");
    amountCell.innerText = donate.amount;

    row.addEventListener("click", () => {
      viewDonate(row.id, row.nameDonate, row.amount, row.method, row.Date);
    });
    row.appendChild(sttCell);
    row.appendChild(nameCell);
    row.appendChild(DateTimeCell);
    row.appendChild(methodCell);
    row.appendChild(amountCell);
    const tableBody = document.querySelector("tbody");
    tableBody.appendChild(row);
  });
}
function viewDonate(id, name, amount, method, Date) {
  console.log(id, name, amount, method, Date);
  const dialogDonate = document.getElementById("dialogAddDonate");
  dialogDonate.style.display = "block";
  const lableDonate = document.getElementById("lableDonate");
  lableDonate.textContent = "Chi tiết";
  const nameDonate = document.getElementById("nameDonate");
  nameDonate.value = name;
  const amountDonate = document.getElementById("amountDonate");
  amountDonate.value = amount;
  const methodDonate = document.getElementById("methodDonate");
  methodDonate.value = method;
  const dateDonate = document.getElementById("timeDonate");
  dateDonate.value = Date;
  const btnUpdate = document.getElementById("btnDonate");
  btnUpdate.textContent = "Cập nhật";
  btnUpdate.addEventListener("click", () => {
    updateDonate(id);
  });
  const btnDelete = document.getElementById("btnXoa");
  btnDelete.style.display = "block";

  btnDelete.addEventListener("click", () => {
    deleteDonate(id);
  });
}
function updateDonate(id) {
  const nameDonate = document.getElementById("nameDonate").value;
  const amountDonate = document.getElementById("amountDonate").value;
  const methodDonate = document.getElementById("methodDonate").value;
  const dateDonate = document.getElementById("timeDonate").value;

  if (!nameDonate || !amountDonate || !methodDonate || !dateDonate) {
    Swal.fire({
      title: "Lỗi",
      text: "Thiếu dữ liệu",
      icon: "warning",
      showConfirmButton: true,
    });
    return;
  }
  const DateTimeNow = new Date();
  const DateTime = new Date(dateDonate);
  if (DateTimeNow.getTime() < DateTime.getTime()) {
    Swal.fire({
      title: "Lỗi",
      text: "Thời gian không hợp lệ",
      icon: "warning",
      showConfirmButton: true,
    });
    return;
  }
  const donate = {
    name: nameDonate,
    amount: amountDonate,
    method: methodDonate,
    Date: dateDonate,
  };
  fetch(`/admin/updatedonate/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(donate),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      console.log(data.error);
      console.log(data.msg);
      if (data.error = 4) {
        handleUnauthorizedErrorRole(data.msg);
      }
      if ( data.error = 5) {
        Swal.fire({
          title: "Donate",
          text: data.msg,
          icon: "warning",
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
      }else{
        Swal.fire({
          title: "Donate",
          text: data.notification,
          icon: "success",
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
          setTimeout(() => {
            location.reload();
          }, 2000);
        });
      }
      
    });
}
function closeDialogAdd() {
  const dialogDonate = document.getElementById("dialogAddDonate");
  dialogDonate.style.display = "none";
}
function addDonate() {
  const dialogDonate = document.getElementById("dialogAddDonate");
  dialogDonate.style.display = "block";
  const lableDonate = document.getElementById("lableDonate");
  lableDonate.textContent = "Thêm Donate";
  const nameDonate = document.getElementById("nameDonate");
  nameDonate.value = "";
  const amountDonate = document.getElementById("amountDonate");
  amountDonate.value = "";
  const methodDonate = document.getElementById("methodDonate");
  methodDonate.value = "";
  const dateDonate = document.getElementById("timeDonate");
  dateDonate.value = "";
  const btnUpdate = document.getElementById("btnDonate");
  btnUpdate.textContent = "Thêm";
  const btnDelete = document.getElementById("btnXoa");
  btnDelete.style.display = "none";
  btnUpdate.addEventListener("click", () => {
    createDonate();
  });
}
function createDonate() {
  const nameDonate = document.getElementById("nameDonate").value;
  const amountDonate = document.getElementById("amountDonate").value;
  const methodDonate = document.getElementById("methodDonate").value;
  const dateDonate = document.getElementById("timeDonate").value;
  const donate = {
    name: nameDonate,
    amount: amountDonate,
    method: methodDonate,
    Date: dateDonate,
  };
  fetch("/admin/createdonate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(donate),
  })
    .then((res) => res.json())
    .then((data) => {
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
            location.reload();
          }
        });
      }
      Swal.fire({
        title: "Donate",
        text: data.notification,
        icon: "success",
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
        setTimeout(() => {
          location.reload();
        }, 2000);
      });
    });
}
function deleteDonate(id) {
  Swal.fire({
    title: "Bạn có chắc muốn xóa donate này?",
    text: "Bạn sẽ không thể hoàn tác lại điều này!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Xóa",
    cancelButtonText: "Hủy",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`/admin/deletedonate/${id}`, {
        method: "PUT",
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
          if (data.error == 5) {
            Swal.fire({
              title: "Donate",
              text: data.msg,
              icon: "warning",
              showConfirmButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                location.reload();
              }
            });
          }
          Swal.fire({
            title: "Donate",
            text: data.notification,
            icon: "success",
            showConfirmButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
            setTimeout(() => {
              location.reload();
            }, 2000);
          });
        });
    }
  });
}
function handleUnauthorizedErrorRole(error) {
  Swal.fire({
    title: error,
    text: error,
    icon: "error",
    showConfirmButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "/login";
      Storage.clear();
    }
  });
}
