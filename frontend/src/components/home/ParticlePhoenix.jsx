import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import birdTargetUrl from "../../assets/bird-particle-target-blue.png";

/*
 * PHRONIX PHOENIX HERO
 *
 * The bird is an actual transparent texture, divided into GPU tiles.
 * Formed state = crisp blue/teal phoenix artwork.
 * Dissolved state = those same image fragments fly outward.
 *
 * Interaction:
 *   page opens -> scattered -> assembles
 *   click      -> dissolves -> holds -> reassembles
 */

const BRAND = {
  deepBlue: new THREE.Color("#123BFF"),
  iceBlue: new THREE.Color("#38BDF8"),
  teal: new THREE.Color("#22E6D0"),
  gold: new THREE.Color("#D7B84A"),
};

export default function ParticlePhoenix({ onInteraction }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const coarsePointer = window.matchMedia(
      "(pointer: coarse)"
    ).matches;
    const lowEnd = (navigator.hardwareConcurrency || 8) <= 4;

    // More tiles = more faithful image. 52–64 is a good desktop range.
    const GRID = reducedMotion
      ? 28
      : coarsePointer || lowEnd
        ? 42
        : 60;

    /*
     * Responsive visual placement:
     * - Desktop keeps the phoenix on the right side.
     * - Touch/mobile devices center the phoenix behind the headline.
     * The mobile frame is smaller so the full bird stays inside the viewport.
     */
    const FRAME = coarsePointer ? 4.15 : 6.75;
    const OFFSET_X = coarsePointer ? 0 : 2.45;
    const OFFSET_Y = coarsePointer ? 0.10 : 0.02;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 11.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, coarsePointer ? 1.35 : 1.7)
    );
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const composer = new EffectComposer(renderer);
    composer.setPixelRatio(
      Math.min(window.devicePixelRatio, coarsePointer ? 1.25 : 1.6)
    );
    composer.addPass(new RenderPass(scene, camera));

    const bloom = new UnrealBloomPass(
      new THREE.Vector2(1, 1),
      reducedMotion ? 0.18 : 0.48,
      0.62,
      0.82
    );
    composer.addPass(bloom);

    const uniforms = {
      uFormation: { value: 0 },
      uTime: { value: 0 },
      uPaletteA: { value: BRAND.deepBlue },
      uPaletteB: { value: BRAND.iceBlue },
      uPaletteC: { value: BRAND.teal },
      uGold: { value: BRAND.gold },
      uFormTint: { value: new THREE.Color("#38BDF8") },
      uTintStrength: { value: 0.0 },
      uTexture: { value: null },
    };

    const vertexShader = `
      uniform float uFormation;
      uniform float uTime;

      attribute vec3 aCenter;
      attribute vec3 aScatter;
      attribute float aSeed;

      varying vec2 vUv2;
      varying float vFormation;
      varying float vSeed;

      void main() {
        float f = smoothstep(0.0, 1.0, uFormation);
        vec3 corner = position - aCenter;

        vec3 center = mix(aScatter, aCenter, f);

        // Organic floating motion while scattered.
        center.x += sin(uTime * 0.55 + aSeed * 17.0) * 0.12 * (1.0 - f);
        center.y += cos(uTime * 0.47 + aSeed * 13.0) * 0.12 * (1.0 - f);
        center.z += sin(uTime * 0.63 + aSeed * 11.0) * 0.22 * (1.0 - f);

        // Fragments shrink dramatically while dissolving.
        float scale = mix(0.035, 1.0, f);

        // Give fragments a little rotational energy.
        float angle =
          (1.0 - f) *
          (aSeed * 6.2831853 + uTime * (0.3 + aSeed * 0.7));

        float c = cos(angle);
        float s = sin(angle);

        vec3 rotated = vec3(
          corner.x * c - corner.y * s,
          corner.x * s + corner.y * c,
          corner.z
        );

        vec3 finalPos = center + rotated * scale;

        vUv2 = uv;
        vFormation = f;
        vSeed = aSeed;

        gl_Position =
          projectionMatrix *
          modelViewMatrix *
          vec4(finalPos, 1.0);
      }
    `;

    const fragmentShader = `
      uniform sampler2D uTexture;
      uniform vec3 uPaletteA;
      uniform vec3 uPaletteB;
      uniform vec3 uPaletteC;
      uniform vec3 uGold;
      uniform vec3 uFormTint;
      uniform float uTintStrength;

      varying vec2 vUv2;
      varying float vFormation;
      varying float vSeed;

      void main() {
        vec4 tex = texture2D(uTexture, vUv2);

        // The source PNG must have transparent pixels outside the bird.
        if (tex.a < 0.04) discard;

        // Brand palette used ONLY during the dissolved state.
        vec3 brandColor;
        float seed = fract(vSeed * 31.731);

        if (seed < 0.48) {
          brandColor = mix(uPaletteA, uPaletteB, seed / 0.48);
        } else {
          brandColor = mix(uPaletteB, uPaletteC, (seed - 0.48) / 0.52);
        }

        // Rare warm gold accent, never a dominant state.
        if (seed > 0.94) {
          brandColor = mix(brandColor, uGold, 0.72);
        }

        // Crisp blue phoenix when formed, with a very subtle
        // premium tint that can change after each interaction.
        vec3 formedColor = mix(
          tex.rgb,
          uFormTint,
          uTintStrength
        );

        // Brand-tinted fragments while dissolved.
        vec3 color = mix(
          brandColor,
          formedColor,
          smoothstep(0.12, 0.82, vFormation)
        );

        // Soft cyan energy around the dissolving fragments.
        float dissolve = 1.0 - vFormation;
        color += brandColor * dissolve * 0.30;

        float alpha = tex.a * mix(0.88, 1.0, vFormation);

        if (alpha < 0.025) discard;

        gl_FragColor = vec4(color, alpha);
      }
    `;

    let mesh = null;
    let disposed = false;
    let formation = 0;
    let formationTarget = 0;
    let introTimer = 0;
    let clickTimer = 0;
    let hasInteracted = false;
    let tintIndex = 0;

    const FORM_TINTS = [
      BRAND.iceBlue,
      BRAND.teal,
      BRAND.deepBlue,
    ];

    const buildGeometry = () => {
      const positions = [];
      const centers = [];
      const scatters = [];
      const seeds = [];
      const uvs = [];
      const indices = [];

      const tile = FRAME / GRID;
      const half = tile * 0.5;
      let vertexIndex = 0;

      for (let iy = 0; iy < GRID; iy += 1) {
        for (let ix = 0; ix < GRID; ix += 1) {
          const cx =
            OFFSET_X +
            (ix - GRID / 2 + 0.5) * tile;

          const cy =
            OFFSET_Y +
            (GRID / 2 - iy - 0.5) * tile;

          const seed = Math.random();

          /*
           * Scatter around the whole right-side hero.
           * A mix of radial and vertical movement makes the
           * dissolve feel like fragments breaking into space.
           */
          const angle = Math.random() * Math.PI * 2;
          const radius = 2.9 + Math.random() * 6.2;

          const sx =
            OFFSET_X +
            Math.cos(angle) * radius;

          const sy =
            OFFSET_Y +
            Math.sin(angle) * radius * 0.78;

          const sz =
            (Math.random() - 0.5) * 5.8;

          const u0 = ix / GRID;
          const u1 = (ix + 1) / GRID;
          const v0 = 1 - (iy + 1) / GRID;
          const v1 = 1 - iy / GRID;

          const corners = [
            [-half, -half, u0, v0],
            [half, -half, u1, v0],
            [half, half, u1, v1],
            [-half, half, u0, v1],
          ];

          corners.forEach(([ox, oy, u, v]) => {
            positions.push(cx + ox, cy + oy, 0);
            centers.push(cx, cy, 0);
            scatters.push(sx, sy, sz);
            seeds.push(seed);
            uvs.push(u, v);
          });

          indices.push(
            vertexIndex,
            vertexIndex + 1,
            vertexIndex + 2,
            vertexIndex,
            vertexIndex + 2,
            vertexIndex + 3
          );

          vertexIndex += 4;
        }
      }

      const geometry = new THREE.BufferGeometry();

      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
      );
      geometry.setAttribute(
        "aCenter",
        new THREE.Float32BufferAttribute(centers, 3)
      );
      geometry.setAttribute(
        "aScatter",
        new THREE.Float32BufferAttribute(scatters, 3)
      );
      geometry.setAttribute(
        "aSeed",
        new THREE.Float32BufferAttribute(seeds, 1)
      );
      geometry.setAttribute(
        "uv",
        new THREE.Float32BufferAttribute(uvs, 2)
      );
      geometry.setIndex(indices);

      return geometry;
    };

    const loader = new THREE.TextureLoader();

    loader.load(
      birdTargetUrl,
      (texture) => {
        if (disposed) {
          texture.dispose();
          return;
        }

        texture.colorSpace = THREE.SRGBColorSpace;
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;

        uniforms.uTexture.value = texture;

        const geometry = buildGeometry();

        const material = new THREE.ShaderMaterial({
          uniforms,
          vertexShader,
          fragmentShader,
          transparent: true,
          depthWrite: false,
          depthTest: true,
          side: THREE.DoubleSide,
          blending: THREE.NormalBlending,
        });

        mesh = new THREE.Mesh(geometry, material);
        mesh.frustumCulled = false;
        scene.add(mesh);

        /*
         * INTRO:
         * Start scattered, hold for a moment so the visitor sees
         * the particles, then assemble into the phoenix.
         */
        introTimer = window.setTimeout(() => {
          if (!disposed) formationTarget = 1;
        }, reducedMotion ? 120 : 2000);
      },
      undefined,
      (error) => {
        console.error("Phronix phoenix texture failed to load.", error);
      }
    );

    const triggerDissolve = () => {
      if (disposed || !mesh || clickTimer) return;

      if (!hasInteracted) {
        hasInteracted = true;
        onInteraction?.();
      }

      // A soft, deliberate color shift for the next formed state.
      // tintIndex = (tintIndex + 1) % FORM_TINTS.length;
      // uniforms.uFormTint.value.copy(FORM_TINTS[tintIndex]);
      // uniforms.uTintStrength.value = 0.08 + tintIndex * 0.025;

      // Dissolve.
      formationTarget = 0;

      // Keep the dissolved state visible before rebuilding.
      clickTimer = window.setTimeout(() => {
        if (disposed) return;

        formationTarget = 1;
        clickTimer = 0;
      }, reducedMotion ? 420 : 1950);
    };

    const onClick = (event) => {
      const hero = mount.closest(".hero--particle");
      if (!hero || !hero.contains(event.target)) return;

      if (event.target.closest?.("a,button,input,textarea,select")) {
        return;
      }

      triggerDissolve();
    };

    const resize = () => {
      if (disposed) return;

      const width = mount.clientWidth || window.innerWidth;
      const height = mount.clientHeight || window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height, false);
      composer.setSize(width, height);
    };

    window.addEventListener("click", onClick);
    window.addEventListener("resize", resize);

    const clock = new THREE.Clock();
    let raf = 0;

    const animate = () => {
      if (disposed) return;

      raf = requestAnimationFrame(animate);

      const dt = clock.getDelta();
      const elapsed = clock.elapsedTime;

      if (!reducedMotion) {
        uniforms.uTime.value = elapsed;
      }

      formation = THREE.MathUtils.damp(
        formation,
        formationTarget,
        reducedMotion ? 4.0 : 2.0,
        dt
      );

      uniforms.uFormation.value = formation;

      if (mesh) {
        /*
         * Subtle living motion while formed.
         * The phoenix should feel alive, not like a static PNG.
         */
        const breathing = Math.sin(elapsed * 1.15) * 0.012;

        mesh.scale.set(
          1 + breathing,
          1 + breathing,
          1
        );

        mesh.rotation.y =
          Math.sin(elapsed * 0.22) * 0.045;

        mesh.rotation.x =
          Math.sin(elapsed * 0.16) * 0.018;

        // Stronger glow while fragments are in flight.
        bloom.strength =
          0.34 +
          (1 - formation) * 0.58;
      }

      composer.render();
    };

    resize();
    raf = requestAnimationFrame(animate);

    return () => {
      disposed = true;

      window.removeEventListener("click", onClick);
      window.removeEventListener("resize", resize);

      if (introTimer) window.clearTimeout(introTimer);
      if (clickTimer) window.clearTimeout(clickTimer);

      cancelAnimationFrame(raf);

      if (mesh) {
        mesh.geometry.dispose();
        mesh.material.dispose();
      }

      if (uniforms.uTexture.value) {
        uniforms.uTexture.value.dispose();
        uniforms.uTexture.value = null;
      }

      composer.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode) {
        renderer.domElement.remove();
      }
    };
  }, [onInteraction]);

  return (
    <div
      ref={mountRef}
      className="particle-phoenix"
      aria-hidden="true"
    />
  );
}