const { longExecutingfunc } = require("./library.js");

function thirdFunc() {
  console.log("3rd");
  console.log("3rd after");
}
function secondFunc() {
  console.log("2nd");
  thirdFunc();
}
function firstFunc() {
  console.log("1st");
  secondFunc();
  longExecutingfunc()
}

firstFunc();


console.log('finished')