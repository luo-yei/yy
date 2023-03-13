<template>
    <!-- 发现 -->
    <div class="find">
        <div class="head">
            <span class="iconfont icon-qita"></span>
            <form action="/">
                <van-search
                v-model="value"
                shape="round"
                placeholder="请输入搜索关键词"
                @search="onSearch"
                @click="toSearch"
                />
            </form>
            <span class="iconfont icon-huatong"></span>

        </div>

        <div class="main">
            <div class="slideshow">
                <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                    <van-swipe-item v-for="(item, index) in bannerData" :key="index">
                        <div class="img">
                            <img class="auto-img" :src="item.pic" alt="">
                        </div>
                    </van-swipe-item>
                </van-swipe>
            </div>
        </div>

        <div class="everyDay">
            <div class="item" @click="toEveryRecommend">
                <span class="iconfont icon-rili"></span>
                <div class="t">每日推荐</div>
            </div>
            <div class="item">
                <span class="iconfont icon-a-tupianyihuifu-10"></span>
                <div class="t">私人FM</div>
            </div>
            <div class="item">
                <span class="iconfont icon-ziyuan20"></span>
                <div class="t">歌单</div>
            </div>
            <div class="item">
                <span class="iconfont icon-paihangbang"></span>
                <div class="t">排行榜</div>
            </div>
            <div class="item">
                <span class="iconfont icon-bofangqi-bofangxiaodianshi"></span>
                <div class="t">直播</div>
            </div>
            <div class="item">
                <span class="iconfont icon-zhuanji"></span>
                <div class="t">数字专辑</div>
            </div>
            <div class="item">
                <span class="iconfont icon-benshubook121"></span>
                <div class="t">有声书</div>
            </div>
            <div class="item">
                <span class="iconfont icon-woguanzhudetougu"></span>
                <div class="t">关注新歌</div>
            </div>
            <div class="item">
                <span class="iconfont icon-kapian"></span>
                <div class="t">一歌一遇</div>
            </div>
            <div class="item">
                <span class="iconfont icon-youxi"></span>
                <div class="t">游戏专区</div>
            </div>
        </div>

        <!-- <div class="content">
            <div class="recommend">
                <div class="h">推荐歌单 ></div>
                <div class="content">
                    <div class="item">
                        <div class="img">
                            <img class="auto-img" src="../assets/images/蜡笔小新.jpg" alt="">
                        </div>
                        <div class="t">今天从今天从今天今天从</div>
                    </div>
                    <div class="item">
                        <div class="img">
                            <img class="auto-img" src="../assets/images/蜡笔小新.jpg" alt="">
                        </div>
                        <div class="t">今天从今天从今天今天从</div>
                    </div>
                    <div class="item">
                        <div class="img">
                            <img class="auto-img" src="../assets/images/蜡笔小新.jpg" alt="">
                        </div>
                        <div class="t">今天从今天从今天今天从</div>
                    </div>
                    <div class="item">
                        <div class="img">
                            <img class="auto-img" src="../assets/images/蜡笔小新.jpg" alt="">
                        </div>
                        <div class="t">今天从今天从今天今天从</div>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="content">
            <div class="recommend">
                <div class="h">推荐歌单 ></div>
                <div class="content">
                    <div class="it" v-for="(item, index) in recommendData" :key="index">
                        <div class="img" @click="viewTuijianSong(item.id, item.picUrl, item.name, item.creator.avatarUrl, item.creator.nickname)">
                            <img class="auto-img" :src="item.picUrl" alt="">
                        </div>
                        <div class="t">{{item.name}}</div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
    import { mapMutations } from 'vuex';
    export default {
        name: 'Find',

        data(){
            return{
                // 搜索框value值
                value: '',

                // banner数据
                bannerData: [],

                // 首页数据
                shoyeData: [],

                // 每日推荐
                recommendData: [],
            }
        },
        created() {
            this.getBanner();

            // this.getTuijian();

            // 每日推荐歌单
            this.getTuijianList();

        },
        methods: {

            ...mapMutations(['setIsMain']),

            // 搜索框方法
            onSearch(val) {
                Toast(val);
            },


            // 轮播图
            getBanner(){
                this.axios({
                    method: 'get',
                    url: '/banner?type=2',
                }).then(res => {
                    console.log('banner res ==> ', res);
                    this.bannerData = res.data.banners;
                }).catch(err => {
                    console.log('banner err ==> ', err);
                })
            },


            // 推荐歌单
            getTuijianList(){
                this.axios({
                    method: 'get',
                    url: '/recommend/resource',
                }).then(res => {
                    console.log('推荐歌单 res ==> ', res);
                    this.recommendData = res.data.recommend;
                }).catch(err => {
                    console.log('推荐歌单 err ==> ', err);
                })
            },


            toSearch(){
                this.setIsMain(false);
                this.$router.push({name: 'Search'})
            },

            // 每日推荐
            toEveryRecommend(){
                this.setIsMain(false);
                this.$router.push({name: 'EveryRecommend'})
            },

            // 推荐歌单歌曲
            viewTuijianSong(id, img, text, uimg, uname){
                this.setIsMain(false)
                this.$router.push({name: 'RecSongs', params: {id, img, text, uimg, uname}})
            }

        },
    }
</script>

<style lang="less" scoped>
    .find{
        background-color: #fff;
        height: 1000px;
        .head{
            position: sticky;
            top: 0;
            background-color: #fff;
            display: flex;
            z-index: 2;
            // justify-content: space-between;
            padding: 0 10px;
            span{
                font-size: 22px;
                height: 54px;
                line-height: 54px;
            }
            .van-search{
                width: 311px;
            }
        }
        
        .main{
            // height: 1000px;
            background-color: pink;
            .slideshow{
                margin-top: 10px;
                .my-swipe .van-swipe-item {
                    width: 328px;
                    height: 128px;
                    color: #fff;
                    font-size: 20px;
                    line-height: 150px;
                    text-align: center;
                    background-color: #39a9ed;
                }
            }
        }

        .everyDay{
            background-color: #fff;
            display: flex;
            overflow-y: auto;
            white-space: nowrap;
            margin: 20px 0px;
            text-align: center;
            &::-webkit-scrollbar{
                display: none;
            }
            .item{
                width: 75px;
                margin: 0 20px;
                span{
                    font-size: 30px;
                    color: #fb364b;
                    text-align: center;
                    // margin-left: 10px;
                }
                .t{
                    font-size: 12px;
                    color: #6c737e;
                    text-align: center;
                }
            }
        }

        .content{
            // display: flex;
            .recommend{
                margin-left: 10px;
                border-bottom: 1px solid #eeeff3;
                padding-bottom: 10px;
                // background-color: pink;
                .h{
                    font-weight: 700;
                    font-size: 16px;
                    height: 36px;
                    line-height: 36px;
                    span{
                        font-size: 26px;
                        margin-top: 10px;
                        background-color: #fff;
                    }
                }
                .content{
                    // height: 100px;
                    display: flex;
                    overflow-y: auto;
                    white-space: nowrap;
                    &::-webkit-scrollbar{
                        display: none;
                    }
                    .it{
                        width: 110px;
                        margin-right: 10px;
                        // background-color: pink;
                        .img{
                            width: 110px;
                            height: 110px;
                            border-radius: 12px;
                            overflow: hidden;
                        }
                        .t{
                            overflow:hidden; 
                            text-overflow:ellipsis;
                            // display:-webkit-box; 
                            // -webkit-box-orient:vertical;
                            // -webkit-line-clamp:2; 
                            white-space:nowrap; 
                        }
                    }
                }
            }
        }
        
    }
</style>