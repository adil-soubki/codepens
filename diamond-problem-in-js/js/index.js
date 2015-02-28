// The Diamond Problem
//      Quadrilateral
//         /     \
//   Rectangle   Rhombus
//         \     /
//          Square

// VERSION ONE 
function Quadrilateral1() {
  this.hasFourSides = true;
}

function Rectangle1() {
  Quadrilateral1.call(this);
  this.allRightAngles = true;
}
Rectangle1.prototype = Object.create(Quadrilateral1.prototype);

function Rhombus1() {
  Quadrilateral1.call(this);
  this.allSidesEqual = true;
}
Rhombus1.prototype = Object.create(Quadrilateral1.prototype);

function Square1() {
	Rectangle1.call(this);
  Rhombus1.call(this);
}

square1 = new Square1();
rectangle1 = new Rectangle1();
rhombus1 = new Rhombus1();
console.log(square1.allSidesEqual);    							// true
console.log(square1.allRightAngles);   							// true
console.log(square1 instanceof Rhombus1);						// false
console.log(square1 instanceof Rectangle1);					// false
console.log(rhombus1 instanceof Quadrilateral1);		// true
console.log(rectangle1 instanceof Quadrilateral1);	// true

// VERSION TWO - Using Mixins
var mixinQuadrilateral = function() {
  this.hasFourSides = true;
  this.testFunction = function() {
    console.log('Quadrilateral testFunction called.');
  };
  return this;
};
var Quadrilateral = function() {
  //Preset properties placed here
};
mixinQuadrilateral.call(Quadrilateral.prototype);

var mixinRectangle = function() {
  this.allRightAngles = true;
  this.testFunction = function() {
    console.log('Rectangle testFunction called.');
  };
  return this;
};
var Rectangle = function() {
  //Preset properties placed here
};
mixinRectangle.call(Rectangle.prototype);

var mixinRhombus = function() {
  this.allSidesEqual = true;
  this.testFunction = function() {
    console.log('Rhombus testFunction called.');
  };
  return this;
};
var Rhombus = function() {
  //Preset properties placed here
};
mixinRhombus.call(Rhombus.prototype);

var Square = function() {
  //Preset properties placed here
};
mixinRectangle.call(Square.prototype);
mixinRhombus.call(Square.prototype);

var square = new Square();
var rhombus = new Rhombus();
var rectangle = new Rectangle();
console.log(square.allSidesEqual);   							// true
console.log(square.allRightAngles);  							// true
console.log(square instanceof Rhombus);						// false
console.log(square instanceof Rectangle);					// false
console.log(rhombus instanceof Quadrilateral);		// false
console.log(rectangle instanceof Quadrilateral);	// false