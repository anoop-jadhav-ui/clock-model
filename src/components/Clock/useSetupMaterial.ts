import { useControls } from "leva";
import * as THREE from "three";

export const useSetupMaterial = () => {
  const { glassColor, clockShell, clockText, clockFace, clockHand } =
    useControls("Clock", {
      glassColor: "#fff",
      clockShell: "#f57e7e",
      clockText: "#fff",
      clockFace: "#908fd8",
      clockHand: "#f57e7e",
    });

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: glassColor,
    roughness: 0,
    transmission: 1,
    ior: 1.1,
    clearcoat: 1,
  });

  const clockShellMaterial = new THREE.MeshPhysicalMaterial({
    color: clockShell,
    roughness: 1,
    clearcoat: 1,
  });

  const clockHandMaterial = new THREE.MeshPhysicalMaterial({
    color: clockHand,
    roughness: 1,
    clearcoat: 1,
  });

  const clockFaceMaterial = new THREE.MeshPhysicalMaterial({
    color: clockFace,
    roughness: 1,
    clearcoat: 1,
  });

  const clockTextMaterial = new THREE.MeshPhysicalMaterial({
    color: clockText,
    roughness: 1,
    clearcoat: 1,
  });

  return {
    glassMaterial,
    clockShellMaterial,
    clockHandMaterial,
    clockFaceMaterial,
    clockTextMaterial,
  };
};