<template>
    <!-- 歌手分类 -->
    <div class="singers">
        <div class="heads">
            <div class="head">
                <div class="b iconfont icon-arrow-left" @click="toSearch"></div>
                <div class="tit">歌手分类</div>
            </div>
            <div class="classify">
                <div class="region">
                    <!-- <van-tabs v-model="regionActive">
                        <van-tab :title="item.title" v-for="(item, index) in regionData" :key="index" @click="getRegionArea(item.area)"></van-tab>
                    </van-tabs> -->
                    <div class="item" :class="{active: regionActive === index}" v-for="(item, index) in regionData" :key="index" @click="getRegionArea(item.area, index)">{{item.title}}</div>
                </div>
                <div class="people">
                    <!-- <van-tabs v-model="peopleActive">
                        <van-tab :title="item.title" v-for="(item, index) in peopleData" :key="index" @click="getPeopleType(item.type)"></van-tab>
                    </van-tabs> -->
                    <div class="item" :class="{active: peopleActive === index}" v-for="(item, index) in peopleData" :key="index" @click="getPeopleType(item.type, index)">{{item.title}}</div>
                </div>
            </div>
        </div>

        <div class="content">
            <div class="title">热门歌手</div>

            <ul>
                <li class="singer-item" v-for="(item, index) in singerListData" :key="index" @click="viewSingerSong(item.id)">
                    <div class="u">
                        <div class="u-img">
                            <img class="auto-img" :src="item.img1v1Url" alt="">
                        </div>
                        <div class="u-name">{{item.name}}</div>
                    </div>
                    <div class="gz">+ 关注</div>
                </li>
            </ul>
        </div>
        
    </div>
</template>

<script>
    import { mapMutations } from 'vuex';
    export default {
        name: 'Singers',

        data(){
            return{
                // 歌手分类数据
                regionActive: -1,
                regionArea: -1,
                regionData:[
                    {
                        title: '华语',
                        area: 7,
                    },
                    {
                        title: '欧美',
                        area: 96,
                    },
                    {
                        title: '日本',
                        area: 8,
                    },
                    {
                        title: '韩国',
                        area: 16,
                    },
                    {
                        title: '其他',
                        area: 0,
                    },
                ],

                peopleActive: -1,
                peopleType: -1,
                peopleData:[
                    {
                        title: '男',
                        type: 1,
                    },
                    {
                        title: '女',
                        type: 2,
                    },
                    {
                        title: '乐队/组合',
                        type: 3,
                    },
                ],

                // 歌手列表
                singerListData: [],


            }
        },

        created(){
            this.getSingerList();
        },

        methods:{

            ...mapMutations(['setIsMain']),

            toSearch(){
                this.$router.push({name: 'Search'});
            },

            // 歌手分类数据处理
            getRegionArea(area,i){
                this.regionArea = area;
                // console.log(this.regionArea);
                this.regionActive = i;
                this.getSingerList();
            },
            getPeopleType(type,i){
                this.peopleType = type;
                this.peopleActive = i;
                this.getSingerList();
            },

            // 获取歌手列表
            getSingerList(){
                this.axios({
                    method: 'get',
                    url: '/artist/list',
                    params: {
                        //歌手类型: -1:全部 1:男歌手 2:女歌手 3:乐队
                        type: this.peopleType,
                        //歌手的地区: -1:全部 7华语 96欧美 8:日本 16韩国 0:其他
                        area: this.regionArea,
                        //获取数据量
                        limit: 20,
                        //数据偏移数据量
                        offset: 0
                    }
                }).then(res => {
                    console.log('res ==> ', res);
                    // console.log(this.regionArea);
                    // console.log(this.peopleType);
                    this.singerListData = res.data.artists;
                }).catch(err => {
                    console.log('err => ', err);
                })
            },

            // 查看歌手的歌曲
            viewSingerSong(id){
                this.setIsMain(false)
                this.$router.push({name: 'SingerSong', params: {id}})
            }
        },
        
    }
</script>

<style lang="less" scoped>
    .singers{
        position: absolute;
        top: -20px;
        left: 0;
        right: 0;
        z-index: 2;
        // background-color: pink;
        // height: 1000px;
        .heads{
            background-color: #fff;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            padding-bottom: 10px;
            .head{
                height: 50px;
                display: flex;
                .b{
                    width: 34px;
                    height: 34px;
                    // background-color: #fff;
                    color: #000;
                    line-height: 50px;
                    font-size: 34px;
                    margin-left: 10px;
                    text-align: center;
                    margin-right: 20px;
                }
                .tit{
                    color: #000;
                    line-height: 50px;
                    font-size: 16px;
                    font-weight: 700;
                }
            }

            .classify{
                margin-left: 10px;
                margin-top: 14px;
                /deep/.van-tab{
                    width: 70px;
                }
                /deep/.van-tabs__nav--line{
                    padding-bottom: 0px;
                    height: 20px;
                }
                /deep/.van-tab--active{
                    color: red;
                }
                /deep/.van-tabs__line {
                    height: 0;
                }
                .region{
                    display: flex;
                    .item{
                        margin-right: 20px;
                        &.active{
                            color: red;
                        }
                    }
                    height: 20px;
                }
                .people{
                    display: flex;
                    height: 20px;
                    margin-top: 10px;
                    .item{
                        // margin-top: 10px;
                        margin-right: 32px;
                        margin-left: 4px;
                        &.active{
                            color: red;
                        }
                    }
                }
            }
            
        }

        .content{
            background-color: #fff;
            // height: 100%;
            margin-top: 145px;
            margin-bottom: 50px;
            .title{
                background-color: #f3f3f3;
                color: #a9a9a9;
                font-size: 12px;
                padding-left: 10px;
                height: 20px;
                line-height: 20px;
            }

            ul{
                .singer-item{
                    display: flex;
                    justify-content: space-between;
                    // padding: 15px 15px 15px 12px;
                    background-color: #fff;
                    height: 60px;
                    line-height: 60px;
                    .u{
                        display: flex;
                        .u-img{
                            width: 40px;
                            height: 40px;
                            background-color: #ddd;
                            border-radius: 50%;
                            margin: 12px;
                            overflow: hidden;
                        }
                        .u-name{
                            font-size: 14px;
                            color: #333333;
                            line-height: 66px;
                        }
                    }
                    .gz{
                        width: 64px;
                        height: 24px;
                        border-radius: 15px;
                        border: 1px solid #ff3a3a;
                        color: #ff3a3a;
                        text-align: center;
                        line-height: 24px;
                        margin-top: 16px;
                        margin-right: 12px;
                    }
                }
            }
        }
        
    }
</style>