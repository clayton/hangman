module("Hangman App: Starting a New Game", {
    setup:function(){
        this.hangmanMock      = sinon.mock(window.Hangman);
        this.newHangmanStub   = sinon.stub(window, "Hangman").returns(this.hangmanMock);
        this.gameBoardMock    = sinon.mock(window.GameBoard);
        this.newGameBoardStub = sinon.stub(window, "GameBoard").returns(this.gameBoardMock);
        this.app              = new HangmanApp();
        this.app.index();
    },
    teardown:function(){
        window.Hangman.restore();
        window.GameBoard.restore();
    }
});

test("it should create a new hangman game", function(){
    ok(this.newHangmanStub.calledOnce);
});

test('it should create a new game board', function(){
    ok(this.newGameBoardStub.calledOnce);
});

test('it should create the game board with the newly created game', function(){
    ok(this.newGameBoardStub.calledWith({model:this.hangmanMock}));
});