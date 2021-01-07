


// 员工表格头
export let TableHeader = [
  {
    title : "姓名",
    field : "account_name",
  },
  {
    title: "性别",
    field: "sex_text",
  },
  {
    title: "电话",
    field: "account_phone",
  },
  {
    title: "身份",
    field: "account_identity_id",
  },
  {
    title: "所属场馆",
    field: "account_identity_id",
  },
  {
    title: "登录",
    field: "allow_login_text",
  },
  {
    title: "状态",
    field: "status_text",
  },
  {
    title: "操作",
    field: ['check','edit','remove'],
  },
]




// 添加验证表
export const ROLES = {
  account_name: [
    { required: true, message: '请填写用户名', trigger: 'blur' }
  ],
  account_sex: [
    { required: true, message: '请选择性别', trigger: 'blur' }
  ],
  account_phone: [
    {required: true, message: '请填写电话号', trigger: 'blur' }
  ],
  account_belong_venus: [
    {required: true, message: '请选择所属场馆', trigger: 'blur' }
  ]
}
