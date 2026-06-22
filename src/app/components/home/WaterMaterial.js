"use client";

import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

export const WaterMaterial = shaderMaterial(

{
  uTime:0,
  uMouse:new THREE.Vector2(),
  uColor:new THREE.Color("#0062a1")
},

// Vertex Shader
`
uniform float uTime;
uniform vec2 uMouse;

varying vec2 vUv;

void main(){

    vUv = uv;

    vec3 pos = position;

    // ondas contínuas
    pos.z +=
        sin(pos.x*2.0 + uTime)
        *0.15;

    pos.z +=
        cos(pos.y*2.5 + uTime*1.2)
        *0.15;

    // posição do mouse no espaço do plano
    vec2 mousePos =
        vec2(
            uMouse.x * 10.0,
            uMouse.y * 6.0
        );

    float d =
        distance(
            pos.xy,
            mousePos
        );

    // ripple
    pos.z +=
        sin(d*8.0 - uTime*8.0)
        *0.4
        *exp(-d*0.5);

    gl_Position =
        projectionMatrix *
        modelViewMatrix *
        vec4(pos,1.0);

}
`,

// Fragment shader
`
uniform vec3 uColor;

varying vec2 vUv;

void main(){

    float gradient =
        0.5 + vUv.y*0.5;

    vec3 color =
        uColor * gradient;

    gl_FragColor =
        vec4(color,0.18);

}
`
);