import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

    function Square(props) {
        return (
        <button 
        className="square" 
        style={props.hilite === true ? {color:'green', borderWidth: 'thick', borderColor: 'green'}: {}}
        onClick= {() => props.onClick()}>
            {props.value}
        </button>
        );
    }
  
  class Board extends React.Component {
        
    renderSquare(i,winner) {
      if(winner && (winner[0] === i || winner[1] === i || winner[2] === i))
      {
        return <Square 
            value={this.props.squares[i]}
            hilite={true}
            onClick={() => this.props.onClick(i)} />;
      } else {
        return <Square 
            value={this.props.squares[i]}
            hilite={false}
            onClick={() => this.props.onClick(i)} />;

      }
    }
  
    render() { 
      const winner = calculateWinner(this.props.squares);

      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0, winner)}
            {this.renderSquare(1, winner)}
            {this.renderSquare(2, winner)}
          </div>
          <div className="board-row">
            {this.renderSquare(3, winner)}
            {this.renderSquare(4, winner)}
            {this.renderSquare(5, winner)}
          </div>
          <div className="board-row">
            {this.renderSquare(6, winner)}
            {this.renderSquare(7, winner)}
            {this.renderSquare(8, winner)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                loc: null,
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
          }
        squares[i] = this.state.xIsNext?'X': 'O';
        this.setState({
            history: history.concat([{
                squares: squares, loc: i,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step %2) === 0,
        });
    }
    
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            
            const desc = move ? 
            'Go to move #' + move + ' (col,row) ' + calcPos(step.loc):
            'Go to game start';
            return (
                <li key={move}>
                   <button style={move === this.state.stepNumber ? {fontWeight: 'bold'} : { fontWeight: 'normal'}} onClick={() => this.jumpTo(move)}> {desc} </button>
                </li>
            );
        });

        let status;
        if(winner) {
            status = 'Winner: ' + current.squares[winner[0]];
        } else { 
          if(this.state.stepNumber === 9) {
            status = 'The game is a draw, click on \'Go to game start\' button to start a new game'
          } else {
            status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
          }
        }
      return (
        <div className="game">
          <div className="game-board">
            <Board 
             squares={current.squares}
             onClick = { (i) => this.handleClick(i)}  
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

  function calcPos(index) {
    return '(' + (Math.trunc(index % 3)+1) + ',' + (Math.trunc(index/3) + 1) + ')';

  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        //return squares[a];
        return lines[i];
      }
    }
    return null;
  }
  // ========================================
  
  ReactDOM.render(
     <Game />,
    document.getElementById('root')
  );
  