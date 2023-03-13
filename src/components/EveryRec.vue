<template>
    <div class="everyRec">
        <div class="item" @click="changeAudioId(songsData.id)">
            <div class="img">
                <img class="auto-img" :src="songsData.songPic" alt="" />
            </div>
            <div class="text">
                <div class="sname">{{ songsData.sname }}</div>
                <div class="singerName">
                    <span class="num" v-if="songsData.bq"
                        ><small>{{ songsData.bq }}</small></span
                    >
                    <span class="n one-text">{{ songsData.zname }}|{{ songsData.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
    name: "EveryRec",
    props: {
        // 歌曲的数据
        songsData: {
            type: Object,
            default() {
                return {};
            },
        },
    },

    computed: {
        ...mapState(["currentAudioInfo", "$audio", "isPlay"]),
    },
    methods: {
        ...mapMutations(["setAudioId"]),

        // 修改音频id
        changeAudioId(id) {
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
                    singerName: this.songsData.name,
                    songName: this.songsData.sname,
                    songPic: this.songsData.songPic,
                });
            }
        },
    },
};
</script>

<style lang="less" scoped>
.everyRec {
    .item {
        height: 60px;
        // background-color: pink;
        display: flex;
        margin: 0 10px;
        margin-top: 10px;
        .img {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            overflow: hidden;
            margin: 10px;
            background-color: #ddd;
        }
        .text {
            width: calc(100% - 60px);
            margin-top: 10px;
            .sname {
                font-weight: 700;
            }
            .singerName {
                margin-top: 4px;
                overflow: hidden;
                display: flex;
                width: 100%;
                .num {
                    background-color: #fceeed;
                    color: #d65158;
                    border-radius: 4px;
                    margin-right: 2px;
                    // width: calc(100% - 220px);
                }
                .n {
                    font-size: 12px;
                    color: #9e9c9d;
                    width: 196px;
                }
            }
        }
    }
}
</style>
