

// 员工表格头
export let TableHeader = [
    {
        title : "姓名",
        field : "venue_name",
    },
    {
        title: "电话",
        field: "venue_phone",
    },
    {
        title: "地址",
        field: "venue_address",
    },
    {
        title: "排序",
        field: "venue_sort",
    },
    {
        title: "状态",
        field: "venue_status",
    },
    {
        title: "操作",
        field: ['edit','mobile','delete'],
    },
]




// 添加验证表
export const ROLES = {
    venue_name: [
        { required: true, message: '请填写场馆名称', trigger: 'blur' }
    ],
    venue_phone: [
        { required: true, message: '请填写电话', trigger: 'blur' }
    ],
    venue_province: [
        {required: true, message: '请选择省', trigger: 'blur' }
    ],
    venue_city: [
        {required: true, message: '请选择市', trigger: 'blur' }
    ],
    venue_area: [
        { required: true, message: '请选择区', trigger: 'blur' }
    ],
    venue_address: [
        { required: true, message: '请输入详细地址', trigger: 'blur' }
    ],
    venue_sort: [
        { required: true, message: '请输入排序', trigger: 'blur' }
    ]
}
