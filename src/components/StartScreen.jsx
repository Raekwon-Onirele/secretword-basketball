import "./StartScreen.css";


const StartScreen = ({ startGame }) => {
  return (
    <div className="startScreen">
      <div className="bodyStartScreen">
        <h1>Secret Word: Basketball</h1>
        <p>Clique no botão para começar</p>
        <button onClick={startGame}>Clique Aqui</button>
      </div>
    </div>
  );
};

export default StartScreen;
