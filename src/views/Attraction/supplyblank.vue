<template>

</template>
<script>
export default{
    mounted(){
        this.attractionID=this.$route.query.attractionID;
        this.goback();
    },
    data(){
        return{
            attractionID:'',
        }
        
    },
    methods:{
        goback(){
            this.$router.push({ name: 'attractiondetails', query: { attractionID:this.attractionID  } });
        }
    }
}
</script>

<style>
</style>