import fs from "fs";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const loader = new GLTFLoader();
const buf = fs.readFileSync("public/models/civilian_xbot.glb");
const arrayBuf = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);

loader.parse(arrayBuf, "", (gltf) => {
  gltf.scene.traverse((c) => {
    if (c.isMesh) {
      console.log("Mesh name:", c.name, "isSkinnedMesh:", c.isSkinnedMesh);
      console.log("Material name:", c.material.name, "type:", c.material.type);
      console.log("Material color:", c.material.color);
      console.log("Material visible:", c.material.visible);
      console.log("Geometry attributes:", Object.keys(c.geometry.attributes));
    }
  });
});
