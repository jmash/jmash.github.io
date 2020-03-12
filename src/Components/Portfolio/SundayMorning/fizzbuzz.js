export default class FizzBuzz {
    constructor() {
        this.fbResult = "";
    }

    generateFB(limit=15) {
        if(limit > 9999) limit = 9999;
        if(limit <= 0) limit = 1;

        this.fbResult = "";
        for(let i = 1; i <= limit; i++) {
            if(i % 3 === 0 && i % 5 === 0) this.fbResult += `${i} FizzBuzz\n`;
            else if(i % 3 === 0) this.fbResult += `${i} Fizz\n`;
            else if(i % 5 === 0) this.fbResult += `${i} Buzz\n`;
        }

        return this.fbResult;
    }
}