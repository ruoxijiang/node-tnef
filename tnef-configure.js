const { exec } = require('child_process');
const path = require('path');
const gitPath = path.join(__dirname, 'src', 'vendor');
const pwd = path.join(gitPath, 'tnef');
function runShell(cmd,args,pwd, cb, stage){
    const shell = exec(cmd, args, {cwd: pwd, env: process.env, shell: '/bin/bash'});
    shell.stdout.on('data', data => {
        console.log(`${stage}:std: ${data}`);
    });
    shell.stderr.on('data', data=>{
        console.log(`${stage}:stderr: ${data}`);
    })
    shell.on('close', ()=>{
        console.log(`${stage} complete`);
        if(cb){
            cb();
        }
    });
    shell.on('error', data=>{
        console.log(`${stage}:error ${data}`);
    })
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