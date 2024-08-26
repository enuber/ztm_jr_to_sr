// intro

let message: string = 'Hello World';
console.log(message);

// sets a and b to number, will not be able to pass anything else in.
const sum = (a: number, b: number) => {
  return a + b;
};

// sum('hello', 65); // gives error on the string

// Typscript 3 Video
// Types in TS.

// boolean
let isCool: boolean = true;

// number
let age: number = 52;

// string
let eyeColor: string = 'hazel';
let favoriteQuote: string = `I'm not old, I'm only ${age}`;

// array - assign what type of stuff will be in the array
let pets: string[] = ['dog', 'cat', 'bird'];
let pets2: Array<string> = ['lion', 'tiger', 'bear'];

// objects
let wizard: object = {
  a: 'John',
};

// null, undefined

let meh: undefined = undefined;
let noooo: null = null;
