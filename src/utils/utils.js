function getParams(params) {
    let query_params = new URLSearchParams();

    for (let key in params){
        query_params.append(key, params[key]);
    }

    return query_params;
}

function getPages(origin_data) {
    if (!origin_data){
        origin_data = {}
    }
    let page_config = {};
    page_config["current_page"]  = origin_data.current_page ? origin_data.current_page : 1;
    page_config["total_num"]     = origin_data.total_num ? origin_data.total_num : 1;
    page_config["page_total"]    = origin_data.page_total ? origin_data.page_total : 1;
    page_config["limit"]    = 20;
    return page_config;
}



module.exports = {getParams, getPages}
