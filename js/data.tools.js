function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function (n, i) {
      indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}


/**
 * 获取系统的url
 * @returns fullUrl：系统访问路径，例如：http://localhost:8080/amudraya/amudraya
 */
function getURL(){
    var fullUrl = window.location.href;
    var a=fullUrl.lastIndexOf('/');
    fullUrl=fullUrl.substring(0,a);
    var b=fullUrl.lastIndexOf('/');
    fullUrl=fullUrl.substring(0,b);
    var c=fullUrl.lastIndexOf('/');
    fullUrl=fullUrl.substring(0,c);
	console.log(fullUrl);
    return fullUrl;
}
/**
 * 根据表单id上传
 * @param {Object} formName
 * @param {Object} url
 * @param {Object} callback
 */
function MySubmit(formName,url,callback) {
	var formdate = getFormData($('#'+formName));
	$.ajax({
		//几个参数需要注意一下
		type: "POST",//方法类型
		dataType: "json",//预期服务器返回的数据类型
		url: "http://localhost:9090/BicycleSales/"+url+".do" ,//url
		xhrFields: {
			withCredentials: true,
		},
		data: {
			message:JSON.stringify(formdate)
		},
		success: function (result) {
			console.log(result);//打印服务端返回的数据(调试用)
			callback(result);
		},
		error : function(error) {
			console.log(error);
			alert("异常！");
		}
	});
}

/**
 * 上传字符串
 * @param {Object} str
 * @param {Object} url
 * @param {Object} callback
 */
function MySubmitString(str,url,callback) {
	$.ajax({
		//几个参数需要注意一下
		type: "POST",//方法类型
		dataType: "json",//预期服务器返回的数据类型
		url: "http://localhost:9090/BicycleSales/"+url+".do" ,//url
		xhrFields: {
			withCredentials: true,
		},
		data: {
			message:str
		},
		success: function (result) {
			console.log(result);//打印服务端返回的数据(调试用)
			callback(result);
		},
		error : function(error) {
			console.log(error);
			alert("异常！");
		}
	});
}
/**
 * 上传表单对象
 * @param {Object} formdate
 * @param {Object} url
 * @param {Object} callback
 */
function MySubmitFormdata(formdate,url,callback) {
	$.ajax({
		//几个参数需要注意一下
		type: "POST",//方法类型
		dataType: "json",//预期服务器返回的数据类型
		url: "http://localhost:9090/BicycleSales/"+url+".do" ,//url
		xhrFields: {
			withCredentials: true,
		},
		data: formdate,
		processData: false,//必须false才会避开jQuery对 formdata 的默认处理， XMLHttpRequest会对 formdata 进行正确的处理
		contentType: false,// 告诉jQuery不要去设置Content-Type请求头
		success: function (result) {
			console.log(result);//打印服务端返回的数据(调试用)
			callback(result);
		},
		error : function(error) {
			console.log(error);
			alert("异常！");
		}
	});
}

