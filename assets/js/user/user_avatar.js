  $(function() {
      var layer = layui.layer;
      // 1.1 获取裁剪区域的 DOM 元素
      var $image = $('#image')
          // 1.2 配置选项
      const options = {
          // 纵横比
          aspectRatio: 1,
          // 指定预览区域
          preview: '.img-preview'
      }

      // 1.3 创建裁剪区域
      $image.cropper(options)
      $("#btnfile").on("click", function() {
          $("#file").click();
      })
      $("#file").on("change", function(e) {
              var filelist = e.target.files;
              if (filelist.length == 0) {
                  layer.msg("请选择图片！")
                  return;
              }
              //拿到文件
              var file = e.target.files[0];
              //将文件转化为路径
              var imgurl = URL.createObjectURL(file);
              //重新初始化裁剪区
              $image
                  .cropper('destroy') // 销毁旧的裁剪区域
                  .attr('src', imgurl) // 重新设置图片路径
                  .cropper(options) // 重新初始化裁剪区域
          })
          //确定按钮上传文件
      $("#btnupload").on("click", function() {
          //拿到用户裁剪后的图像

          var dataURL = $image
              .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                  width: 100,
                  height: 100
              })
              .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

          //发起请求
          $.ajax({
              method: "post",
              url: "http://ajax.frontend.itheima.net/my/update/avatar",
              data: { avatar: dataURL },
              headers: { Authorization: localStorage.getItem("token") || "" },
              success: function(res) {
                  console.log(res);
                  if (res.status == 0) {
                      layer.msg("头像更换成功！");
                      window.parent.getuserinfo();
                  }
              }
          })
      })
  })