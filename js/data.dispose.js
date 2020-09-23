/**
 * 获取存到cookie中的用户登录信息。
 */
var cookie = $.cookie("managerjson");
if (cookie != null && cookie != '') {
	var mydata = $.parseJSON(cookie);
	window.sessionStorage.setItem("managerjson", cookie);
	$("#managername").html("管理员："+mydata.administrator.name);
}
else{
	if("http://127.0.0.1:8848/BicycleSalesHome-Ui/adminLogin.html"!=window.location.href){
		alert("请先登录！");
		parent.location.href = "adminLogin.html";
	}
}


/**
 * 通过自行车类别id查询自行车信息
 * @param {Object} bicycletypeid
 */
function getbicycleByTypeid(bicycletypeid) {
	var json = {};
	json['pageIndex'] = '';
	json['bicycletypeid'] = bicycletypeid;
	url = "queryBicycle";
	MySubmitString(JSON.stringify(json), url, function(data) {
		if (data != null) {
			if (data.msg == "ok") {
				$.cookie("allbicycle", JSON.stringify(data), {
					path: "/"
				});
				window.location.href = "shop.html";
			} else {
				alert("未查询到任何信息！");
			}
		} else {
			alert("未查询到任何信息！");
		}
	})
}
/**
 * 通过cookie中的信息，渲染页面
 */
function getallbicycle() {
	var cookie = $.cookie("allbicycle");
	if (cookie != null) {
		var mydata = $.parseJSON(cookie);
		$("#username").append(mydata.user.name + "");
	}


}

/**
 * 获取所有自行车数据
 */
function getAllBicycle() {
	var json = {};
	if ($("#productname").val() != null && $("#productname").val() != '') {
		json['name'] = $("#productname").val();
	} else {
		json['name'] = "";
	}
	json['pageIndex'] = "";
	url = "queryAllBicycle";
	MySubmitString(JSON.stringify(json), url, function(data) {
		if (data != null) {
			if (data.msg == "ok") {
				window.sessionStorage.setItem("allbicycle", JSON.stringify(data));
			} else {
				alert("未查询到任何信息！");
			}
		} else {
			alert("未查询到任何信息！");
		}
	})
}

/**
 * 渲染所有自行车数据
 */
function getAllBicycleProduct() {
	var my = window.sessionStorage.getItem("allbicycle");
	if (my != null && my != '') {
		var mydata = $.parseJSON(my);
		if (mydata.msg == "ok") {
			//将数据显示在页面上
			var str = "";
			str += str = "<table class='list-style Interlaced'>" +
				"<tr>" +
				"<th></th>" +
				"<th>ID编号</th>" +
				"<th>图片</th>" +
				"<th>商品名称</th>" +
				"<th>类别</th>" +
				"<th>单价</th>" +
				"<th>库存</th>" +
				"<th>精品</th>" +
				"<th>新品</th>" +
				"<th>热销</th>" +
				"<th>操作</th>" +
				"</tr>";
			//遍历数据
			var array = mydata.allbicycle;
			$.each(array, function(index, element) {
				if (element['delstate'] > 0) {
					str += "<tr>" +
						"<td class='center'><input type='checkbox' class='middle children-checkbox' value='" + element['bicycleid'] +
						"'/></td>" +
						"<td class='center'>" +
						"<span><em>" + (index + 1) + "</em></span>" +
						"</td>" +
						"<td class='center pic-area'><img src='" + element['firstphoto'] + "' class='thumbnail' /></td>" +
						"<td class='td-name center'>" +
						"<em class='ellipsis td-name block'>" + element['name'] + "</em>" +
						"</td>" +
						"<td class='center'>" +
						"<span>";
					if (element['bicycletypeid'] == "1") {
						str += "<em>山地自行车</em>";
					} else if (element['bicycletypeid'] == "2") {
						str += "<em>公路自行车</em>";
					} else if (element['bicycletypeid'] == "3") {
						str += "<em>旅行自行车</em>";
					} else {
						str += "<em>城市自行车</em>";
					}
					str += "</span>" +
						"</td>" +
						"<td class='center'>" +
						"<span>" +
						"<i>$</i>" +
						"<em>" + element["money"] + "</em>" +
						"</span>" +
						"</td>" +
						"<td class='center'>" +
						"<span>" +
						"<em>" + element['inventory'] + "</em>" +
						"<i>辆</i>" +
						"</span>" +
						"</td>";
					if (element['delstate'] == 101) {
						str += "<td class='center'><img src='images/yes.gif' /></td>" +
							"<td class='center'><img src='images/no.gif' /></td>" +
							"<td class='center'><img src='images/no.gif' /></td>";
					} else if (element['delstate'] == 102) {
						str += "<td class='center'><img src='images/no.gif' /></td>" +
							"<td class='center'><img src='images/yes.gif' /></td>" +
							"<td class='center'><img src='images/no.gif' /></td>";
					} else {
						str += "<td class='center'><img src='images/no.gif' /></td>" +
							"<td class='center'><img src='images/no.gif' /></td>" +
							"<td class='center'><img src='images/yes.gif' /></td>";
					}


					str += "<td class='center'>" +
						"<a href='product_detail.html' title='查看' onclick='getBicycleDetail(" + (index + 1) +
						")'><img src='images/icon_view.gif' /></a>" +
						"<a href='edit_product.html' title='编辑' onclick='getBicycleUpdate(" + (index + 1) +
						")'><img src='images/icon_edit.gif' /></a>" +
						"<a title='删除' onclick='delProduct(" + element["bicycleid"] + ")'><img src='images/icon_drop.gif' /></a>" +
						"</td>" +
						"</tr>";
				}
			})
			str += "</table>";
			//将表格添加到body中
			$('#productlist').html(str);
		} else {
			alert("未查询到任何信息！");
		}
	} else {
		alert("未查询到任何信息！");
	}
}
/**
 * 模糊查询 商品名称
 */
function queryAllBicycleByName() {
	getAllBicycle();
	getAllBicycleProduct();
}

/**
 * 获取查看详情的自行车编号
 * @param {Object} BicycleNo
 */
function getBicycleDetail(BicycleNo) {
	if (BicycleNo != null && BicycleNo != '') {
		window.sessionStorage.setItem("queryBicycleNo", BicycleNo);
	}
}

/**
 * 获取修改自行车编号
 * @param {Object} BicycleNo
 */
function getBicycleUpdate(BicycleNo) {
	if (BicycleNo != null && BicycleNo != '') {
		window.sessionStorage.setItem("updateBicycleNo", BicycleNo);
	}
}

/**
 * 查询渲染自行车详情product_detail
 * @param {Object} BicycleNo
 */
function queryBicycleDetail() {
	var BicycleNo = window.sessionStorage.getItem("queryBicycleNo");
	var my = window.sessionStorage.getItem("allbicycle");
	if (my != null && my != '') {
		var mydata = $.parseJSON(my);
		if (mydata.msg == "ok") {
			if (BicycleNo != null && BicycleNo != '') {
				var array = mydata.allbicycle[BicycleNo - 1];

				var str = "<table class='list-style'>" +
					"<tr>" +
					"	<td style='text-align:right;width:15%;'>商品名称：</td>" +
					"	<td><input type='text' class='textBox length-long' style='border:0px;' value='" + array.name +
					"' readonly='readonly'/></td>" +
					"</tr>" +
					"<tr>" +
					"	<td style='text-align:right;'>商品类别：</td>" +
					"	<td>";
				if (array.bicycletypeid) {
					str += "		<input type='text' class='textBox length-short' style='border:0px;' value='山地自行车' readonly='readonly'/>";
				} else if (array.bicycletypeid) {
					str += "		<input type='text' class='textBox length-short' style='border:0px;' value='公路自行车' readonly='readonly'/>";
				} else if (array.bicycletypeid) {
					str += "		<input type='text' class='textBox length-short' style='border:0px;' value='旅行自行车' readonly='readonly'/>";
				} else {
					str += "		<input type='text' class='textBox length-short' style='border:0px;' value='城市自行车' readonly='readonly'/>";
				}

				str += "	</td>" +
					"</tr>" +
					"<tr>" +
					"	<td style='text-align:right;'>单价：</td>" +
					"	<td>" +
					"		<input type='text' class='textBox length-short' style='border:0px;' value='" + array.money +
					"' readonly='readonly'/>" +
					"		<span>元</span>" +
					"	</td>" +
					"</tr>" +
					"<tr>" +
					"	<td style='text-align:right;'>库存：</td>" +
					"	<td>" +
					"		<input type='text' class='textBox length-short' style='border:0px;' value='" + array.inventory +
					"' readonly='readonly'/>" +
					"		<span>辆</span>" +
					"	</td>" +
					"</tr>" +
					"<tr>" +
					"	<td style='text-align:right;'>产品主图：</td>" +
					"	<td>" +
					"		<img src='" + array.firstphoto + "' width='60' height='60' class='mlr5' />" +
					"	</td>" +
					"</tr>" +
					"<tr>" +
					"	<td style='text-align:right;'>产品缩略图：</td>" +
					"	<td>";
				for (var i = 0; i < array.photo.length; i++) {
					str += "		<img src='" + array.photo[i].path + "' width='80' height='80' />";
				}
				str += "	</td>" +
					"</tr>" +
					"</table>";
				$("#productdetial").html(str);
			}
		} else {
			alert("未查询到任何信息！");
		}
	} else {
		alert("未查询到任何信息！");
	}
}

/**
 * 修改回显
 */
function getUpdateBicycleDetail() {
	var BicycleNo = window.sessionStorage.getItem("updateBicycleNo");
	var my = window.sessionStorage.getItem("allbicycle");
	if (my != null && my != '') {
		var mydata = $.parseJSON(my);
		if (mydata.msg == "ok") {
			if (BicycleNo != null && BicycleNo != '') {
				var array = mydata.allbicycle[BicycleNo - 1];
				$("#name").attr("value", array.name);
				$("#money").attr("value", array.money);
				$("#inventory").attr("value", array.inventory);
				if (array.delstate == "101") {
					$("#jingpin").attr("checked", "checked");
				} else if (array.delstate == "102") {
					$("#xinpin").attr("checked", "checked");
				} else {
					$("#rexiao").attr("checked", "checked");
				}
				var str1 = "<img src='" + array.firstphoto + "' width='80' height='80' />";
				$("#firstop").html(str1);
				var str = "";
				for (var i = 0; i < array.photo.length; i++) {
					str += "<img src='" + array.photo[i].path + "' width='80' height='80' />";
				}
				$("#photos").html(str);
			}
		} else {
			alert("未查询到任何信息！");
		}
	} else {
		alert("未查询到任何信息！");
	}
}

/**
 * 处理时间
 * @param {Object} time
 */
function ChangeDateFormat(time) {
	var birthdayMilliseconds = parseInt(time);
	//实例化一个新的日期格式，使用1970 年 1 月 1 日至今的毫秒数为参数
	var datetime = new Date(birthdayMilliseconds);
	datetime.setTime(time);
	var year = datetime.getFullYear();
	var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
	var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
	var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
	var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
	var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
	return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}

/**
 * 添加商品
 */
function insertbicycle() {
	var formdata = new FormData() // FormData对象，来发送二进制文件。
	var suoluetu = $('input[name="suoluetu"]').prop('files');
	var chanpinzhutu = $('input[name="chanpinzhutu"]').prop('files');
	// if(suoluetu==null||chanpinzhutu==null){
	// 	alert("图片没获取到！");
	// }
	// else{
	// 	alert("suoluetu长度："+suoluetu.length+"chanpinzhutu："+chanpinzhutu.length);
	// }
	for (var i = 0; i < suoluetu.length; i++) {
		formdata.append("suoluetu", suoluetu[i]); // 将文件追加到 formdata对象中
	}
	for (var j = 0; j < chanpinzhutu.length; j++) {
		formdata.append("chanpinzhutu", chanpinzhutu[j]); // 将文件追加到 formdata对象中
	}
	var json = {};
	json['name'] = $("#name").val();
	json['bicycletypeid'] = $("#bicycletypeid").val();
	json['money'] = $("#money").val();
	json['inventory'] = $("#inventory").val();
	json['state'] = $('input:radio:checked').val();
	formdata.append("message", JSON.stringify(json));
	formdata.enctype = "multipart/form-data";
	// alert(JSON.stringify(json));
	url = "insertBicycle";
	MySubmitFormdata(formdata, url, function(data) {
		if (data != null) {
			if (data.msg == "ok") {
				alert("自行车上传成功！");
			} else {
				alert("未查询到任何信息！");
			}
		} else {
			alert("未查询到任何信息！");
		}
	})
}

/**
 * 修改密码
 */
function updatePassword() {
	var managerjson = window.sessionStorage.getItem("managerjson");
	var json = {};
	if (managerjson != null && managerjson != '') {
		var mydate = $.parseJSON(managerjson);
		json['administratorid'] = mydata.administrator.administratorid;
		if ($("#current-pwd").val() != '') {
			var pwd = $.md5($("#current-pwd").val());
			if (mydate.administrator.password == pwd) {
				if ($("#new-pwd").val() != '' && $("confirm-pwd").val() != '') {
					if ($("#new-pwd").val() == $("#confirm-pwd").val()) {
						json['password'] = $("#new-pwd").val();
						url = "updateManagerPassword";
						MySubmitString(JSON.stringify(json), url, function(data) {
							if (data != null && data.msg == "ok") {
								alert("密码修改成功！请重新登录！")
								top.location.href = "adminLogin.html";
							} else {
								alert("密码修改失败!");
							}
						})
					} else {
						alert("输入的两次密码不一致");
					}
				}
			} else {
				alert("旧密码错误！");
			}
		}
	} else {
		alert("请先登录!");
		window.location.href = "login.html";
	}
}

/**
 * 获取cookie
 * @param {Object} name
 */
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

/**
 * 删除cookie
 * @param {Object} name
 */
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()+"; path=/";
}

/**
 * 退出账号
 */
function quitAccpount() {
	delCookie('managerjson'); //path为指定路径，直接删除该路径下的cookie
	window.sessionStorage.setItem("managerjson", "");
	window.location.href = "adminLogin.html";
}

/**
 * 删除产品
 */
function delProduct(BicycleId) {
	var json = {};
	json['bicycleid'] = BicycleId;
	json['delstate'] = 0;
	url = "delProduct";
	MySubmitString(JSON.stringify(json), url, function(data) {
		if (data != null) {
			if (data.msg == "ok") {
				alert("删除成功！");
				queryAllBicycleByName();
			} else {
				alert("删除失败！");
			}
		} else {
			alert("删除失败！");
		}
	})
}

/**
 * 批量删除产品
 */
function delListProduct() {
	var json = {};
	var str = "";
	$.each($('input:checkbox'), function() {
		if (this.checked) {
			str += $(this).val() + ";";
		}
	});
	json['bicycleids'] = str;
	json['delstate'] = 0;
	url = "delListProduct";
	MySubmitString(JSON.stringify(json), url, function(data) {
		if (data != null) {
			if (data.msg == "ok") {
				alert("批量删除成功！");
				queryAllBicycleByName();
			} else {
				alert("批量删除失败！");
			}
		} else {
			alert("批量删除失败！");
		}
	})
}

/**
 * 渲染所有自行车数据
 */
function getAllDelBicycleProduct() {
	var my = window.sessionStorage.getItem("allbicycle");
	if (my != null && my != '') {
		var mydata = $.parseJSON(my);
		if (mydata.msg == "ok") {
			//将数据显示在页面上
			var str = "";
			str += str = "<table class='list-style Interlaced'>" +
				"<tr>" +
				"<th></th>" +
				"<th>ID编号</th>" +
				"<th>图片</th>" +
				"<th>商品名称</th>" +
				"<th>类别</th>" +
				"<th>单价</th>" +
				"<th>库存</th>" +
				"<th>删除时间</th>" +
				"<th>操作</th>" +
				"</tr>";
			//遍历数据
			var array = mydata.allbicycle;
			$.each(array, function(index, element) {
				if (element['delstate'] == 0) {
					str += "<tr>" +
						"<td class='center'><input type='checkbox' class='middle children-checkbox' value='" + element['bicycleid'] +
						"'/></td>" +
						"<td class='center'>" +
						"<span><em>" + (index + 1) + "</em></span>" +
						"</td>" +
						"<td class='center pic-area'><img src='" + element['firstphoto'] + "' class='thumbnail' /></td>" +
						"<td class='td-name center'>" +
						"<em class='ellipsis td-name block'>" + element['name'] + "</em>" +
						"</td>" +
						"<td class='center'>" +
						"<span>";
					if (element['bicycletypeid'] == "1") {
						str += "<em>山地自行车</em>";
					} else if (element['bicycletypeid'] == "2") {
						str += "<em>公路自行车</em>";
					} else if (element['bicycletypeid'] == "3") {
						str += "<em>旅行自行车</em>";
					} else {
						str += "<em>城市自行车</em>";
					}
					str += "</span>" +
						"</td>" +
						"<td class='center'>" +
						"<span>" +
						"<i>$</i>" +
						"<em>" + element["money"] + "</em>" +
						"</span>" +
						"</td>" +
						"<td class='center'>" +
						"<span>" +
						"<em>" + element['inventory'] + "</em>" +
						"<i>辆</i>" +
						"</span>" +
						"</td>" +
						"<td class='center'>" + ChangeDateFormat(element['updatetime'].time) + "</td>" +
						"<td class='center'>" +
						"<a href='javascript:void(0)' title='恢复' onclick='recoverBicycle(" + element['bicycleid'] +
						")'><input class='btnStyle' type='button' value='恢复'></a>&nbsp;&nbsp;" +
						"<a href='javascript:void(0)' title='彻底删除' onclick='removeBicycle(" + element['bicycleid'] +
						")'><input class='btnStyle' type='button' value='彻底删除'></a>" +
						"</td>" +
						"</tr>";
				}
			})
			str += "</table>";
			//将表格添加到body中
			$('#productlistdel').html(str);
		} else {
			alert("未查询到任何信息！");
		}
	} else {
		alert("未查询到任何信息！");
	}
}

/**
 * 恢复自行车
 * @param {Object} BicycleId
 */
function recoverBicycle(BicycleId) {
	var json = {};
	json['bicycleid'] = BicycleId;
	json['delstate'] = 102;
	url = "delProduct";
	MySubmitString(JSON.stringify(json), url, function(data) {
		if (data != null) {
			if (data.msg == "ok") {
				alert("恢复成功！");
				queryAllBicycleByName();
				window.location.href="product_list.html";
			} else {
				alert("恢复失败！");
			}
		} else {
			alert("恢复失败！");
		}
	})
}

/**
 * 批量恢复自行车
 */
function recoverListBicycle() {
	var json = {};
	var str = "";
	$.each($('input:checkbox'), function() {
		if (this.checked) {
			str += $(this).val() + ";";
		}
	});
	json['bicycleids'] = str;
	json['delstate'] = 102;
	url = "delListProduct";
	MySubmitString(JSON.stringify(json), url, function(data) {
		if (data != null) {
			if (data.msg == "ok") {
				alert("批量恢复成功！");
				queryAllBicycleByName();
				window.location.href="product_list.html";
			} else {
				alert("批量恢复失败！");
			}
		} else {
			alert("批量恢复失败！");
		}
	})
}

/**
 * 彻底删除自行车
 * @param {Object} BicycleId
 */
function removeBicycle(BicycleId) {
	var json = {};
	json['bicycleid'] = BicycleId;
	json['delstate'] = -1;
	url = "delProduct";
	MySubmitString(JSON.stringify(json), url, function(data) {
		if (data != null) {
			if (data.msg == "ok") {
				alert("彻底删除成功！");
				queryAllBicycleByName();
				window.location.href="recycle_bin.html";
			} else {
				alert("彻底删除失败！");
			}
		} else {
			alert("彻底删除失败！");
		}
	})
}

/**
 * 批量彻底删除自行车
 * @param {Object} BicycleId
 */
function removeListBicycle() {
	var json = {};
	var str = "";
	$.each($('input:checkbox'), function() {
		if (this.checked) {
			str += $(this).val() + ";";
		}
	});
	json['bicycleids'] = str;
	json['delstate'] = -1;
	url = "delListProduct";
	MySubmitString(JSON.stringify(json), url, function(data) {
		if (data != null) {
			if (data.msg == "ok") {
				alert("批量彻底删除成功！");
				queryAllBicycleByName();
				window.location.href="recycle_bin.html";
			} else {
				alert("批量彻底删除失败！");
			}
		} else {
			alert("批量彻底删除失败！");
		}
	})
}

/**
 * 查询所有用户信息
 */
function queryAllUserMessage() {
	var json = {};
	json['pageIndex'] = "";
	if($("#likevalue").val()!=null&&$("#likevalue").val()!=''){
		if($("#userselect").val()=='username'){
			json['username'] = $("#likevalue").val();
		}
		else{
			json['username'] = "";
		}
		if($("#userselect").val()=='sex'){
			json['sex'] = $("#likevalue").val();
		}
		else{
			json['sex'] = "";
		}
		if($("#userselect").val()=='age'){
			json['age'] = $("#likevalue").val();
		}
		else{
			json['age'] = "";
		}
	}
	else{
		json['username'] = "";
		json['sex'] = "";
		json['age'] = "";
	}
	url = "queryAllUserList";
	MySubmitString(JSON.stringify(json), url, function(data) {
		if (data != null) {
			if (data.msg == "ok") {
				window.sessionStorage.setItem("alluser", JSON.stringify(data));
			} else {
				alert("未查询到任何数据！");
			}
		} else {
			alert("未查询到任何数据！");
		}
	})
}

/**
 * 渲染所有用户信息
 */
function getAllUsermessage() {
	var str = "";
	var my = window.sessionStorage.getItem("alluser");
	if (my != null && my != '') {
		var mydata = $.parseJSON(my);
		if (mydata.msg == "ok") {
			str += "<table class='list-style Interlaced'>" +
				"<tr>" +
				"	<th></th>" +
				"	<th>ID编号</th>" +
				"	<th>用户名</th>" +
				"	<th>年龄</th>" +
				"	<th>性别</th>" +
				"	<th>身份证号</th>" +
				"	<th>邮箱</th>" +
				"	<th>创建时间</th>" +
				"	<th>最后修改时间</th>" +
				"	<th>操作</th>" +
				"</tr>";
			//遍历数据
			var array = mydata.alluser;
			$.each(array, function(index, element) {
				if(element['delstate']>0){
					str += "<tr>" +
						"	<td>" +
						"		<span>" +
						"			<input type='checkbox' class='middle children-checkbox' value='" + element['userid'] + "'/>" +
						"		</span>" +
						"	</td>" +
						"	<td class='center'>" + (index + 1) + "</td>" +
						"	<td class='td-name center'>" +
						"		<span class='ellipsis td-name block'>" + element['name'] + "</span>" +
						"	</td>" +
						"	<td class='center'>" +
						"		<span>" +
						"			<em>" + element['age'] + "</em>" +
						"		</span>" +
						"	</td>" +
						"	<td class='center'>" +
						"		<span>" +
						"			<em>" + element['sex'] + "</em>" +
						"		</span>" +
						"	</td>" +
						"	<td class='center'>" +
						"		<span>" +
						"			<em>" + element['idnumber'] + "</em>" +
						"		</span>" +
						"	</td>" +
						"	<td class='center'>" +
						"		<span>" +
						"			<em>" + element['email'] + "</em>" +
						"		</span>" +
						"	</td>" +
						"	<td class='center'>" +
						"		<span>" +
						"			<em>" + ChangeDateFormat(element['createtime'].time) + "</em>" +
						"		</span>" +
						"	</td>" +
						"	<td class='center'>" +
						"		<span>" +
						"			<em>" + element['updatetime'] + "</em>" +
						"		</span>" +
						"	</td>" +
						"	<td class='center'>" +
						"		<a href='user_update.html' onclick='getUserUpdate(" + (index + 1) +
						")' title='编辑'><img src='images/icon_edit.gif' /></a>" +
						"		<a title='删除' class='mya' id='"+element['userid']+"'><img src='images/icon_drop.gif' /></a>" +
						"	</td>" +
						"</tr>";
				}
			})
			str += "</table>";
			$('#alluserlist').html(str);
		} else {
			alert("未查询到任何信息！");
		}
	} else {
		alert("未查询到任何信息！");
	}
}

/**
 * 模糊查询
 */
function queryUserMessageLike(){
	queryAllUserMessage();
	getAllUsermessage();
	window.location.href="user_list.html";
}

/**
 * 获取修改用户编号
 * @param {Object} UserNo
 */
function getUserUpdate(UserNo) {
	if (UserNo != null && UserNo != '') {
		window.sessionStorage.setItem("updateUserNo", UserNo);
	}
}

/**
 * 修改渲染用户详情回显
 */
function updateUserDetail() {
	var UserNo = window.sessionStorage.getItem("updateUserNo");
	var my = window.sessionStorage.getItem("alluser");
	if (my != null && my != '') {
		var mydata = $.parseJSON(my);
		if (mydata.msg == "ok") {
			if (UserNo != null && UserNo != '') {
				var array = mydata.alluser;
				$("#username").attr("value", array[UserNo - 1].name);
				$("#idnumber").attr("value", array[UserNo - 1].idnumber);
				$("#email").attr("value", array[UserNo - 1].email);
				$("#pwd").attr("value", array[UserNo - 1].password);
				$("#repwd").attr("value", array[UserNo - 1].password);
			}
		} else {
			alert("未查询到任何信息！");
		}
	} else {
		alert("未查询到任何信息！");
	}
}

/**
 * 修改用户信息
 */
function updateUser() {
	if($("#username").val()!=""&&$("#idnumber").val()!=""&&$("#email").val()!=""&&$("#pwd").val()!=""&&$("#repwd").val()!=""){
		var UserNo = window.sessionStorage.getItem("updateUserNo");
		var my = window.sessionStorage.getItem("alluser");
		var json = {};
		if (my != null && my != '') {
			var mydata = $.parseJSON(my);
			if (mydata.msg == "ok") {
				if (UserNo != null && UserNo != '') {
					var array = mydata.alluser;
					var flag = 0
					if($("#username").val()!=""&&$("#username").val()!=array[UserNo - 1].name){
						json['name'] = $("#username").val();
						flag+=1;
					}
					else{
						json['name'] = "";
					}
					if($("#idnumber").val()!=""&&$("#idnumber").val()!=array[UserNo - 1].idnumber){
						json['idnumber'] = $("#idnumber").val();
						flag+=1;
					}
					else{
						json['idnumber'] = "";
					}
					if($("#email").val()!=""&&$("#email").val()!=array[UserNo - 1].email){
						json['email'] = $("#email").val();
						flag+=1;
					}
					else{
						json['email'] = "";
					}
					if($("#pwd").val()!=array[UserNo - 1].password||$("#repwd").val()!=array[UserNo - 1].password){
						if($("#pwd").val()!=$("#repwd").val()){
							alert("两次密码不一致");
						}
						else{
							json['password'] = $("#pwd").val();
							flag+=1;
						}
					}
					else{
						json['password'] = "";
					}
					json['userstate'] = "";
					json['userid'] = array[UserNo - 1].userid;
					if(flag>0){
						url = "updateUser";
						MySubmitString(JSON.stringify(json), url, function(data) {
							if(data!=null&&data.msg=="ok"){
								queryAllUserMessage();
								getAllUsermessage();
								window.location.href="user_list.html";
								alert("用户信息修改成功！");
							}
							else{
								alert("用户信息修改失败！");
							}
						})
					}
				}
			} 
		} 
	}
}

/**
 * 修改用户状态（假删除）
 * @param {Object} userid
 */
$('body').on('click', '.mya', function() {
	var json = {};
	json['delstate'] = 0;
	json['userstate'] = 0;
	json['userid'] = $(this).attr("id");
	var url="setUserState";
	MySubmitString(JSON.stringify(json), url, function(data) {
		if(data!=null&&data.msg=="ok"){
			queryAllUserMessage();
			getAllUsermessage();
			window.location.href="user_list.html";
			alert("用户删除成功！");
		}
		else{
			alert("用户删除失败！");
		}
	})
})


/**
 * 批量修改用户状态（假删除）
 */
function setUserListStatus(){
	var json = {};
	var str = "";
	$.each($('input:checkbox'), function() {
		if (this.checked) {
			str += $(this).val() + ";";
		}
	});
	json['userids'] = str;
	json['delstate'] = 0;
	json['userstate'] = 0;
	url = "setUserListState";
	MySubmitString(JSON.stringify(json), url, function(data) {
		if (data != null) {
			if (data.msg == "ok") {
				alert("批量删除成功！");
				queryAllUserMessage();
				getAllUsermessage();
				window.location.href="user_list.html";
			} else {
				alert("批量删除失败！");
			}
		} else {
			alert("批量删除失败！");
		}
	})
}

/**
 * 恢复用户
 */
function recoverUser(userid){
	var json = {};
	json['delstate'] = 1;
	json['userstate'] = 1;
	json['userid'] = userid;
	var url="setUserState";
	MySubmitString(JSON.stringify(json), url, function(data) {
		if(data!=null&&data.msg=="ok"){
			queryAllUserMessage();
			getAllUsermessage();
			window.location.href="user_return.html";
			alert("用户恢复成功！");
		}
		else{
			alert("用户恢复失败！");
		}
	})
}

/**
 * 批量恢复用户
 */
function recoverListUser(){
	var json = {};
	var str = "";
	$.each($('input:checkbox'), function() {
		if (this.checked) {
			str += $(this).val() + ";";
		}
	});
	json['userids'] = str;
	json['delstate'] = 1;
	json['userstate'] = 1;
	url = "setUserListState";
	MySubmitString(JSON.stringify(json), url, function(data) {
		if (data != null) {
			if (data.msg == "ok") {
				alert("批量恢复成功！");
				queryAllUserMessage();
				getAllUsermessage();
				window.location.href="user_return.html";
			} else {
				alert("批量恢复失败！");
			}
		} else {
			alert("批量恢复失败！");
		}
	})
}

/**
 * 彻底删除用户
 * @param {Object} userid
 */
function delUser(userid){
	var json = {};
	json['userid'] = userid;
	var url="deleteUser";
	MySubmitString(JSON.stringify(json), url, function(data) {
		if(data!=null&&data.msg=="ok"){
			queryAllUserMessage();
			getAllUsermessage();
			window.location.href="user_return.html";
			alert("成功彻底删除用户！");
		}
		else{
			alert("彻底删除用户失败！");
		}
	})
}

/**
 * 批量彻底删除用户
 */
function delListUser(){
	var json = {};
	var str = "";
	$.each($('input:checkbox'), function() {
		if (this.checked) {
			str += $(this).val() + ";";
		}
	});
	json['userids'] = str;
	url = "deleteListUser";
	MySubmitString(JSON.stringify(json), url, function(data) {
		if (data != null) {
			if (data.msg == "ok") {
				alert("批量彻底删除成功！");
				queryAllUserMessage();
				getAllUsermessage();
				window.location.href="user_return.html";
			} else {
				alert("批量彻底删除失败！");
			}
		} else {
			alert("批量彻底删除失败！");
		}
	})
}

/**
 * 
 */
/**
 * 渲染所有用户信息
 */
function getAllDelUsermessage() {
	var str = "";
	var my = window.sessionStorage.getItem("alluser");
	if (my != null && my != '') {
		var mydata = $.parseJSON(my);
		if (mydata.msg == "ok") {
			str += "<table class='list-style Interlaced'>" +
				"<tr>" +
				"	<th></th>" +
				"	<th>ID编号</th>" +
				"	<th>用户名</th>" +
				"	<th>年龄</th>" +
				"	<th>性别</th>" +
				"	<th>身份证号</th>" +
				"	<th>邮箱</th>" +
				"	<th>删除时间</th>" +
				"	<th>操作</th>" +
				"</tr>";
			//遍历数据
			var array = mydata.alluser;
			$.each(array, function(index, element) {
				if(element['delstate']==0){
					str += "<tr>" +
						"	<td>" +
						"		<span>" +
						"			<input type='checkbox' class='middle children-checkbox' value='" + element['userid'] + "'/>" +
						"		</span>" +
						"	</td>" +
						"	<td class='center'>" + (index + 1) + "</td>" +
						"	<td class='td-name center'>" +
						"		<span class='ellipsis td-name block'>" + element['name'] + "</span>" +
						"	</td>" +
						"	<td class='center'>" +
						"		<span>" +
						"			<em>" + element['age'] + "</em>" +
						"		</span>" +
						"	</td>" +
						"	<td class='center'>" +
						"		<span>" +
						"			<em>" + element['sex'] + "</em>" +
						"		</span>" +
						"	</td>" +
						"	<td class='center'>" +
						"		<span>" +
						"			<em>" + element['idnumber'] + "</em>" +
						"		</span>" +
						"	</td>" +
						"	<td class='center'>" +
						"		<span>" +
						"			<em>" + element['email'] + "</em>" +
						"		</span>" +
						"	</td>" +
						"	<td class='center'>" +
						"		<span>" +
						"			<em>" + element['updatetime'] + "</em>" +
						"		</span>" +
						"	</td>" +
						"	<td class='center'>" +
						"		<input type='button' value='彻底删除' onclick='delUser(" + element['userid'] + ")'/>" +
						"		<input type='button' value='恢复' onclick='recoverUser(" + element['userid'] + ")'/>" +
						"	</td>" +
						"</tr>";
				}
			})
			str += "</table>";
			$('#alldeluserlist').html(str);
		} else {
			alert("未查询到任何信息！");
		}
	} else {
		alert("未查询到任何信息！");
	}
}

function insertUser(){
	if($("#username").val()!=""&&$("#idnumber").val()!=""&&$("#email").val()!=""&&$("#pwd").val()!=""&&$("#repwd").val()!=""){
		var UserNo = window.sessionStorage.getItem("updateUserNo");
		var my = window.sessionStorage.getItem("alluser");
		var json = {};
		if (my != null && my != '') {
			var mydata = $.parseJSON(my);
			if (mydata.msg == "ok") {
				if (UserNo != null && UserNo != '') {
					var array = mydata.alluser;
					var flag = 0
					if($("#username").val()!=""){
						json['name'] = $("#username").val();
						flag+=1;
					}
					else{
						json['name'] = "";
					}
					if($("#idnumber").val()!=""){
						json['idnumber'] = $("#idnumber").val();
						flag+=1;
					}
					else{
						json['idnumber'] = "";
					}
					if($("#email").val()!=""){
						json['email'] = $("#email").val();
						flag+=1;
					}
					else{
						json['email'] = "";
					}
					if($("#pwd").val()!=$("#repwd").val()){
						alert("两次密码不一致");
					}
					else{
						json['password'] = $("#pwd").val();
						flag+=1;
					}
					if(flag>0){
						url = "insertUser";
						MySubmitString(JSON.stringify(json), url, function(data) {
							if(data!=null&&data.msg=="ok"){
								queryAllUserMessage();
								getAllUsermessage();
								window.location.href="user_list.html";
								alert("用户信息添加成功！");
							}
							else if(data!=null&&data.msg=="no_3"){
								alert("该邮箱已被注册，请更换！");
							}
							else{
								alert("用户信息添加失败！");
							}
						})
					}
				}
			} 
		} 
	}
}

/**
 * 管理员登录
 */
function managerLogin(){
	if($("#name").val()!=null&&$("#name").val()!=''&&$("#password").val()!=null&&$("#password").val()!=''){
		var json = {};
		json['name'] = $("#name").val();
		json['password'] = $("#password").val();
		var url = "managerLogin";
		MySubmitString(JSON.stringify(json), url, function(data) {
			if(data!=null&&data.msg=="ok"){
				$.cookie("managerjson", JSON.stringify(data), { path : "/" });
				window.location.href="index.html";
			}
			else{
				alert("用户名或密码错误！");
			}
		})
	}
}
