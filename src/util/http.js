import axios from 'axios'
import { commonParams } from '../api/config'
import { Dialog } from 'vant';
import { Toast } from 'vant';
if (process.env.NODE_ENV != "production") {
    // console.log(process.env.NODE_ENV)
}
axios.defaults.withCredentials = true //允许设置cookie
const host = window.g.api
const Http = {
    get(url, params) {
        const data = Object.assign({}, commonParams, params);
        // url = "/beam_ht" + url
        url = host + url
        return axios.get(url, {
            params: data,
        }).then((res) => {
            // console.log(process)
            if (res.data.error === false) {
                return Promise.resolve(res.data); //成功
            } else {
                if (res.data.code === -1) {
                    // Message.error(res.data.msg);
                    window.location = "/#/login";
                    return Promise.reject(res) //拒绝
                } else if (res.data.code === 403) {
                    // Message.error(res.data.msg);
                    window.location = "/#/403";
                    return Promise.reject(res) //拒绝
                } else {
                    // Message.error(res.data.msg);
                    return Promise.reject(res) //拒绝
                }
            }
        }).catch((err) => {
            console.log(err)
            if (err.code == '0001') {
                var err = {
                    code: err.data.code,
                    msg: err.data.msg
                }
                Dialog.alert({
                    message: err.msg
                }).then(() => {
                    window.location = "/login";
                });
                return Promise.reject(res)
            } else if (err.data) {
                var err = err.data
                Toast.fail(err.msg);
                return Promise.reject(res)
            }
            //超时之后在这里捕抓错误信息.
            if (err.response) {

                var res = {
                    code: err.data.code,
                    msg: err.data.message,
                }
                return Promise.reject(res)

            } else if (err.request) {

                if (err.request.readyState == 4 && err.request.status == 0) {

                    //我在这里重新请求
                    var res = {
                        code: 403,
                        msg: "网络链接错误，请刷新重试！",
                    }

                    this.$message.error("网络链接错误，请刷新重试！")
                    return Promise.reject(res)
                }
            } else {

                // Message.error(err.message)
                return Promise.reject(res)
            }
            return Promise.reject(err)

        })
    },
    post(url, data) {
        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
        // url = "/beam_ht" + url
        url = host + url

        return axios.post(url, data).then((res) => {
            if (res.data.error === false) {
                return Promise.resolve(res.data); //成功

            } else {
                console.log(res)
                if (res.data.code === -1) {
                    // Message.error(res.data.msg);
                    window.location = "/#/login";
                    return Promise.reject(res) //拒绝
                } else if (res.data.code === 403) {
                    // Message.error(res.data.msg);
                    window.location = "/#/403";
                    return Promise.reject(res) //拒绝
                } else {
                    // Message.error(res.data.msg);
                    return Promise.reject(res) //拒绝
                }
            }
        }).catch((err) => {
            Toast.fail("操作失败");
            //超时之后在这里捕抓错误信息.
            if (err.code == '0001') {
                var err = {
                    code: err.data.code,
                    msg: err.data.msg
                }
                Dialog.alert({
                    message: err.msg
                }).then(() => {
                    window.location = "/login";
                });
                return Promise.reject(err)
            } else if (err.data) {
               
                var err = err.data
                Toast.fail(err.msg);
                return Promise.reject(err)
            }

            // if (err.response) {
            //     var res = {
            //         code: err.code,
            //         msg: err.message,
            //     }
            //     return Promise.reject(res)
            // } else if (err.request) {
            //     if (err.request.readyState == 4 && err.request.status == 0) {
            //         //我在这里重新请求
            //         var res = {
            //             code: 403,
            //             msg: "网络链接错误，请刷新重试！",
            //         }
            //         this.$message.error("网络链接错误，请刷新重试！")
            //         return Promise.reject(res)
            //     }
            // } else {
            //     // Message.error(err.message)
            //     return Promise.reject(res)
            // }
            return Promise.reject(err)
        })
    },

};

export default Http;