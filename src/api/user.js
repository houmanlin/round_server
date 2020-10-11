import request from '@/utils/request'
import {getParams} from "@/utils/utils";

export function login(data) {
  return request({
    url: '/sysAccount/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/sysAccount/logout',
    method: 'post',
    data
  })
}

export function registerUser(data) {
  data = getParams(data)
  return request({
    url: '/sysAccount/register',
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

export function userCheckEnable(data) {
  data = getParams(data)
  return request({
    url: '/sysAccount/isEnable',
    method: 'POST',
    data
  })
}


export function resetUserPass(data) {
  data = getParams(data)
  return request({
    url: '/sysAccount/resetPassword',
    method: 'POST',
    data
  })
}

export function removeUserPass(data) {
  data = getParams(data)
  return request({
    url: '/sysAccount/delete',
    method: 'DELETE',
    data
  })
}
