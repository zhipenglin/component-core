import ajaxError from "@core/ic-ajax-error";

export default response =>{
    if (response.config.ignoreError) {
        return response;
    }
    response.errMsg = ajaxError(response);
    return response;
}
