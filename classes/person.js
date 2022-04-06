const Card = require('./card');

class Person {
    constructor(type) {
        this.inWallet = 0;
        this.onTable = 0;
        this.type = type;
        this.score = 0;
        this.cards = [];
    }

    bet(amount) {
        this.onTable = amount;
    }

    getBet() {
        return this.onTable;
    }

    getWallet() {
        return this.inWallet;
    }

    clearCards() {
        this.cards = [];
    }

    addCards(cards) {
        this.cards = [...cards];
    }

    shuffle(num) {
        let cards = [];
        for(let i = 0; i < num; i++){
            let card = new Card();
            card.random();
            cards.push(card);
        }
        return cards;
    }

    getScore() {
        this.score = 0;
        for(const card of this.cards) {
            this.score += card.getValue();
        }
        return this.score % 10;
    }

    win() {
        this.inWallet += (this.onTable*2);
    }

    lose() {
        this.inWallet -= this.onTable;
    }
}

module.exports = Person;