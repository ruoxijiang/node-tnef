const expect = require('chai').expect;
const tnef = require('../index');
const rimraf = require('rimraf');
const fs = require('fs');
describe("Extract files", function(){
    beforeEach(function(){
        return new Promise(resolve => {
            const onRemovedFiles = ()=>{
                console.log('creating tmp dir');
                fs.mkdir('./test/tmp', resolve);
            }
            console.log('clearing tmp dir');
            rimraf('./test/tmp', {disableGlob: true}, onRemovedFiles);
        });
    })
    it('should extract files', function(){
        const filePath = './test/mock_data/winmail.dat';
        const dstPath = './test/tmp';
        console.log(`extracting ${filePath} to ${dstPath}`);
        return tnef.extractFiles(filePath, dstPath ).then(()=>{
            return new Promise(resolve => {
                fs.readdir(dstPath, (err, files)=>{
                    expect(files).to.have.lengthOf(3);
                    expect(files.includes('message.rtf')).equal(true);
                    expect(files.includes('Penguins.jpg')).equal(true);
                    expect(files.includes('中文分词原理.pdf')).equal(true);
                    resolve();
                });
            })
        })
    })
    it('should return file info', function(){
        const filePath = './test/mock_data/winmail.dat';
        const dstPath = './test/tmp';
        return tnef.extractFiles(filePath, dstPath).then(ret=>{
            expect(ret).to.have.lengthOf(3);
            expect(ret[0].name).equal('message.rtf');
            expect(ret[1].name).equal('Penguins.jpg');
            expect(ret[2].name).equal('中文分词原理.pdf');
        })
    })
    it('should throw Error for file path', function(){
        const filePath = 234;
        const dstPath = './test/tmp';
        expect(tnef.extractFiles(filePath, dstPath)).to.throws;
    })
    it('should throw Error for destination', function(){
        const filePath = './test/mock_data/winmail.dat';
        const dstPath = 33;
        expect(tnef.extractFiles(filePath, dstPath)).to.throws;
    })
    after(function(){
        return new Promise(resolve => {
            rimraf('./test/tmp', {disableGlob: true}, resolve);
        })
    })
})