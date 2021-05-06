
const TicToc={
    board:document.getElementsByClassName("board")[0],
    cells:document.getElementsByClassName("cell"),
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
    init:function(){
        // get fields empty

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
      // find cell index
      //i=e.target.cellIndex
      //j=e.target.parentElement.rowIndex

      var currentField = e.target
      var currentFieldNumber = Array.prototype.indexOf.call(this.cells,currentField);
      if (currentField.textContent) return
      this.changePlayerColor(currentField)
      this.checkedFields[currentFieldNumber] =this.currentPlayerIndex
      console.log(this.checkedFields)
      currentField.textContent = this.currentPlayerMark
      if(this.CheckWin(this.currentPlayerIndex)) {
        alert(this.currentPlayerMark + ' wons!');
        this.init()
      }
      if(this.CheckTie()){
        alert(' Tie!');
        this.init()
      }

      this.toggleTurn()
      
    },

}
TicToc.init()

