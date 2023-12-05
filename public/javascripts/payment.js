 
function init() {
    GetAllPayments();
  }
  
  const token = JSON.parse(localStorage.getItem("token"));
  
  if (!token) {
    window.location.href = "/login";
  }
  init();

function GetAllPayments() {
  fetch("/admin/getallpayment", {
    method: "GET",
    headers: {
      Authorization: `${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 401) {
        handleUnauthorizedErrorRole(data.notification);
      }
      console.log(data.payment);
    const dataPayment = data.payment;
    dataPayment.forEach(payment => {
        FillAllPayment(payment);
      });
      
    });
}
function FillAllPayment (data){
const newPayment = document.createElement("payment");
newPayment.id = data._id;
const currentTime = data.Date
const momentDate = moment(currentTime);
const vietnamDate = momentDate.tz("Asia/Ho_Chi_Minh");
const formattedadd = vietnamDate.add(10, 'hours')
const formatted = formattedadd.format("YYYY-MM-DD HH:mm");
if(data.statusPayment === "PENDING"){
    cssPayment = "bg-yellow";
}
else if(data.statusPayment === "PAID"){
     cssPayment = "bg-green"
}
else if(data.statusPayment === "CANCELLED"){
     cssPayment = "bg-red"
}
newPayment.innerHTML = `
<div class="projects-box bg-white rad-10 align-c p-20 p-relative">
              <span class="c-grey fs-14">${formatted}</span>
              <h4 class="mt-0 mb-0 fs-18">Người chơi: ${data.buyerName}</h4>
              <p class="c-grey fs-16">
                ID giao dịch của đối tác: ${data.transitionID}
              </p>
              <p class="c-grey fs-16">
                Mã oder: ${data.orderCodePayment}
              </p>
              <p class="c-grey fs-16">
                Phương thức nạp: ${data.methodPayment}
              </p>
              <p class="c-grey fs-16">
                dotCoint: ${data.dotCoint}
              </p>
              <div
                class="team-skills d-flex flex-start pt-15 pt-15 pb-15 mt-15 border-bottom border-top gap-5"
              >
                <p class="c-grey fs-16">Số tiền nạp: ${data.amountPayment}</p>
              </div>
              <div class="between-flex gap-20 pt-20">
                <div class="gap-20">
                  <span class="btn-shape rad-6 c-white ${cssPayment}">${data.statusPayment}</span>
                </div>
              </div>
            </div>
            `;
const container = document.getElementById("mainPayment");
container.appendChild(newPayment);
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
