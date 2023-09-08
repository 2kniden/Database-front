<template>
    <div class="rankitem">
        <div class="rankpic-container">
            <img class="rankpic" :src="picsrc" alt="">
        </div>
        <div class="rankmiddle">
            <div class="ranktitle">{{ title }}</div>
            <div class="rankscore">
                <img class="rankscorepic" src="../../assets/attractions/highrank/score.svg" alt="">
                {{ score }}
            </div>
        </div>
        <div class="rankbottom">
            <img class="ranklocpic" src="../../assets/attractions/highrank/location.svg" alt="">
            {{ dec }}
        </div>
    </div>
</template>


<script>
export default {
    props: {
        picsrc: String,
        title: String,
        score: Number,
        dec: String
    }
}

</script>

<style>
.rankitem {
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
    width: 27%;
    padding: 10px;
    margin: 20px;
    box-shadow:1px 3px 3px 3px rgba(128, 151, 253, 0.4);
    border: 1px #fff solid;
    border-radius: 10px;
}
.rankitem:hover {
  box-shadow: none;
  border: 1px #8097FD solid;
}
.rankpic-container {
  width: 100%; 
}
.rankpic {
    width: 100%;
    height: 250px;
    object-fit: cover;
}

.rankmiddle {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 5px 10px;

}

.ranktitle {
    font-size: 18px;
    font-weight: bold;
}

.rankscorepic {
    width: 20px;
    height: 20px;
    transform: translate(0, 25%);

}

.rankbottom {
    display: flex;
    flex: 1;
    margin: 10px 5px 5px 5px;
    font-size: 14px;
}

.ranklocpic {
    width: 20px;
    height: 20px;
    transform: translate(0, 10%);

}
</style>