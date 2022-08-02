import axios from "axios";

const request = axios.create({
    baseURL: 'http://150.158.94.140:3658',
    timeout: 5000,
})

// 发送登录请求，用于接收用户信息
// 定义好后，在登陆页面使用
const login = (data) => {
    return request({
        url: '/lg/login',
        method: 'POST',
        data
    })
}

export {
    request
}