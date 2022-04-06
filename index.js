const readlineSync = require('readline-sync');

class Card {
    constructor(type, face) {
        this.type = type;
        this.face = face;
    }

    random() {
        let cardSequence = Math.floor(Math.random() * 51);
        let faceValue = (cardSequence % 13) + 1
        if (faceValue ==  1) {
            this.face = "A";
        }
        else if (faceValue ==  10) {
            this.face = "10";
        }
        else if (faceValue == 11) {
            this.face = "J";
        }
        else if (faceValue == 12) {
            this.face = "Q";
        }
        else if (faceValue == 13) {
            this.face = "K";
        }
        else {
            this.face = faceValue;
        }
        let faceType = (cardSequence % 4) + 1
        if(faceType == 1) {
            this.type = "Clubs";
        }
        else if(faceType == 2) {
            this.type = "Diamonds";
        }
        else if(faceType == 3) {
            this.type = "Hearts";
        }
        else {
            this.type = "Spades";
        }
    }

    getFace() {
        return this.face;
    }

    getType() {
        return this.type;
    }

    getValue() {
        if(["10", "J", "K", "Q"].includes(this.face)) {
            return 0;
        }
        else if(this.face == "A") {
            return 1;
        }
        else {
            return this.face;
        }
    }
}

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

const startGame = () => {
    let playMore = 'Yes';

    const player = new Person('player');
    const dealer = new Person('dealer');

    while(playMore === 'Yes')
    {
        let bet = readlineSync.question('> Please put your bet\n> ');
        player.bet(bet);
    
        player.clearCards();
        dealer.clearCards();
        
        let dealerShuffle = dealer.shuffle(4);
        player.addCards(dealerShuffle.slice(0,2));
        dealer.addCards(dealerShuffle.slice(2,4));
    
        let myScore = player.getScore();
        let dealerScore = dealer.getScore();
    
        console.log(`> You got ${player.cards[0].getType()}-${player.cards[0].getFace()}, ${player.cards[1].getType()}-${player.cards[1].getFace()} ${myScore}`);
        console.log(`> The dealer got ${dealer.cards[0].getType()}-${dealer.cards[0].getFace()}, ${dealer.cards[1].getType()}-${dealer.cards[1].getFace()} ${dealerScore}`);
        
        if(myScore > dealerScore) {
            console.log(`> You won!!!, received ${player.getBet()} chips`);
            player.win();
        }
        else if (myScore < dealerScore) {
            console.log(`> You lose!!!, lost ${player.getBet()} chips`);
            player.lose();
        }
        else {
            console.log(`> You tie!!!, received nothing`);
        }
    
        playMore = readlineSync.question('> Wanna play more (Yes/No)?\n> ');
    }
    console.log(`> You got total ${player.getWallet()}`);
}

startGame();