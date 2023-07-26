<template>
    <div class="linebox">
        <div class="line"></div>
        <div class="linetitle">{{ title }}</div>
        <div class="line"></div>
    </div>
</template>

<script>
export default {
    props: {
        title: String
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
  width: 70%;
  margin: 20px auto 5px auto; /* Center the linebox on the screen */
}

.linetitle {
    flex-wrap: nowrap;
    font-size: 22px;
    font-weight: bold;

}

.line {
    flex-grow: 1;
    border-bottom: 1px #c2c2c2 solid;
    margin: 15px;
}
</style>