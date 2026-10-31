import fs from "fs";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";

const loader = new GLTFLoader();
const buf = fs.readFileSync("public/models/civilian_xbot.glb");
const arrayBuf = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);

loader.parse(arrayBuf, "", (gltf) => {
  const clone = SkeletonUtils.clone(gltf.scene);
  clone.scale.set(100, 100, 100);
  clone.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(clone);
  console.log("With scale [100, 100, 100]:");
  console.log("Size:", box.getSize(new THREE.Vector3()));
});
