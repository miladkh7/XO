function tableCreate(num=4) {
  const body = document.getElementsByTagName('body')[0];
  const tableDiv = document.createElement('div');
  tableDiv.className="boarGame"
  const table = document.createElement('table');
  table.className="board"
  console.log(table)
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
  body.appendChild(tableDiv)
}
const TicToc={
    board:undefined,

    currentPlayer:document.getElementById("current"),
    playerColors:['red','yellow'],
    playerMarks:['X','O'],
    currentPlayerIndex:0,
    currentPlayerMark:'X',
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
      this.winStates=winState
    },
    CreateBoard:function(e){
      this.CreateBoard=e
    },
    CheckWin:function(value){
     
      result=false
      for(winState of this.winStates){
        newArray=[]
        for(index of winState){
     
            newArray.push(this.checkedFields[index])
        }
        
        result=newArray.every(val=>val===value)
        if(result) break
        
      }
      return result
    },
    CheckTie:function(){return this.checkedFields.every(val=>val!=='')},
    init:function(size){
        // get fields empty
        this.board=document.getElementsByClassName("board")[0]
        this.cells=document.getElementsByClassName("cell")
        this.gameSize=size
        this.checkedFields=new Array(this.gameSize*this.gameSize).fill(''),
        this.checkedFields.fill('');
        this.CreateWinStates(this.gameSize)
        for(i=0;i<this.cells.length;i++) {
          this.cells[i].textContent='';
          this.cells[i].className="cell"
        } 
        console.log(this.board)
        this.board.addEventListener('click',(e)=>this.handleClick(e));
        this.toggleTurn()
    },
    toggleTurn:function(){

      this.currentPlayer.classList.remove(this.playerColors[this.currentPlayerIndex])

      this.currentPlayerIndex= this.currentPlayerIndex === 1 ? 0 : 1;
      //:D
      // this.currentPlayerIndex=Math.abs(1-this.currentPlayerIndex)
     
      this.currentPlayerMark= this.playerMarks[this.currentPlayerIndex]
      this.currentPlayer.textContent=this.currentPlayerMark
      this.currentPlayer.classList.add(this.playerColors[this.currentPlayerIndex])

    },
    changePlayerColor:function(currentField){
     currentField.classList.add(this.playerColors[this.currentPlayerIndex])

    },
    handleClick:function(e){
      var currentFieldNumber = Array.prototype.indexOf.call(this.cells,e.target);
      this.ApplyMovement(currentFieldNumber)
    },
    ApplyMovement:function(cellNumber){
      cellItem=this.cells[cellNumber]
      if (cellItem.textContent) return
      this.changePlayerColor(cellItem)
      this.checkedFields[cellNumber] =this.currentPlayerIndex
      console.log(this.checkedFields)
      cellItem.textContent = this.currentPlayerMark
      if(this.CheckWin(this.currentPlayerIndex)) {
        alert(this.currentPlayerMark + ' wons!');
        this.init(this.gameSize)
      }
      if(this.CheckTie()){
        alert(' Tie!');
        this.init(this.gameSize)
      }

      this.toggleTurn()

    }

}
gameSize=5
tableCreate(gameSize)
TicToc.init(gameSize)