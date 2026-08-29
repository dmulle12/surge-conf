# Surge 5 iOS 配置仓库

维护 Surge 5 (iOS/macOS) 的主配置、远程模块与规则集,通过 GitHub 托管实现版本化管理。

## 目录结构

```
.
├── Surge.conf              # 主配置(在 Surge 中使用下方 URL 导入)
├── Modules/                # 远程模块 (.sgmodule)
│   ├── General.sgmodule    #   通用设置
│   ├── ADBlock.sgmodule    #   广告拦截(重写规则)
│   ├── Sub-Store.sgmodule  #   Sub-Store 订阅管理
│   ├── Panel.sgmodule      #   网络信息面板
│   └── Flush.sgmodule      #   DNS 缓存清理
├── Rules/                  # 远程规则集 (.list)
│   ├── Direct.list         #   直连
│   ├── Proxy.list          #   代理
│   ├── Reject.list         #   广告拦截
│   └── Apple.list          #   Apple 服务
└── Scripts/                # JS 脚本
    ├── network-info.js     #   面板脚本
    └── flush-dns.js        #   DNS 刷新
```

## 使用方法

### 1. 导入主配置

将以下地址填入 Surge → 配置 → 配置文件 → 从 URL 下载(把 `gleichners` 替换为你的 GitHub 用户名):

```
https://raw.githubusercontent.com/gleichners/surge-conf/main/Surge.conf
```

### 2. 安装模块

Surge → 模块 → 从 URL 安装,例如广告拦截:

```
https://raw.githubusercontent.com/gleichners/surge-conf/main/Modules/ADBlock.sgmodule
```

### 3. 策略组

主配置的 `[Rule]` 中引用了 `REJECT / DIRECT / Apple / Proxy` 等策略,请在 Surge 中创建对应策略组(或使用 `DIRECT` 内置策略替代)。机场节点请自行在 `[Proxy]` 段或策略组中添加,**不要把订阅地址提交到仓库**。

## 维护说明

- 规则文件每行一条规则,`#` 开头为注释;修改后 Surge 会自动拉取最新版本(可在配置页面点击"更新")
- 模块文件必须包含 `#!name` 和 `#!desc` 头部
- 提交前检查是否泄露订阅链接、机场域名、个人 Hosts
- 若仓库为 private,raw.githubusercontent.com 在 Surge 端可能无法匿名拉取,建议使用 GitHub Pages 或保持 public

## 安全提醒

- `.gitignore` 已排除 `*.local.conf`、`secrets/` 等敏感文件
- 主配置中不要出现真实的订阅 URL;如需保存,使用 `private/` 目录(已被忽略)
- 建议使用私有仓库 + Surge 的 Header Authorization,或将敏感内容留在本地

## License

[MIT](LICENSE)
