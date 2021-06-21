class player{
 
  constructor(playerName,color,symbol,IsBot=false){
    this.name=playerName
    this.color=color
    this.symbol=symbol
    this.isBot=IsBot
  }
 ShowDetail(){
  console.log(`playerName:${this.name} color:${this.color} symbol:${this.symbol} is bot:${this.isBot}`)
}
}
function tableCreate(num=4) {
 
  const tableDiv = document.createElement('div');
  tableDiv.className="boarGame"
  const table = document.createElement('table');
  table.className="board"
  for (let i = 0; i < num; i++) {
    const tr = document.createElement('tr');
    tr.className="row"
    for (let j = 0; j < num; j++) {
      const td = document.createElement('td');
      td.className="cell"
      tr.appendChild(td)
    }
    table.appendChild(tr);
  }
  tableDiv.appendChild(table);
  document.body.appendChild(tableDiv)
}
const TicToc={
    board:undefined,
    players:[],
    gameState:false,
    currentPlayer:null,
    currentPlayerCaption:document.getElementById("current"),
    currentPlayerIndex:0,
    gameSize:3,
 
    winStates: [
      ],
    CreateWinStates:function(num){
      winState=[]
      winState3=[]
      winState4=[]
      for(i=0;i<num;i++){
          winState1=[]
          winState2=[]
          for(j=0;j<num;j++){
              winState1.push(i*num+j)
              winState2.push(j*num+i)
          }
          winState.push(winState1)
          winState.push(winState2)
          winState3.push(i*(num+1)) 
          winState4.push((i+1)*(num-1))
      }
      winState.push(winState3)
      winState.push(winState4)
      return winState
    },
    CreateBoard:function(e){
      this.CreateBoard=e
    },
    CheckWin:function(value, board=this.checkedFields, winStates=this.winStates){
      result=false
      
      for(winState of winStates){
        newArray=[]

        for(index of winState){
            newArray.push(board[index])
        }
        result=newArray.every(val=>val===value)
        if(result) break
        
      }
      return [result,value]
    },
    CheckTie:function(board=this.checkedFields){return board.every(val=>val!=='')},
    init:function(size,players){
      this.players=players
      this.currentPlayerIndex=randomTurn()
      this.currentPlayer=players[this.currentPlayerIndex]
        // get fields empty
        this.board=document.getElementsByClassName("board")[0]
        this.cells=document.getElementsByClassName("cell")
        this.gameSize=size
        this.checkedFields=new Array(this.gameSize*this.gameSize).fill(''),
        this.checkedFields.fill('');
        this.winStates=this.CreateWinStates(this.gameSize)
        for(i=0;i<this.cells.length;i++) {
          this.cells[i].textContent='';
          this.cells[i].className="cell"
        } 
        // console.log(this.board)
        
        this.board.addEventListener('click',(e)=>this.handleClick(e));
        // this.toggleTurn()
    },
    updateCurrentPlayerName:function(){
     
      this.currentPlayerCaption.textContent=`${this.currentPlayer.name}    (${this.currentPlayer.symbol})`

      console.log(this.currentPlayer)
    this.currentPlayerCaption.classList=this.currentPlayer.color

    },
    toggleTurn:function(){

      this.currentPlayer.ShowDetail()
      this.currentPlayerIndex= this.currentPlayerIndex === 1 ? 0 : 1;
      this.currentPlayer=players[this.currentPlayerIndex]
      this.updateCurrentPlayerName()

      

     
     
     // check is computer turn
      if (this.currentPlayer.isBot){
        // console.log('computer turn')
        moveSuggest=SuggestMove(this.checkedFields,this.currentPlayerIndex)

        this.ApplyMovement(moveSuggest,this.cells[moveSuggest])
      }


    },
    changePlayerColor:function(currentField){
     currentField.classList.add(this.currentPlayer.color)

    },
    handleClick:function(e){
      if (!this.gameState) return
      var currentFieldNumber = Array.prototype.indexOf.call(this.cells,e.target);
      this.ApplyMovement(currentFieldNumber)
    },
    ApplyMovement:function(cellNumber){
      cellItem=this.cells[cellNumber]
      if (cellItem.textContent) return
      this.changePlayerColor(cellItem)
      this.checkedFields[cellNumber] =this.currentPlayerIndex
      cellItem.textContent = this.currentPlayer.symbol
      //ToDo:use player as class and 
      let [someOneWin,winnerIndex]=this.CheckWin(this.currentPlayerIndex)
      if(someOneWin) {
        winner=this.players[winnerIndex]
        //#FixMe:It is possible to clear the screen before the end of the game
        setTimeout(()=> {
          this.currentPlayer.ShowDetail()
          alert(`${winner.name}(${winner.symbol})  wons!`);
          TicToc.Puase
          players=CreatePlayers()
          this.init(this.gameSize,players)
          return
  
        },100)

      }
      else if(this.CheckTie()){
        alert(' Tie!');
        this.gameSize.Puase
        this.init(this.gameSize,players)
        return
      }

      this.toggleTurn()

    },
    Puase:function(){
      this.gameState=false
    },
    Start:function(){
      this.gameState=true
    }
  


}
gameSize=3
tableCreate(gameSize)
const CreatePlayers=()=>{
  let player1=new player("","green","X")
  let player2=new player("","yellow","O",false)
  player1.name=document.getElementById("player1").value
  player2.name=document.getElementById("player2").value
  player2.isBot=document.getElementById("bot").checked
  players=[player1,player2]
  return players
}
const setup=()=>{

  if (TicToc.gameState){

    TicToc.Puase()
    document.getElementsByClassName("players")[0].style.display = "block ";
    document.getElementById("current-player-info").style.display ="none";
    document.getElementById("btn-start").value="Start"


  }
  else{
    document.getElementsByClassName("players")[0].style.display = "none";
    document.getElementById("current-player-info").style.display ="block";
    document.getElementById("btn-start").value="Finish"
    
    
    TicToc.Start()
    
    players=CreatePlayers()
    
    TicToc.init(gameSize,players)
    TicToc.updateCurrentPlayerName()
  }
 
}
const  reset=()=>{
  TicToc.Start()
  TicToc.init(gameSize,players)
  TicToc.updateCurrentPlayerName()
  

}
const randomTurn=()=> Math.floor(Math.random() *2) ;