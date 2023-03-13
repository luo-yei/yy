<template>
    <div class="play-page" :class="{ show: isShowPlayPage }">
        <div class="filter-bg"></div>
        <div class="play-content">
            <!-- 导航 -->
            <div class="play-nav">
                <div class="p-close iconfont icon-jiantou_liebiaoxiangzuo_o" @click="setShowPlayPage(false)"></div>
                <div class="p-info">
                    <div class="p-song">{{ currentAudioInfo.songName }}</div>
                    <div class="p-singer">{{ currentAudioInfo.singerName }}</div>
                </div>
            </div>

            <!-- 歌词 -->
            <div class="song-word">
                <!-- 歌词盒子 -->
                <div class="sword-box" :style="{top: top + 'px'}">
                    <div v-for="(item, index) in curLyric" :key="index" :class="{'song-active': songLycActiveIndex === index}" :ref="`lyc${index}`">{{item.lyc}}</div>
                </div>
            </div>

            <!-- 播放 -->
            <div class="play-control">
                <div class="time-progress">
                    <div class="time-text">{{ formatCurrentTime }}</div>
                    <div class="play-progress" ref="playProgress">
                        <div>
                            <van-slider v-model="value" active-color="#ee0a24" :max="progressWidth" @drag-start="dragStartProgress" @drag-end="dragEndProgress" @change="changeAudioCurrentTime" @input="changeProgress">
                                <template #button>
                                    <div class="circle-btn"></div>
                                </template>
                            </van-slider>
                        </div>
                    </div>
                    <div class="time-text">{{ formatDuration }}</div>
                </div>

                <div class="play-ctl">
                    <!-- 播放模式, 0 循环顺序播放，1 随机播放，2 单曲循环 -->
                    <!-- 
                        <span class="iconfont icon-xunhuan"></span>    循环
                        <span class="iconfont icon-suiji"></span> 随机
                        <span class="iconfont icon-xunhuan1"></span> 单曲循环
                    -->
                    <div class="play-i iconfont" :class="[playMode === 0 ? 'icon-xunhuan' : playMode === 1 ? 'icon-suiji' : 'icon-xunhuan1']" @click="togglePlayMode"></div>
                    <!-- 上一首 -->
                    <div class="play-i iconfont icon-shangyishou" @click="prevSong"></div>
                    <!-- 播放暂停 -->
                    <div class="play-audio iconfont" :class="[isPlay ? 'icon-icon-1' : 'icon-icon-']" @click="changeAudioStatus"></div>
                    <!-- 下一首 -->
                    <div class="play-i iconfont icon-xiayishou" @click="nextSong"></div>
                    <!-- 播放列表 -->
                    <div class="play-i iconfont icon-bofangliebiao" @click="toddleShow"></div>
                </div>
            </div>
        </div>

        <!-- 播放列表 -->
        <van-popup v-model="show" position="bottom" :style="{height: '60%'}" :overlay="false" :closeable="true" >
            <div class="po-song-list">
                <!-- <div class="po-song-item">
                    <SongList></SongList>
                </div> -->
                <div class="po-song-item" v-for="(item, index) in playList" :key="index">
                    <SongList :song-data="item"></SongList>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

import SongList from '../components/SongList.vue'
import SongListC from '../components/SongListC.vue'

export default {
    name: "PlayPage",
    data() {
        return {

            // 拖动进度条的值
            dragValue: 0,

            // 显示隐藏播放列表
            show: false,

        };
    },

    components:{
        SongList,
        SongListC
    },

    created() {
        this.$nextTick(() => {
            let playProgress = this.$refs.playProgress;
            console.log("playProgress ==> ", playProgress);
            this.setProgressWidth(playProgress.clientWidth);
        });
    },

    computed: {
        ...mapState(["isShowPlayPage", "isPlay", "currentAudioInfo", "$audio", "progressWidth", 'duration', 'currentTime', 'currentLyric', 'top', 'songLycActiveIndex', 'lyricHeight', 'initTop', 'playList', 'playMode']),
        ...mapGetters(["formatDuration", "formatCurrentTime"]),

        // 监听歌词的变化
        curLyric() {
            console.log('监听歌词变化');
            console.log('this.$refs ==> ', this.$refs);

            this.$nextTick(() => {

                if(this.currentLyric.length > 0){

                    // 每一句歌词的高度数组
                    let heightData = [];

                    console.log('this.$refs.lyc0[0] ==> ', this.$refs.lyc0[0]);

                    // 获取前五句歌词的总高度
                    let height = 0;
                    for(let i = 0; i < this.currentLyric.length; i++){
                        let currentHeight = this.$refs[`lyc${i}`][0].clientHeight;

                        if(i < 5){
                            
                            // console.log('currentHeight ==> ', currentHeight);
                            height += currentHeight;
                        }

                        heightData.push(currentHeight)
                        
                    }

                    // vuex 修改歌词盒子的top, initTop
                    this.setTop(height);
                    this.setInitTop(height);

                    // vuex 修改每一行歌词高度数组
                    this.setLyricHeight(heightData);
                    
                    console.log('height ==> ', height);
                }
            })
            
            return this.currentLyric;
        },

        // slider进度条的进度
        value: {
            set(v){
                console.log('进度条的进度发生改变v ==> ', v);
                this.dragValue = v;
                let currentTime = v / this.progressWidth * this.duration;
                // vuex: 修改currentTime
                this.setCurrentTime(currentTime);
            },

            get(){

                // if(this.isDragStart){
                //     console.log('开始拖动进度条');
                //     return;
                // }


                return this.currentTime / this.duration * this.progressWidth;
            },  
        }
    },

    methods: {
        ...mapMutations(["setShowPlayPage", "setAudioIsPlay", "setProgressWidth", 'setIsDragPeogress', 'setCurrentTime', 'setTop', 'setLyricHeight', 'setInitTop', 'setIsChange', 'setSongLycActiveIndex', 'setPlayList', 'setAudioId', 'setPlayMode']),

        // 修改音频的播放状态
        changeAudioStatus() {
            if (this.currentAudioInfo.audioId === "") {
                return;
            }
            if (this.isPlay) {
                this.$audio.pause();
            } else {
                this.$audio.play();
            }

            this.setAudioIsPlay(!this.isPlay);
        },

        // 开始拖动进度条
        dragStartProgress(){
            console.log('drag start');
            this.setIsDragPeogress(true);
            this.setIsChange(true);
        },

        // 结束拖动进度条
        dragEndProgress(){
            console.log('drag end');
            // this.setAudioIsPlay(true);
            this.setIsDragPeogress(false);
            console.log('this.dragValue ==> ', this.dragValue);
            this.$audio.currentTime = this.dragValue / this.progressWidth * this.duration;

            setTimeout(() => {
                this.setIsChange(false);
            },500)
        },

        // 根据音频的播放时间查找高亮歌词
        findActiveSongByCurrentTime(currentTime){
            for(let i = 0; i < this.currentLyric.length; i++){
                //前一句歌词的时间
                let beforeTime = this.currentLyric[i].time;
                //后一句歌词的时间(如果i是一个最后一个值, 则 i+1 越界)
                let afterTime = 0;
                if (i + 1 === this.currentLyric.length) {
                    //如果越界, 则使用当前时间 + 1
                    afterTime = currentTime + 1;
                } else {
                    afterTime = this.currentLyric[i + 1].time;
                }

                if (currentTime >= beforeTime && currentTime < afterTime){
                    console.log('111');
                    // vuex: 修改songLycActiveIndex
                    let height = this.lyricHeight.slice(0, i);
                    console.log('height ==> ', height);
                    let h = 0;
                    height.forEach(v => {
                        h += v;
                    })
                    let top0 = this.initTop - h;
                    this.setTop(top0);
                    this.setSongLycActiveIndex(i);
                    break;

                }
            }
        },

        // 点击进度条改变音频播放进度
        changeAudioCurrentTime(value){
            console.log('点击进度条改变音频播放进度value ==> ', value);
            this.setIsChange(true);
            // 修改音频进度
            let currentTime = value / this.progressWidth * this.duration;

            // 根据音频的播放时间查找高亮歌词
            this.findActiveSongByCurrentTime(currentTime);

            this.$audio.currentTime = currentTime

            setTimeout(() => {
                this.setIsChange(false);
            },500)
        },

        // 实时改变进度
        changeProgress(value){
            console.log('实时改变进度value ==> ', value);
            // 修改音频进度
            let currentTime = value / this.progressWidth * this.duration;
            // 根据音频的播放时间查找高亮歌词
            this.findActiveSongByCurrentTime(currentTime);
        },

        // 修改播放模式
        togglePlayMode(){
            let mode = this.playMode
            if(mode === 2){
                mode = 0;
            }else{
                mode++;
            }

            // vuex: 修改playMode
            this.setPlayMode(mode);
        },

        // 上一首歌曲
        prevSong(){
            console.log('上一首歌曲');

            let song = {};

            //顺序播放
            //如果当前播放歌曲是播放列表第一首歌曲, 则播放最后一首歌曲, 否则取上一首歌曲播放
            //如果用户主动点击上一首, 单曲循环则按照顺序播放取歌曲
            if (this.playMode === 0 || this.playMode === 2) {
            //当前播放的歌曲是否为歌曲播放列表的最后一首歌曲
            //通过歌曲id查找
            let songIndex = -1;
            for (let i = 0; i < this.playList.length; i++) {
                if (this.playList[i].id === this.currentAudioInfo.audioId) {
                songIndex = i;
                break;
                }
            }

            if (songIndex === 0) {
                //当前播放歌曲为歌曲列表的第一首歌曲
                //则播放最后一首歌曲
                song = this.playList[this.playList.length - 1];

            } else {
                song = this.playList[songIndex - 1];
            }

            } else if (this.playMode === 1) {
            //随机播放
            //在歌曲播放列表生成随机下标
            let index = Math.floor(Math.random() * this.playList.length);

            song = this.playList[index];
            console.log('随机取歌曲 song ==> ', song);

            }

            // vuex 修改音频id
            this.setAudioId({
                audioId: song.id,
                singerName: song.name,
                songName: song.sname,
                songPic: song.songPic,
            });
        },

        // 下一首歌曲
        nextSong(){
            console.log('下一首歌曲');
            // 播放模式, 0 循环顺序播放，1 随机播放，2 单曲循环

            let song = {};

            //顺序播放
            //如果当前播放歌曲是播放列表最后一首歌曲, 则播放第一首歌曲, 否则取下一首歌曲播放
            //如果用户主动点击下一首, 单曲循环则按照顺序播放取歌曲
            if (this.playMode === 0 || this.playMode === 2) {
            //当前播放的歌曲是否为歌曲播放列表的最后一首歌曲
            //通过歌曲id查找
            let songIndex = -1;
            for (let i = 0; i < this.playList.length; i++) {
                if (this.playList[i].id === this.currentAudioInfo.audioId) {
                songIndex = i;
                break;
                }
            }

            if (songIndex === this.playList.length - 1) {
                //当前播放歌曲为歌曲列表的最后一首歌曲
                //则播放第一首歌曲
                song = this.playList[0];

            } else {
                song = this.playList[songIndex + 1];
            }

            } else if (this.playMode === 1) {
            //随机播放
            //在歌曲播放列表生成随机下标
            let index = Math.floor(Math.random() * this.playList.length);

            song = this.playList[index];
            console.log('随机取歌曲 song ==> ', song);

            }

            // vuex 修改音频id
            this.setAudioId({
                audioId: song.id,
                singerName: song.name,
                songName: song.sname,
                songPic: song.songPic,
            });
        },

        // 显示或者隐藏歌曲列表
        toddleShow(){
            this.show = true;
        }

    },
};
</script>

<style lang="less" scoped>
.play-page {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    // background-color: #ddd;
    z-index: 10;
    // padding: 0 10px;
    transform-origin: right bottom;
    transform: rotate(90deg);
    overflow: hidden;
    transition: transform 0.4s ease-in;

    &.show {
        transform: rotate(0deg);
    }

    // 播放列表
    .van-popup{
        width: 355px;
        margin: 0 10px;
        border-radius: 10px;
    }
    .po-song-list{
        // background-color: #fff;
        // position: absolute;
        // top: 50%;
        // left: 0;
        // right: 0;
        // height: 50%;
        // width: 200px;
        margin: 0 10px;
        margin-top: 34px;
    }


    .filter-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        background: url("https://p2.music.126.net/7FrR0ugq1og_VQqH5xDLHw==/109951165056806228.jpg") no-repeat center center;
        background-size: cover;
        filter: blur(20px);
        z-index: 2;
        transform: scale(1.5);
        transform-origin: center center;
    }
    .play-content {
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        position: relative;
        z-index: 2;
        // 导航
        .play-nav {
            height: 50px;
            // background-color: #ddd;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            // margin: 0 10px;
            .p-close {
                position: absolute;
                left: 0px;
                top: 20px;
                bottom: 0;
                width: 24px;
                height: 24px;
                // background-color: pink;
                color: #fff;
                text-align: center;
                line-height: 24px;
                font-size: 44px;
                margin: auto 0;
            }
            .p-info {
                text-align: center;
                margin-top: 40px;
                .p-song {
                    color: #fff;
                    font-size: 14px;
                }
                .p-singer {
                    color: #ddd;
                    font-size: 12px;
                    margin-top: 4px;
                }
            }
        }
        // 歌词
        .song-word {
            height: calc(100% - 50px - 150px - 20px - 40px);
            // background-color: #ddd;
            overflow: hidden;
            margin: 30px 0;
            .sword-box {
                // height: 300px;
                // background-color: #aaa;
                position: relative;
                top: 0px;
                transition: top .15s linear;
                > div {
                    text-align: center;
                    color: rgba(255, 255, 255, 0.5);
                    padding: 5px 0;
                    font-size: 14px;
                    &.song-active {
                        color: #fff;
                    }
                }
            }
        }
        // 播放
        .play-control {
            height: 150px;
            // background-color: #fff;
            padding: 10px 0;
            margin: 0 10px;
            .time-progress {
                display: flex;
                align-items: center;
                .time-text {
                    font-size: 12px;
                    color: #ddd;
                    width: 36px;
                    text-align: center;
                }
                .play-progress {
                    width: calc(100% - 36px - 36px - 20px);
                    margin: 0 10px;
                    height: 20px;
                    // background: #999;
                    display: flex;
                    align-items: center;
                    > div {
                        width: 100%;
                    }
                    .circle-btn {
                        width: 8px;
                        height: 8px;
                        background-color: #fff;
                        border-radius: 50%;
                    }
                }
            }

            .play-ctl {
                height: 60px;
                // background-color: #ddd;
                margin: 30px 0;
                display: flex;
                justify-content: space-around;
                align-items: center;
                .play-i {
                    width: 30px;
                    height: 30px;
                    // background-color: #ddd;
                    font-size: 30px;
                    text-align: center;
                    line-height: 30px;
                    color: #fff;
                }
                .play-audio {
                    width: 60px;
                    height: 60px;
                    // background-color: #ddd;
                    border-radius: 50%;
                    overflow: hidden;
                    font-size: 60px;
                    text-align: center;
                    line-height: 60px;
                    color: #fff;
                }
            }
        }
    }
}
</style>
