//boolean
var isCool = false;
// _____________________________________________
//number
var age = 56;
// _____________________________________________
//string
var eyeColor = 'brown';
var favoriteQuote = "I'm not old, I'm only ".concat(age);
// _____________________________________________
//Array
var pets = ['cat', 'mouse', 'dragon'];
var pets2 = ['pig', 'lion', 'dragon'];
// _____________________________________________
// objects
var wizard = {
    a: 'John',
};
// _____________________________________________
//Tuple - define to allow different types inside of it. It is ordered that will not change, it is immutable it can contain a mix of data
// Key Points:
// Order and Length: In TypeScript, tuples have a fixed length and order, and each position in the tuple is expected to be of a specific type.
// Immutability: Unlike tuples in Python, tuples in TypeScript (and JavaScript arrays in general) are not inherently immutable. You would need to use Object.freeze() or similar techniques to make them immutable.
var basket;
basket = ['basketball', 10];
// _____________________________________________
//Enum - enumerable -
var Size;
(function (Size) {
    Size[Size["Small"] = 1] = "Small";
    Size[Size["Medium"] = 2] = "Medium";
    Size[Size["Large"] = 3] = "Large";
})(Size || (Size = {}));
// Retrieve the name of the enum member using its numeric value
var sizeName = Size[2];
console.log(sizeName); // Displays 'Medium'
// Retrieve the numeric value of an enum member
var sizeName2 = Size.Small;
console.log(sizeName2); // Displays '1'
// _____________________________________________
// Any - not something you should use, will allow any type to be used. Useful for converting code from JS to TS quickly where not sure what to do with something. Or a complicated function.
var whatever = 'aaaaghhhhhh noooooo!';
// _____________________________________________
//void - means nothing returned.
var sing = function () { return console.log('Lalalala'); };
// _____________________________________________
//null and undefined
var meh = undefined;
var noo = null;
// _____________________________________________
// //never - tests two things, doesn't return anything and, doesn't have a reachable end point
// In TypeScript, the never type is used to represent a value that never occurs. It's a type that is assigned to values that should never be reachable in your code. The never type is useful in functions that are expected to never return, or in cases where the code should be exhaustive but shouldn't logically be reached.
// USES
// 1 Function that Never Returns: If a function never returns (e.g., it throws an error or has an infinite loop), you can use never as its return type.
// 2 Exhaustiveness Checking: When working with union types, the never type is useful for ensuring that all possible cases are handled in a type-safe way. In this example, the default case is used to check that all possible values of the Animal type have been handled. If a new animal is added to the Animal union and the switch statement is not updated accordingly, TypeScript will raise an error during compilation.
// When to Use never:
// Functions that throw errors or have no reachable end, such as those with infinite loops.
// Exhaustiveness checks in switch statements or other conditional logic to ensure all cases are handled.
var error = function () {
    throw Error('oops');
};
// _____________________________________________
// Type Assertions: allows you to overide a type.
var ohhithere = 'OH HI THERE';
var strLength = ohhithere.length;
var Manager = /** @class */ (function () {
    function Manager() {
        this.name = 'Jane';
        this.employeeId = 101;
    }
    return Manager;
}());
// _____________________________________________
// can do it this way as well
// type RobotArmy = {
//   count: number;
//   type: string;
//   magic?: string;
// }
// difference between type and interface - interfaces create a new name that we can use everywhere. Type alias don't create a new name and it has a few other features. Interfaces is recommended way to use as cleaner syntax and better error output.
var fightRobotArmy = function (robots) {
    console.log('FIGHT!');
};
//  this is exactly the same as above but above makes it much easier and cleaner
var fightRobotArmy2 = function (robots) {
    console.log('FIGHT!');
};
// _____________________________________________
//Function // the :void is for the return value
var fightRobotArmyF = function (robots) {
    console.log('FIGHT!');
};
var fightRobotArmy2F = function (robots) {
    console.log('FIGHT!');
};
// _____________________________________________
// *** Classes
var Animal = /** @class */ (function () {
    function Animal(sound) {
        this.sing = sound;
    }
    //:string is the type being returned
    Animal.prototype.greet = function () {
        return "Hello, ".concat(this.sing);
    };
    return Animal;
}());
var lion = new Animal('Rawwr');
// lion.sing // because sing is private you don't have access outside the class
// _____________________________________________
//Union Type - like an OR statement, allows it to be one or another
var confused = 'hello';
// _____________________________________________
//In TypeScript, there are several places where type inference
//is used to provide type information when there is no explicit
//type annotation. For example, in this code
var x = 3;
// automatimally detects x is a number.
// x = 'hello' // will throw an error because it is inferred x should be a number
