export default class PalindromeChecker {
    checkPalindrome(input) {
        let inputStr = input.toString();
        inputStr = inputStr.toUpperCase().replace(/\s/g, "");
        let inputStrRev = inputStr.split('').reverse().join('');
        console.log(inputStr, inputStrRev);
        if(inputStr === inputStrRev) return true;
        else return false;
    }
}