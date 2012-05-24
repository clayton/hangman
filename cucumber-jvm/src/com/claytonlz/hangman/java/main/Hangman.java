package com.claytonlz.hangman.java.main;

import java.util.ArrayList;

public class Hangman {

	private String word;
	private String gameBoard;
	private ArrayList<String> guesses;
	private ArrayList<String> correctGuesses;
	private ArrayList<String> incorrectGuesses;
	
	public Hangman(){
		this.guesses = new ArrayList<String>();
		this.correctGuesses = new ArrayList<String>();
		this.incorrectGuesses = new ArrayList<String>();
	}

	public void setWord(String word) {
		this.word = word;
	}

	public void guessLetter(String letter) {
		this.guesses.add(letter);
		if (this.guessIsCorrect(letter)) {
			this.correctGuesses.add(letter);
		}else{
			this.incorrectGuesses.add(letter);
		}
		this.updateGameBoard();
	}

	private void updateGameBoard() {
		String gameBoard = "";
		
		for(char c : this.getWord().toCharArray()){
			if(this.getCorrectGuesses().contains(String.valueOf(c))){
				gameBoard += c + " ";
			}else{
				gameBoard += "_ ";
			}
		}
		this.gameBoard = gameBoard;
	}

	private boolean guessIsCorrect(String letter) {
		if(this.getWord().contains(letter)){
			return true;
		}
		return false;
	}

	public String getGameBoard() {
		return this.gameBoard;
	}

	public String getWord() {
		return this.word;
	}

	public ArrayList<String> getGuesses() {
		return this.guesses;
	}

	public ArrayList<String> getCorrectGuesses() {
		return this.correctGuesses;
	}

	public ArrayList<String> getIncorrectGuesses() {
		return this.incorrectGuesses;
	}

}
