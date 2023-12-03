function init(){
    GetAllRewardCoin();
}
const token = JSON.parse(localStorage.getItem("token"));
if(!token){
    window.location.href = "/login";
}
init();
function GetAllRewardCoin(){
    fetch("/admin/getallreward", {
        method: "GET",
        headers: {
            Authorization: `${token}`,
        },
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        const dataRewardCoin = data.data;
        dataRewardCoin.forEach(rewardCoin => {
            FillAllRewardCoin(rewardCoin);
        });
    });
}
function FillAllRewardCoin(rewardCoin){
    const newRewardCoin = document.createElement("div");
    const currentTime = rewardCoin.Date;
const momentDate = moment(currentTime);
const vietnamDate = momentDate.tz("Asia/Ho_Chi_Minh");
const formattedadd = vietnamDate.add(10, 'hours')
const formatted = vietnamDate.format("YYYY-MM-DD HH:mm");
    newRewardCoin.innerHTML = `
    <div class="projects-box bg-white rad-10 align-c p-20 p-relative">
              <span class="c-grey fs-14">${formatted}</span>
              <h4 class="mt-0 mb-0 fs-18">Người chơi: ${rewardCoin.namePlayer}</h4>
              <p class="c-grey fs-16">Thời gian chơi:${rewardCoin.playingTime}</p>
              <p class="c-grey fs-16">Chế độ: ${rewardCoin.gameMode}</p>
              <div
                class="team-skills d-flex flex-start pt-15 pt-15 pb-15 mt-15 border-bottom border-top gap-5"
              >
                <p class="c-grey fs-16">Dot Coin: ${rewardCoin.dotcoin}</p>
              </div>
            </div>
            `
            const contrainer = document.getElementById("mainReward");
            contrainer.appendChild(newRewardCoin);
}