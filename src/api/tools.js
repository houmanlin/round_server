import request from "@/utils/request";

const TOOLS_AREA = "/tools/area"



export function getAreaList(params) {
    return request({
        url:TOOLS_AREA,
        method:"GET",
        params
    })

}