const id3 = require("node-id3");
const { promisify } = require("util")

const reader = promisify(id3.read)
const path = "D:\\Música\\Felipe Araújo - Check\\06 - Felipe Araújo - Curso Online.mp3";

reader(path).then(d => console.log(d))