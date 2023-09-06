<template>
    <div class="linebox">
        <div class="line"></div>
        <div class="linetitle">
            <div>{{ title }}</div>
            <div class="enlinetitle">{{ entitle }}</div>
        </div>
        <div class="line"></div>
    </div>

   
    
</template>

<script>
export default {
    props: {
        title:String,
        entitle:String
    }
}
</script>

<style>

.linebox {
    display: flex;
    flex-direction: row;
    text-align: center;
    justify-content: center;
    align-items: center;
    width: 50%;
    margin: 0 auto 5px auto;
    padding-top: 10px;
    
}

.linetitle {
    flex-wrap: nowrap;
    font-size: 20px;
    font-weight: bold;
    color: #8097FD;
}
.enlinetitle{
    margin-top: 5px;
    font-size: 10px;
    color: #999;
}
.line {
    flex-grow: 1;
    border-bottom: 1px #cdcdcd solid;
    margin: 15px;
}</style>