# Wavecraft Studio

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

`studio-v3.1` 对应本轮工作台优化，详情见 CHANGELOG.md。本轮保留本地提交；线上 Cloudflare 版本与本地文件应分开确认。

运行环境提供的 Git 位于：

```text
C:\Users\wilson\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\cmd\git.exe
```

常用操作：Ctrl K 打开快捷操作，M 显示 A/B 游标，F 适配时间轴；空格拖动平移，Ctrl + 滚轮缩放。右上「主题」可自定义外观。

## 使用范围

协议模板为可编辑设计示意，不执行 RTL 或物理层合规验证。工程库和主题保存在浏览器本机；请下载 JSON 做长期备份。

代码为独立实现，没有包含 TimeGen 源码、图标、素材或专有格式。本仓库不作完整的第三方知识产权审查或商标可用性保证。
