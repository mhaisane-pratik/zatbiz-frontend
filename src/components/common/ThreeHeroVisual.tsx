'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeHeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create a glassmorphic floating masterpiece object
    const group = new THREE.Group();
    scene.add(group);

    // Central sphere representing the "core" of ZATBIZ
    const coreGeom = new THREE.IcosahedronGeometry(1, 1);
    const coreMat = new THREE.MeshPhongMaterial({
      color: 0x6d28d9,
      emissive: 0x2e1065,
      shininess: 100,
      transparent: true,
      opacity: 0.8
    });
    const core = new THREE.Mesh(coreGeom, coreMat);
    group.add(core);

    // Wireframe shell for technical feel
    const shellGeom = new THREE.IcosahedronGeometry(1.4, 2);
    const shellMat = new THREE.MeshBasicMaterial({
      color: 0xd9b3ff,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    const shell = new THREE.Mesh(shellGeom, shellMat);
    group.add(shell);

    // Floating "bits" around the core
    const bitsCount = 12;
    const bits: THREE.Mesh[] = [];
    for (let i = 0; i < bitsCount; i++) {
      const bitGeom = new THREE.BoxGeometry(0.1, 0.1, 0.1);
      const bitMat = new THREE.MeshPhongMaterial({ color: 0xfacc15 });
      const bit = new THREE.Mesh(bitGeom, bitMat);

      const angle = (i / bitsCount) * Math.PI * 2;
      const radius = 1.8 + Math.random() * 0.5;
      bit.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 2,
        Math.sin(angle) * radius
      );
      group.add(bit);
      bits.push(bit);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 5;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    let animId: number;
    function animate() {
      animId = requestAnimationFrame(animate);

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      group.rotation.y += 0.005;
      group.rotation.x = targetY * 0.5;
      group.rotation.z = targetX * 0.5;

      core.rotation.y -= 0.01;
      shell.rotation.y += 0.002;

      // Floating motion
      group.position.y = Math.sin(Date.now() * 0.001) * 0.1;

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      // Clean up geometries and materials
      coreGeom.dispose();
      coreMat.dispose();
      shellGeom.dispose();
      shellMat.dispose();
      bits.forEach(bit => {
        bit.geometry.dispose();
        if (Array.isArray(bit.material)) {
          bit.material.forEach(m => m.dispose());
        } else {
          bit.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px] bg-transparent" />;
}
