<template>
    <div class="item">
        <!-- <div class="num">{{(val+1)}}</div> -->
        <div class="s-name">
            <div class="s-n one-text">{{songData.songName}}</div>
            <div class="s-u">{{songData.singerName}} - {{songData.songName}}</div>
        </div>
        <div class="s-btn iconfont " :class="[songData.isPlay ? 'icon-icon-1' : 'icon-icon-']"   @click="changeAudioId(songData.audioId)"></div>
    </div>
</template>

<script>
    import { mapMutations, mapState } from 'vuex';
    export default {
        name: 'SongList',
        data(){
            return{
                
                // 是否播放
                // isPlay: false,

            }
        },
        props:{
            // 歌曲的数据
            songData:{
                type: Object,
                default(){
                    return {}
                }
            },

        },

        computed:{
            ...mapState(['currentAudioInfo', '$audio'])
        },

        methods:{
            ...mapMutations(['setAudioId', 'setAudioIsPlay']),

            // 修改音频id
            changeAudioId(id){

                // console.log(this.currentAudioInfo.audioId);
                // console.log(id);

                // 判断单曲音频的id是否和点击播放的音频id一致
                if(this.currentAudioInfo.audioId === id){
                    console.log('进来了');
                    // 修改图标状态
                    if(this.songData.isPlay){
                        this.songData.isPlay = false;
                        // vuex 修改音频播放状态
                        this.setAudioIsPlay(false);
                        this.$audio.pause();
                    }else{
                        this.songData.isPlay = true;
                        // vuex 修改音频播放状态
                        this.setAudioIsPlay(true);
                        this.$audio.play();
                    }
                }else{
                    // 触发组件的@changeplay事件通知父组件
                    this.$emit('changeplay')

                    this.songData.isPlay = true;
                    // vuex 修改音频id
                    this.setAudioId({
                        audioId: id,
                        singerName: this.songData.name,
                        songName: this.songData.sname,
                        songPic: this.songData.songPic,
                    });

                    // vuex 修改音频播放状态
                    this.setAudioIsPlay(true);
                }

                // // 判断单曲音频的id是否和点击播放的音频id一致
                // if(this.audioId === id){
                //     console.log('进来了');
                //     // 修改图标状态
                //     if(this.isPlay){
                //         this.isPlay = false;
                //         this.$audio.pause();
                //     }else{
                //         this.isPlay = true;
                //         this.$audio.play();
                //     }
                // }else{
                //     this.isPlay = true
                //     this.setAudioId(id);

                // }
                // // 判断单曲音频的id是否和点击播放的音频id一致
                // this.setAudioId(id);
                // // 修改图标状态
                // console.log(this.isPlay);
                // this.isPlay = !this.isPlay
                // console.log(this.isPlay);
            },
        }
    }
</script>

<style lang="less" scoped>
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
            margin-left: 20px;
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
</style>