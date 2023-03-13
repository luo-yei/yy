// 工具库
class Utils {
    constructor(){

    }

    // 格式: ==> 分钟:秒钟 00:00
    formatSeconds(secondsTime){
        // 取分钟
        let minutes = Math.floor(secondsTime / 60);
        minutes = minutes >= 10 ? minutes : `0${minutes}`;

        // 取秒钟
        let seconds = Math.floor(secondsTime % 60);
        seconds = seconds >= 10 ? seconds : `0${seconds}`;

        return `${minutes}:${seconds}`;
    }
}

export const utils = new Utils();