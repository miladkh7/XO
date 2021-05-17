

function SuggestMove(board,playerIndex){
    BestMove(board,playerIndex)
 return RandomMove(board)
}
function BestMove(board,turnIndex){
    let bestMove
    let bestScore=-Infinity
    console.log('in best move')
    board.map((e,i)=>{
        // console.log(e,i)
        score=0
        if (e!==''){
            board[i]=turnIndex
            console.log('this is my board1',board)
            // let score=MinMax(board,0,0)
            board[i]=''
            console.log('this is my board2',board)
            if(score>bestScore){
                bestMove=i
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

function MinMax(board,depth,isMax){
    console.log('we are in min max ')
    TicToc.test()
    let winner=null// check who whin
    if (!winner){
        return true
    }

    if (isMax){
        //best=-infinity
        //mark each cell
        // run min max and calculate
        //let score =minmax(board,depht+1,false) 
        //unmark cell
        //best =max(score,best score)
        //return best score
    }
    else{
        //best=infinity
        //mark each cell
        // run min max and calculate
        //let score =minmax(board,depht+1,true) 
        //unmark cell
        //best =min(score,best score)
        //return best score

    }
    return 1
    
}