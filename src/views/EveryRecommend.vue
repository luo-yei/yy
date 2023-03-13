<template>
    <div class="everyRecommend">
        <div class="head">
            <span class="iconfont icon-arrow-left" @click="back"></span>
            <span class="iconfont icon-gengduo"></span>
        </div>
        <div class="hbg">
            <div class="dd">
                <div class="date">
                    <span class="d">{{ day }}</span>
                    <span class="m">/{{ month }}</span>
                </div>
                <div class="look">查看今日运势></div>
            </div>
        </div>

        <div class="content">
            <div class="item" v-for="(item, index) in everyData" :key="index">
                <EveryRec :songs-data="item" @SongList="(val) => SongList(index)"></EveryRec>
            </div>
        </div>
    </div>
</template>

<script>
import EveryRec from "../components/EveryRec";
export default {
    name: "EveryRecommend",
    components: {
        EveryRec,
    },
    data() {
        return {
            month: "",
            day: "",
            everyData: [],
        };
    },

    created() {
        var today = new Date();
        this.month = today.getMonth() + 1;
        this.day = today.getDate();
        this.getTuijianSong();
    },

    methods: {
        // 每日推荐歌曲
        getTuijianSong() {
            this.axios({
                method: "get",
                url: "/recommend/songs",
            })
                .then((res) => {
                    console.log("每日推荐歌曲 res ==> ", res);

                    let data = res.data.data.dailySongs.map((item) => {
                        // 可能存在多个歌手
                        let singers = [];
                        item.ar.forEach((singer) => {
                            singers.push(singer.name);
                        });

                        return {
                            id: item.id,
                            sname: item.name,
                            name: singers.join("/"),
                            zname: item.al.name,
                            bq: item.reason,
                            songPic: item.al.picUrl,
                            // isPlay: false,
                        };
                    });

                    this.everyData.push(...data);
                    console.log(this.everyData);
                })
                .catch((err) => {
                    console.log("每日推荐歌曲 err ==> ", err);
                });
        },

        back() {
            this.$router.back();
        },
    },
};
</script>

<style lang="less" scoped>
.everyRecommend {
    .head {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        padding: 10px 10px;

        span {
            font-size: 30px;
            color: #fff;
        }
    }
    .hbg {
        height: 200px;
        // background-color: pink;
        background: linear-gradient(rgb(60, 66, 102) 70%, rgb(127, 130, 153) 100%);
        .dd {
            padding-top: 135px;
            padding-left: 10px;
            color: #fff;
            .d {
                font-size: 30px;
            }
        }
    }
}
</style>
