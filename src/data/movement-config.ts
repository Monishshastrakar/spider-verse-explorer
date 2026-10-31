export interface MovementConfig {
  walkSpeed: number;          // meters per second
  runSpeed: number;           // meters per second
  accelerationTime: number;   // seconds to reach top speed
  decelerationTime: number;   // seconds to come to a stop
  jumpForce: number;          // vertical launch velocity (m/s)
  gravity: number;            // downward acceleration (m/s^2)
  jumpBufferWindow: number;   // seconds to remember jump press before landing
  coyoteTimeWindow: number;   // seconds after falling off edge where jump is still allowed
  interactionDistance: number;// meters from station boundary to trigger prompt
  interactionHysteresis: number;// extra meters required to disengage prompt
  rotationSpeed: number;      // radians per second for turning to face movement
  boundsRadius: number;       // citadel boundary limit
  respawnPosition: [number, number, number];
}

export interface CameraConfig {
  defaultDistance: number;    // meters behind player
  mechDistance: number;       // meters behind SP//dr mech
  heightOffset: number;       // meters above player root
  minPitch: number;           // radians (~3 degrees)
  maxPitch: number;           // radians (~65 degrees)
  sensitivity: number;        // mouse/touch drag sensitivity
  collisionRadius: number;    // sphere radius for camera obstacle raycast
}

export const MOVEMENT_CONFIG: MovementConfig = {
  walkSpeed: 2.8,
  runSpeed: 5.6,
  accelerationTime: 0.16,
  decelerationTime: 0.18,
  jumpForce: 6.8,
  gravity: 19.6,
  jumpBufferWindow: 0.12,
  coyoteTimeWindow: 0.1,
  interactionDistance: 2.2,
  interactionHysteresis: 0.8,
  rotationSpeed: 14.0,
  boundsRadius: 13.5,
  respawnPosition: [0, 0, 3]
};

export const CAMERA_CONFIG: CameraConfig = {
  defaultDistance: 4.2,
  mechDistance: 6.2,
  heightOffset: 1.25,
  minPitch: 0.05,
  maxPitch: 1.15,
  sensitivity: 0.0045,
  collisionRadius: 0.25
};
