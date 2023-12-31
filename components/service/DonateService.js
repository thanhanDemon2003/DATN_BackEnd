const donateModel = require("../model/DonateModel");

const UpDonate = async (name, amount, method, Date) => {
  const data = await donateModel.create({
    name,
    amount,
    method,
    Date,
  });
  return data;
};
const GetAllDonate = async () => {
  const data = await donateModel.find();
  return data;
};
const updateDonate = async (id, name, amount, method) => {
  const data = await donateModel.findById(id);
  data.name = name||data.name;
  data.amount = amount||data.amount;
  data.method = method||data.method;
  await data.save();
  console.log(id, name, amount, method, "service");

  return data;
};
const deleteDonate = async (id) => {
  const data = await donateModel.findByIdAndDelete(id);
  return data;
};
const tongDonate = async ()=>{
  const donate = await donateModel.find();
  const sumDonate = donate.reduce((a,b)=>{
    const amountNumber = Number(b.amount);
    
    return a + amountNumber;
  },0)
  return sumDonate;
}
module.exports = {
  UpDonate,
  GetAllDonate,
  deleteDonate,
  updateDonate,
  tongDonate
};
