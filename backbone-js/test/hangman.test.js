module("Hangman Game: Creating a new Game without a predefined word", {
    setup:function(){
        // We want to use a stub here so that we can force the prompt to
        // return a value of our choice that can be used later in the test.
        //
        // It also prevents the browser from actually prompting during the
        // running of the tests.
        this.promptStub = sinon.stub(window, "prompt").returns("backpack");
        this.game = new Hangman;
    },
    teardown:function(){
        this.promptStub.restore();
    }
});

test("it should prompt for a word", function(){
    ok(this.promptStub.calledOnce);
});

test("it should use the word that the user entered", function(){
   equal(this.game.get("word"), "backpack");
});


module("Hangman Game: Creating a new Game with a predefined word", {
    setup:function(){
        this.game = new Hangman({word:"person"});
    },
    teardown:function(){

    }
});

test("it should have a word to be guessed", function(){
    equal(this.game.get("word"), "person", "Expected the game to have a word to be guessed");
});

module("Hangman Game: Guessing a Letter", {
    setup:function(){
        this.game = new Hangman({word:"person"});
    },
    teardown:function(){

    }
});

test("it should let me guess a letter", function(){
    ok(this.game.guess("p"));
});

test("it should tell me if I guessed correctly", function(){
    equal(this.game.guess("p"), true);
});

test("it should tell me if I guessed incorrectly", function(){
    equal(this.game.guess("q"), false);
});

module("Hangman Game: Guessing a Correct Letter", {
    setup:function(){
        this.game = new Hangman({word:"person"});
        this.game.guess("p");
    },
    teardown:function(){
    }
});

test('it should not increment my guess count', function(){
    equal(this.game.remainingGuesses(), 8);
});

test('it should keep track of my correct guesses', function(){
    ok(_.include(this.game.correctGuesses(), "p"));
});

module("Hangman Game: When guessing a correct letter I've already guessed",{
    setup:function(){
        this.game = new Hangman({word:"person"});
        this.game.guess("p");
        this.game.guess("p");
    },
    teardown:function(){
    }
});

test("it should not record my duplicate guess", function(){
    deepEqual(this.game.correctGuesses(), ["p"]);
})

module("Hangman Game: When a word contains the same letter more than once", {
    setup:function(){
        this.game = new Hangman({word:"barb"});
        // Rather than actually call this.guess("b"), we can isolate the
        // functionality of the remainingLetters() function by stubbing out
        // the one place it's going to look for an answer,
        // the correctGuesses() function.
        this.correctGuessesStub = sinon.stub(this.game, "correctGuesses").returns(["b"]);
    },
    teardown:function(){
        this.correctGuessesStub.restore();
    }
});

test('it should know how many letters I still have to guess', function(){
    equal(this.game.remainingLetters(), 2);
});

module("Hangman Game: Guessing an Incorrect Letter", {
    setup:function(){
        this.game = new Hangman({word:"person"});
        // In this example we are actually guessing so that
        // we can indirectly verify that the remainingGuesses()
        // count is being updated.
        //
        // This might become a brittle test in the future...

        this.game.guess("q");
        this.game.guess("z");
    },
    teardown:function(){

    }
});

test('it should increment my guess count', function(){
    equal(this.game.remainingGuesses(), 6);
});

module("Hangman Game: Remaining Guesses", {
    setup:function(){
        this.game = new Hangman({word:"person"});
        // Here we are spying on the incrementGuessCount() method
        // just to ensure that it's being called. Since we have/will
        // test the behavior of this method elsewhere, we don't need
        // to verify the state of the object, we are okay knowing
        // that this method was called a certain number of times

        this.incrementGuessSpy = sinon.spy(this.game, "incrementGuessCount")
    },
    teardown:function(){
        this.incrementGuessSpy.restore();
    }
});

test("it should give me 8 guesses to start", function(){
    equal(this.game.remainingGuesses(), 8);
});

test('it should keep track of my remaining guesses', function(){
    this.game.guess("q");
    // Just make sure that when I call this.guess, it also calls
    // incrementGuessCount(). This test is a little deceiving because
    // we don't differentiate between a correct and incorrect guess.
    ok(this.incrementGuessSpy.calledOnce);
});

module("Hangman Game: When I've guessed the word", {
    setup:function(){
        this.game = new Hangman({word:"car"});
        this.correctGuessesStub = sinon.stub(this.game, "correctGuesses").returns(["c", "a", "r"]);
    },
    teardown:function(){
        this.correctGuessesStub.restore();
    }
});

test('it should end the game', function(){
    equal(this.game.isOver(), true);
});

test('the game should be won', function(){
    equal(this.game.isWon(), true);
});


module("Hangman Game: With No Guesses Left", {
    setup:function(){
        this.game = new Hangman({word:"person"});
        this.remainingGuessStub = sinon.stub(this.game, "remainingGuesses").returns(0);
    },
    teardown:function(){
        this.remainingGuessStub.restore();
    }
});

test('it should end the game', function(){
    equal(this.game.isOver(), true);
});

test('the game should be lost', function(){
    equal(this.game.isWon(), false);
});

module("Hangman Game: With Guesses Left", {
    setup:function(){
        this.game = new Hangman({word:"person"});
        this.remainingGuessStub = sinon.stub(this.game, "remainingGuesses").returns(1);
    },
    teardown:function(){
        this.remainingGuessStub.restore();
    }
});

test('it should keep the game going', function(){
    equal(this.game.isOver(), false);
});
