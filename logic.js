
const TicToc={
    board:document.getElementsByClassName("board")[0],
    cells:document.getElementsByClassName("cell"),
    currentPlayer:document.getElementById("current"),
    playerColors:['red','yellow'],
    playerMarks:['X','O'],
    currentPlayerIndex:0,
    currentPlayerMark:'X',
    checkedFields:Array(9).fill(''),
    winStates: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
      ],
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
    init:function(){
        // get fields empty
        this.checkedFields.fill('');
        for(i=0;i<this.cells.length;i++)  this.cells[i].textContent='';
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
      this.toggleTurn()
      
    },

}
TicToc.init()

