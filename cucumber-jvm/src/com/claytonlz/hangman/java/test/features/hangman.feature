Feature: Hangman Game

Scenario: Guessing a Correct Letter
	Given I have start a new game
	And I choose "pearson" as the word
	When my opponent guesses the letter "p"
	Then the game board should read "p _ _ _ _ _ _ "	
