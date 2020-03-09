export default class FizzBuzz {
    constructor(limit) {
        this.limit = limit;
    }

    generateFB() {
        for(let i = 1; i <= this.limit; i++) {
            if(i % 3 === 0) console.log("Fizz");
            else if(i % 5 === 0) console.log("Buzz");
            else if(i % 3 === 0 && i % 5 === 0) console.log("FizzBuzz");
        }
    }
}