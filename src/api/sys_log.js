import request from "@/utils/request";
import {getParams} from "@/utils/utils";

export function systemInfoLog(data) {
    data = getParams(data)
    return request({
        url: "/busActionLog/list",
        method: "GET",
        params:data
    })
}

