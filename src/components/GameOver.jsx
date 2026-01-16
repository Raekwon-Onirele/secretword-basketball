import "./GameOver.css";

const GameOver = ({ retry, word, score }) => {
  return (
    <div className="gameOver">
      <div className="bodyGameOver">
        <h1>Game Over</h1>
        <p className="word">
          A palavra era: <p className="wordRight">"{word}"</p>
        </p>
        <h2>
          A sua pontuação foi: <span>{score}</span>
        </h2>
        <button onClick={retry}>Recomeçar o Jogo</button>
      </div>
    </div>
  );
};

export default GameOver;
