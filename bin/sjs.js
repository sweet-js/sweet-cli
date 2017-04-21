#!/usr/bin/env node

var argv = require('yargs')
  .usage('Usage: sjs [options] files ...')
  .demand(1)
  .alias('o', 'out-file')
  .alias('d', 'out-dir')
  .alias('b', 'no-babel')
  .describe('b', 'do not use babel backend')
  .describe('o', 'write output to file')
  .describe('d', 'write output to directory')
  .nargs('out-file', 1)
  .nargs('out-dir', 1)
  .help('h')
  .alias('h', 'help')
  .argv;

var path = require('path');
var fs   = require('fs');
var compile = require('sweet.js').compile;
var NodeLoader = require('sweet.js/dist/node-loader').default;
var semver = require('semver');

if (!semver.satisfies(process.version, '>=5.0.0')) {
  console.log('Sweet requires node >=5.0.0, you have: ' + process.version);
  process.exit(1);
}

let loaderOptions = {
  noBabel: argv.noBabel,
  logging: argv.outFile || argv.outDir
};

var loader = new NodeLoader(process.cwd(), loaderOptions);
argv._.forEach(function (file) {
  var output = compile(fs.realpathSync(file), loader, {
    noBabel: argv.noBabel
  }).code;

  if (argv.outFile) {
    fs.writeFileSync(argv.outFile, output, 'utf8');
  } else if (argv.outDir) {
    fs.writeFileSync(path.join(argv.outDir, path.basename(file)), output, 'utf8');
  } else {
    console.log(output);
  }
});
