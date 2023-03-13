<template>
    <!-- 搜索 -->
    <div class="search">
        
        <div class="head">
            <div class="search-box">
                <span class="iconfont icon-arrow-left" @click="back"></span>
                <van-search
                v-model="value"
                show-action
                shape="round"
                placeholder="请输入搜索关键词"
                @input="changeValue"
                >
                    <template #action>
                        <div @click="toSearchRes">搜索</div>
                    </template>
                </van-search>
            </div>

            <!-- 分类 -->
            <div class="tab" v-show="!SearchResShow">
                <van-tabs>
                    <van-tab v-for="(item, index) in classifyData" :key="index" :to="{name: item.name}">
                        <template #title> <span :class="item.icon">{{item.title}}</span></template>
                    </van-tab>
                </van-tabs>
            </div>
        </div>

        <!-- 搜索建议 -->
        <div class="searchRec"  v-if="value.trim().length != 0 && !SearchResShow">
            <div class="item" v-for="(item, index) in searchRecData" :key="index" @click="toSearchRes">
                <span class="iconfont icon-sousuo"></span>
                <div class="info">
                    <div class="singer">{{ item.singers }}</div>
                    <div class="song">{{ item.song }}</div>
                </div>
            </div>
        </div>

        <div class="searchRes" v-show="SearchResShow">
                <van-tabs v-model="active">
                    <van-tab :title="item.title" v-for="(item, index) in tabData" :key="index"></van-tab>
                </van-tabs>

                <!-- 综合 -->
                <div class="zonhe" v-if="active === 0">
                    <div class="single">
                        <div class="h">单曲</div>
                        <div class="item"  v-for="(item, index) in searchRecData" :key="index" @click="changeAudioId(item.id, item.singers, item.song, item.songPic)">
                            <div class="song">{{ item.song }}</div>
                            <div class="singer">{{ item.singers }}</div>
                        </div>
                    </div>
                </div>
            </div>

        <router-view></router-view>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';
    export default {
        name: 'Search',



        data(){
            return{
                value: '',

                // 分类数据
                classifyData: [
                    {
                        title: '歌手',
                        icon: 'iconfont icon-geshou',
                        name: 'Singers'
                    },
                    {
                        title: '曲风',
                        icon: 'iconfont icon-benshubook121',
                        name: 'Singers'
                    },
                    {
                        title: '专区',
                        icon: 'iconfont icon-ziyuan20',
                        name: 'Singers'
                    },
                    {
                        title: '识曲',
                        icon: 'iconfont icon-huatong',
                        name: 'Singers'
                    },
                ],

                timer: null,

                searchRecData: [],

                SearchResShow: false,

                active: 0,
                tabData: [
                    {
                        title: '综合',
                    },
                    {
                        title: '单曲',
                    },
                    {
                        title: '歌单',
                    },
                    {
                        title: '视频',
                    },
                    {
                        title: '歌手',
                    },
                    {
                        title: '播客',
                    },
                ],

                searchRecData: [],
            }
        },
        computed:{
            ...mapState([ 'vv', "currentAudioInfo", "$audio", "isPlay" ]),
        },
        created(){
            this.getSearchRec();
        },

        methods:{
            ...mapMutations([ 'setValue', 'setAudioId' ]),
            back(){
                this.value = '';
                this.$router.push({name: 'Find'});
            },

            // 搜索建议
            getSearchRec(){
                this.searchRecData = [];
                this.axios({
                    method: 'get',
                    url: '/search/suggest',
                    params:{
                        keywords: this.value,
                    }
                }).then(res => {
                    console.log("搜索建议res ==> ", res);

                    let data = res.data.result.songs.map(item => {

                    // 可能存在多个歌手
                    let singers = [];
                    item.artists.forEach(singer => {
                        singers.push(singer.name)
                    })

                    return {
                        id: item.id,
                        singers: singers.join('/'),
                        song: item.name,
                        songPic: item.artists[0].img1v1Url
                        
                    }
                    })

                    this.searchRecData.push(...data);
                    console.log(this.searchRecData);
                }).catch(err => {
                    console.log('err ==> ', err);
                })
            },


            // 修改音频id
            changeAudioId(id, singers, song, songPic) {
                // console.log(this.currentAudioInfo.audioId);
                // console.log(id);

                // 判断单曲音频的id是否和点击播放的音频id一致
                if (this.currentAudioInfo.audioId === id) {
                    console.log("进来了");

                    if (this.isPlay) {
                        // 暂停
                        this.$audio.pause();
                    } else {
                        // 播放音频
                        this.$audio.play();
                    }
                } else {
                    // 设置新的音频id
                    // vuex 修改音频id
                    this.setAudioId({
                        audioId: id,
                        singerName: singers,
                        songName: song,
                        songPic: songPic,
                    });
                }
            },


            // 输入防抖
            changeValue() {
                // 如果timer不为空就表明在持续输入,每次改变都清除定时，这样就可以实现只输入最后一次结果(注意每次间隔如果超过500毫秒就会输出)
                this.searchRecData = [];
                if (this.timer !== null) clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    if (this.value.trim().length != 0) {
                        this.value = this.value.trim();
                        console.log(this.value);
                        this.getSearchRec();
                    }
                }, 500);
            },

            // 搜索结果
            toSearchRes(){
                this.setValue(this.value)
                this.SearchResShow = true;
            }

        }
    }
</script>

<style lang="less" scoped>
    .search{
        .head{
            background-color: #fff;
            .search-box{
                display: flex;
                span{
                    font-size: 24px;
                    margin-left: 10px;
                    height: 54px;
                    line-height: 54px;
                }
                .van-search{
                    width: 100%;
                }
            }
            .tab{
                // margin-left: 14px;
                /deep/.van-tab{
                    color: #f04d51;
                    // span{
                    //     border-right: 1px solid #e4e4e4;
                    //     padding-right: 20px;
                    // }
                }
                // /deep/.van-tab:nth-child(4){
                    // span{
                    //     border-right: 1px solid #fff;
                    //     padding-right: 20px;
                    // }
                // }
                /deep/.van-tab--active{
                    color: #ff0404;
                }
                /deep/.van-tabs__line{
                    height: 0;
                } 
            }
        }

        .searchRec{
            position: fixed;
            top: 50px;
            left: 0;
            right: 0;
            height: 100%;
            background-color: #fff;
            .item{
                display: flex;
                height: 50px;
                margin: 0 10px;
                span{
                    font-size: 20px;
                    line-height: 50px;
                    margin-right: 10px;
                }
                .info{
                    display: flex;
                    line-height: 50px;
                    font-size: 14px;
                    line-height: 50px;
                    .singer{
                        margin-right: 10px;
                    }
                }

            }
        }

        .searchRes{
            position: fixed;
            top: 50px;
            left: 0;
            right: 0;
            height: 100%;
            .zonhe{
                .single{
                    margin: 20px;
                    background-color: #fff;
                    border-radius: 20px;
                    .h{
                        font-size: 16px;
                        font-weight: 700;
                        height: 50px;
                        line-height: 50px;
                        border-bottom: 1px solid #f5f5f5;
                        margin-left: 10px;
                    }
                    .item{
                        margin: 10px;
                        border-bottom: 1px solid #f5f5f5;
                        .song{
                            font-size: 14px;
                            font-weight: 700;
                        }
                        .singer{
                            font-size: 12px;
                            color: #a9a9a9;
                            padding-bottom: 10px;
                        }
                    }
                }
            }
        }
    }
</style>