<!-- eslint-disable -->
<template>
  <main>
    <el-dialog
      :title="downTemplateData.handleName|| '合同查询'"
      :visible.sync="iframe.show"
      fullscreen="true"
      center
      @close="close()"
    >
      <iframe
        width="100%"
        height="600px"
        frameborder="0"
        :src="iframe.src"
      ></iframe>
    </el-dialog>
    <div v-if="showLoading">
      <div class="loader">
        <div class="loader-inner">
          <div class="text">小贷君正在为您拼命处理中，请稍候~~~~</div>
          <div class="loader-line-wrap">
            <div class="loader-line"></div>
          </div>
          <div class="loader-line-wrap">
            <div class="loader-line"></div>
          </div>
          <div class="loader-line-wrap">
            <div class="loader-line"></div>
          </div>
          <div class="loader-line-wrap">
            <div class="loader-line"></div>
          </div>
          <div class="loader-line-wrap">
            <div class="loader-line"></div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { blobAjax } from '@/utils/'
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {
        }
      }
    }
  },
  data() {
    return {
      iframe: {
        show: false,
        src: ''
      },
      downTemplateData: {},
      blob: null,
      showLoading: false
    }
  },
  watch: {
    'data'(n) {
      if (n) {
        this.downTemplateData = n
        this.init()
      }
    }
  },

  methods: {
    /*
     * 对后台返回的文件流进行处理，
     */
    init() {
      const downTemplateData = this.downTemplateData
      if (Object.keys(downTemplateData).length === 0) {
        console.error('downTemplateData没有任何数据')
        return
      }
      this.showLoading = true
      // 设置一些默认值, 默认为pdf文件的下载处理
      downTemplateData.fileType = downTemplateData.fileType || 'pdf'
      downTemplateData.handleType = downTemplateData.handleType || 'download'
      // TODO  下面的处理是自己封装了一个ajax，感觉有点你鸡肋，其实可以使用 axios 自带的处理方式就可以了，有时间再改把，如果还记得的话。😄
      // this.$http({
      //     contentType: false,
      //     processData: false,
      //     responseType: 'blob',
      //     url: downTemplateData.params.url,
      //     params: downTemplateData.params.data
      // }).then((res) => {
      //     console.log(res)
      //     //生成可以直接访问的本地地址
      //     var src = URL.createObjectURL(res.data);
      //     可以直接去下载这个地址就可以了
      //     console.log(src)
      // }).catch((err) => {
      //     this.$message.error(err.errorDesc)
      // })
      console.log(downTemplateData.params)
      blobAjax(downTemplateData.params).then((res) => {
        console.log('走到成功的方法了')
        // 值为空的时候直接提示没货
        if (res.size <= 0) {
          this.showLoading = false
          this.$message.error('后台返回数据为空,不能下载！')
          return
        } else if (res.type === 'application/json') {
          // fileReader 读取blob 格式，主要是为了做没有权限的处理, 没有权限的时候给个提示
          const reader = new FileReader()
          reader.onload = (event) => {
            this.showLoading = false
            console.log(event)
            const errorDesc = JSON.parse(reader.result).errorDesc || '服务器异常'
            this.$message.error(errorDesc)
          }
          reader.readAsText(res)
          return
        }
        const blob = window.URL.createObjectURL(res)
        this.blob = blob
        // 现在默认下载是download的处理方式
        if (downTemplateData.handleType !== 'see') {
          const body = document.querySelector('body')
          const a = document.createElement('a')
          const downName = downTemplateData.handleName || '_xiaodai_'
          if (downName.indexOf('账单')) {
            // a.download = downName + '_' + (this.$store.getters.userInfo.unitCode || '') + '_' + new Date().toLocaleString().substring(0, 10) + '_' + Math.random().toString(36).substr(2, 10) + '.' + downTemplateData.fileType
            a.download = (this.$store.getters.userInfo.unitName || '') + '_' + downName + '_' + new Date().toLocaleString().substring(0, 10) + '.' + downTemplateData.fileType
          } else {
            a.download = downName + '_' + Math.random().toString(36).substr(2, 10) + '.' + downTemplateData.fileType
          }
          a.href = blob
          a.id = 'qqqq'
          // 兼容火狐的写法，不兼容IE，好在公司不需要兼容IE 😄😄
          body.appendChild(a)
          a.click()
          this.showLoading = false
          body.removeChild(a)
          window.URL.revokeObjectURL(blob)
        } else {
          this.iframe.src = blob
          this.showLoading = false
          this.iframe.show = true
        }
      }).catch((err) => {
        this.showLoading = false
        console.log(err)
        console.log('走了失败的方法！！！！')
      })
    },
    /*
     * 关闭的时候，释放blob对象
     */
    close() {
      this.blob && window.URL.revokeObjectURL(this.blob)
    }
  }
}
</script>

<style>
.loader {
  background: #000;
  background: radial-gradient(#222, #000);
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 99999;
}

.loader-inner {
  bottom: 0;
  height: 60px;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 100px;
}

.loader-line-wrap {
  animation: spin 2000ms cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
  box-sizing: border-box;
  height: 50px;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  transform-origin: 50% 100%;
  width: 100px;
}
.loader-line {
  border: 4px solid transparent;
  border-radius: 100%;
  box-sizing: border-box;
  height: 100px;
  left: 0;
  margin: 0 auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 100px;
}
.loader-line-wrap:nth-child(1) {
  animation-delay: -50ms;
}
.loader-line-wrap:nth-child(2) {
  animation-delay: -100ms;
}
.loader-line-wrap:nth-child(3) {
  animation-delay: -150ms;
}
.loader-line-wrap:nth-child(4) {
  animation-delay: -200ms;
}
.loader-line-wrap:nth-child(5) {
  animation-delay: -250ms;
}

.loader-line-wrap:nth-child(1) .loader-line {
  border-color: hsl(0, 80%, 60%);
  height: 90px;
  width: 90px;
  top: 7px;
}
.loader-line-wrap:nth-child(2) .loader-line {
  border-color: hsl(60, 80%, 60%);
  height: 76px;
  width: 76px;
  top: 14px;
}
.loader-line-wrap:nth-child(3) .loader-line {
  border-color: hsl(120, 80%, 60%);
  height: 62px;
  width: 62px;
  top: 21px;
}
.loader-line-wrap:nth-child(4) .loader-line {
  border-color: hsl(180, 80%, 60%);
  height: 48px;
  width: 48px;
  top: 28px;
}
.loader-line-wrap:nth-child(5) .loader-line {
  border-color: hsl(240, 80%, 60%);
  height: 34px;
  width: 34px;
  top: 35px;
}

@keyframes spin {
  0%,
  15% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.text {
  position: absolute;
  top: -100px;
  left: -100px;
  color: #fff;
  width: 300px;
  margin: 15px;
  /* animation: 0.2s move linear infinite alternate; */
  -webkit-transition: margin 0.5s ease-out;
  -moz-transition: margin 0.5s ease-out;
  -o-transition: margin 0.5s ease-out;
}
</style>

