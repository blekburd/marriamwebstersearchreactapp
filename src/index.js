import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Square extends React.Component {


  render() {
    return (
      <button
      className="square"
      onClick={() => this.props.handleClick(this.props.number)}>
        {this.props.squareContent}
      </button>
    );
  }
  }
  

class Board extends React.Component {
  constructor(props)
  {
    super(props);
    this.forloop1 = this.forloop1.bind(this)
    this.forloop2 = this.forloop2.bind(this)
    this.forloop3 = this.forloop3.bind(this)
    
  }

  
  renderSquare(content, i) {
    return <Square squareContent={content} number={i} handleClick = {this.props.handleClick}/>;
  }



  forloop1()
  {
    for(var i=0;i<3;i++)
    {
  
    }
  }

  forloop2()
  {
    for(var i=3;i<6;i++)
    {
      this.renderSquare(this.props.statusarray[i])
    }
  }

  forloop3()
  {
    for(var i=6;i<9;i++)
    {
      this.renderSquare(this.props.statusarray[i])
    }
  }

  render() {
   
    return (
  
      <div>
        <div className="status"> </div>
        <div className="board-row">
          {this.renderSquare(this.props.statusarray[0], 0)}
          {this.renderSquare(this.props.statusarray[1], 1)}
          {this.renderSquare(this.props.statusarray[2], 2)}

        </div>
        <div className="board-row">
          {this.renderSquare(this.props.statusarray[3], 3)}
          {this.renderSquare(this.props.statusarray[4], 4)}
          {this.renderSquare(this.props.statusarray[5], 5)}
        </div>
        <div className="board-row">
          {this.renderSquare(this.props.statusarray[6], 6)}
          {this.renderSquare(this.props.statusarray[7], 7)}
          {this.renderSquare(this.props.statusarray[8], 8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props)
  {
    super(props);
     this.handleClick = this.handleClick.bind(this);
     this.renderBoard = this.renderBoard.bind(this);
     this.calculateWinner = this.calculateWinner.bind(this);
    this.state = {
      statusarray: [null,null,null,null,null,null,null,null,null],
      turn:'X',
      winsX:0,
      winsO:0
    }
  }

  renderBoard(array)
  {
    const winner = this.calculateWinner(this.state.statusarray)
    if(winner == 'X')
    {
      var numwins = this.state.winsX
      numwins++
      const newstatusarray = this.state.statusarray.slice()
      for(var i=0;i<9;i++)
      {
        newstatusarray[i] = null
      }
      this.setState({statusarray: newstatusarray, turn:'X', winsX: numwins})
    }
    if(winner == 'O')
    {
      var numwins = this.state.winsO
      numwins++
      const newstatusarray = this.state.statusarray.slice()
      for(var i=0;i<9;i++)
      {
        newstatusarray[i] = null
      }
      this.setState({statusarray: newstatusarray, turn:'X', winsO: numwins})
    }
    return <Board statusarray = {array} handleClick = {this.handleClick}/>
  }
  handleClick(squareN){
    console.log("handleClick " + squareN)
    const newstatusarray = this.state.statusarray.slice()

    if(this.state.turn=='X')
    {
      if(newstatusarray[squareN] == 'X' || newstatusarray[squareN] == 'O')
      {
        return
      }
      else if(newstatusarray[squareN]==null)
      {
        newstatusarray[squareN] = 'X'
        this.setState({statusarray: newstatusarray, turn:'O'})
      }
      
    }
    else if(this.state.turn=='O')
    {
      if(newstatusarray[squareN] == 'X' || newstatusarray[squareN] == 'O')
      {
        return
      }
      else if(newstatusarray[squareN]==null)
      {
        newstatusarray[squareN] = 'O'
        this.setState({statusarray: newstatusarray, turn:'X'})
      }
      
    }

  }
  calculateWinner(statusarray)
  {
    const array1 = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
    ]
    for(var i=0;i<8;i++)
    {
      const [a,b,c] = array1[i];
      if(statusarray[a] === statusarray[b] && statusarray[a] === statusarray[c])
      {
        return(statusarray[a])
      }
    }
    return null;
  }
  render() {
    return (
      <div className="game">
        <div className="game-board">
         {this.renderBoard(this.state.statusarray)}
        </div>
        <div className="game-info">
          <div>
            {"turn:" + this.state.turn +" X wins:" + this.state.winsX + " O wins:" + this.state.winsO}
          </div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
