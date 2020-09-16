var photolength = 0;
var photolengthone = 0;
/**
 * 上传多张图片
 */

$(document).ready(function() {
	//为外面的盒子绑定一个点击事件
	$("#chanpinzhutu").click(function() {
		/*
		1、先获取input标签
		2、给input标签绑定change事件
		3、把图片回显
		 */
		//            1、先回去input标签
		var $input = $("#chanpinzhutu");
		console.log($input)
		//            2、给input标签绑定change事件
		$input.on("change", function() {
			console.log(this)
			//补充说明：因为我们给input标签设置multiple属性，因此一次可以上传多个文件
			//获取选择图片的个数
			var files = this.files;
			var length = files.length;
			console.log("选择了" + length + "张图片");
			photolength += length;
			if (photolength > 5) {
				photolength -= length;
				alert("最多选择5张图片！")
			} else {
				//3、回显
				$.each(files, function(key, value) {
					//每次都只会遍历一个图片数据
					var div = document.createElement("div"),
						img = document.createElement("img");
					div.className = "pic";

					var fr = new FileReader();
					fr.onload = function() {
						img.src = this.result;
						div.appendChild(img);
						// document.body.appendChild(div);
						document.getElementById("photos").appendChild(div);
					}
					fr.readAsDataURL(value);

				})
			}
		})

		//4、我们把当前input标签的id属性remove
		$input.removeAttr("id");
		//我们做个标记，再class中再添加一个类名就叫test
		var newInput = '<input  class="hide" type="file" name="chanpinzhutu" multiple id="chanpinzhutu">';
		$(this).append($(newInput));

	})

})
/**
 * 上传单张图
 */
$(document).ready(function() {
	//为外面的盒子绑定一个点击事件
	$("#suoluetu").click(function() {
		/*
		1、先获取input标签
		2、给input标签绑定change事件
		3、把图片回显
		 */
		//1、先回去input标签
		var $input = $("#suoluetu");
		console.log($input)
		//2、给input标签绑定change事件
		$input.on("change", function() {
			console.log(this)
			//补充说明：因为我们给input标签设置multiple属性，因此一次可以上传多个文件
			//获取选择图片的个数
			var files = this.files;
			var length = files.length;
			console.log("选择了" + length + "张图片");
			photolengthone += length;
			if (photolengthone > 1) {
				photolengthone -= length;
				alert("最多选择1张图片！")
			} 
			else {
				//3、回显
				$.each(files, function(key, value) {
					//每次都只会遍历一个图片数据
					var div = document.createElement("div"),
						img = document.createElement("img");
					div.className = "onepic";

					var fr = new FileReader();
					fr.onload = function() {
						img.src = this.result;
						div.appendChild(img);
						// document.body.appendChild(div);
						document.getElementById("onephoto").append(div);
					}
					fr.readAsDataURL(value);

				})
			}

			//4、我们把当前input标签的id属性remove
			$input.removeAttr("id");
			//我们做个标记，再class中再添加一个类名就叫test
			var newInput = '<input type="file" name="suoluetu" id="suoluetu">';
			$(this).append($(newInput));

		})
	})
})
