const fs = require("fs");
const path = require("path");
const directoryPath = "./files";

// Read the contents of the directory
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.log(err);
        return;
    }

    const filePaths = files.map(file => {
        const fileNameWithoutExtension = path.basename(file, path.extname(file));
        return path.join(directoryPath, `${fileNameWithoutExtension}.txt`);
    });

    // Process each file
    filePaths.forEach((newFilePath, index) => {
        // Read each file
        fs.readFile(path.join(directoryPath, files[index]), (readErr, data) => {
            if (readErr) {
                console.log(readErr);
                return;
            }

            fs.writeFile(newFilePath, data, writeErr => {
                if (writeErr) {
                    console.log( writeErr);
                    return;
                }

                console.log(`${newFilePath} written successfully.`);
            });
        });
    });
});
