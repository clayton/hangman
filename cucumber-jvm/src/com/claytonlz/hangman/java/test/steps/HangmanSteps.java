package com.claytonlz.hangman.java.test.steps;

import com.claytonlz.hangman.java.main.Hangman;

import cucumber.annotation.en.Given;
import cucumber.annotation.en.When;
import cucumber.annotation.en.Then;
import cucumber.runtime.PendingException;

import static org.junit.Assert.assertEquals;


public class HangmanSteps {
	
	private Hangman game;
	
	@Given("^I have start a new game$")
	public void I_have_start_a_new_game() throws Throwable {
	    game = new Hangman();
	}

	@Given("^I choose \"([^\"]*)\" as the word$")
	public void I_choose_as_the_word(String word) throws Throwable {
	    // Express the Regexp above with the code you wish you had
	    game.setWord(word);
	}

	@When("^my opponent guesses the letter \"([^\"]*)\"$")
	public void my_opponent_guesses_the_letter(String letter) throws Throwable {
	    game.guessLetter(letter);
	}

	@Then("^the game board should read \"([^\"]*)\"$")
	public void the_game_board_should_read(String gameBoard) throws Throwable {
	    assertEquals(gameBoard, game.getGameBoard());
	}

}
