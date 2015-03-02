// Global namespace - Checks if the MYAPP name space exists already. If not, makes it.
var MYAPP = MYAPP || {};

// Class declaration - Classes are just functions
var Person = function(firstName) {
  // Class constructor - The constructor is the inside of the function for the class
  console.log('Person class constructor called for ' + firstName);
  // Class property/attribute - Attributes are initialized using 'this'
  this.firstName = firstName;
};

// Method creation - Create object methods using 'MyObject.prototype.myMethod'
Person.prototype.sayHello = function() {
  console.log('Hello, I\'m ' + this.firstName);
};

// Instantiate the class using 'new MyClass(options)'
var person1 = new Person('Alice');
// Equivalently the class may be instantiated using Object.Create(). This will create an uninititalized instance that we then initialize manually.
var person2 = Object.create(Person.prototype, { 
  'firstName': { 
  	value: 'Bob'
  } 
});
// Access properties using 'myObject.myProperty'
console.log('person1 is ' + person1.firstName);
console.log('person2 is ' + person2.firstName);
// Call class methods/functions using 'myObject.myMethod()'
person1.sayHello();
person2.sayHello();
// Methods are regular function objects that are bound to an object as a property 
// This means they can be invoked "out of the context" leading to some interesting results
var helloFunction = person1.sayHello;
// logs "Hello, I'm undefined" (or fails with a TypeError in strict mode)
helloFunction();
// logs "Hello, I'm Alice"
helloFunction.call(person1);
// all of the references we have to the sayHello function — the one on person1, on Person.prototype, in the helloFunction variable, etc. — refer to the same function. The value of this during a call to the function depends on how we call it.
// logs true
console.log(helloFunction === person1.sayHello);
// logs true
console.log(helloFunction === Person.prototype.sayHello);

// Inheritance
function Student(firstName, subject) {
  // Call the parent constructor, making sure (using Function#call)
  // that "this" is set correctly during the call
  Person.call(this, firstName);
  
  // Initialize Studen-specific properties
  this.subject = subject;
};

// Create a Student.prototype object that inherits from Person.prototype.
// Note: A common error here is to use "new Person()" to create the
// Student.prototype. That's incorrect for several reasons, not least 
// that we don't have anything to give Person for the "firstName" 
// argument. The correct place to call Person is above, where we call 
// it from Student.
Student.prototype = Object.create(Person.prototype);
// Set the "constructor" property to refer to Student
Student.prototype.constructor = Student;

// Add and replace parent methods just like you would expect
Student.prototype.sayHello = function() {
  console.log('Hello, I\'m ' + this.firstName + '. I\'m studying '
              + this.subject + '.');
};
Student.prototype.sayGoodBye = function(){
  console.log('Goodbye!');
};

// Use it just like before
var student1 = new Student('Malice', 'Physics');
student1.sayHello();
student1.sayGoodBye();

// The Student object counts as a person also
console.log(student1 instanceof Person);  // true
console.log(student1 instanceof Student); // true

// The Diamond Problem - NOT WORKING
//      Quadrilateral
//         /     \
//   Rectangle   Rhombus
//         \     /
//          Square

function Quadrilateral() {
  this.hasFourSides = true;
}

function Rectangle() {
  Quadrilateral.call(this);
  this.allRightAngles = true;
}
Rectangle.prototype = Object.create(Quadrilateral.prototype);

function Rhombus() {
  Quadrilateral.call(this);
  this.allSidesEqual = true;
}
Rhombus.prototype = Object.create(Quadrilateral.prototype);

function extend(destination, source) {
  for (var k in source) {
    if (source.hasOwnProperty(k)) {
      destination[k] = source[k];
    }
  }
  return destination; 
}
function Square() {
}
extend(Square.prototype, Rhombus.prototype);
extend(Square.prototype, Rectangle.prototype);

square1 = new Square();
console.log(square1.allSidesEqual);