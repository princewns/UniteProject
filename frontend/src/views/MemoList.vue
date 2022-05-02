<template>
    <div>
        <table>
            <tr>
                <td>번호</td>
                <td>제목</td>
                <td>작성자</td>
            </tr>
            <tr v-for="(memo, i) in memo" :key="i">
                <td>{{memo.id}}</td>
                <td @click="$router.push(`/list/${memo.id}`)">{{memo.title}}</td>
                <td>{{memo.writer}}</td>
                <td><button @click="$router.push(`/updateform/${memo.id}`)">수정</button></td>
                <td><button @click="deletememo(memo.id)">삭제</button></td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            memo : []
        }
    },
    created() {
        /*서버로 접근해서 데이터를 가져올 함수
        axios 비동기로 값을 가져옴 : get*/
        this.$http.get('/api/memo').then((response)=>{
            //서버에 값이 들어오면 콘솔로그에 출력 후 값 저장
            console.log(response.data);
            this.memo = response.data;
        })
    },
    methods : {
        //axios를 통해 id 값을 가진 memo를 삭제
        deletememo(id) {
            this.$http.delete(`/api/memo/${id}`)
            .then((response) => {
                //값이 삭제된 메모배열을 다시 할당
                //서버로 요청해서 값이 삭제되었지만 화면에 적용하기 위해 메모배열을 들고옴
                this.memo = response.data
            });
        }
    }
}
</script>