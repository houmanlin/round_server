import request from '@/utils/request'
import {getParams} from "@/utils/utils";

export function login(data) {
  return request({
    url: '/sysAccount/login',
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

  return
}

export function updateInfo(data) {
  data = getParams(data)
  return request({
    url: '/sysAccount/update',
    method: 'PUT',
    data
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

export function editUserPass(data) {
  data = getParams(data)
  return request({
    url: '/sysAccount/changePassword',
    method: 'POST',
    data
  })
}
