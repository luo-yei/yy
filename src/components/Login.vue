<template>
    <div class="login" v-if="!isLogin">
        <span class="iconfont icon-jiantou_liebiaoxiangzuo_o back" @click="back"></span>
        <div class="head">
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
</template>

<script>
    import { mapState, mapMutations } from 'vuex';
    export default {
        name: 'Login',

        data(){
            return{
                phone: '',
                password: '',

                // 是否显示注册弹窗
                isShow: false,

                loginList: [],
            }
        },

        computed:{
            ...mapState(['isLogin']),
        },

        methods:{
            ...mapMutations(['setIsMain', 'setIsLogin']),

        },

        created(){
            
        },

        methods:{
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
        .head{
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
</style>