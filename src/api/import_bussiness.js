import request from "@/utils/request";
import {getParams} from "@/utils/utils";


export function getImportBussiness(params){
    params = getParams(params)
    return request({
        url: "/busMain/list",
        methods:"GET",
        params
    })
}

export function getOrderInfo(params){
    params = getParams(params)
    return request({
        url: "/busMain/getMainInfoByNo",
        methods:"GET",
        params
    })
}

export function getCount(){
    return request({
        url: "/busBilling/getCount",
        methods:"GET",
    })
}


export function addOrder(data) {
    //data = getParams(data)
    return request({
        url: "/busMain/save",
        method: "POST",
        data,
        headers: {"content-Type": "application/json"}
    })
}

export function editOrder(data) {
    // params = getParams(params)
    return request({
        url: "/busMain/update",
        method: "POST",
        data,
        headers: {"content-Type": "application/json"}
    })
}


export function getMainOrder(params) {
    params = getParams(params)
    return request({
        url: "/busNode/getNodeInfoByMainNo",
        method: "GET",
        params,
    })
}

export function getMainOrderInfo(params) {
    params = getParams(params)
    return request({
        url: "/busMain/getMainUpdateInfoById",
        method: "GET",
        params,
    })
}


export function MainOrderDel(params) {
    params = getParams(params)
    return request({
        url: "/busMain/delete",
        method: "DELETE",
        params,
    })
}


export function houseOrderDel(params) {
    params = getParams(params)
    return request({
        url: "/busSubmenu/delete",
        method: "DELETE",
        params,
    })
}
