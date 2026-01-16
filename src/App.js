import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { wordsList } from "./data/words";
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

// Definição dos estágios do jogo
const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessesQty = 5;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  const pickedWordAndCategory = useCallback(() => {
    // Função categories, que aleatoriza as categorias
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // Função para pegar as palavras das categorias
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  }, [words]);

  // Função para iniciar o jogo
  const startGame = useCallback(() => {
    // limpando todas as letras
    clearLettterStates()

    // Instanciando a função picked para iniciar o jogo
    const { word, category } = pickedWordAndCategory();

    // Transformando as palavras em arrays
    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase());

    // preenchendo states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickedWordAndCategory]);

  // Função para finalizar o jogo
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    //validação se a letra já foi utilizada
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // pegar a letra acertada ou diminuir as chanches
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const clearLettterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  useEffect(() => {
    if (guesses <= 0) {
      // resetar os estados
      clearLettterStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // Checagem Condição de vitória
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]

    // condição de vitória
    if (guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name ) {
      // add pontuação
      setScore((actualScore) => (actualScore += 100))

      // resetar jogo com nova palavra
      startGame()
    }
  }, [guessedLetters, letters, startGame, gameStage])

  // Função para reiniciar o jogo
  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);

    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} word={pickedWord} score={score}/>}
    </div>
  );
}

export default App;
