//boolean
let isCool: boolean = false;

// _____________________________________________

//number
let age: number = 56;

// _____________________________________________

//string
let eyeColor: string = 'brown';
let favoriteQuote: string = `I'm not old, I'm only ${age}`;

// _____________________________________________

//Array
let pets: string[] = ['cat', 'mouse', 'dragon'];
let pets2: Array<string> = ['pig', 'lion', 'dragon'];

// _____________________________________________

// objects
let wizard: object = {
  a: 'John',
};

// _____________________________________________

//Tuple - define to allow different types inside of it. It is ordered that will not change, it is immutable it can contain a mix of data
// Key Points:
// Order and Length: In TypeScript, tuples have a fixed length and order, and each position in the tuple is expected to be of a specific type.
// Immutability: Unlike tuples in Python, tuples in TypeScript (and JavaScript arrays in general) are not inherently immutable. You would need to use Object.freeze() or similar techniques to make them immutable.
let basket: [string, number];
basket = ['basketball', 10];

// _____________________________________________

//Enum - enumerable -
enum Size {
  Small = 1,
  Medium,
  Large,
}
// Retrieve the name of the enum member using its numeric value
let sizeName: string = Size[2];
console.log(sizeName); // Displays 'Medium'

// Retrieve the numeric value of an enum member
let sizeName2: number = Size.Small;
console.log(sizeName2); // Displays '1'

// _____________________________________________

// Any - not something you should use, will allow any type to be used. Useful for converting code from JS to TS quickly where not sure what to do with something. Or a complicated function.
let whatever: any = 'aaaaghhhhhh noooooo!';

// _____________________________________________

//void - means nothing returned.
let sing = (): void => console.log('Lalalala');

// _____________________________________________

//null and undefined
let meh: undefined = undefined;
let noo: null = null;

// _____________________________________________

// //never - tests two things, doesn't return anything and, doesn't have a reachable end point
// In TypeScript, the never type is used to represent a value that never occurs. It's a type that is assigned to values that should never be reachable in your code. The never type is useful in functions that are expected to never return, or in cases where the code should be exhaustive but shouldn't logically be reached.
// USES
// 1 Function that Never Returns: If a function never returns (e.g., it throws an error or has an infinite loop), you can use never as its return type.
// 2 Exhaustiveness Checking: When working with union types, the never type is useful for ensuring that all possible cases are handled in a type-safe way. In this example, the default case is used to check that all possible values of the Animal type have been handled. If a new animal is added to the Animal union and the switch statement is not updated accordingly, TypeScript will raise an error during compilation.
// When to Use never:
// Functions that throw errors or have no reachable end, such as those with infinite loops.
// Exhaustiveness checks in switch statements or other conditional logic to ensure all cases are handled.
let error = (): never => {
  throw Error('oops');
};

// _____________________________________________

// Type Assertions: allows you to overide a type.
let ohhithere: any = 'OH HI THERE';

let strLength: number = (ohhithere as string).length;

// _____________________________________________

// Interface - capitalizng of interface name is standard. You are declaring a type that can be used. In our case in the function, we are saying robots will be of type RobotArmy. And here we are defining what that type should consist of.
// usage of the ? in magic? means that it is an optional property.
// Interfaces can also be extended like prototypes
// Interfaces can be merged, meaning if you declare the same interface multiple times, TypeScript will merge their properties.

interface RobotArmy {
  count: number;
  type: string;
  magic?: string;
}
// _____________________________________________
interface Person {
  name: string;
}

interface Employee extends Person {
  employeeId: number;
}

class Manager implements Employee {
  name = 'Jane';
  employeeId = 101;
}
// _____________________________________________

// can do it this way as well
// type RobotArmy = {
//   count: number;
//   type: string;
//   magic?: string;
// }

// difference between type and interface - interfaces create a new name that we can use everywhere. Type alias don't create a new name and it has a few other features. Interfaces is recommended way to use as cleaner syntax and better error output.

let fightRobotArmy = (robots: RobotArmy) => {
  console.log('FIGHT!');
};
//  this is exactly the same as above but above makes it much easier and cleaner
let fightRobotArmy2 = (robots: {
  count: number;
  type: string;
  magic?: string;
}) => {
  console.log('FIGHT!');
};

// _____________________________________________
//Function // the :void is for the return value
let fightRobotArmyF = (robots: RobotArmy): void => {
  console.log('FIGHT!');
};
let fightRobotArmy2F = (robots: {
  count: number;
  type: string;
  magic?: string;
}): void => {
  console.log('FIGHT!');
};

// _____________________________________________

// *** Classes
class Animal {
  private sing: string;
  constructor(sound: string) {
    this.sing = sound;
  }
  //:string is the type being returned
  greet(): string {
    return `Hello, ${this.sing}`;
  }
}

let lion = new Animal('Rawwr');
// lion.sing // because sing is private you don't have access outside the class

// _____________________________________________
//Union Type - like an OR statement, allows it to be one or another
let confused: string | number = 'hello';

// _____________________________________________

//In TypeScript, there are several places where type inference
//is used to provide type information when there is no explicit
//type annotation. For example, in this code
let x = 3;
// automatimally detects x is a number.
// x = 'hello' // will throw an error because it is inferred x should be a number
