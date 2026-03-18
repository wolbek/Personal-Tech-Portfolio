import {
  Component,
  ElementRef,
  viewChild,
  afterNextRender,
  DestroyRef,
  inject,
  PLATFORM_ID,
  NgZone,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-three-bg',
  template: '<canvas #canvas></canvas>',
  styles: `
    :host { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
    canvas { width: 100%; height: 100%; display: block; }
  `,
})
export class ThreeBgComponent {
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly platformId = inject(PLATFORM_ID);
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private meshes: THREE.Mesh[] = [];
  private frameId = 0;
  private mouse = { x: 0, y: 0 };

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      this.zone.runOutsideAngular(() => this.init());
    });
  }

  private init(): void {
    const canvas = this.canvasRef().nativeElement;
    const parent = canvas.parentElement!;
    const w = parent.clientWidth;
    const h = parent.clientHeight;

    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(w, h);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    this.camera.position.z = 20;

    this.createGeometries();
    this.addLights();
    this.animate();

    const onPointerMove = (e: PointerEvent) => {
      this.mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      this.mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onResize = () => {
      const pw = parent.clientWidth;
      const ph = parent.clientHeight;
      this.camera.aspect = pw / ph;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(pw, ph);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    this.destroyRef.onDestroy(() => {
      cancelAnimationFrame(this.frameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      this.renderer.dispose();
      for (const m of this.meshes) {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      }
    });
  }

  private getThemeColor(varName: string, fallback: string): THREE.Color {
    const val = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    return new THREE.Color(val || fallback);
  }

  private createGeometries(): void {
    const shapes: [THREE.BufferGeometry, number[]][] = [
      [new THREE.IcosahedronGeometry(1.4, 0), [-7, 4, -5]],
      [new THREE.OctahedronGeometry(1.1, 0), [6, -3, -8]],
      [new THREE.TorusKnotGeometry(0.8, 0.3, 64, 8, 2, 3), [-4, -5, -6]],
      [new THREE.IcosahedronGeometry(0.9, 1), [8, 5, -10]],
      [new THREE.TetrahedronGeometry(1.2, 0), [0, 6, -12]],
      [new THREE.OctahedronGeometry(0.7, 0), [-9, 0, -7]],
      [new THREE.DodecahedronGeometry(0.8, 0), [5, -6, -9]],
    ];

    const primary = this.getThemeColor('--accent-primary', '#6c63ff');
    const secondary = this.getThemeColor('--accent-secondary', '#00d4aa');

    for (let i = 0; i < shapes.length; i++) {
      const [geo, pos] = shapes[i];
      const mat = new THREE.MeshPhongMaterial({
        color: i % 2 === 0 ? primary : secondary,
        transparent: true,
        opacity: 0.35,
        wireframe: i % 3 === 0,
        shininess: 80,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(pos[0], pos[1], pos[2]);
      mesh.userData['speed'] = 0.002 + Math.random() * 0.004;
      mesh.userData['axis'] = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize();
      mesh.userData['floatOffset'] = Math.random() * Math.PI * 2;
      this.scene.add(mesh);
      this.meshes.push(mesh);
    }
  }

  private addLights(): void {
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambient);
    const point = new THREE.PointLight(0xffffff, 1.2, 50);
    point.position.set(10, 10, 10);
    this.scene.add(point);
    const point2 = new THREE.PointLight(0x6c63ff, 0.8, 40);
    point2.position.set(-10, -5, 5);
    this.scene.add(point2);
  }

  private animate(): void {
    const clock = new THREE.Clock();

    const tick = () => {
      this.frameId = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();

      for (const mesh of this.meshes) {
        const speed = mesh.userData['speed'] as number;
        const axis = mesh.userData['axis'] as THREE.Vector3;
        const offset = mesh.userData['floatOffset'] as number;
        mesh.rotateOnAxis(axis, speed);
        mesh.position.y += Math.sin(t * 0.5 + offset) * 0.003;
      }

      this.camera.position.x += (this.mouse.x * 1.5 - this.camera.position.x) * 0.02;
      this.camera.position.y += (this.mouse.y * 1.0 - this.camera.position.y) * 0.02;
      this.camera.lookAt(0, 0, -5);

      this.renderer.render(this.scene, this.camera);
    };

    tick();
  }
}
