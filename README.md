# **组合式模板脚手架**

2/27/2:34 花费一天初步完成

## **项目概述**

一个源于奇思妙想的命令行脚手架，不仅仅只能搭建前端框架，他的行为完全由自定义配置决定。
他不存在 vue-axios-vite 这种固定模板，他是 framework+httpLibrary+bunder。

```
npm i gun-cli _g

他不存在 vue-axios-vite 这种固定模板，他是 framework+httpLibrary+bundler。

```
npm i gun-cli -g
```

## **特点**

1. 组合式：将模板组合起来，如果使用**Pinia**，按照配置会帮你在 main.js 中自动引入。
2. 自动相关依赖收集：将可能安装额外依赖的选择和配置排在后面，例如使用 vite 的 vue 项目，根据配置，他会自动为**package.json**中加入 **@vitejs/plugin-vue**。

## **工作流程**

1. 根目录下的**question.js**,定义了命令行会询问的问题，问题的顺序是不能改变的。
2. 根目录下的**template-config.js**，定义了上一步问题结果的对应选项的行为。
3. 操作会根据选项，从**template-config.js**抽离出来，并依次执行，完成目录创建，文件写入等。
4. **package.json**是最后写入的，因为依赖是最后确定完全的。

## **自定义配置**

需要特别注意的地方是，**question.js**中定义的选项必须与**template-config.js**中的同名。

## **问题**

我只完成了最核心的内容，它并不像其他脚手架一样规范。没有考虑 TS,过于依赖 ejs 实现的动态渲染。
由于使用 ejs 的问题，模板之间互相依赖，如果想使用某个依赖并自动完成**main.js**的引入，就不得不在那个**main.js**写入相应的判断。

事实上我已经想出办法：

1. 根据正则匹配寻找插入位置，在将其写回。
2. 将语言作为首选项，在文件操作中，根据这个选项来决定文件的后缀修改。或在**template-config.js**的操作对象写为一个函数，使用模板字符串来完成。
3. 至于没有类型标注，搭建完成后自行修改吧。
