import fs from "fs";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";

const loader = new GLTFLoader();
const buf = fs.readFileSync("public/models/civilian_xbot.glb");
const arrayBuf = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);

loader.parse(arrayBuf, "", (gltf) => {
  console.log("Parsed GLTF scene children:", gltf.scene.children.length);
  const cloned = SkeletonUtils.clone(gltf.scene);
  console.log("Cloned scene children:", cloned.children.length);
  const mixer = new THREE.AnimationMixer(cloned);
  const action = mixer.clipAction(gltf.animations[2]); // 'idle'
  action.play();
  mixer.update(0.016);
  console.log("Mixer update succeeded without errors!");
}, (err) => console.error("Error:", err));
