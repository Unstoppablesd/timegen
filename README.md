# timegen · Wavecraft Studio

面向 FPGA 工程说明的事件级时序图工作台。浏览器本机保存，无后端服务和第三方运行依赖。

## 本地开发

```text
node scripts/build.cjs
node tests/core.cjs
node scripts/serve.cjs
```

打开 http://127.0.0.1:8765。也可以直接在浏览器打开仓库根目录的 `Wavecraft.html` 离线使用。

`src/` 为可维护源码；`dist/` 为静态托管文件；`scripts/` 包含构建与本地预览工具；`tests/` 为事件模型及编辑检查。无需 npm install。

## 本地版本

`studio-v3.0` 为本轮优化前的已部署基线。Git 使用运行环境提供的程序，不要求另行安装。提交到本地与推送远端是独立操作。

`studio-v3.1` 对应工作台优化，详情见 CHANGELOG.md。GitHub 源码版本与 Cloudflare 已部署版本独立管理；推送源码不会自动更新采用手工上传方式部署的 Cloudflare 站点。

常用操作：Ctrl K 打开快捷操作，M 显示 A/B 游标，F 适配时间轴；空格拖动平移，Ctrl + 滚轮缩放。右上「主题」可自定义外观。

## 使用范围

协议模板为可编辑设计示意，不执行 RTL 或物理层合规验证。工程库和主题保存在浏览器本机；请下载 JSON 做长期备份。

代码为独立实现，没有包含 TimeGen 源码、图标、素材或专有格式。本仓库不作完整的第三方知识产权审查或商标可用性保证。

## 静态部署

将 `dist/` 内的文件上传到 Cloudflare Pages 等静态托管平台。部署前运行构建与测试；无需安装依赖，也不需要服务器或数据库。
