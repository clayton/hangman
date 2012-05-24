Feature: Hangman

Scenario: Guessing a correct letter
	Given I have started a game
	And I have selected "pearson" as the word
	When my opponent guesses "p"
	Then I should update the board
