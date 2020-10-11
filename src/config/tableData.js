// 系统日志表格头
const SYSTEM_LOG_TABLE = [

    {
        label: "操作时间",
        prop: "date"
    },
    {
        label: "操作人员账户",
        prop: "name"
    },
    {
        label: "操作类型",
        prop: "province"
    },
    {
        label: "操作内容",
        prop: "zip"
    },
]


// 账户管理表格头
const USER_MANAGE_TABLE = [
    {
        label: "用户名",
        prop: "username"
    },
    {
        label: "真实姓名",
        prop: "realName"
    },
    {
        label: "职位",
        prop: "position"
    },
    {
        label: "创建时间",
        prop: "createDate"
    },
    {
        label: "创建人",
        prop: "createBy"
    },
    {
        label: "是否可用",
        prop: "enable_text"
    },
    {
        label: "操作",
        prop: ["启用", "禁用", "重置密码"]
    },
]

// 字典管理表格头
const DICTIONARY_TABLE = [
    {
        label: "CODE DIV",
        prop: "username"
    },
    {
        label: "CODE CD",
        prop: "date"
    },
    {
        label: "CODE TEXT",
        prop: "date"
    },
    {
        label: "顺序",
        prop: "date"
    },
    {
        label: "是否使用",
        prop: "date"
    },
    {
        label: "创建人",
        prop: "date"
    },
    {
        label: "创建时间",
        prop: "date"
    },
    {
        label: "修改人",
        prop: "date"
    },
    {
        label: "修改时间",
        prop: "date"
    },

]


// 客户管理表格头
const CLIENT_MANAGE_TABLE = [
    {
        label: "用户名",
        prop: "username"
    },
    {
        label: "客户编码",
        prop: "date"
    },
    {
        label: "创建时间",
        prop: "date"
    },
    {
        label: "创建人",
        prop: "date"
    },
    {
        label: "是否可用",
        prop: "date"
    },
    {
        label: "操作",
        prop: ["启用", "禁用"]
    },
]


// 业务计费表格头
const BUSINESS_BILLING_TABLE = [
    {
        label: "主单号",
        prop: "username"
    },
    {
        label: "报关日期",
        prop: "date"
    },
    {
        label: "航班日期",
        prop: "date"
    },
    {
        label: "客户名称",
        prop: "date"
    },
    {
        label: "重量kg",
        prop: "date"
    },
    {
        label: "监管方式",
        prop: "date"
    },
    {
        label: "通关单号",
        prop: "date"
    },
    {
        label: "查验",
        prop: "date"
    },
    {
        label: "品名数量",
        prop: "date"
    },
    {
        label: "分单项/次",
        prop: "date"
    },
    {
        label: "计费重量/kg",
        prop: "date"
    },
    {
        label: "查验/次",
        prop: "date"
    },
    {
        label: "退单/次",
        prop: "date"
    },
    {
        label: "转关/次",
        prop: "date"
    },
    {
        label: "运输（有境内监管）/次",
        prop: "date"
    },
    {
        label: "运输（无境内监管）/次",
        prop: "date"
    },
    {
        label: "操作",
        prop: [ "上传文件" , "下载文件"]
    },
]


// 进出口业务表格头
const IMPORT_BUSINESS_TABLE = [
    {
        label: "客户名称",
        prop: "username"
    },
    {
        label: "离境口岸",
        prop: "date"
    },
    {
        label: "航班号",
        prop: "date"
    },
    {
        label: "航班日期",
        prop: "date"
    },
    {
        label: "主单号",
        prop: "date"
    },
    {
        label: "件数",
        prop: "date"
    },
    {
        label: "毛重",
        prop: "date"
    },
    {
        label: "体积",
        prop: "date"
    },
    {
        label: "报关口岸",
        prop: "date"
    },
    {
        label: "已接单",
        prop: "date"
    },
    {
        label: "入库查验",
        prop: "date"
    },
    {
        label: "已提交报关",
        prop: "date"
    },
    {
        label: "查验中",
        prop: "date"
    },
    {
        label: "退单处理中",
        prop: "date"
    },
    {
        label: "退单完毕",
        prop: "date"
    },
    {
        label: "退库完毕",
        prop: "date"
    },
    {
        label: "放行",
        prop: "date"
    },
    {
        label: "提货车辆信息已提交",
        prop: "date"
    },
    {
        label: "货物送达",
        prop: "date"
    },
    {
        label: "货物已提取",
        prop: "date"
    },
    {
        label: "转关已提交",
        prop: "date"
    },
    {
        label: "转关中",
        prop: "date"
    },
    {
        label: "转关异常",
        prop: "date"
    },
    {
        label: "转关完毕",
        prop: "date"
    },
    {
        label: "状态",
        prop: "date"
    },
    {
        label: "操作",
        prop: ["下载","查看", "上传" ]
    },
]

// 进出口业务表格头
const HOSE_BILL_TABLE = [
    {
        label: "分单号",
        prop: "username"
    },
    {
        label: "分单件数",
        prop: "date"
    },
    {
        label: "分单毛重",
        prop: "date"
    },
    {
        label: "分单提交",
        prop: "date"
    },
    {
        label: "分单计费重量",
        prop: "date"
    },
    {
        label: "收货人",
        prop: "date"
    }
]

module.exports = {
    SYSTEM_LOG_TABLE,
    USER_MANAGE_TABLE,
    DICTIONARY_TABLE,
    CLIENT_MANAGE_TABLE,
    BUSINESS_BILLING_TABLE,
    IMPORT_BUSINESS_TABLE,
    HOSE_BILL_TABLE
}
