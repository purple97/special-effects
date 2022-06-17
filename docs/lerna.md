## Lerna 基本使用方式

### 使用lerna的基本工作流

#### 环境配置

Git 在一个lerna工程里，是通过git来进行代码管理的。所以你首先要确保本地有正确的git环境。 如果需要多人协作开发，请先创建正确的git中心仓库的链接。 因此需要你了解基本的git操作，在此不再赘述。
npm仓库 无论你管理的package是要发布到官网还是公司的私有服务器上，都需要正确的仓库地址和用户名。 你可运行下方的命令来检查，本地的npm registry地址是否正确。

```sh
$ npm config ls
```

#### 初始化一个lerna工程

在本地目录下初始化一个lerna工程。
1、创建一个空的文件夹，命名为my-app：

```sh
$ mkdir my-app
```

2、初始化 通过cmd进入相关目录，进行初始化

```sh
$ lerna init
```

3、添加一个测试package
默认情况下，package是放在packages目录下的。但是自己想做一个组件库，改为了components

4、安装各packages依赖 这一步操作，官网上是这样描述的
在当前的Lerna仓库中引导包。安装所有依赖项并链接任何交叉依赖项。

```sh
$ lerna bootstrap
```

5、发布 在发布的时候，就需要git工具的配合了。 所以在发布之前，请确认此时该lerna工程是否已经连接到git的远程仓库。你可以执行下面的命令进行查看。本篇文章的代码托管在Github上。因此会显示此远程链接信息。 如果你还没有与远程仓库链接，请首先在github创建一个空的仓库，然后根据相关提示信息，进行链接。

#### 第一次publish前我们需要执行

```sh
$ npm login --registry=https://registry.npmjs.org
```

在输入用户名及密码之后执行这条命令

```sh
$ lerna publish
```

你就可以根据cmd中的提示，一步步的发布packges了。
实际上在执行该条命令的时候，lerna会做很多的工作。

---



### 为所有项目安装依赖，类似于 npm/yarn i

```sh
$ lerna bootstap
```

-   提交对项目的更新 运行该命令会执行如下的步骤：
    -   运行 lerna updated 来决定哪一个包需要被 publish
    -   如果有必要，将会更新 lerna.json 中的 version
    -   将所有更新过的的包中的 package.json 的 version 字段更新
    -   将所有更新过的包中的依赖更新
    -   为新版本创建一个 git commit 或 tag
    -   将包 publish 到 npm 上

```sh
$ lerna publish # 用于发布更新
$ lerna publish --skip-git # 不会创建git commit或tag
$ lerna publish --skip-npm # 不会把包publish到npm上
```

### 使用lerna 初始化项目
```sh
$ lerna init # 固定模式(Fixed mode)默认为固定模式，packages下的所有包共用一个版本号(version)
$ lerna init --independent # 独立模式(Independent mode)，每一个包有一个独立的版本号
```

### 为packages文件夹下的package安装依赖
```sh
$ lerna add <package>[@version] [--dev] # 命令签名

# 例如
$ lerna add module-1 --scope=module-2 # 将 module-1 安装到 module-2
$ lerna add module-1 --scope=module-2 --dev # 将 module-1 安装到 module-2 的 devDependencies 下
$ lerna add module-1 # 将 module-1 安装到除 module-1 以外的所有模块
$ lerna add babel-core # 将 babel-core 安装到所有模块
```

### 卸载依赖

```sh
$ lerna exec -- <command> [..args] # 在所有包中运行该命令

# 例如
$ lerna exec --scope=npm-list  yarn remove listr # 将 npm-list 包下的 listr 卸载
$ lerna exec -- yarn remove listr # 将所有包下的 listr 卸载
```

### 比对包是否发生过变更

```sh
$ lerna updated
# 或
$ lerna diff
```

### 显示packages下的各个package的version

```sh
$ lerna ls
```

### 清理node_modules

```sh
$ lerna clean
```


### lerna run

```sh
$ lerna run <script> -- [..args] # 在所有包下运行指定

# 例如
$ lerna run test # 运行所有包的 test 命令
$ lerna run build # 运行所有包的 build 命令
$ lerna run --parallel watch # 观看所有包并在更改时发报，流式处理前缀输出

$ lerna run --scope my-component test # 运行 my-component 模块下的 test
```

### lerna.json解析

```json
{
  "packages": [
    "components/*"
  ],
  "version": "independent",
  "npmClient": "yarn",
  "useWorkspaces": true,
  "command": {
    "bootstrap": {
      "ignore": "",
      "npmClientArgs": ""
    },
    "publish": {
      "ignoreChanges": [
        "ignored-file",
        "*.md"
      ]
    }
  }
}
```
- version：当前库的版本
- useWorkspaces: 是否使用workspace来管理依赖
- npmClient： 允许指定命令使用的client， 默认是 npm， 可以设置成 yarn
- command.publish.ignoreChanges：可以指定那些目录或者文件的变更不会被publish
- command.bootstrap.ignore：指定不受 bootstrap 命令影响的包
- command.bootstrap.npmClientArgs：指定默认传给 lerna bootstrap 命令的参数
- command.bootstrap.scope：指定那些包会受 lerna bootstrap 命令影响
- packages：指定包所在的目录
