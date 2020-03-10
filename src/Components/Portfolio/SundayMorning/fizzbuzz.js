export default class FizzBuzz {
    constructor(limit=15) {
        this.limit = limit;
        this.fbResult = "";
    }

    generateFB() {
        this.fbResult = "";
        for(let i = 1; i <= this.limit; i++) {
            if(i % 3 === 0 && i % 5 === 0) this.fbResult += `${i} FizzBuzz\n`;
            else if(i % 3 === 0) this.fbResult += `${i} Fizz\n`;
            else if(i % 5 === 0) this.fbResult += `${i} Buzz\n`;
        }

        return this.fbResult;
    }
}