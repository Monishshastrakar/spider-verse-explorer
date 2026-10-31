import fs from "fs";

const buf = fs.readFileSync("public/models/civilian_xbot.glb");
const jsonLen = buf.readUInt32LE(12);
const gltf = JSON.parse(buf.subarray(20, 20 + jsonLen).toString("utf8"));

// Check accessors for min/max position of meshes
gltf.accessors.forEach((acc, i) => {
  if (acc.min && acc.max && acc.type === "VEC3") {
    console.log(`Accessor ${i}: min=`, acc.min, "max=", acc.max);
  }
});
