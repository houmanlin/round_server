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
    page_config["current"]  = origin_data.current ? origin_data.current : 1;
    page_config["size"]     = origin_data.size ? origin_data.size : 1;
    page_config["total"]    = origin_data.total ? origin_data.total : 1;
    page_config["limit"]    = 10;
    return page_config;
}



module.exports = {getParams, getPages}
