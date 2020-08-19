const { exec } = require('child_process');
const path = require('path');
const gitPath = path.join(__dirname, 'src', 'vendor');
const pwd = path.join(gitPath, 'tnef');
function runShell(cmd,args,pwd, cb, stage){
    exec(`${cmd} ${args.join(' ')}`, {cwd: pwd, env: process.env}, (err, stdout, stderr)=>{
        if(err){
            console.log(`${stage}:error ${err}`);
        }
        console.log(`${stage}:std: ${stdout}`);
        console.log(`${stage}:sterr: ${stderr}`);
        if(cb){
            cb();
        }
    });
};
function runNodeGyp(){
    runShell('node-gyp', ['configure'], __dirname, null, 'node-gyp configure');
}
function runConfigure(){
    runShell('./configure', [], pwd, runNodeGyp, 'configure');
}
function runAutoreconf(){
    runShell('autoreconf', ['-f'], pwd, runConfigure, 'autoreconf');
}
function runGitUpdateSubmodule(){
    runShell('git', ['clone', 'https://github.com/ruoxijiang/tnef.git'], gitPath, runAutoreconf, 'Grab git submodule');
}
function removeTNEF(){
    runShell('rm', ['-rf', 'tnef'], gitPath, runGitUpdateSubmodule, 'Remove tnef folder');
}
removeTNEF();