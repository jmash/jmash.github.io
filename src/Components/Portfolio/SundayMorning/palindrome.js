export default class PalindromeChecker {
    checkPalindrome(input) {
        let inputStr = input.toString();
        inputStr = inputStr.toUpperCase().replace(" ", "");
        let inputStrRev = inputStr.split('').reverse().join('');
        if(inputStr === inputStrRev) return true;
        else return false;
    }
}