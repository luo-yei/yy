<template>
    <div class="item">
        <!-- <div class="num">{{(val+1)}}</div> -->
        <div class="s-name">
            <div class="s-n one-text">{{songData.sname}}</div>
            <div class="s-u">{{songData.name}} - {{songData.zname}}</div>
        </div>
        <div class="s-btn iconfont " :class="[currentAudioInfo.audioId ===songData.id && isPlay ? 'icon-icon-1' : 'icon-icon-']"   @click="changeAudioId(songData.id)"></div>
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
            ...mapState(['currentAudioInfo', '$audio', 'isPlay'])
        },

        methods:{
            // ...mapMutations(['setAudioId', 'setAudioIsPlay']),
            ...mapMutations(['setAudioId']),

            // 修改音频id
            changeAudioId(id){

                // console.log(this.currentAudioInfo.audioId);
                // console.log(id);

                // 判断单曲音频的id是否和点击播放的音频id一致
                if(this.currentAudioInfo.audioId === id){
                    console.log('进来了');

                    if(this.isPlay){
                        // 暂停
                        this.$audio.pause();
                    }else{
                        // 播放音频
                        this.$audio.play();
                    }

                }else{
                    // 设置新的音频id
                    // vuex 修改音频id
                    this.setAudioId({
                        audioId: id,
                        singerName: this.songData.name,
                        songName: this.songData.sname,
                        songPic: this.songData.songPic,
                    });
                }

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