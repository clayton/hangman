// This test fails to describe the behavior of the class
// and instead describes the specific name of a method
module("Hangman#wordIncludesLetter", {
    setup:function(){
        this.game = new Hangman({"word":"person"});
    },
    teardown:function(){

    }
});

test("test word included", function(){
    equal(this.game.wordIncludesLetter("p"), true);
});


// This test is likely brittle since it doesn't treat
// the System Under Test as an isolated unit, it instead
// relies on other behaviors of the object to arrive at
// the desired state (the player used all of their guesses).
module("Hangman - Game Over", {
    setup:function(){
        this.game = new Hangman({"word":"person"});
        this.game.guess("z");
        this.game.guess("q");
        this.game.guess("w");
        this.game.guess("t");
        this.game.guess("y");
        this.game.guess("k");
        this.game.guess("l");
        this.game.guess("v");
    },
    teardown:function(){

    }
});

test("the game should be over after I've used all of my guesses", function(){
    ok(this.game.isOver());
});


// This test tries to do too much at once. Best practice:
// one assertion per test. This keeps your tests easy to read,
// easy to fix and easy to refactor.
module("Hangman - Guessing an incorrect letter", {
    setup:function(){
        this.game = new Hangman({"word":"person"});
        this.game.guess("z");
    },
    teardown:function(){

    }
});

test("it should be wrong", 3, function(){
    equal(this.game.get("guessCount"), 1);
    equal(this.game.correctGuesses().length, 0);
    equal(this.game.remainingLetters(), 7);
});