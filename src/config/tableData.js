// 系统日志表格头
const SYSTEM_LOG_TABLE = [

    {
        label: "主单号",
        prop: "mainNo"
    },
    {
        label: "分单号",
        prop: "busDate"
    },

    {
        label: "操作人员账户",
        prop: "updateBy"
    },
    {
        label: "操作类型",
        prop: "opertype_text"
    },
    {
        label: "操作内容",
        prop: "operContent"
    },
    {
        label: "操作时间",
        prop: "busDate"
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
        label: "是否可用",
        prop: "enable_text"
    },

    {
        label: "创建人",
        prop: "createBy"
    },
    {
        label: "创建时间",
        prop: "createDate"
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
        prop: "codeDiv"
    },
    {
        label: "CODE CD",
        prop: "codeId"
    },
    {
        label: "CODE TEXT",
        prop: "codeText"
    },
    {
        label: "顺序",
        prop: "sortOrder"
    },
    {
        label: "是否使用",
        prop: "enable_text"
    },
    {
        label: "创建人",
        prop: "createBy"
    },
    {
        label: "创建时间",
        prop: "createDate"
    },
    {
        label: "修改人",
        prop: "updateBy"
    },
    {
        label: "修改时间",
        prop: "updateDate"
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
        prop: "customerCode"
    },
    {
        label: "是否可用",
        prop: "enable_text"
    },
    {
        label: "创建人",
        prop: "createBy"
    },

    {
        label: "创建时间",
        prop: "createDate"
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
        prop: "mainNo"
    },
    {
        label: "报关日期",
        prop: "customsDate"
    },
    {
        label: "航班日期",
        prop: "flightDate"
    },
    {
        label: "一级客户",
        prop: "customerNameOne"
    },
    {
        label: "二级客户",
        prop: "customerNameTwo"
    },

    {
        label: "监管方式",
        prop: "supervise"
    },
    {
        label: "通关单号",
        prop: "transportExist"
    },
    {
        label: "查验",
        prop: "checkNum"
    },
    {
        label: "品名数量",
        prop: "descriptionNum"
    },
    {
        label: "分单项/次",
        prop: "submenuNum"
    },
    {
        label: "计费重量/kg",
        prop: "chargedWeight"
    },
    {
        label: "查验/次",
        prop: "checkNum"
    },
    {
        label: "退单/次",
        prop: "chargebackNum"
    },
    {
        label: "转关/次",
        prop: "customsTransitNum"
    },
    {
        label: "运输（有境内监管）/次",
        prop: "transportExist"
    },
    {
        label: "运输（无境内监管）/次",
        prop: "transportNothing"
    },
    {
        label: "操作",
        prop: [ "上传文件" , "下载文件"]
    },
]


// 进出口业务表格头
const IMPORT_BUSINESS_TABLE = [
    {
        label: "状态",
        prop: "currentStatus"
    },
    {
        label: "业务类型",
        prop: "exitPort"
    },
    {
        label: "一级客户",
        prop: "customerNameOne"
    },
    {
        label: "二级客户",
        prop: "customerNameTwo"
    },
    {
        label: "主单号/分单号",
        prop: "mainNo"
    },
    {
        label: "通关口岸",
        prop: "exitPort"
    },
    {
        label: "报关日期",
        prop: "declarationDate"
    },
    {
        label: "报关口岸",
        prop: "customsPort"
    },
    {
        label: "航班号",
        prop: "flightNo"
    },
    {
        label: "航班日期",
        prop: "flightDate"
    },
    {
        label: "件数",
        prop: "mainNumPackage"
    },
    {
        label: "毛重",
        prop: "mainRoughWeight"
    },
    {
        label: "报关企业代理",
        prop: "productionSaleUnit"
    },
    {
        label: "报关日期",
        prop: "productionSaleUnit"
    },
    {
        label: "提交报关",
        prop: "productionSaleUnit"
    },
    {
        label: "提交查验",
        prop: "commitCheckStatus",
        hase_status: true
    },
    {
        label: "查验操作",
        prop: "commitCheckStatus",
        hase_status: true
    },
    {
        label: "提交放行",
        prop: "commitCheckStatus",
        hase_status: true
    },
    {
        label: "放行出库",
        prop: "commitCheckStatus",
        hase_status: true
    },
    {
        label: "提交转关",
        prop: "commitCheckStatus",
        hase_status: true
    },
    {
        label: "转关操作",
        prop: "commitCheckStatus",
        hase_status: true
    },
    {
        label: "提货操作",
        prop: "commitCheckStatus",
        hase_status: true
    },
    {
        label: "提交退单",
        prop: "commitCheckStatus",
        hase_status: true
    },
    {
        label: "退单操作",
        prop: "commitCheckStatus",
        hase_status: true
    },
    {
        label: "操作",
        prop: [ "编辑", "查看", "上传", "下载" ]
    },
]

// 进出口业务表格头
const HOSE_BILL_TABLE = [
    {
        label: "状态",
        prop: "currentStatus"
    },
    {
        label: "业务类型",
        prop: "exitPort"
    },
    {
        label: "一级客户",
        prop: "customerNameOne"
    },
    {
        label: "二级客户",
        prop: "customerNameTwo"
    },
    {
        label: "主单号/分单号",
        prop: "mainNo"
    },
    {
        label: "离境口岸",
        prop: "exitPort"
    },
    {
        label: "报关日期",
        prop: "declarationDate"
    },
    {
        label: "航班号",
        prop: "flightNo"
    },
    {
        label: "航班日期",
        prop: "flightDate"
    },
    {
        label: "件数",
        prop: "mainNumPackage"
    },
    {
        label: "毛重",
        prop: "mainRoughWeight"
    },
    {
        label: "报关企业代理",
        prop: "productionSaleUnit"
    },
    {
        label: "生产销售单位",
        prop: "productionSaleUnit"
    },
    {
        label: "备注",
        prop: "remark"
    },
    {
        label: "体积",
        prop: "mainVolume"
    },
    {
        label: "报关口岸",
        prop: "customsPort"
    },
    {
        label: "入库查验",
        prop: "incomingCheckStatus",
        hase_status: true
    },
    {
        label: "已提交报关",
        prop: "commitCustomsStatus",
        hase_status: true
    },
    {
        label: "查验中",
        prop: "commitCheckStatus",
        hase_status: true
    },
    {
        label: "退单处理中",
        prop: "chargebackStatus",
        hase_status: true
    },
    {
        label: "退单完毕",
        prop: "chargebackedStatus",
        hase_status: true
    },
    {
        label: "退库完毕",
        prop: "cancelStocksStatus",
        hase_status: true
    },
    {
        label: "放行",
        prop: "commitPermitStatus",
        hase_status: true
    },


    {
        label: "境内送货状态",
        prop: "incountryGoodsStatus",
        hase_status: true
    },
    {
        label: "货物送达",
        prop: "goodsDeliveredStatus",
        hase_status: true
    },
    {
        label: "提货车辆信息已提交",
        prop: "commitPickUpCarInfoStatus",
        hase_status: true
    },
    {
        label: "货物已提取",
        prop: "pickUpGoodsConnectStatus",
        hase_status: true
    },
    {
        label: "转关已提交",
        prop: "customsTransitOperStatus",
        hase_status: true
    },
    {
        label: "转关中",
        prop: "customsTransitOperStatus",
        hase_status: true
    },
    {
        label: "转关异常",
        prop: "customsTransitExceptionStatus",
        hase_status: true
    },
    {
        label: "转关完毕",
        prop: "customsTransitFinishStatus",
        hase_status: true
    },
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
