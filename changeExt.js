import fs from 'fs';
import path from 'path'
const directoryPath = 'E:/downLoad/3dd/新建文件夹'; // 指定要修改后缀名的目录路径
const oldExtension = '.txt'; // 指定要替换的旧后缀名
const newExtension = '.rar'; // 指定要替换的新后缀名
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('无法读取目录：', err);
        return;
    }

    files.forEach((file) => {
        let filePath = path.join(directoryPath, file);
        const fileExtension = path.extname(filePath);
        console.log( Boolean(fileExtension),'aa')
        let newFilePath;
        if(!fileExtension) {
            newFilePath = filePath + newExtension;
            reName(filePath,newFilePath);
        } else if (fileExtension === oldExtension) {
            // newFilePath = filePath.replace(oldExtension, newExtension);
            // reName(filePath,newFilePath);
        }
    });
});

function reName(filePath,newFilePath) {
    fs.rename(filePath, newFilePath, (err) => {
        if (err) {
            console.error('无法重命名文件：', err);
        } else {
            console.log(`${filePath} 已重命名为 ${newFilePath}`);
        }
    });
}

