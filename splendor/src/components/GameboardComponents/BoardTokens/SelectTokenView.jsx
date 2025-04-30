import Token from '../../Token';

export default function SelectTokenView({ tokens, setView }) {
    return (
      <div className="board-tokens-section">
        <button className='select-tokens-button' onClick={() => setView("default")}>
          Back
        </button>
  
        <div className='selection-choice-row'>
          <button className="select-tokens-choice-button" onClick={() => setView("select2")}>
            Choose 2
          </button>
          <button className="select-tokens-choice-button" onClick={() => setView("select3")}>
            Choose 3
          </button>
        </div>
  
        {Object.entries(tokens).map(([color, number]) => (
          <Token key={color} color={color} number={number} />
        ))}
  
        <button className='confirm-tokens-button' disabled={true}>
          Confirm
        </button>
      </div>
    );
  }
