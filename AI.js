

function SuggestMove(board,playerIndex){
    bestComputerMove=BestMove(board,playerIndex)
    console.log('b',bestComputerMove)
 return bestComputerMove
//  return RandomMove(board)

}

function BestMove(board,turnIndex){
    let bestMove
    let bestScore=-Infinity

    board.map((e,i)=>{
        // console.log(e,i)
        if (e===''){

            board[i]=turnIndex
            let score=MinMax(board,0,false,1)
            // console.log(score)
            board[i]=''
            if(score>bestScore){
                bestScore=score
                bestMove=i
                console.log('beset move ',i)
            }
        }

    })

    return bestMove
}
function RandomMove(board){
    availableCells=board.map((e,i) => e ==='' ? i : undefined).filter(x => x) 
    let randomSelect = availableCells[Math.floor(Math.random() * availableCells.length)];
    return randomSelect
}

function MinMax(board,depth,isMax,turnIndex){
    let score=0
    if(TicToc.CheckTie(board))return score
    let [someOneWin,winner]=TicToc.CheckWin(turnIndex,board)
    if (someOneWin){
        score=winner==1?+1:-1
        return score
    }

    if(isMax){
        let bestScore=-Infinity
        board.map((e,i)=>{
      
            if (e===''){
                board[i]=1
                let score=MinMax(board,depth+1,false,1)
                board[i]=''
                // bestScore=Math.max([score,bestScore])
                if(score>bestScore){
                    bestScore=score
                }
                
            }
        })
        return bestScore
    }
    else{
        // temp for test
        turnIndex2=0
        let bestScore=Infinity
        board.map((e,i)=>{
            if (e===''){
                board[i]=turnIndex2
                let score=MinMax(board,depth+1,true,turnIndex2)
                board[i]=''
                // bestScore=Math.min([score,bestScore])
                
                if(score<bestScore){
                    bestScore=score
                }
                
            }
        })
        return bestScore
    }
    
}


