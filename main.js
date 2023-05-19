
//Game to find yout hat without falling into any hole

//this module let us listen to the user input directly after presenting the question, and store it in a variable
const prompt = require('prompt-sync')({ sigint: true });

//characters
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


//Class Field
class Field {
    constructor(field) {
        this._field = field;
        this._printingField = this._field.join('\n');
        this._playerIndex = 0;
        this._playing = true;

    }

    //method to run the game
    runGame() {
        this.firstPrompt();
        console.log(this.hatIndex, this.allHoleIndexes, this.playerIndex);
    
        while (this.playing) {
            this.print();
            this.askQuestion();
            this.didWinOrLose();
            this.updateField();
        }
    }


    //Output methods
    firstPrompt() {
        // !!! poner algun condicional que solo enseñe todo esto al ejecutar main.js
        console.log(
            '\n Uh-oh! Your hat is lost!\n',
            'Navigate the field to find it, avoiding falling in holes or wandering outside the field.\n',
            '\n',
            'You will move one position at a time.\n',
            'Please choose one of these options:\n',
            'L for Left.\n',
            'R for Right.\n',
            'D for Down.\n',
            'U for Up.\n',
            '\n'
        );
    }

    askQuestion() {
        //input holds the user answer, converted to upperCase just in case
        const input = prompt('\n Which way would you like to move?').toUpperCase();
        this.playerIndex = input;
    }

    print() {
        console.log(this._printingField);
    }

    //getters
    get playing() {
        return this._playing
    }
    get hatIndex() {
        return this._field.indexOf(hat);
    }

    get playerIndex() {
        return this._playerIndex = this._field.indexOf(pathCharacter);
    }

    get allHoleIndexes() {
        let indexes = [];
        this._field.map(element => {
            if (this._field.indexOf(element) >= 0) {
                indexes.push(this._field.indexOf(element))
            }
        });
        return indexes
    }

    //setters
    set playing(arg) {
        this._playing = arg;

    }

    set playerIndex(input) {
        switch (input) {
            case 'L':
                this._playerIndex -= 1;
                break;
            case 'R':
                this._playerIndex += 1;
                break;
            case 'D':
                switch (this.playerIndex) {
                    case 0:
                        this._playerIndex = 3;
                        break;
                    case 1:
                        this._playerIndex = 4;
                        break;
                    case 2:
                        this._playerIndex = 5;
                        break;
                    case 3:
                        this._playerIndex = 6;
                        break;
                    case 4:
                        this._playerIndex = 7;
                        break;
                    case 5:
                        this._playerIndex = 8;
                        break;
                    default:
                        this._playerIndex = 9;
                }
                break;
            case 'U':
                switch (this._playerIndex) {
                    case 6:
                        this._playerIndex = 3;
                        break;
                    case 7:
                        this._playerIndex = 4;
                        break;
                    case 8:
                        this._playerIndex = 5;
                        break;
                    case 3:
                        this._playerIndex = 0;
                        break;
                    case 4:
                        this._playerIndex = 1;
                        break;
                    case 5:
                        this._playerIndex = 2;
                        break;
                    default:
                        this._playerIndex = -1;
                }
                break;
        }

        console.log(this._playerIndex);
    }

    //method to check game status
    didWinOrLose() {

        //check if player found the hat
        if (this.hatIndex === this.playerIndex) {
            console.log('You found your hat! :)');
            this.playing = false;
        //check if player fell in a hole
        }else if (this.allHoleIndexes.includes(this.playerIndex)) {
            console.log('You fell! :(');
            this.playing = false;
        //check if player is still inside the field
        }else if (this._field.includes(this.playerIndex)) {
            return
        } else {
            console.log('You lost your way :(');
            this.playing = false;
        }
        
        return
    }

    updateField() {
        this._field[this.playerIndex] = pathCharacter;
    }

};

//field example
const myField = new Field([
    [pathCharacter, fieldCharacter, hole],
    [fieldCharacter, hole, fieldCharacter],
    [fieldCharacter, hat, fieldCharacter],
]);

myField.runGame();