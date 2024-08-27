"use strict";
// intro
let message = 'Hello World';
console.log(message);
// sets a and b to number, will not be able to pass anything else in.
const sum = (a, b) => {
    return a + b;
};
// sum('hello', 65); // gives error on the string
// Typscript 3 Video
// Types in TS.
// boolean
let isCool = true;
// number
let age = 52;
// string
let eyeColor = 'hazel';
let favoriteQuote = `I'm not old, I'm only ${age}`;
// array - assign what type of stuff will be in the array
let pets = ['dog', 'cat', 'bird'];
let pets2 = ['lion', 'tiger', 'bear'];
// objects
let wizard = {
    a: 'John',
};
// null, undefined
let meh = undefined;
let noooo = null;
