import chalk from 'chalk';
export default (data, optionObj) => {
  let packageJson = JSON.parse(data);

  let depsToAdd = {
    scripts: {},
    dependencies: {},
    devDependencies: {},
  };

  let argsObj = {};

  Object.keys(optionObj).forEach(key => {
    if (!optionObj[key]) return;
    let result = optionObj[key].value(argsObj);
    // value函数会返回一个对象，只需要将它合并即可
    argsObj = Object.assign(argsObj, result);

    if (optionObj[key].type === 'dependencies') {
      depsToAdd.dependencies = Object.assign(depsToAdd.dependencies, result);
    } else {
      depsToAdd.devDependencies = Object.assign(depsToAdd.devDependencies, result);
    }
    if (optionObj[key].script) {
      let script = optionObj[key].script();
      depsToAdd.script = Object.assign(depsToAdd.script, script);
    }
  });

  //合并依赖项
  packageJson = {
    ...packageJson,
    ...depsToAdd,
  };

  return packageJson;
};
