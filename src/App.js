import React, { Component } from "react";
import "./App.css";
import { Board } from "./Board.js";
import { Timer } from "./Timer.js";
import { Start } from "./Start.js";

const scoreLetter = letter => {
  const letterScores = {
    E: 1,
    A: 1,
    I: 1,
    O: 1,
    N: 1,
    R: 1,
    T: 1,
    L: 1,
    S: 1,
    U: 1,
    D: 2,
    G: 2,
    B: 3,
    C: 3,
    M: 3,
    P: 3,
    F: 4,
    H: 4,
    V: 4,
    W: 4,
    Y: 4,
    K: 5,
    J: 8,
    X: 8,
    Q: 10,
    Z: 10
  };
  return letterScores[letter];
};
const scoreWord = word => {
  return word.split("").reduce((acc, letter) => acc + scoreLetter(letter), 0);
};
const generateRandomLetter = () => {
  const letters = [
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "A",
    "A",
    "A",
    "A",
    "A",
    "A",
    "A",
    "A",
    "A",
    "I",
    "I",
    "I",
    "I",
    "I",
    "I",
    "I",
    "I",
    "I",
    "O",
    "O",
    "O",
    "O",
    "O",
    "O",
    "O",
    "O",
    "N",
    "N",
    "N",
    "N",
    "N",
    "N",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    "T",
    "T",
    "T",
    "T",
    "T",
    "T",
    "L",
    "L",
    "L",
    "L",
    "S",
    "S",
    "S",
    "S",
    "U",
    "U",
    "U",
    "U",
    "D",
    "D",
    "D",
    "D",
    "G",
    "G",
    "G",
    "B",
    "B",
    "C",
    "C",
    "M",
    "M",
    "P",
    "P",
    "F",
    "F",
    "H",
    "H",
    "V",
    "V",
    "W",
    "W",
    "Y",
    "Y",
    "K",
    "J",
    "X",
    "Q",
    "Z"
  ];
  return letters[Math.floor(Math.random() * 98)];
};
const isNeighbor = (currentLetterId, newLetterId) => {
  const currentLetterCoord = [Math.floor(currentLetterId / 4), currentLetterId % 4];
  const newLetterCoord = [Math.floor(newLetterId / 4), newLetterId % 4];
  return (
    Math.abs(currentLetterCoord[0] - newLetterCoord[0]) < 2 && Math.abs(currentLetterCoord[1] - newLetterCoord[1]) < 2
  );
};
const createNewLetter = (id, val, isSelected, isCurrentLetter) => {
  return { id: id, value: val, isSelected: isSelected, isCurrentLetter: isCurrentLetter };
};
//TODO create mongo database that will contain (hopefully downloadable) scrabble dictionary
//TODO check words against database to determine whether to score or not
//TODO create 3-minute timer
//TODO create start page (probably pop up with GO in center; you click to start timer)
//TODO create end game page with final score and list of words found
//TODO create computer component that will play the user
class App extends Component {
  state = {
    board: [
      { id: 0, value: generateRandomLetter(), isSelected: false, isCurrentLetter: false },
      { id: 1, value: generateRandomLetter(), isSelected: false, isCurrentLetter: false },
      { id: 2, value: generateRandomLetter(), isSelected: false, isCurrentLetter: false },
      { id: 3, value: generateRandomLetter(), isSelected: false, isCurrentLetter: false },
      { id: 4, value: generateRandomLetter(), isSelected: false, isCurrentLetter: false },
      { id: 5, value: generateRandomLetter(), isSelected: false, isCurrentLetter: false },
      { id: 6, value: generateRandomLetter(), isSelected: false, isCurrentLetter: false },
      { id: 7, value: generateRandomLetter(), isSelected: false, isCurrentLetter: false },
      { id: 8, value: generateRandomLetter(), isSelected: false, isCurrentLetter: false },
      { id: 9, value: generateRandomLetter(), isSelected: false, isCurrentLetter: false },
      { id: 10, value: generateRandomLetter(), isSelected: false, isCurrentLetter: false },
      { id: 11, value: generateRandomLetter(), isSelected: false, isCurrentLetter: false },
      { id: 12, value: generateRandomLetter(), isSelected: false, isCurrentLetter: false },
      { id: 13, value: generateRandomLetter(), isSelected: false, isCurrentLetter: false },
      { id: 14, value: generateRandomLetter(), isSelected: false, isCurrentLetter: false },
      { id: 15, value: generateRandomLetter(), isSelected: false, isCurrentLetter: false }
    ],
    currentWord: "",
    currentLetter: { id: -1, value: "" }, //default
    words: [],
    score: 0,
    mouseIsDown: false,
    start: false,
    timer: 180 //in seconds
  };
  wordExists = curWord => {
    return this.state.words.reduce((acc, word) => {
      return curWord === word.word ? true : acc || false;
    }, false);
  };
  handleWordEntry = () => {
    const wordScore = scoreWord(this.state.currentWord);
    const wordExists = this.wordExists(this.state.currentWord);
    const newWords = !wordExists
      ? this.state.words.concat({ word: this.state.currentWord, score: wordScore })
      : this.state.words;
    const newScore = !wordExists ? this.state.score + wordScore : this.state.score;
    const newBoard = this.state.board.map(letter => {
      return createNewLetter(letter.id, letter.value, false, false);
    });
    this.setState({
      board: newBoard,
      words: newWords,
      currentWord: "",
      currentLetter: { id: -1, value: "" },
      score: newScore
    });
  };
  onLetterClick = (id, val) => {
    const curLetter = this.state.currentLetter;
    const areNeighbors = curLetter.id !== -1 ? isNeighbor(curLetter.id, id) : true;
    if (this.state.board[id].isCurrentLetter) this.handleWordEntry();
    if (!this.state.board[id].isSelected && areNeighbors) {
      const newBoard = this.state.board.slice();
      if (curLetter.id !== -1) {
        newBoard[curLetter.id] = createNewLetter(curLetter.id, curLetter.value, true, false);
      }
      newBoard[id] = createNewLetter(id, val, true, true);
      this.setState({
        board: newBoard,
        currentWord: this.state.currentWord.concat(val),
        currentLetter: { id: id, value: val }
      });
    }
  };
  onMouseDown = (id, val) => {
    this.onMouseOver(id, val);
    this.setState({ mouseIsDown: true });
  };
  onMouseOver = (id, val) => {
    const curLetter = this.state.currentLetter;
    const areNeighbors = curLetter.id !== -1 ? isNeighbor(curLetter.id, id) : true;
    if (!this.state.board[id].isSelected && areNeighbors) {
      const newBoard = this.state.board.slice();
      if (curLetter.id !== -1) {
        newBoard[curLetter.id] = createNewLetter(curLetter.id, curLetter.value, true, false);
      }
      newBoard[id] = createNewLetter(id, val, true, true);
      this.setState({
        board: newBoard,
        currentWord: this.state.currentWord.concat(val),
        currentLetter: { id: id, value: val }
      });
    }
  };
  onMouseOverDoNothing = (id, val) => {
    null;
  };
  onMouseUp = () => {
    this.handleWordEntry();
    this.setState({
      mouseIsDown: false
    });
  };
  runTimer = () => {
    setInterval(() => {
      if (this.state.timer > 0) {
        this.setState({ timer: this.state.timer - 1 });
      }
    }, 1000);
  };
  onStart = () => {
    this.setState({ start: true });
    this.runTimer();
  };
  render() {
    const wordList = this.state.words.map(word => {
      return (
        <p className="word" key={word.word}>
          {word.word} <span className="score">{word.score}</span>
        </p>
      );
    });
    const mouseOverFunc = this.state.mouseIsDown ? this.onMouseOver : this.onMouseOverDoNothing;
    return (
      <div onMouseUp={this.onMouseUp}>
        <div id="currentWord">{this.state.currentWord}</div>
        <Board
          currentLetter={this.state.currentLetter}
          board={this.state.board}
          onMouseDown={this.onMouseDown}
          onMouseOver={mouseOverFunc}
        />
        <div id="word-list">{wordList}</div>
        {this.state.start ? (
          <React.Fragment>
            <Timer value={this.state.timer} />
            <div className="final-score">{this.state.score}</div>
          </React.Fragment>
        ) : (
          <Start onStart={this.onStart} />
        )}
        {this.state.timer === 0 ? (
          <React.Fragment>
            <div className="blackout" />
            <div className="game-over">GAME OVER</div>
          </React.Fragment>
        ) : (
          <div />
        )}
      </div>
    );
  }
}
export default App;
