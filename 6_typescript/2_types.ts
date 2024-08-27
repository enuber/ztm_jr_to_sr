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

// Enums are a way of giving friendly names to sets of numeric values. They can make code more readable and less error-prone.
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;

// By default, Red is 0, Green is 1, and so on. You can also manually set values.
enum Color2 {
  Red = 1,
  Green = 2,
  Blue = 4,
}
let d: Color2 = Color2.Green;

enum Days {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

function classifyDay(day: Days): string {
  switch (day) {
    case Days.Sunday:
    case Days.Saturday:
      return 'Weekend';
    default:
      return 'Weekday';
  }
}

console.log(classifyDay(Days.Monday));
console.log(classifyDay(Days.Saturday));

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
let someValue: any = 'This is a string';
let strLength: number = (<string>someValue).length;
// Or using as-syntax
let strLengthAs: number = (someValue as string).length;

// In general, type assertions should be avoided if possible. But sometimes it is impossible, especially when dealing with JSON serialization and deserialization from a server, for example.

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

// Discriminated unions, also known as tagged unions or algebraic data types, are a way to combine types with a single shared field, which is typically a literal type, used to discriminate between the other types.

// The kind variable of a Circle object must be equal to the literal "circle". This is how TypeScript knows how to determine between the objects during the compilation process.

interface Circle {
  kind: 'circle';
  radius: number;
}

interface Square {
  kind: 'square';
  sideLength: number;
}

type Shape = Circle | Square;

const shapeFn = (shape: Shape) => {
  // we cannot use shape.radius or shape.sideLength here
  // since the compiler doesn't know what type shape is yet

  switch (shape.kind) {
    case 'circle':
      // here shape is of type Circle
      context.drawCircle(shape.radius);
      break;
    case 'square':
      // here shape is of type Square
      context.drawSquare(shape.sideLength);
      break;
  }
};

// _____________________________________________

//In TypeScript, there are several places where type inference
//is used to provide type information when there is no explicit
//type annotation. For example, in this code
let x = 3;
// automatimally detects x is a number.
// x = 'hello' // will throw an error because it is inferred x should be a number

// _____________________________________________

// Generics
// Generics provide a way to make components work over a variety of types rather than a single one.

function updateProperty<T>(obj: T, key: keyof T, value: any): T {
  obj[key] = value;
  return obj;
}

console.log(updateProperty({ name: 'Alice', age: 28 }, 'name', 'Bob'));
// Output: { name: "Bob", age: 28 }

// In the function updateProperty<T>, T is a generic type parameter. Generics allow you to create functions, classes, or interfaces that can work with different data types while providing type safety. Here's a breakdown of what T does in this context:

// Understanding T in updateProperty
// Generic Type Parameter:

// T is a placeholder for a type that will be provided when the function is called. The actual type of T is determined based on the arguments passed to the function.
// For example, if you pass an object of type { name: string; age: number } to updateProperty, TypeScript will infer that T is { name: string; age: number }.
// Usage of T:

// The function updateProperty uses T to type the obj parameter. This means that obj can be of any type, but it must be consistent within a single call to the function.
// key: keyof T means that key must be one of the keys of the object type T.
// value: any indicates that the value can be of any type. However, this is not ideal because it doesn't enforce that the type of value matches the type of the property being updated.
// Type Inference:

// When you call updateProperty({name: "Alice", age: 28}, "name", "Bob"), TypeScript infers that T is { name: string; age: number }.
// keyof T becomes "name" | "age", meaning the key argument must be either "name" or "age".
// The function then updates the property name on the object to "Bob".

// T: { name: string; age: number }
// keyof T: "name" | "age"
// obj: { name: "Alice", age: 28 }
// key: "name" (a key of T)
// value: "Bob" (the new value to assign to the name property)

// The current implementation allows value to be of any type, which could cause issues if the value type doesn’t match the type of the property being updated. You can improve the function by ensuring that value matches the type of the property:

function updateProperty2<T, K extends keyof T>(obj: T, key: K, value: T[K]): T {
  obj[key] = value;
  return obj;
}

// Now, value must be of the same type as the property identified by key. This adds an extra layer of type safety.

// generic function named wrapInArray that takes an argument of any type and returns an array of that type containing the provided value.
function wrapInArray<T>(value: T): T[] {
  return [value];
}

console.log(wrapInArray(42));

// _____________________________________________

// Conditional Types

// Conditional types help in expressing types in relation to other types, particularly in generic types. It has the syntax T extends U ? X : Y.

type TypeName<T> = T extends string
  ? 'string'
  : T extends number
  ? 'number'
  : T extends boolean
  ? 'boolean'
  : 'object';

//   How It Works:
// First Condition: T extends string

// If T is a string, then TypeName<T> resolves to "string".
// Second Condition: T extends number

// If T is not a string but is a number, then TypeName<T> resolves to "number".
// Third Condition: T extends boolean

// If T is neither a string nor a number, but is a boolean, then TypeName<T> resolves to "boolean".
// Final Fallback: "object"

// If T is none of the above (i.e., not a string, number, or boolean), then TypeName<T> resolves to "object".

// Example Usage
type T1 = TypeName<string>; // "string"
type T2 = TypeName<number>; // "number"
type T3 = TypeName<boolean>; // "boolean"
type T4 = TypeName<{}>; // "object"
type T5 = TypeName<[]>; // "object"
type T6 = TypeName<null>; // "object"
type T7 = TypeName<undefined>; // "object"

// example type guards using type assertion

function logType<T>(value: T): TypeName<T> {
  if (typeof value === 'string') {
    return 'string' as TypeName<T>;
  } else if (typeof value === 'number') {
    return 'number' as TypeName<T>;
  } else if (typeof value === 'boolean') {
    return 'boolean' as TypeName<T>;
  } else {
    return 'object' as TypeName<T>;
  }
}

// _____________________________________________

// Index Types
// Indexable types in TypeScript are types that can be indexed by strings or numbers, allowing you to define types for objects whose keys are not known in advance.

// note index is just a placeholder can be any valid identifier like key or prop
// the :string after the [] defines the value type
interface ObjName {
  [index: string]: string;
}

// Common Use Cases
// Dictionaries/Maps: When you need to create a dictionary-like structure where keys can be dynamically added.

// Dynamic Object Properties: When you're working with objects whose properties are not known until runtime.

interface NumberDictionary {
  [index: number]: string;
}

const numberDict: NumberDictionary = {
  0: 'Zero',
  1: 'One',
  2: 'Two',
};

console.log(numberDict[1]); // Output: "One"

interface MyDictionary {
  // Your index signature here
  [key: string]: string | number;
}

function getValueFromDict(
  key: string,
  dict: MyDictionary
): string | number | undefined {
  // Your code here
  return dict[key];
}

const dict = { name: 'Alice', age: 30 };
console.log(getValueFromDict('name', dict));

// _________________________________________________

// Literal Types
// Literal types allow you to specify the exact value an object must have. In many cases, they can be combined with union types to express a finite set of possible values.

type ButtonSizes = 'small' | 'medium' | 'large';
