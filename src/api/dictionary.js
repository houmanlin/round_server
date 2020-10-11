import request from '@/utils/request'
import {getParams} from "@/utils/utils";

export function getDictionary(params) {
  return request({
    url: '/sysDict/list',
    method: 'get',
    params
  })
}

export function addDictionary(data) {
  data = getParams(data)
  return request({
    url: '/sysDict/save',
    method: 'POST',
    data
  })
}

export function updateDictionary(data) {
  data = getParams(data)
  return request({
    url: '/sysDict/update',
    method: 'PUT',
    data
  })
}

export function dictionaryInfo(params) {
  params = getParams(params)
  return request({
    url: '/sysDict/getDicInfo',
    method: 'get',
    params
  })
}
