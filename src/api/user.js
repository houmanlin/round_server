import request from '@/utils/request'
import {getParams} from "@/utils/utils";

export function login(data) {
  return request({
    url: '/sys_account/login',
    method: 'post',
    data
  })
}

export function getInfoById(params) {
  params = getParams(params)
  return request({
    url: '/sysAccount/getUpdateInfo',
    method: 'get',
    params
  })
}
export function getInfo(params) {
  params = getParams(params)
  return request({
    url: '/sysAccount/getUpdateInfo',
    method: 'get',
    params
  })
}
export function logout(data) {
  data = getParams(data)
  return request({
    url: '/sysAccount/logout',
    method: 'post',
    data
  })
}


export function getUserList(data) {
  data = getParams(data)
  return request({
    url: '/sysAccount/list',
    method: 'GET',
    params: data
  })
}