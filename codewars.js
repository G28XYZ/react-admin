const operators = {
  "+": (s) => +s.split("+")[0] + +s.split("+")[1],
  "-": (s) => +s.split("-")[0] - +s.split("-")[1],
  "*": (s) => s.split("*")[0] * +s.split("*")[1],
  "/": (s) => s.split("/")[0] / s.split("/")[1],
};

const ops = /\+|\-|\/|\*/g;
const inBrackets = /\((.*)\)/;
const opsList = ["*", "/", "+", "-"];

const _calc = (expr) => {
  let o = 0;
  while (o != 5) {
    let _reg = new RegExp(`\\d+(\\.\\d+)?[${opsList[o]}]\\d+(\\.\\d)?`, "g");
    console.log(_reg);
    if (expr.includes(opsList[o])) {
      let exp = expr.match(_reg);
      expr = expr.replace(exp[0], operators[opsList[o]]);
      console.log(expr);
    } else {
      o += 1;
    }
    console.log(expr);
  }
  return expr;
};

const calcInBrackets = (expr) => {
  let exp = expr.match(inBrackets);
  if (exp) {
    calcInBrackets(exp[1]);
  } else {
    expr = expr.replace(expr, _calc);
    console.log(expr);
    return _calc(expr);
  }
  return expr;
};

const normalize = (expr) => {
  expr = expr.replace(/ /g, "");
  expr = expr.replace("--", "+");
  expr = expr.replace("++", "+");
  expr = expr.replace("**", "*");
  expr = expr.replace("//", "/");
  return expr;
};

const calc = function (expr) {
  expr = normalize(expr);
  expr = calcInBrackets(expr);
  console.log(expr);
  return _calc(expr);
};

console.log(calc("2 / (5- 3+(1+1))"));
