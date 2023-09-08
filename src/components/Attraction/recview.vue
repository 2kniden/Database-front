<template>
    <!-- 热门景点部分 -->
    <div class="recommend">
        <img class="recommendpic" :src="picsrc" :alt="title">
        <div class="recommendtitle custom-font">{{ title }}</div>
    </div>
</template>

<script>
export default {
    // 导入对象
    props: {
        picsrc: String,
        title: String,
    }
}

</script>

<style>
@font-face {
  font-family: 'FAMILYDUANNINGMAOBI-XINGYI';
  src: url('../../fonts/段宁毛笔行艺体.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
.custom-font {
  font-family: 'FAMILYDUANNINGMAOBI-XINGYI', sans-serif;
}
.recommend {
    position: relative;
    width: 250px;
    /* Set the width of the image container */
    height: 250px;
    /* Set the height of the image container */
    margin: 15px;
    /* Create spacing between the image containers */

}

.recommendpic {
    width: 100%;
    /* Set the width to 100% */
    height: 100%;
    /* Set the height to 100% */
    border-radius: 10px;
    object-fit: cover;
    /* Preserve aspect ratio and cover entire container */
}

.recommendtitle {
    position: absolute;
    /* 设置为绝对定位，让它悬浮在背景图片之上 */
    top: 50%;
    /* 将文字的顶部定位到父容器的中间 */
    left: 50%;
    /* 将文字的左边定位到父容器的中间 */
    transform: translate(-50%, -50%);
    /* 使用transform属性将文字向左和向上移动其自身宽度和高度的一半，使其处于准确的中心位置 */
    letter-spacing: 2px;
    padding: 10px;
    /* 可选：如果添加了背景颜色，可以调整内边距以适应文本样式 */
    font-size: 20px;
    font-weight: 300px;
    color: #F1F3FF;
}
</style>