var express = require('express');
var router = express.Router();
//json 데이터 불러오기
const memos = require('../memo.json');
//전체 추가된 메모의 갯수
let count = 2;

/* GET을 통해 메모를 보내줌 */
router.get('/', function(req, res, next) {
    res.send(memos);
});

//post를 통해 메모값을 받아옴 - axios
router.post('/', function(req,res,next) {
    const memo = req.body.data;
    const m = {
        id : ++count,
        title : memo.title,
        memo : memo.memo,
        writer : memo.writer
    }
    memos.push(m);
    res.send('ok');
});

//post를 통해 메모값을 받아옴 - form으로 받아옴
router.post('/writeform', function(req,res,next) {
    const memo = req.body;
    const m = {
        id : ++count,
        title : memo.title,
        memo : memo.memo,
        writer : memo.writer
    }
    memos.push(m);
    res.redirect('/');
});

/*get을 통해 id값이 동일한 메모를 보내줌*/
router.get('/:id', function(req,res,next) {
    const id = req.params.id;
    /*m은 memos의 필터의 결과가 참인 객체들을 배열로 가져옴
    filter()의 함수로 배열 전체 인자값을 검사하여 params로 받은 id와 인자값의 id가 일치할 경우
    boolean 값으로 리턴한다.*/
    const m = memos.filter( (memo)=> { if(memo.id == id){ return true } } );
    res.send(m[0])
});

module.exports = router;