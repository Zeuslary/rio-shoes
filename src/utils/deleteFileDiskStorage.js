import fs from 'fs';

// Eg:
// path: pth of file you want delete - avatar1.png
// folder: uploads/admin

// Delete file from local disk
const deleteFileDiskStorage = (path, folder) => {
    const avatarPath = folder + '/' + path;
    console.log('Path of delete admin: ', avatarPath);

    fs.unlink(avatarPath, (err) => {
        if (err) console.log('Delete file failed...', err);
        console.log('Delete file successfully!');
    });
};

export default deleteFileDiskStorage;
