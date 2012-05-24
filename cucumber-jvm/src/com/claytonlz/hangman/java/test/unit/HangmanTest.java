package com.claytonlz.hangman.java.test.unit;

import static org.junit.Assert.*;

import java.util.ArrayList;

import org.junit.Before;
import org.junit.Test;

import com.claytonlz.hangman.java.main.Hangman;
import static org.mockito.Mockito.*;
public class HangmanTest {
	
	private Hangman game;

	@Before
	public void setUp(){
		game = new Hangman();
		game.setWord("apple");
	}
	
	@Test
	public void testAddingLettersAsIGuess(){
		ArrayList<String> guesses = new ArrayList<String>();
		guesses.add("a");
		game.guessLetter("a");
		assertEquals(guesses, game.getGuesses());
	}
	
	@Test
	public void testRememberingCorrectGuesses(){
		ArrayList<String> guesses = new ArrayList<String>();
		guesses.add("a");
		game.guessLetter("a");
		assertEquals(guesses, game.getCorrectGuesses());
	}
	
	@Test
	public void testRememberingIncorrectGuesses(){
		ArrayList<String> guesses = new ArrayList<String>();
		guesses.add("q");
		game.guessLetter("q");
		assertEquals(guesses, game.getIncorrectGuesses());
	}
	
	@Test
	public void testDrawingGameBoard(){
		ArrayList<String> correctGuesses = new ArrayList<String>();
		correctGuesses.add("a");
		game.guessLetter("a");
		assertEquals("a _ _ _ _ ", game.getGameBoard());
	}

}
