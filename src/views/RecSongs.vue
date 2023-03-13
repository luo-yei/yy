<template>
    <div class="recSongs">
        <div class="head">
            <span class="iconfont icon-arrow-left" @click="back"></span>
            <div class="t">歌单</div>
        </div>
        <div class="gdinfo">
            <div class="img">
                <div class="bg"></div>
                <img class="auto-img" :src="img" alt="" />
            </div>
            <div class="info">
                <div class="text">{{ text }}</div>
                <div class="user">
                    <div class="uimg">
                        <img class="auto-img" :src="uimg" alt="" />
                    </div>
                    <div class="uname">{{ uname }}</div>
                </div>
            </div>
        </div>

        <div class="content" v-for="(item, index) in geSongData" :key="index">
            <span>{{ index + 1 }}</span
            ><RecSongList :songData="item"></RecSongList>
        </div>
    </div>
</template>

<script>
import RecSongList from "../components/RecSongList.vue";
export default {
    name: "RecSongs",

    components: {
        RecSongList,
    },

    data() {
        return {
            img: "",
            text: "",
            uimg: "",
            uname: "",
            geSongData: [],
        };
    },

    created() {
        let id = this.$route.params.id;
        this.img = this.$route.params.img;
        this.text = this.$route.params.text;
        this.uimg = this.$route.params.uimg;
        this.uname = this.$route.params.uname;

        this.getTuijiansongs(id);
    },

    methods: {
        // 获取推荐歌单歌曲
        getTuijiansongs(id) {
            this.axios({
                method: "get",
                url: `/playlist/track/all?id=${id}`,
            })
                .then((res) => {
                    console.log("推荐歌单歌曲 res ==> ", res);

                    let data = res.data.songs.map((item) => {
                        // 可能存在多个歌手
                        let singers = [];
                        item.ar.forEach((singer) => {
                            singers.push(singer.name);
                        });

                        return {
                            id: item.id,
                            sname: item.name,
                            name: singers.join("/"),
                            aname: item.alia[0],
                            songPic: item.al.picUrl,
                        };
                    });

                    this.geSongData.push(...data);
                })
                .catch((err) => {
                    console.log("推荐歌单歌曲 err ==> ", err);
                });
        },

        back() {
            this.$router.back();
        },
    },
};
</script>

<style lang="less" scoped>
.recSongs {
    height: 1000px;
    .head {
        height: 50px;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        // background-color: pink;
        span {
            font-size: 30px;
            color: #fff;
            line-height: 50px;
            margin: 0 10px;
        }
        .t {
            font-size: 16px;
            color: #fff;
            line-height: 50px;
        }
    }

    .gdinfo {
        display: flex;
        height: 140px;
        background-color: #534b49;
        padding-top: 70px;
        padding-bottom: 10px;
        .img {
            width: 120px;
            height: 120px;
            border-radius: 10px;
            // overflow: hidden;
            margin: 0 20px;
            position: relative;
            z-index: 2;
            img {
                border-radius: 10px;
            }
            .bg {
                width: 100px;
                height: 100px;
                background-color: #8e8887;
                position: absolute;
                left: 0;
                right: 0;
                margin: 0 auto;
                top: -10px;
                border-radius: 10px;
                z-index: -1;
            }
        }
        .info {
            .text {
                font-size: 16px;
                font-weight: 700;
                margin-bottom: 20px;
                width: 200px;
                color: #fdfdf9;
                margin-top: 20px;
            }
            .user {
                display: flex;
                .uimg {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-right: 10px;
                }
                .uname {
                    font-size: 12px;
                    color: #9f9593;
                }
            }
        }
    }

    .content {
        display: flex;
        margin-top: 6px;
        span {
            font-size: 16px;
            color: #a6a6a6;
            height: 50px;
            line-height: 50px;
            margin-left: 20px;
        }
        .recSongList {
            width: 335px;
        }
    }
}
</style>
