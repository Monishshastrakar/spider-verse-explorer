import fs from "fs";

const buf = fs.readFileSync("public/models/civilian_xbot.glb");
const jsonLen = buf.readUInt32LE(12);
const jsonBuf = buf.subarray(20, 20 + jsonLen);
const gltf = JSON.parse(jsonBuf.toString("utf8"));

console.log("Animations:", gltf.animations?.map(a => a.name));
console.log("Meshes:", gltf.meshes?.map(m => m.name));
console.log("Materials:", gltf.materials?.map(m => m.name));
console.log("Nodes count:", gltf.nodes?.length);
console.log("Skins count:", gltf.skins?.length);
