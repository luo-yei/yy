<template>
    <div class="control" :class="{mainbox: isMain}">
        <div class="music-img" :class="{playing: isPlay}" @click="setShowPlayPage(true)">
            <img class="auto-img" :src="currentAudioInfo.songPic" alt="">
        </div>
        <div class="music-info">
            <div class="music-songname">
                <div class="m-songname one-text">{{currentAudioInfo.songName}}</div>
                <div class="m-singer">-{{currentAudioInfo.singerName}}</div>
            </div>
            <div class="music-icon">
                <div class="m-icon iconfont " :class="[isPlay ? 'icon-icon-1' : 'icon-icon-']" @click="changeAudioStatus"></div>
                <div class="m-icon iconfont icon-bofangliebiao"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapState,
        mapMutations,
    } from 'vuex';
    export default {
        name: 'Control',
        computed: {
            ...mapState(['isMain', 'isPlay', '$audio', 'currentAudioInfo'])
        },

        methods:{
            ...mapMutations(['setShowPlayPage', 'setAudioIsPlay']),

            // 播放暂停音频
            changeAudioStatus(){

                if(this.currentAudioInfo.audioId === ''){
                    return;
                }

                this.setAudioIsPlay(!this.isPlay);
                if(this.isPlay){
                    this.$audio.play();
                }else{
                    this.$audio.pause();
                }
                

            }

        }
    }
</script>

<style lang="less" scoped>
    .control{
        position: fixed;
        bottom: 0px;
        left: 0;
        right: 0;
        padding: 0 10px;
        height: 50px;
        background-color: #fff;
        display: flex;
        transition: bottom .4s ease-out;
        z-index: 10;
        &.mainbox{
            bottom: 46px;
        }
        
        .music-img{
            width: 46px;
            height: 46px;
            background-color: #ddd;
            border-radius: 50%;
            position: relative;
            top: -10px;
            overflow: hidden;
            box-shadow: 0px 0px 6px 3px rgba(0, 0, 0, .5);
            animation: r1 10s linear 0s infinite normal paused;
            &.playing{
                animation-play-state: running;
            }
        }
        @keyframes r1{
            0%{
                transform: rotateZ(0deg);
            }
            
            100%{
                transform: rotateZ(360deg);
            }
        }

        .music-info{
            display: flex;
            align-items: center;
            width: calc(100% - 40px - 10px);
            margin-left: 10px;
            .music-songname{
                width: calc(100%);
                display: flex;
                align-items: center;
                .m-songname{
                    font-size: 14px;
                    max-width: 100px;
                }
                .m-singer{
                    color: #999;
                    font-size: 12px;
                    margin-left: 4px;
                }
            }
            .music-icon{
                display: flex;
                .m-icon{
                    width: 30px;
                    height: 30px;
                    // background-color: #ddd;
                    border-radius: 50%;
                    font-size: 30px;
                    &:first-child{
                        margin-right: 10px;
                    }
                }
            }
        }
    }
</style>