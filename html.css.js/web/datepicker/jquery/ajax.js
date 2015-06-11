/**
 * Remote reading
 */
var $rr$= {
	/**
	 * Asynchronous JavaScript and XML
	 */
	ajax:{
		/**
		 * 同步调用
		 * 
		 * @param url
		 *            远程调用资源接口
		 * @param params
		 *            参数列表{key:value}
		 */
		sync:function(url_, params_){
			var _response= jQuery.ajax({
				type:"POST",
				cache:false,
				async:false,
				url:url_,
				data:params_
			});
			if(_response.status === 200){
				return eval("(" + _response.responseText + ")");
			}
			throw "连接远程服务：" + url_ + "失败。错误信息：status: " + _response.status + " statusText: '" + _response.statusText + "' readyState: " + _response.readyState;
		},
		/**
		 * 异步调用
		 * 
		 * @param url
		 *            远程调用资源接口
		 * @param params
		 *            参数列表{key:value}
		 * @param callback
		 *            异步调用执行完成后回调的方法,方法签名有:function(){}
		 */
		async:function(url_, params_, callback_){
			jQuery.ajax({
				type:"POST",
				cache:false,
				async:true,
				url:url_,
				data:params_,
				success:function(result_){
					callback_.call(this, eval("(" + result_ + ")"));
				},
				error:function(response_){
					throw "连接远程服务：" + url_ + "失败。错误信息：status: " + response_.status + " statusText: '" + response_.statusText + "' readyState: " + response_.readyState;
				}
			});
		}
	}
};
