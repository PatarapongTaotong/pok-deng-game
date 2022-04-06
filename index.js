const Person = require('./classes/person');
const readlineSync = require('readline-sync');

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
    
        console.log(`> You got ${player.cards[0].getType()}-${player.cards[0].getFace()}, ${player.cards[1].getType()}-${player.cards[1].getFace()}`);
        console.log(`> The dealer got ${dealer.cards[0].getType()}-${dealer.cards[0].getFace()}, ${dealer.cards[1].getType()}-${dealer.cards[1].getFace()}`);
        
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