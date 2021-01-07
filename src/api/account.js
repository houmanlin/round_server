import request from "@/utils/request";
import {getParams} from "@/utils/utils";

let ADD_ACCOUNT = "/account/add_account"
let GET_ACCOUNT_INFO = "/account/get_account_by_id"
let ACCOUNT_LIST = "/account/get_account_list"
let EDIT_ACCOUNT = "/account/edit_account"
let DEL_ACCOUNT = "/account/del_account"

// 添加用户
export function AddAccount(data) {
    data = getParams(data)
    console.log(data)
    return request({
        url: ADD_ACCOUNT,
        method:"POST",
        data,
    })
}


// 获取用户列表
export function GetAccount(params) {
    return request({
        url: ACCOUNT_LIST,
        method:"GET",
        params,
    })
}



// 获取用户详情
export function GetAccountInfo(params) {
    return request({
        url: GET_ACCOUNT_INFO,
        method:"GET",
        params,
    })
}


export function EditAccount(data){
    data = getParams(data)
    return request({
        url: EDIT_ACCOUNT,
        method:"POST",
        data
    })
}


export function DelAccount(data){
    data = getParams(data)
    return request({
        url: DEL_ACCOUNT,
        method:"POST",
        data
    })
}


