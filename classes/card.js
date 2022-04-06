class Card {
    constructor(type, face) {
        this.type = type;
        this.face = face;
    }

    random() {
        let cardSequence = Math.floor(Math.random() * 51);
        let faceValue = (cardSequence % 13) + 1;
        switch (faceValue) {
            case 1:
                this.face = "A";
                break;
            case 11:
                this.face = "J";
                break;
            case 12:
                this.face = "Q";
                break;
            case 13:
                this.face = "K";
                break;
            default:
                this.face = faceValue;
        }

        let faceType = cardSequence % 4;
        switch (faceType) {
            case 0:
                this.type = "Clubs";
                break;
            case 1:
                this.type = "Diamonds";
                break;
            case 2:
                this.type = "Hearts";
                break;
            default:
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

module.exports = Card;