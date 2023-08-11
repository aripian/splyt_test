function defaultArguments(functionToDecorate, defaults) {
  function wrapper(...args) {
    const kwargs = {};
    for (const [name, value] of Object.entries(defaults)) {
      if (!args.find((arg) => arg === name)) {
        kwargs[name] = value;
      }
    }

    return functionToDecorate(...args, kwargs);
  }

  return wrapper;
}

function add(a, b) {
 return a + b;
};
const add2 = defaultArguments(add, { b: 9 });
console.assert(add2(10) === 19);
console.assert(add2(10, 7) === 17);
console.assert(isNaN(add2()));
const add3 = defaultArguments(add2, { b: 3, a: 2 });
console.assert(add3(10) === 13);
console.assert(add3() === 5);
const add4 = defaultArguments(add, { c: 3 }); // doesn't do anything, since c isn't an argument
console.assert(isNaN(add4(10)));
console.assert(add4(10, 10) === 20);
const add5 = defaultArguments(add2, { a: 10 }); //extends add2
console.assert(add5() === 19); // a=10, b=9