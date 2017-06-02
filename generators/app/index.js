'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the super ' + chalk.red('generator-cst-ui-seed') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'Enter your preferred project name?',
      default: this.appname
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.projectName = props.projectName;
    });
  }

 writing() {
    this._writingPackageJSON();
    this._webpackCommonJS();
  }

  _writingPackageJSON() {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        projectName: this.projectName,
      }
    );
  }
  _webpackCommonJS() {
    this.fs.copyTpl(
      this.templatePath('webpack.common.js'),
      this.destinationPath('config/webpack.common.js'),
      {
        projectName: this.projectName,
      }
    );
  }

  install() {
   // this.installDependencies();
  }
};
