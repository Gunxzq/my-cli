#!/usr/bin/env node

import chalk from 'chalk';
import { program } from 'commander';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import questions from '../questions.js';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import actionsConfig from '../template-config.js';
import ejs from 'ejs';
const __dirname = dirname(fileURLToPath(import.meta.url));
import npmDev from './dep.js';
import generateMarkdown from './tree.js';

program.command('1.0.0').description('一个自用的组合式模板脚手架');

program
  .command('create <project-name>')
  .description('Create new project')
  .action(async projectName => {
    console.log(chalk.green(`Creating project:${projectName}`));

    const state = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: `Are you sure to create this project named${projectName}`,
        default: true,
      },
    ]);
    if (state.confirm) {
      const answers = await inquirer.prompt(questions);
      await fs.ensureDir(projectName);

      //模板目录
      let templateDir = path.resolve(__dirname, '..', 'templates');

      // 项目目录
      let projectDir = path.resolve(process.cwd(), projectName);

      // 复制基础模板到项目目录
      fs.copySync(path.join(templateDir, 'base'), projectDir);

      // gun-cli create tess
      //获取选项对象
      let optionObj = {};
      Object.keys(answers).forEach(key => {
        let keyName = answers[key];
        let keyValue = actionsConfig[keyName];
        let obj = {};
        optionObj[keyName] = keyValue;
      });

      // 获取对应的action
      let result = Object.keys(optionObj)
        .map(key => {
          if (!optionObj[key] || !optionObj[key].fielsToAdd) {
            return null;
          }
          return optionObj[key].fielsToAdd;
        })
        .filter(action => action);

      //执行文件action
      result.forEach(action => {
        action.forEach(item => {
          const { path: filePath, action: fileAction, content, source } = item;
          const targetPath = path.join(projectDir, filePath);
          switch (fileAction) {
            case 'mkdir':
              fs.ensureDirSync(targetPath);
              break;
            case 'copy':
              const sourcePath = path.join(templateDir, source);
              // 处理ejs模板文件
              if (sourcePath.endsWith('.ejs')) {
                // 渲染模板
                answers.projectName = projectName;
                const rendered = ejs.render(fs.readFileSync(sourcePath).toString('utf-8'), answers);
                fs.writeFileSync(targetPath.replace('.ejs', ''), rendered, 'utf-8');
              } else {
                fs.copySync(sourcePath, targetPath);
              }
              break;
            case 'append':
              break;
            default:
              break;
          }
        });
      });
      // 所有的依赖确定，最终渲染package.json
      const rendered = ejs.render(
        fs.readFileSync(path.join(templateDir, 'package.json.ejs')).toString('utf-8'),
        answers,
      );
      fs.writeFileSync(path.join(projectDir, 'package.json'), rendered, 'utf-8');

      // 处理依赖
      const packageJsonPath = path.join(path.join(projectDir, 'package.json'));

      let data = fs.readFileSync(packageJsonPath, 'utf-8');

      //
      let packageJsonData = npmDev(data, optionObj);
      console.log(chalk.red(JSON.stringify(packageJsonData, null, 2)));
      fs.writeFileSync(
        path.join(projectDir, 'package.json'),
        JSON.stringify(packageJsonData),
        'utf-8',
      );
      // // 安装依赖
      // npm.install(packageJsonData, {
      //   cwd: projectDir,
      // });

      console.log(chalk.blue(`Project ${projectName}creation successful!`));
      console.log(chalk.blue(`cd ${projectName}`));
      generateMarkdown(projectDir).then(markdown => {
        fs.writeFileSync(path.join(projectDir, 'TREEVIEW.md'), markdown);
        console.log(chalk.red('目录结构.md已生成'));
      });
    } else {
      console.log(chalk.red('Project creation canceled.'));
      return;
    }
  });

program.parse(process.argv);
