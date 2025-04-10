import fs from "fs";
import path from "path";

async function fileExists(filePath) {
  try {
    await fs.promises.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function copyFile(src, dest) {
  try {
    if (await fileExists(dest)) {
      console.log(`File already exists at ${dest}, skipping copy.`);
    } else {
      await fs.promises.copyFile(src, dest);
      console.log(`Copied ${src} to ${dest}`);
    }
  } catch (err) {
    console.error(`Error copying file from ${src} to ${dest}:`, err);
  }
}

async function createFolder(folderPath) {
  try {
    const folderExists = await fs.promises
      .access(folderPath)
      .then(() => true)
      .catch(() => false);

    if (!folderExists) {
      await fs.promises.mkdir(folderPath, { recursive: true });
      console.log(`Created folder: ${folderPath}`);
    }
  } catch (err) {
    console.error(`Error creating folder ${folderPath}:`, err);
  }
}

const copyOperations = [
  {
    src: path.join("accounts", "accounts_tmp.js"),
    dest: path.join("accounts", "accounts.js"),
  },
  {
    src: path.join("config", "config_tmp.js"),
    dest: path.join("config", "config.js"),
  },
];

(async () => {
  console.log(`Copying Template File`);
  await createFolder("accounts");
  for (let { src, dest } of copyOperations) {
    await copyFile(src, dest);
  }
  console.log(`\nSetup Complete`);
  console.log(
    `Open And Configure\n- accounts/accounts.js\n- config/config.js.js\n`
  );
})();