var express = require('express');
var router = express.Router();
//json 데이터 불러오기
const memos = require('../memo.json');
//전체 추가된 메모의 갯수
let count = memos.length;

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

//메모의 id값을 주소로 받아와서 삭제
router.delete('/:id', function(req,res,next) {
    const id = req.params.id;
    //memo.id값을 통해 memos의 인덱스를 찾아서 삭제
    // >> findindex()를 이용해서 조건이 참인 index값을 찾을수 있음
    const i = memos.findIndex((memo) => memo.id == id);
    //memos에서 제거
    memos.splice(i, 1);
    console.log(memos);
    res.send(memos);
});

//put을 통해 받아온 값 수정 : body의 data로 받아옴
router.put('/updateform', function(req,res,next) {
    const memo = req.body.data.memo;
    console.log(memo);
    /*메모의 인덱스를 찾아서 값을 할당
    *title과 memo의 값이 바뀌었기 때문에, memo.id값으로 찾아야함*/
   const i = memos.findIndex((m) => memo.id == m.id);
   memos[i] = memo;
   res.send('ok');
});

module.exports = router;