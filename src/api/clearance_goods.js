import request from "@/utils/request";
import {getParams} from "@/utils/utils";

export function getClearanceGoods(params) {
    params = getParams(params)
    return request({
        url: "/busBilling/list",
        method: "GET",
        params
    })
}
