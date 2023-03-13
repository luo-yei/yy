<template>
    <!-- 我的 -->
    <div class="my">
        <div class="my-box"  v-if="isLogin">
            <div class="head">
                <span class="iconfont icon-qita"></span>
                <span class="iconfont icon-sousuo" @click="toSearch"></span>
            </div>

            <div class="content">
                <div class="user">
                    <div class="img">
                        <img class="auto-img" src="../assets/images/蜡笔小新.jpg" alt="">
                    </div>
                    <div class="info">
                        <div class="name">落</div>
                        <div class="i">
                            <div class="item">7关注</div>
                            <div class="item">7粉丝</div>
                            <div class="item">lv.9</div>
                        </div>
                    </div>
                    
                </div>

                <div class="tool">
                    <div class="item">
                        <span class="iconfont icon-icon-"></span>
                        <div class="t">最近播放</div>
                    </div>
                    <div class="item">
                        <span class="iconfont icon-tinggeshiqu"></span>
                        <div class="t">本地/下载</div>
                    </div>
                    <div class="item">
                        <span class="iconfont icon-cloud-download"></span>
                        <div class="t">云盘</div>
                    </div>
                    <div class="item">
                        <span class="iconfont icon-kapian"></span>
                        <div class="t">已购</div>
                    </div>
                    <div class="item">
                        <span class="iconfont icon-geshou"></span>
                        <div class="t">我的好友</div>
                    </div>
                    <div class="item">
                        <span class="iconfont icon-heart-filled"></span>
                        <div class="t">收藏和赞</div>
                    </div>
                    <div class="item">
                        <span class="iconfont icon-guanzhu1"></span>
                        <div class="t">我的播客</div>
                    </div>
                    <div class="item">
                        <span class="iconfont icon-yinle2"></span>
                        <div class="t">乐迷团</div>
                    </div>
                </div>

                <div class="like">
                    <div class="like-img">
                        <div class="img">
                            <img class="auto-img" src="../assets/images/蜡笔小新.jpg" alt="">
                        </div>
                        <span class="iconfont icon-heart-filled"></span>
                    </div>
                    <div class="text">
                        <div class="t">我喜欢的音乐</div>
                        <div class="st">0首</div>
                    </div>
                </div>
            </div>
        </div>
        

        <!-- 登录页面 -->
        <div class="login" v-if="!isLogin">
            <span class="iconfont icon-jiantou_liebiaoxiangzuo_o back" @click="back"></span>
            <div class="headss">
                <van-form>
                    <van-field
                        v-model="phone"
                        name="手机号"
                        label="手机号"
                        placeholder="手机号"
                        :rules="[{ required: true, message: '请填写手机号' }]"
                    />
                    <van-field
                        v-model="password"
                        type="password"
                        name="密码"
                        label="密码"
                        placeholder="密码"
                        :rules="[{ required: true, message: '请填写密码' }]"
                    />
                    <div style="margin: 16px;">
                        <van-button round block type="info" native-type="submit" color="#cc6f6a" @click="getLogin">登录</van-button>
                    </div>
                    <div style="margin: 16px;">
                        <van-button round block type="info" native-type="submit" color="#cc6f6a" @click="showLogin">注册</van-button>
                    </div>
                </van-form>
            </div>

            <van-popup v-model="isShow" position="bottom">
                <div class="heads">注册</div>
                <van-form>
                    <van-field
                        v-model="phone"
                        name="手机号"
                        label="手机号"
                        placeholder="手机号"
                        :rules="[{ required: true, message: '请填写手机号' }]"
                    />
                    <van-field
                        v-model="password"
                        type="password"
                        name="密码"
                        label="密码"
                        placeholder="密码"
                        :rules="[{ required: true, message: '请填写密码' }]"
                    />
                    <div style="margin: 16px;">
                        <van-button round block type="info" native-type="submit" color="#cc6f6a" @click="setLogin">注册</van-button>
                    </div>
                </van-form>
            </van-popup>
        </div>
        
    </div>
</template>

<script>
    import { mapMutations, mapState } from 'vuex';
    import Login from '../components/Login.vue';
    export default {
        name: 'My',

        data(){
            return{
                phone: '',
                password: '',

                // 是否显示注册弹窗
                isShow: false,

                loginList: [],
            }
        },

        components:{
            Login
        },

        computed:{
            ...mapState(['isLogin']),
        },

        methods:{
            ...mapMutations(['setIsMain', 'setIsLogin']),

            toSearch(){
                this.setIsMain(false);
                this.$router.push({name: 'Search'})
            },

            // 注册
            setLogin(){
                for(let i = 0; i < this.loginList.length; i++){
                    if(this.loginList[i].phone === this.phone){
                        return;
                    }
                }

                let loginData = {
                    phone: this.phone,
                    password: this.password,
                };

                this.loginList.push(loginData);
                localStorage.setItem('loginList', JSON.stringify(this.loginList));
                console.log('loginList ==> ', this.loginList);
                this.$toast('注册成功');
                this.isShow = false;
            },

            // 登录
            getLogin(){
                for(let i = 0; i < this.loginList.length; i++){
                    console.log('111');
                    if(this.loginList[i].phone === this.phone){
                        console.log('111');
                        this.$toast('登录成功');
                        this.setIsLogin(true);
                    }else{
                        this.$toast('该账号还未注册');
                    }
                }
            },

            // 显示注册页面
            showLogin(){
                this.isShow = true;
            },

            back(){
                this.$router.back();
            }
        }
    }
</script>

<style lang="less" scoped>
    .my{
        .head{
            display: flex;
            justify-content: space-between;
            height: 50px;
            line-height: 50px;
            background-color: #fff;
            padding: 0 10px;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 10;
            span{
                font-size: 24px;
                font-weight: 700;
            }
        }
        .content{
            padding: 0 10px;
            margin-top: 100px;
            .user{
                height: 120px;
                background-color: #fff;
                border-radius: 14px;
                position: relative;
                .img{
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    overflow: hidden;
                    position: absolute;
                    top: -40px;
                    left: 0;
                    right: 0;
                    margin: 0 auto;
                }
                .info{
                    padding-top: 50px;
                    text-align: center;
                    .name{
                        font-size: 20px;
                        font-weight: 700;
                    }
                    .i{
                        display: flex;
                        justify-content: center;
                        margin-top: 10px;
                        .item{
                            border-right: 1px solid #a7a7a7;
                            height: 14px;
                            line-height: 14px;
                            font-size: 14px;
                            color: #a7a7a7;
                            padding-left: 10px;
                            padding-right: 10px;
                        }
                        .item:last-child{
                            border: 0;
                        }
                    }
                }
            }

            .tool{
                background-color: #fff;
                display: flex;
                flex-wrap: wrap;
                margin-top: 14px;
                border-radius: 14px;
                .item{
                    width: 25%;
                    color: #fd4548;
                    margin-top: 16px;
                    text-align: center;
                    margin-bottom: 14px;
                    span{
                        font-size: 30px;
                    }
                }
            }

            .like{
                // height: 80px;
                background-color: #fff;
                margin-top: 14px;
                border-radius: 14px;
                padding: 14px;
                display: flex;
                .like-img{
                    position: relative;
                    margin-right: 15px;
                    .img{
                        width: 60px;
                        height: 60px;
                        // margin: 10px;
                        border-radius: 10px;
                        overflow: hidden;
                        background-color: pink;
                    }
                    span{
                        font-size: 30px;
                        color: #fff;
                        position: absolute;
                        top: 14px;
                        left: 14px;
                    }
                }
                .text{
                    .t{
                        font-size: 16px;
                        font-weight: 700;
                        color: #000;
                        margin-top: 8px;
                    }
                    .st{
                        font-size: 14px;
                        color: #a5a5a5;
                        margin-top: 4px;
                    }
                }
            }
        }

        .login{
            .back{
                color: #fff;
                font-size: 30px;
            }
            height: 667px;
            // background-color: pink;
            position: relative;
            // top: -20px;
            z-index: 100;
            background: url('../assets/images/wyyLogin.jpg') center center no-repeat;
            background-size:cover;
            // padding-top: 100px;
            .headss{
                // margin-top: 100px;
                position: absolute;
                top: 300px;
                left: 0;
                right: 0;
            }

            .heads{
                margin: 20px;
                font-size: 16px;
                font-weight: 700;
            }
        }
    }
</style>