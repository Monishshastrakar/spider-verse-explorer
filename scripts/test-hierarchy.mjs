import fs from "fs";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const loader = new GLTFLoader();
const buf = fs.readFileSync("public/models/civilian_xbot.glb");
const arrayBuf = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);

loader.parse(arrayBuf, "", (gltf) => {
  console.log("Root scene position:", gltf.scene.position);
  console.log("Root scene scale:", gltf.scene.scale);
  console.log("Root scene rotation:", gltf.scene.rotation);
  gltf.scene.children.forEach(c => {
    console.log("Child:", c.name, "type:", c.type, "position:", c.position, "scale:", c.scale, "rotation:", c.rotation);
    c.children.forEach(gc => {
      console.log("  Grandchild:", gc.name, "type:", gc.type, "position:", gc.position);
    });
  });
});
