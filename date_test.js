const func = (days) => {
  return new Date(Date.now() + days * (24 * 3600000));
};

// console.log(func(10));

// const waterDate = func(10);
// const currentDate = new Date(Date.now());

// console.log(waterDate.getDay(), "From Waterdate");
// console.log(currentDate.getDay(), "from curr date");

// console.log(Date.parse(waterDate));
// console.log(Date.parse(currentDate));

// const daysLeft =
//   (Date.parse(waterDate) - Date.parse(currentDate)) / (24 * 3 600 000);
// console.log(daysLeft);

// console.log((waterDate - Date.now()) / (24 * 3 600000));

// console.log(new Date() + Number(12) * 24 * 60 * 60 * 1000);

// console.log(Date.now());

let currDate = new Date();
console.log(currDate, "wewew");
let numberOfDaysToAdd = 12;
let result = currDate.setDate(currDate.getDate() + numberOfDaysToAdd);
console.log(new Date(result), "<--- new date result");
console.log(Date.now())