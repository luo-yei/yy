<template>
    <div class="main">

        <div>
            <router-view></router-view>
        </div>

        <!-- 底部选项卡 -->
        <van-tabbar v-model="tabberActive" route>
            <van-tabbar-item :class="item.icon" v-for="(item, index) in tabberData" :key="index" :to="{name: item.name}">{{item.title}}</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'; 
    export default {
        name:'Main',

        data(){
            return{
                // 底部选项卡下标
                tabberActive:0,

                // 底部选项卡数据
                tabberData: [
                    {
                        title: '发现',
                        icon: 'iconfont icon-yinle1',
                        name: 'Find'
                    },
                    {
                        title: '播客',
                        icon: 'iconfont icon-guanzhu1',
                        name: 'Podcast',
                    },
                    {
                        title: '我的',
                        icon: 'iconfont icon-yinle2',
                        name: 'My',
                    },
                    {
                        title: '关注',
                        icon: 'iconfont icon-guanzhu',
                        name: 'Attention',
                    },
                    {
                        title: '社区',
                        icon: 'iconfont icon-shequ',
                        name: 'Community',
                    },
                ],
            };
        },

        created(){
            this.setIsMain(true)
        },

        methods:{
            // 修改vuex的isMain
            ...mapMutations(['setIsMain'])
        }
    }
</script>

<style lang="less" scoped>
    .van-tabbar-item::before{
        font-size: 30px;
    }
    .iconfont{
        font-size: 12px;
    }
    .van-tabbar-item{
        color: #b3b3b3;
    }
    .van-tabbar-item--active{
        color: #ff4444;
    }
    .van-tabbar{
        position: fixed;
        bottom: 0px;
        left: 0;
        right: 0;
    }
</style>