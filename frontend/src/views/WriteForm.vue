<template>
    <div>
        <!--axios 방식의 비동기 전송-->
        <h2>Axios 비동기 전송</h2>
        <label>제목 : </label><input type="text" v-model="title"><br>
        <label>내용 : </label><textarea cols="30" rows="10" v-model="memo"></textarea><br>
        <label>작성자 : </label><input type="text" v-model="writer"><br>
        <button @click="addmemo">전송</button>

        <!--form 태그를 활용한 submit으로 주소 전송-->
        <h2>폼태그 전송</h2>
        <form action="/api/memo/writeform" method="post">
            <label>제목 : </label><input type="text" name="title"><br>
            <label>내용 : </label><textarea cols="30" rows="10" name="memo"></textarea><br>
            <label>작성자 : </label><input type="text" name="writer"><br>
            <input type="submit" value="전송">
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title : "",
            memo : "",
            writer : ""
        }
    },
    methods : {
        addmemo() {
            //post를 이용해서 서버로 값 전달
            this.$http.post('/api/memo', {
                data : {
                    title : this.title,
                    memo : this.memo,
                    writer : this.writer
                }
            }).then((response)=> console.log(response.data));
            this.$router.push('/');
        }
    }
}
</script>