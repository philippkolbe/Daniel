var o = {
    age: 1,
    name: "ABC",
    children: [],
    brother: {
        age: 1,
        name: "2"
    },
    sayHello: function() {
        console.log("Hallo");
    },
    sayMyName: function() {
        console.log(this.name);
    }
};

o.sayHello();
o.sayMyName();
console.log(o);

class Dog {
    constructor(name) {
        this.age = Math.round(Math.random() * 10);
        this.name = name;
    }

    makeSound() {
        console.log("Wuff");
    }

    eat() {
        console.log("Yummy");
    }

    sayName() {
        console.log("Hi I'm " + this.name);
    }
}

let dog1 = new Dog("Bello");
dog1.makeSound();
dog1.eat();
dog1.sayName();

let dog2 = new Dog("Bella");
dog2.makeSound();
dog2.eat();
dog2.sayName();

let dogs = [];

for (let i = 0; i < 100; i++) {
    dogs.push(new Dog("Dog" + i));
}

for (let i = 0; i < 100; i++) {
    let dog = dogs[i];
    dog.sayName();
}