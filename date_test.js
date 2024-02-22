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
//   (Date.parse(waterDate) - Date.parse(currentDate)) / (24 * 3600000);
// console.log(daysLeft);

// console.log((waterDate - Date.now()) / (24 * 3600000));

// console.log(new Date() + Number(12) * 24 * 60 * 60 * 1000);

console.log(typeof Date.now());
