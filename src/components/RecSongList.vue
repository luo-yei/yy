<template>
    <div class="recSongList">
        <div class="item" @click="changeAudioId(songData.id)">
            <div class="song">
                <div class="name">
                    {{ songData.sname }}
                    <span v-if="songData.aname != []">{{ songData.aname }}</span>
                </div>
                <div class="singer">{{ songData.name }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
    name: "RecSongList",

    props: {
        // 歌曲的数据
        songData: {
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
                    singerName: this.songData.name,
                    songName: this.songData.sname,
                    songPic: this.songData.songPic,
                });
            }
        },
    },
};
</script>

<style lang="less" scoped>
.recSongList {
    .item {
        width: 300px;
        display: flex;
        height: 50px;
        margin: 0 20px;
        // background-color: #dee1e6;
        .song {
            width: 300px;
            .name {
                width: 300px;
                font-size: 16px;
                color: #313131;
                margin-top: 8px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                span {
                    color: #989898;
                    margin-left: 4px;
                }
            }
            .singer {
                font-size: 12px;
                color: #989898;
            }
        }
    }
}
</style>
