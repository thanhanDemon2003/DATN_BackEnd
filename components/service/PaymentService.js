const { set, groupBy, sum } = require("lodash");
const paymentModel = require("../model/PaymentModel.js");
const GetAllPayments = async () => {
  const allPayment = await paymentModel.find().sort({ Date: -1 });
  return allPayment;
};
const GetPaymentPlayer = async (idPlayer) => {
  const payment = await paymentModel.find({ idPlayer: idPlayer });
  return payment;
};
// const ThongKePayment = async () => {
//   let pipeline = [];
//   console.log(period);
//   switch (period) {
//     case "day":
//       console.log("day");
//       pipeline = [
//         {
//           $group: {
//             _id: {
//               day: { $dayOfMonth: "$Date" },
//             },
//             total: { $sum: 1 },
//             date: {
//               $first: {
//                 $dateToString: {
//                   format: "%Y/%m/%d",
//                   date: "$Date",
//                 },
//               },
//             },
//             pending: {
//               $sum: { $cond: [{ $eq: ["$statusPayment", "PENDING"] }, 1, 0] },
//             },
//             success: {
//               $sum: { $cond: [{ $eq: ["$statusPayment", "PAID"] }, 1, 0] },
//             },
//             cancel: {
//               $sum: { $cond: [{ $eq: ["$statusPayment", "CANCELLED"] }, 1, 0] },
//             },
//           },
//         },
//       ];

//       break;

//     case "month":
//       console.log("month");
//       pipeline = [
//         {
//           $group: {
//             _id: {
//               month: { $month: "$Date" },
//               year: { $year: "$Date" },
//             },
//             total: { $sum: 1 },
//             date: {
//               $first: {
//                 $dateToString: {
//                   format: "%Y/%m/%d",
//                   date: "$Date",
//                 },
//               },
//             },
//             pending: {
//               $sum: { $cond: [{ $eq: ["$statusPayment", "PENDING"] }, 1, 0] },
//             },
//             success: {
//               $sum: { $cond: [{ $eq: ["$statusPayment", "PAID"] }, 1, 0] },
//             },
//             cancel: {
//               $sum: { $cond: [{ $eq: ["$statusPayment", "CANCELLED"] }, 1, 0] },
//             },
//           },
//         },
//       ];
//       break;

//     default:
//       console.log("year");
//       pipeline = [
//         {
//           $group: {
//             _id: { year: { $year: "$Date" } },
//             total: { $sum: 1 },
//             total: { $sum: 1 },
//             date: {
//               $first: {
//                 $dateToString: {
//                   format: "%Y/%m",
//                   date: "$Date",
//                 },
//               },
//             },
//             pending: {
//               $sum: { $cond: [{ $eq: ["$statusPayment", "PENDING"] }, 1, 0] },
//             },
//             success: {
//               $sum: { $cond: [{ $eq: ["$statusPayment", "PAID"] }, 1, 0] },
//             },
//             cancel: {
//               $sum: { $cond: [{ $eq: ["$statusPayment", "CANCELLED"] }, 1, 0] },
//             },
//           },
//         },
//       ];
//   }

//   const result = await paymentModel.aggregate(pipeline);
//   return result;
// };
const ThongKePayment = async (year) => {
  year = parseInt(year);
  let pipeline = [];
  pipeline = [
    {
      $match: {
        $expr: {
          $eq: [{$year: "$Date"}, year] 
        }
      },
    },
    {
      $group: {
        _id: {
          month: { $month: "$Date" },
        },
        totalTransactions: { $sum: 1 },
        totalAmount: { $sum: "$amountPayment" },
        pending: { $sum: { $cond: [{ $eq: ["$statusPayment", "PENDING"] }, 1, 0] } },
        success: { $sum: { $cond: [{ $eq: ["$statusPayment", "PAID"] }, 1, 0] } },
        cancel: { $sum: { $cond: [{ $eq: ["$statusPayment", "CANCELLED"] }, 1, 0] } },
        sumPen: {$sum: { $cond: [{ $eq: ["$statusPayment", "PENDING"] }, "$amountPayment", 0] }},
        sumSuc: {$sum: { $cond: [{ $eq: ["$statusPayment", "PAID"] }, "$amountPayment", 0] }},
        sumCan: {$sum: { $cond: [{ $eq: ["$statusPayment", "CANCELLED"] }, "$amountPayment", 0] }},
      },
    },
    {
      $project: {
        _id: 0,
        month: "$_id.month",
        totalTransactions: 1,
        totalAmount: 1,
        pending: 1,
        sumPen: 1,
        success: 1,
        sumSuc: 1,
        cancel: 1,
        sumCan: 1,
      },
    },
    {
      $sort: {
        month: 1,
      },
    },
  ];
  const result = await paymentModel.aggregate(pipeline);
  return result;
};

const Top10UseMonth = async () => {
  const currentMonth = new Date().getMonth();

  const startMonth = new Date(new Date().getFullYear(), currentMonth, 1);

  const endMonth = new Date(new Date().getFullYear(), currentMonth + 1, 1);

  const Top10All = await paymentModel
    .find({
      statusPayment: "PAID",
      Date: {
        $gte: startMonth,
        $lt: endMonth,
      },
    })
    .sort({ amountPayment: -1 });
  const grouped = groupBy(Top10All, "buyerName");
  const totals = Object.keys(grouped).map((buyerName) => {
    const payments = grouped[buyerName];

    return {
      buyerName,
      date: payments[payments.length - 1].Date,
      total: payments.reduce((sum, payment) => {
        return sum + payment.amountPayment;
      }, 0),
    };
  });
  totals.sort((a, b) => b.total - a.total);
  return totals;
};
const updatePaymentVietQr = async(orderCodePayment, transitionID) => {
  const payment = await paymentModel.findOne({orderCodePayment: orderCodePayment});
  payment.transitionID = transitionID||transitionID;
  await payment.save();
}
const updatePayment = async(transitionID, status) => {
  const payment = await paymentModel.findOne({transitionID: transitionID});
  if (payment.statusPayment == "PENDING") {
    payment.statusPayment = status||status;
    await payment.save();
    return payment;
  }
  return null;
  
}
module.exports = {
  GetAllPayments,
  GetPaymentPlayer,
  ThongKePayment,
  Top10UseMonth,
  updatePaymentVietQr,
  updatePayment
};
