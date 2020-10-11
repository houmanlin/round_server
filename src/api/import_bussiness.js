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
// export function addImportBussiness(data){
//     data = getParams(data)
//     return request({
//         url: "/busMain/save",
//         methods:"post",
//         data
//     })
// }

export function addOrder(data) {
    data = getParams(data)
    return request({
        url: "/busMain/save",
        method: "POST",
        data
    })
}
