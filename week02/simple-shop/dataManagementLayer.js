const fs = require("node:fs/promises");
const path = require("path");

const rootPath = path.dirname(process.mainModule.filename);
// data folder
const dataPath = path.join(rootPath, "data");

const CATEGORIES = "categories.json";
const EMPLOYEES = "employees.json";
const GOODS = "goods.json";

async function readDataRoutines(fileName) {
    const rawFileContent = await fs.readFile(path.join(dataPath, fileName));
    return JSON.parse(rawFileContent);
}

async function readCategories() {
    return await readDataRoutines(CATEGORIES);
}

async function readEmployees() {
    return await readDataRoutines(EMPLOYEES);
}

async function readGoods() {
    return await readDataRoutines(GOODS);
}

module.exports.readCategories = readCategories;
module.exports.readEmployees = readEmployees;
module.exports.readGoods = readGoods;