import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { utils } from '../utils/utils'
export default new Vuex.Store({
  state: {

    // 音频节点(调用播放音频方法，暂停音频方法，音频时间等)
    $audio: null,

    //控制音频进度条的bottom位置
    isMain: true,

    // 控制播放页面的显示和隐藏
    isShowPlayPage: false,

    // 当前音频信息
    currentAudioInfo: {
      // 音频id
      audioId: '',

      // 音频歌手名称
      singerName: '',

      // 音频名称
      songName: '',

      // 音频图片
      songPic: '',

    },

    // 底部音频播放状态
    isPlay: false,

    // 音频总时长
    duration: 0,

    // 音频当前播放时长
    currentTime: 0,

    // 进度条的宽度
    progressWidth: 0,

    // 是否开始拖动进度条
    isDragPeogress: false,

    // 当前音频的歌词
    currentLyric: [],

    // 歌词盒子移动的top
    top: 0,

    //歌词初始top(辅助计算top的值)
    initTop: 0,

    // 歌词高亮的下标
    songLycActiveIndex: 0,

    // 当前音频的每一行歌词的高度
    lyricHeight: [],

    // 修改进度时,控制不要触发oncanplay事件
    isChange: false,

    // 播放列表数据
    playList: [],

    // 播放模式, 0 循环顺序播放，1 随机播放，2 单曲循环
    playMode: 0,

    // 是否登录
    isLogin: false,

    vv: '',

  },
  getters: {

    // 格式化音频总时长
    formatDuration(state){
      // console.log('state.duration ==> ', state.duration);

      return utils.formatSeconds(state.duration)
    },

    // 格式化音频当前播放时长
    formatCurrentTime(state){
      return utils.formatSeconds(state.currentTime)
    }
  },
  mutations: {
    // 设置音频节点
    setAudio(state, audioElement){
      // console.log('audioElement ==> ', audioElement);
      state.$audio = audioElement
    },

    // 修改showPlayPage
    setShowPlayPage(state, isShow){
      state.isShowPlayPage = isShow;
    },

    // 修改isMain
    setIsMain(state, value){
      state.isMain = value;
    },

    // 修改音频id, 音频歌手名称, 音频名称, 音频图片
    setAudioId(state, data){
      console.log('vuex data ==> ', data);
      for(let key in data){
        state.currentAudioInfo[key] = data[key];
      }
    },

    // 修改歌曲列表播放状态
    setAudioIsPlay(state, status){
      state.isPlay = status;
    },

    // 修改音频总时长
    setDuration(state, value){
      state.duration = value;
    },

    // 修改音频当前时长
    setCurrentTime(state, value){
      // console.log('修改音频当前时长 value', value);
      state.currentTime = value;
    },

    // 修改进度条的宽度
    setProgressWidth(state, width){
      // console.log('width ==> ', width);
      state.progressWidth = width;
    },

    // 修改是否移动进度条
    setIsDragPeogress(state, isDrag){
      state.isDragPeogress = isDrag
    },

    // 修改歌词
    setCurrentLyric(state, lyric){
      console.log('lyric ==> ', lyric);
      state.currentLyric = lyric;
    },

    // 修改歌词盒子移动的top
    setTop(state, top){
      console.log('盒子top',top);
      state.top = top;
    },

    //修改initTop
    setInitTop(state, top) {
      state.initTop = top;
    },

    // 修改每一行歌词的高度数组
    setLyricHeight(state, heightData){
      // console.log('heightData ==> ', heightData);
      state.lyricHeight = heightData; 
    },

    // 修改高亮歌词的下标
    setSongLycActiveIndex(state, index){
      state.songLycActiveIndex = index;
    },

    // 修改isChange
    setIsChange(state, status){
      state.isChange = status;
    },

    // 修改playList
    setPlayList(state, song){
      console.log('song ==>',song);
      // song: 歌曲数组
      state.playList.push(...song);
    },

    // 修改播放模式
    setPlayMode(state, mode){
      console.log(mode);
      state.playMode = mode;
    },

    // 修改登录状态
    setIsLogin(state, status){
      state.isLogin = status;
    },
    
    setValue(state, v){
      state.vv = v;
    }
  },
  actions: {
  },
  modules: {
  }
})
