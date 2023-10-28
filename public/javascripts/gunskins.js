
function init() {
  getallgunskin();
}

const token = JSON.parse(localStorage.getItem("token"));
var checked = {};
init();

async function getallgunskin() {
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
  getGunSkins(data.data);
}

function getGunSkins(data) {
  data.forEach((item) => {
    const row = document.createElement("tr");
    row.id = item._id;

    const nameCell = document.createElement("td");
    nameCell.setAttribute("data-label", "Tên Skin");
    nameCell.textContent = item.name;
    nameCell.addEventListener("click", function(e)
    {

      e.preventDefault();
      handleViewSkin(row.id);
    
    });

    const colorCell = document.createElement("td");
    colorCell.setAttribute("data-label", "Màu sắc");
    colorCell.textContent = item.color;
    colorCell.addEventListener("click", function(e)
    {

      e.preventDefault();
      handleViewSkin(row.id);
    
    });
    const priceCell = document.createElement("td");
    priceCell.setAttribute("data-label", "Giá tiền");
    priceCell.textContent = item.price;
    priceCell.addEventListener("click", function(e)
    {

      e.preventDefault();
      handleViewSkin(row.id);
    
    });
    const percentCell = document.createElement("td");
    percentCell.setAttribute("data-label", "Đang giảm");
    percentCell.textContent = item.percent;
    percentCell.addEventListener("click", function(e)
    {

      e.preventDefault();
      handleViewSkin(row.id);
    
    });
    const categoryCell = document.createElement("td");
    categoryCell.setAttribute("data-label", "Loại");
    categoryCell.textContent = item.category;
    categoryCell.addEventListener("click", function(e)
    {

      e.preventDefault();
      handleViewSkin(row.id);
    
    });
    const percent = document.createElement("td");
    percent.setAttribute("data-label", "Trạng thái");

    const statusSpan = document.createElement("span");
    statusSpan.id = item.status;
    statusSpan.dataset.id_Skin = item._id;
    if (item.status === 2) {
      statusSpan.textContent = "Đang giảm giá";
      statusSpan.classList.add("bg-orange");
    } else if (item.status === 1) {
      statusSpan.textContent = "Đang Bán";
      statusSpan.classList.add("bg-green");
    } else {
      statusSpan.textContent = "Tạm Ngừng Bán";
      statusSpan.classList.add("bg-red");
    }
    statusSpan.classList.add("btn-shape", "c-white", "pointer");

    statusSpan.addEventListener("click", handleStatusClick);

    const checkTd = document.createElement("td");
    checkTd.setAttribute("data-label", "Chọn");

    const checkbox = document.createElement("input");
    checkbox.id = "myCheckbox";
    checkbox.classList.add("checkbox-Table");
    checkbox.type = "checkbox";
    checkbox.value = item._id;

    percent.appendChild(statusSpan);
    checkTd.appendChild(checkbox);
    row.appendChild(nameCell);
    row.appendChild(colorCell);
    row.appendChild(priceCell);
    row.appendChild(percentCell);
    row.appendChild(categoryCell);
    row.appendChild(percent);
    row.appendChild(checkTd);

    const tableBody = document.querySelector("tbody");
    tableBody.appendChild(row);
  });
}
function handleStatusClick(e) {
  const idSkin = e.target.dataset.id_Skin;
  const idSpan = e.target.id;
  let status = "";
  if (idSpan == 1 || idSpan == 2) {
    status = 0;
  } else {
    status = 1;
  }
  Swal.fire({
    title: "Thay đổi trạng thái",
    text: "Bạn có chắc muốn thay đổi trạng thái?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Có",
    cancelButtonText: "Không",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`/admin/deletegunskin/${idSkin}?status=${status}`, {
        method: "PUT",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res);
        Swal.fire({
          title: "Thành công",
          text: "Thay đổi trạng thái thành công",
          icon: "success",
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
        if (res.status === 401) {
          handleUnauthorizedError();
          return;
        } else if (res.status !== 200) {
          Swal.fire({
            title: "Thất bại",
            text: "Thay đổi trạng thái thất bại",
            icon: "error",
            showConfirmButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
          return;
        }
      });
    }
  });
}
function handleSaleSkins() {
  const dialog = document.getElementById("dialog");
  dialog.style.display = "block";
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const checkedValues = Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);
  const saleSkin = document.getElementById("saleSkin");
  const ipParent = document.getElementById("ipParent");
  saleSkin.addEventListener("click", (e) => {
    const percent = ipParent.value;
    saleSkinApi(checkedValues, percent);
  });
}
function saleSkinApi(checkedValues, percent) {
  fetch("/admin/discountgunskin", {
    method: "PUT",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ids: checkedValues,
      percent: percent,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.status === 401) {
        handleUnauthorizedError();
        return;
      }
      if (res.status !== 200) {
        console.log(res);
        Swal.fire({
          title: "Thất bại",
          text: res.notification,
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
        text: "Giảm giá thành công",
        icon: "success",
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
      });
    });
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
function handleViewSkin(id) {
  const dialog = document.getElementById("dialogAdd");
  dialog.style.display = "block";

  const label = document.getElementById("labelGun");
  const nameSkin = document.getElementById("nameSkin");
  const colorSkin = document.getElementById("colorSkin");
  const priceSkin = document.getElementById("priceSkin");
  const categorySkin = document.getElementById("categorySkin");
  const btnAddSkin = document.getElementById("btnAddSkin");
  btnAddSkin.textContent = "Cập Nhật";
  label.textContent = "Xem Skin";
  fetch(`/admin/getgunskin/${id}`, {

      method: "GET",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.error === 4) {
        handleUnauthorizedError();
        return;
      }
      if (res.success !== true) {
        console.log(res);
        Swal.fire({
          title: "Thất bại",
          text: res.notification,
          icon: "error",
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
        return;
      }
      nameSkin.value = res.data.name;
      colorSkin.value = res.data.color;
      priceSkin.value = res.data.price;
      categorySkin.value = res.data.category;
    });
  btnAddSkin.addEventListener("click", (e) => {
    const name = nameSkin.value;
    const color = colorSkin.value;
    const price = priceSkin.value;
    const category = categorySkin.value;
    editSkinApi(id, name, color, price, category);
  });
}
function editSkinApi(id, name, color, price, category) {
  fetch(`/admin/updategunskin/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      color: color,
      price: price,
      category: category,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.error === 4) {
        handleUnauthorizedError();
        return;
      }
      if (res.success !== 0) {
        Swal.fire({
          title: "Thất bại",
          text: res.notification,
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
        text: "Sửa skin thành công",
        icon: "success",
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
      });
    });
}
function addGunSkin() {
  const dialog = document.getElementById("dialogAdd");
  dialog.style.display = "block";
  const label = document.getElementById("labelGun");
  label.textContent = "Thêm Skin Súng Nè";
  const nameSkin = document.getElementById("nameSkin");
  const colorSkin = document.getElementById("colorSkin");
  const priceSkin = document.getElementById("priceSkin");
  const categorySkin = document.getElementById("categorySkin");
  const btnAddSkin = document.getElementById("btnAddSkin");
  btnAddSkin.textContent = "Thêm";
  btnAddSkin.addEventListener("click", (e) => {
    addSkinApi(nameSkin, colorSkin, priceSkin);
  });
  function addSkinApi() {
    fetch("/admin/gunskin", {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameSkin.value,
        color: colorSkin.value,
        category: categorySkin.value,
        price: priceSkin.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.error === 4) {
          handleUnauthorizedError();
          return;
        }
        if (res.success !== 0) {
          console.log(res);
          Swal.fire({
            title: "Thất bại",
            text: res.notification,
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
          text: "Thêm skin thành công",
          icon: "success",
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
      });
  }
}
function closeDialogAdd() {
  var dialog = document.getElementById("dialogAdd");
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
