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


export function addOrder(data) {
    data = getParams(data)
    return request({
        url: "/busMain/save",
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
