/* 
 1) In JavaScript, objects can inherit properties and methods from other objects called prototypes.
  Each object has a hidden link to its prototype, and when we access a property or method on an object, 
  JavaScript checks if the object itself has it. If not, it looks up the prototype chain until it finds 
  the property or reaches the end.

  2) To create a child object that inherits from a parent object, we set the child object's prototype to 
  be an instance of the parent object. This creates a chain of inheritance. When we extend a parent class
  to create a child class, we need to call the super() function in the child class constructor. This ensures 
  that the parent class constructor is executed first, allowing the child class to inherit and initialize the 
  parent's properties and methods.
  
  Calling super() establishes the inheritance relationship and properly initializes both the child and parent 
  class components. This is like making sure the foundation is laid before building upon it, enabling the child 
  class to extend or override parent class behavior while still retaining the parent's functionalit

*/

class Employee {
    constructor(name, age, salary){
        this.name = name;
        this.age = age;
        this.salary = salary
    }

    get getName() {
        return this.name;
    }

    get getAge() {
        return this.age;
    }

    get getSalary() {
        return this.salary;
    }

    set setName(newName){
        this.name = newName;
    }

    set setAge(newAge){
        this.age = newAge;
    }

    set setSalary(newSalary){
        this.salary = newSalary;
    }

}


class Programmer extends Employee {
    constructor(name, age, salary, lang){
        super(name, age, salary);
        this.lang = lang;
    }

    get getSalary(){
        return this.salary * 3
    }


}


const programmer1 = new Programmer("Nippon Banzai", 20, 1000, ["Python", "Java"]);
const programmer2 = new Programmer("Barry Allen", 25, 50000, ["JavaScript", "C++"]);

console.log(programmer1.name, programmer1.age, programmer1.salary, programmer1.lang);
console.log(programmer2.name, programmer2.age, programmer2.salary, programmer2.lang);