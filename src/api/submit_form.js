import request from "@/utils/request";
import {getParams} from "@/utils/utils";


export function uploadForm(data) {

    return request({
        url:"/busUploadFile/uploadFileInfo",
        method:"POST",
        data,
        headers:{"content-Type": 'application/json'}
    })
}
