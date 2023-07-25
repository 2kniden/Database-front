<template>
  <div class="background">

    <!--加载上部背景图-->
    <div class="up-background">
      <Header></Header>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name:"Home",
  components:{
    Header
  },
  data() {
    return {
    };
  },
}
</script>

<style>
*
{
  margin: 0;
  padding: 0;
  border: 0;
}
.background{
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.up-background{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-image: url("../assets/home/up-background.png");
  background-size: cover;
}
</style>
