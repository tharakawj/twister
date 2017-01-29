import webpack from 'webpack';
import webpackConfig from '../config/webpack.config.prod';
import chalk from 'chalk';
import fs from 'fs-extra';
import paths from '../config/paths';

console.log(chalk.blue('Generating minfied bundle for production via webpack. This will take a moment...'));

// Print out errors
function printErrors(summary, errors) {
  console.log(summary);
  console.log();
  errors.forEach(err => {
    console.log(err.message || err);
    console.log();
  });
}

function build(){
  webpack(webpackConfig).run((err, stats) => {
    if (err) {
      printErrors(chalk.red('Failed to compile.'), [err]);
      process.exit(1);
    }

    if (stats.compilation.errors.length) {
      printErrors(chalk.red('Compilation errors:'), stats.compilation.errors);
      process.exit(1);
    }

    if (stats.compilation.warnings.length) {
      printErrors(chalk.yellow('Compilation warnings:'), stats.compilation.warnings);
      process.exit(1);
    }

    console.log(chalk.green('Compiled successfully!'));
    console.log();

    return 0;
  });
}

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml
  });
}

// Remove all content but keep the directory so that
// if you're in it, you don't end up in Trash
fs.emptyDirSync(paths.build);
build();
copyPublicFolder();