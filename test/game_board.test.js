module("GameBoard: Auto-Rendering", {
    setup:function(){
        this.gameBoard = new window.GameBoard;
        this.renderSpy = sinon.spy(this.gameBoard, "render");
        this.gameBoard.initialize();
    },
    teardown:function(){
        this.renderSpy.restore();
    }
});

test('it should automatically render its self', function(){
    equals(this.renderSpy.callCount, 1);
});