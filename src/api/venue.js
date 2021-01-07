import {getParams} from "@/utils/utils";
import request from "@/utils/request";


const SUBMIT_VENUE  = "/venue/add_venue"
const SELECT_VENUE  = "/venue/select_venue"
const VENUE_BY_ID   = "/venue/venue_info"
const EDIT_VENUE    = "/venue/edit_venue"
const DELETE_VENUE    = "/venue/del_venue"

export function AddVenue(data) {
    data = getParams(data);

    return request({
        url: SUBMIT_VENUE,
        method:"POST",
        data
    })

}

export function SelectVenue(params) {
    return request({
        url: SELECT_VENUE,
        method:"GET",
        params
    })

}
export function VenueInfo(params) {
    return request({
        url: VENUE_BY_ID,
        method:"GET",
        params
    })

}

// 修改场地信息
export function EditVenue(data) {
    data = getParams(data);
    return request({
        url: EDIT_VENUE,
        method:"post",
        data
    })

}

// 删除场地信息
export function DelVenue(data){
    data = getParams(data);
    return request({
        url: DELETE_VENUE,
        method:"post",
        data
    })
}