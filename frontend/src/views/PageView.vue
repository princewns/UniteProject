<template>
    <div>
        <h2>{{memo.title}}</h2>
        <p>{{memo.memo}}</p>
        <p>작성자 : {{memo.writer}}</p>
    </div>
</template>

<script>
export default {
    created(){
        /* /api/memo/params:id 를 넣어서 전달
        memo.id로 구분해서 그 객체만 들고올수 있다.*/
        this.$http.get(`/api/memo/${this.$route.params.id}`)
        .then((response)=>{
            this.memo = response.data;
        })
    },
    data() {
        return ({
            memo : {}
        })
    }
}
</script>