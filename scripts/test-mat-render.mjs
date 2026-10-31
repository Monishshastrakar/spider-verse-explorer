import fs from "fs";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";

const loader = new GLTFLoader();
const buf = fs.readFileSync("public/models/civilian_xbot.glb");
const arrayBuf = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);

loader.parse(arrayBuf, "", (gltf) => {
  const clone = SkeletonUtils.clone(gltf.scene);
  clone.traverse((c) => {
    if (c.isSkinnedMesh) {
      console.log("Before: material.name=", c.material.name, "skeleton bones=", c.skeleton.bones.length);
      c.material = new THREE.MeshStandardMaterial({ color: 0x2d3748 });
      console.log("After: material.name=", c.material.name);
    }
  });

  // Test computing bounding box of cloned scene
  const box = new THREE.Box3().setFromObject(clone);
  console.log("Cloned scene Bounding Box:", box.min, box.max);
});
