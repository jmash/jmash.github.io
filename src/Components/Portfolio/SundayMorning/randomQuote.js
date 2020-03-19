export default class RandomQuote {
    getRandomQuote = () => {
        return fetch('https://api.quotable.io/random');
    }
}