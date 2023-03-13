<template>
    <div class="login">
        <span class="iconfont icon-jiantou_liebiaoxiangzuo_o" @click="back"></span>
        <div class="head">
            <van-form @submit="onSubmit">
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
                    <van-button round block type="info" native-type="submit" color="#cc6f6a" @click="getLogin">注册</van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data(){
            return{
                phone: '',
                password: '',
            }
        },

        created(){
            // this.getLogin();
        },

        methods:{
            onSubmit(values) {
                console.log('submit', values);
            },

            getLogin(){
                this.axios({
                    method: 'get',
                    url: `/login/cellphone?phone=${this.phone}&password=${this.password}`,
                }).then(res => {
                    console.log('登录res ==> ', res);
                }).catch(err => {
                    console.log('登录err ==> ', err);
                })
            },

            back(){
                this.$router.back();
            }
        }
    }
</script>

<style lang="less" scoped>
    .login{
        span{
            color: #fff;
            // font-size: 30px;
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
    }
</style>