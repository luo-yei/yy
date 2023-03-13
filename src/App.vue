<template>
    <div id="app">
        <!-- 音频节点 -->
        <audio
            ref="audio"
            :src="`https://music.163.com/song/media/outer/url?id=${currentAudioInfo.audioId}.mp3`"
            @canplay="audioCanplay"
            @timeupdate="audioTimeUpdata"
            @play="audioPlay"
            @pause="audioPause"
            @ended="audioEnded"
        ></audio>

        <!-- 音频控制条 -->
        <Control v-if="currentAudioInfo.audioId"></Control>

        <!-- 播放页面 -->
        <PlayPage></PlayPage>

        <router-view />
    </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import Control from "./components/Control.vue";
import PlayPage from "./components/PlayPage.vue";
export default {
    name: "App",

    // data()

    components: {
        Control,
        PlayPage,
    },

    created() {
        this.$nextTick(() => {
            console.log("this.$refs.audio ==> ", this.$refs.audio);

            // 修改vuex的state的$audio属性
            this.setAudio(this.$refs.audio);
        });

        // 获取播放列表数据
        let localPlayList = localStorage.getItem("songPlayList");
        if (!localPlayList) {
            localPlayList = [];
        } else {
            localPlayList = JSON.parse(localPlayList);
        }

        localPlayList.forEach((song) => {
            song.isPlay = false;
        });

        // vuex: 修改playList
        this.setPlayList(localPlayList);
    },

    computed: {
        ...mapState(["currentAudioInfo", "$audio", "isDragPeogress", "currentLyric", "top", "initTop", "lyricHeight", "songLycActiveIndex", "isChange", "playList", "playMode"]),
    },

    methods: {
        ...mapMutations(["setAudio", "setDuration", "setCurrentTime", "setCurrentLyric", "setTop", "setSongLycActiveIndex", "setPlayList", "setAudioIsPlay", "setAudioId"]),

        // 监听音频是否可以播放
        audioCanplay() {
            if (this.isChange) {
                console.log("进度条发生改变不要重新执行oncanplay事件");
                return;
            }
            console.log("音频可以播放了");

            console.log("this.lyricHeight ==> ", this.lyricHeight);
            console.log("this.songLycActiveIndex ==> ", this.songLycActiveIndex);

            // vuex: 修改songLycActiveIndex
            this.setSongLycActiveIndex(0);

            // 获取音频总时长
            let duration = this.$audio.duration;
            // console.log('duration ==> ', duration);

            // vuex 修改duration
            this.setDuration(duration);

            // 根据歌曲id获取歌词
            this.axios({
                method: "get",
                url: "lyric",
                params: {
                    id: this.currentAudioInfo.audioId,
                },
            })
                .then((res) => {
                    // console.log('根据歌曲id获取歌词 res ==> ', res);
                    let lyric = res.data.lrc.lyric.split(/\n/);
                    // console.log('根据歌曲id获取歌词 lyric ==>', lyric);

                    let lyricData = [];

                    lyric.forEach((lyc) => {
                        let lycData = lyc.split(/\]/);
                        if (!lycData[1]) {
                            return;
                        }

                        // 处理歌词时间点
                        let lycTime = lycData[0].slice(1).split(/:/);
                        lyricData.push({
                            time: Number(lycTime[0] * 60) + Number(lycTime[1]),
                            lyc: lycData[1].trim(),
                        });
                    });
                    console.log("lyricData ==> ", lyricData);

                    // vuex: 修改歌词
                    this.setCurrentLyric(lyricData);

                    // 拿到歌词再播放
                    // 播放音频
                    this.$audio.play();

                    // 将当前播放的歌曲保存到列表中(将数据保存到本地存储)
                    let songPlayList = localStorage.getItem("songPlayList");
                    if (!songPlayList) {
                        songPlayList = [];
                    } else {
                        songPlayList = JSON.parse(songPlayList);
                    }

                    console.log("this.currentAudioInfo ==> ", this.currentAudioInfo);
                    console.log("songPlayList ==> ", songPlayList);

                    // 查找当前播放的歌曲是否存在播放列表中
                    for (let i = 0; i < songPlayList.length; i++) {
                        if (songPlayList[i].id === this.currentAudioInfo.audioId) {
                            return;
                        }
                    }

                    let currentSong = {
                        id: this.currentAudioInfo.audioId,
                        sname: this.currentAudioInfo.songName,
                        name: this.currentAudioInfo.singerName,
                        zname: this.currentAudioInfo.songname,
                        songPic: this.currentAudioInfo.songPic,
                    };

                    songPlayList.push(currentSong);
                    localStorage.setItem("songPlayList", JSON.stringify(songPlayList));
                    console.log("songPlayList", songPlayList);

                    // vuex 修改播放列表playList
                    this.setPlayList([currentSong]);
                })
                .catch((err) => {
                    console.log("err ==> ", err);
                });
        },

        // 监听音频播放进度
        audioTimeUpdata() {
            if (this.isDragPeogress) {
                console.log("正在手动移动进度条");
                return;
            }

            // 获取当前音频播放时间
            let currentTime = this.$audio.currentTime;
            // console.log('currentTime ==> ', currentTime);

            // vuex 修改currentTime
            this.setCurrentTime(currentTime);

            //移动歌词
            //如果当前音频的播放时间 >= 前一句歌词的时间 && 如果当前音频的播放时间 < 后一句歌词的时间
            for (var i = 0; i < this.currentLyric.length; i++) {
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

                if (currentTime >= beforeTime && currentTime < afterTime) {
                    // console.log('this.top ==> ', this.top);
                    // console.log('beforeTime ==> ', beforeTime);
                    // console.log('afterTime ==> ', afterTime);
                    // console.log('this.lyricHeight ==> ', this.lyricHeight);
                    // console.log(`第 ${i + 1} 行歌词高亮 ==> `, i);

                    //歌词盒子往上移动的top
                    if (this.songLycActiveIndex < i) {
                        //计算需要移动几行歌词的高度
                        let height = this.lyricHeight.slice(0, i);
                        let h = 0;
                        height.forEach((v) => {
                            h += v;
                        });
                        let top0 = this.initTop - h;
                        this.setTop(top0);
                        this.setSongLycActiveIndex(i);
                    }

                    break;
                }
            }
        },

        // 监听音频播放事件
        audioPlay() {
            console.log("音频播放");
            // vuex: 修改isPlay
            this.setAudioIsPlay(true);
        },

        // 监听音频暂停事件
        audioPause() {
            console.log("音频暂停");
            // vuex: 修改isPlay
            this.setAudioIsPlay(false);
        },

        // 监听音频播放结束事件
        audioEnded() {
            console.log("音频播放结束");
            // 获取当前播放模式
            console.log("this.playMode ==> ", this.playMode);

            let song = {};

            //顺序播放
            //如果当前播放歌曲是播放列表最后一首歌曲, 则播放第一首歌曲, 否则取下一首歌曲播放
            if (this.playMode === 0) {
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
                console.log("随机取歌曲 song ==> ", song);
            } else {
                // 单曲循环

                this.$audio.currentTime = 0;
                this.$audio.play();
            }

            if (this.playMode === 0 || this.playMode === 1) {
                // vuex 修改音频id
                this.setAudioId({
                    audioId: song.id,
                    singerName: song.name,
                    songName: song.sname,
                    songPic: song.songPic,
                });
            }
        },
    },
};
</script>

<style lang="less">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background-color: #f7f7f7;
}
body {
    margin: 0;
    font-size: 14px !important;
    background-color: #f8f8f8;
}

// 一行显示
.one-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

// 图片大小
.auto-img {
    width: 100%;
    display: block;
}
</style>
