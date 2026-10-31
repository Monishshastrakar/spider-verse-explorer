import fs from "fs";

const buf = fs.readFileSync("public/models/soldier.glb");
const jsonLen = buf.readUInt32LE(12);
const jsonBuf = buf.subarray(20, 20 + jsonLen);
const gltf = JSON.parse(jsonBuf.toString("utf8"));

console.log("Soldier Animations:", gltf.animations?.map(a => a.name));
console.log("Soldier Meshes:", gltf.meshes?.map(m => m.name));
console.log("Soldier Materials:", gltf.materials?.map(m => m.name));
console.log("Soldier Nodes count:", gltf.nodes?.length);
