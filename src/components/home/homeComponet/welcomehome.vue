<template>
    <div class="welcomeHome">
            <div class="welcomeTwo">
                <div class="background-img"><img src="../../../assets/homeBackground.png" alt=""></div>
                <div class="background-tit">
                        <h2>欢迎来到</h2>
                        <h3>爱讯内部管理系统</h3>
                </div>
             </div>
    </div>
     
</template>
<script>
export default {
    
}
</script>
<style scoped>
@media screen and (min-width:1400px){
    .welcomeHome{
        width: 100%;
    }
    .welcomeTwo{
            width: 100%;
    }
    .welcomeTwo> .background-img{
            float: left;
            width: 316px;
            height: 256px;
            margin-left: 365px;
            margin-top: 260px;
    }
    .welcomeTwo>.background-img>img{
          width: 100%;
          height: 100%;
    }
    .background-tit{
        float: left;
        margin-top:315px;
        margin-left: 126px;
    }
    .background-tit>h2{
       
        height: 41px;
        line-height: 1;
        font-size: 44px;
        font-weight: normal;
        letter-spacing: 6px;
        color: #5897FF;
        margin-bottom:24px;
        text-align: center
    }
     .background-tit>h3{
        width: 270px;
        height: 30px;
        font-size: 29px;
        color: #5897FF;
        font-weight: normal;
        letter-spacing: 2px;
     }
}

@media screen and (max-width:1400px){
     .welcomeHome{
        width: 100%;
    }
    .welcomeTwo{
            width: 100%;
    }
    .welcomeTwo> .background-img{
            float: left;
            width: 231px;
            height: 190px;
            margin-left: 194px;
            margin-top: 177px;
    }
    .welcomeTwo>.background-img>img{
          width: 100%;
          height: 100%;
    }
    .background-tit{
        float: left;
        margin-top:222px;
        margin-left: 46px;
    }
    .background-tit>h2{
       
        height: 30px;
        line-height: 1;
        font-size: 32px;
        font-weight: normal;
        letter-spacing: 4px;
        color: #5897FF;
        margin-bottom:18px;
        text-align: center
    }
     .background-tit>h3{
        width: 200px;
        height: 22px;
        font-size: 22px;
        color: #5897FF;
        font-weight: normal;
        letter-spacing: 2px;
     }
}
</style>

