const { spawn } = require('child_process');
const path = require('path');
const pwd = path.join(__dirname, 'src', 'vendor', 'tnef');
function runShell(cmd,args,pwd, cb, stage){
    const shell = spawn(cmd, args, {cwd: pwd, env: process.env, shell: true});
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
}
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
    const gitPath = path.join(__dirname, 'src', 'vendor');
    runShell('git', ['clone', 'https://www.github.com/ruoxijiang/tnef.git'], gitPath, runAutoreconf, 'Grab git submodule');
}
runGitUpdateSubmodule();