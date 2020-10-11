import request from "@/utils/request";
import {getParams} from "@/utils/utils";

export function listCustomer(params) {
    params = getParams(params)
    return request({
        url: "/sysCustomer/list",
        method: "GET",
        params
    })
}

export function customerCheckEnable(data) {
    data = getParams(data)
    return request({
        url: "/sysCustomer/isEnable",
        method: "POST",
        data
    })
}

export function removeCustomer(data) {
    data = getParams(data)
    return request({
        url: "/sysCustomer/delete",
        method: "DELETE",
        data
    })
}

export function saveCustomer(data) {
    data = getParams(data)
    return request({
        url: "/sysCustomer/save",
        method: "POST",
        data
    })
}
export function updateCustomerInfo(data) {
    data = getParams(data)
    return request({
        url: "/sysCustomer/update",
        method: "PUT",
        data
    })
}
