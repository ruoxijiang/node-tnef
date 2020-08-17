const tnef = require('bindings')('tnef.node');
function extractFiles(file_path, output_dir){
    return new Promise((resolve, reject) => {
        if(typeof file_path !== 'string' || file_path.length === 0){
            throw new Error(`file path not present`);
        }
        if(typeof output_dir !== 'string' || file_path.length === 0){
            throw new Error(`file path not present`);
        }
        const ret = tnef.ExtractFiles(file_path, output_dir);
        if(ret){
            resolve(ret);
        }else {
            reject();
        }
    });
}
/**
 * Extracts a Microsoft Tnef file and returns a Promise containing extracted file info
 * @param {string} file path
 * @param {string} extract destination
 * @return {Promise} returns a Promise containing extracted file info
 */
module.exports = {
    extractFiles: extractFiles,
}