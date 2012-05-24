window.HangmanApp = Backbone.Router.extend({
    routes:{
        "" : "index"
    },
    index: function(){
        window.game = new window.Hangman({word:"person"});
        window.board = new window.GameBoard({model:window.game});
    }
});

window.Hangman = Backbone.Model.extend({
    defaults:{
        guessCount:0,
        correctGuesses:[]
    },
    initialize:function(){
        if (this.get("word") == undefined) {
            var input = window.prompt("Please provide a word");
            this.set({"word":input});
        };
    },
    guess:function(letterGuessed){
        if (this.wordIncludesLetter(letterGuessed)) {
            this.appendCorrectGuesses(letterGuessed);
            return true;
        };
        this.incrementGuessCount();
        return false;
    },
    wordIncludesLetter:function(letterGuessed){
        if(this.get("word").indexOf(letterGuessed) > -1){
            return true;
        }
    },
    remainingGuesses:function(){
        var initialGuesses = 8;
        var remainingGuesses = initialGuesses - this.get("guessCount");
        return remainingGuesses;
    },
    isOver:function(){
        if (this.remainingGuesses() <= 0 || this.isWon()) {
            return true;
        };
        return false;
    },
    isWon:function(){
        if (this.remainingLetters() == 0) {
            return true;
        };
        return false;
    },
    incrementGuessCount:function(){
        var currentGuesses = this.get("guessCount");
        this.set({"guessCount":(currentGuesses + 1)});
    },
    appendCorrectGuesses:function(letter){
        if (this.haveNotYetGuessed(letter)) {
            var correctGuesses = this.get("correctGuesses");
            correctGuesses.push(letter);
            this.set({"correctGuesses":correctGuesses});
            return true;
        };
    },
    haveNotYetGuessed:function(letter){
        if (_.include(this.get("correctGuesses"), letter)) {
            return false;
        };
        return true;
    },
    correctGuesses:function(){
        return this.get("correctGuesses");
    },
    remainingLetters:function(){
        var uniqueCharsInWord = _.uniq(_.str.chars(this.get("word")));
        var correctGuesses = this.correctGuesses();
        return uniqueCharsInWord.length - correctGuesses.length;
    }
});

window.GameBoard = Backbone.View.extend({
    events: {
    },

    initialize: function(){
        _.bindAll(this, 'render');
        this.template = $('#game-board-template').html();
        this.render();
    },

    render: function(){
        return this;
    }
});
