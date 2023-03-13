<template>
    <div class="singer-song">
        <div class="head">
            <div class="iconfont icon-arrow-left" @click="toSingers"></div>
            <div class="iconfont icon-gengduo"></div>
        </div>
        <div class="content">
            <div class="img">
                <img class="auto-img" :src="singerInfo.artist.cover" alt="">
            </div>
            <div class="u-box">
                <div class="img">
                    <img class="auto-img" :src="singerInfo.user.avatarUrl" alt="">
                </div>
                <div class="n">
                    <div class="na">{{singerInfo.user.nickname}}</div>
                    <div class="simg">
                        <img class="auto-img" :src="singerInfo.identify.imageUrl" alt="">
                    </div>
                </div>
                <div class="t">{{singerInfo.user.description}}</div>
                <div class="gz">+ 关注</div>
            </div>
        </div>
        <div class="tab">
            <van-tabs v-model="active">
                <van-tab :title="item.title" v-for="(item, index) in tabData" :key="index"></van-tab>
            </van-tabs>
        </div>

        <!-- 主页 -->
        <div class="zy" v-if="(active === 0)">
            <div class="t">艺人百科</div>
            <p><span>{{singerInfo.artist.name}}</span>{{singerInfo.artist.identifyTag[0]}}</p>
            <div class="info">{{singerInfo.artist.briefDesc}}</div>
        </div>

        <!-- 歌曲 -->
        <div class="gq" v-if="(active === 1)">
            <div class="song-list">
                <div class="song-list-item" v-for="(item, index) in singerSongHotData" :key="index">
                    <SongList :song-data="item" @SongList=" val => SongList(index)"></SongList>
                </div>
            </div>

            <!-- 辅助监听vuex的isPlay变化 -->
            <!-- <input type="hidden" :value="isPlay"> -->
        </div>
    </div>
</template>

<script>
    // import { mapMutations } from 'vuex';
    import { mapState } from 'vuex';
    import SongList from '../components/SongList.vue' 
    export default {
        name: 'SongerSong',

        components:{
            SongList
        },
        data(){
            return{ 
                active: 1,
                tabData:[
                    {
                        title: '主页',
                    },
                    {
                        title: '歌曲',
                    },
                    {
                        title: '专辑',
                    },
                    {
                        title: '动态',
                    },
                    {
                        title: '视频',
                    },
                ],
                
                // 歌手主页信息
                singerInfo:[],

                // 歌手歌曲数据
                singerSongHotData: [],

                
            }
        },

        created(){

            // 获取歌手id
            let singerId = this.$route.params.id;
            console.log('歌手id ==>',singerId);

            // 根据歌手的id获取热门歌曲
            this.getHotSongsBySingerId(singerId);

            // 根据歌手id获取歌手详情
            this.getDetailBySingerId(singerId);
        },

        computed:{
            ...mapState({
                currentAudioInfo: 'currentAudioInfo',

                // isPlay(state){
                //     console.log('aaa');

                //     for(let i = 0; i < this.singerSongHotData.length; i++){
                //         if(this.singerSongHotData[i].id === this.currentAudioInfo.audioId){
                //             this.singerSongHotData[i].isPlay = state.isPlay;
                //             break
                //         }
                //     }

                //     return state.isPlay
                // }
            })
        },

        methods:{
            
            // ...mapMutations(['setAudioId']),

            // 根据歌手id获取歌手详情
            getDetailBySingerId(singerId){
                this.axios({
                    method: 'get',
                    url: '/artist/detail',
                    // url: '/artist/desc',
                    params:{
                        id: singerId,
                    }
                }).then(res => {
                    console.log('res ==> ', res);
                    this.singerInfo = res.data.data
                }).catch(err => {
                    console.log('err ==> ', err);
                })
            },

            // 根据歌手的id获取热门歌曲
            getHotSongsBySingerId(singerId){
                this.axios({
                    method: 'get',
                    url: '/artist/top/song',
                    params:{
                        id: singerId,
                    }
                }).then(res => {
                    console.log('根据歌手的id获取热门歌曲 res ==> ', res);

                    let data = res.data.songs.map(item => {

                        // 可能存在多个歌手
                        let singers = [];
                        item.ar.forEach(singer => {
                            singers.push(singer.name)
                        })

                        return {
                            id: item.id,
                            sname: item.name,
                            name: singers.join('/'),
                            zname: item.al.name,
                            songPic: item.al.picUrl,
                            // isPlay: false,
                            
                        }
                    })

                    this.singerSongHotData.push(...data);
                    // console.log(this.singerSongHotData);
                }).catch(err => {
                    console.log('err ==> ', err);
                })
            },

            // 修改歌曲播放图标状态
            // changeSongIconStatus(){
            //     for(let i = 0;i < this.singerSongHotData.length;i++){
            //         if(this.singerSongHotData[i].isPlay){
            //             this.singerSongHotData[i].isPlay = false;
            //             break;
            //         }
            //     }
            // },

            // 修改音频id
            // changeAudioId(id){
            //     this.setAudioId(id);
            //     // 修改图标状态
            //     // console.log(this.isPlay);
            //     // this.isPlay = !this.isPlay
            //     // console.log(this.isPlay);
            // },

            toSingers(){
                this.$router.push({name: 'Singers'})
            },

        }
    }
</script>

<style lang="less" scoped>
    .singer-song{
        .head{
            display: flex;
            justify-content: space-between;
            margin: 10px;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 3;
            >div{
                width: 30px;
                height: 30px;
                font-size: 30px;
                color: #fff;
            }
        }

        .content{
            .img{
                height: 260px;
                overflow: hidden;
            }
            .u-box{
                height: 150px;
                background-color: rgba(255, 255, 255, .8);
                box-shadow: 0 0 10px rgb(198, 196, 196);
                border-radius: 20px;
                margin: 10px;
                margin-top: -20px;
                position: relative;
                z-index: 2;
                padding-bottom: 10px;
                .img{
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    overflow: hidden;
                    background-color: #fff;
                    position: absolute;
                    top: -50px;
                    left: 0;
                    right: 0;
                    margin: 0 auto;
                    z-index: 1;
                }
                .n{
                    display: flex;
                    justify-content: center;
                    padding-top: 60px;
                    position: relative;
                    z-index: 2;
                    .na{
                        // margin-top: 30px;
                        font-size: 20px;
                        font-weight: 700;
                        margin-right: 8px;
                    }
                    .simg{
                        width: 26px;
                        height: 26px;
                    }
                }
                .t{
                    text-align: center;
                    margin-top: 10px;
                    text-indent: -10px;
                    color: #9ea1a2;
                }
                .gz{
                    width: 54px;
                    height: 24px;
                    line-height: 24px;
                    border-radius: 12px;
                    color: #fff;
                    background-color: #e4393c;
                    text-align: center;
                    left: 0;
                    right: 0;
                    margin: 10px auto;
                }
            }
        }

        .tab{
            /deep/.van-tabs__nav{
                background-color: #f8f8f8;
            }
        }

        // 主页
        .zy{
            background-color: #fff;
            margin: 10px;
            border-radius: 10px;
            padding: 10px;
            margin-bottom: 50px;
            .t{
                font-size: 20px;
                font-weight: 700;
            }
            p{
                font-size: 12px;
                color: #adafb0;
                span{
                    font-size: 14px;
                    color: #2c3e50;
                    margin-right: 6px;
                }
            }
            .info{
                color: #adafb0;
            }
        }

        // 歌曲
        .gq{
            padding-top: 4px;
            padding-bottom: 60px;
            background-color: #fff;
            .item{
                display: flex;
                justify-content: space-between;
                height: 60px;
                // background-color: pink;
                margin-top: 10px;
                .num{
                    line-height: 60px;
                    font-size: 20px;
                    color: #999999;
                    padding: 0 20px;
                }
                .s-name{
                    margin-top: 10px;
                    width: calc(100% - 60px - 40px);
                    .s-n{
                        font-size: 16px;
                        color: #333333;
                    }
                    .s-u{
                        font-size: 14px;
                        color: #808080;
                        margin-top: 4px;
                    }
                }
                .s-btn{
                    // background-color: #fff;
                    width: 30px;
                    height: 30px;
                    margin-top: 15px;
                    margin-right: 10px;
                    font-size: 30px;
                }
            }
        }
    }
</style>