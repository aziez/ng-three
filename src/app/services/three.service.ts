import * as THREE from 'three';
import { ElementRef, Injectable, NgZone, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThreeService implements OnDestroy {
  private canvas!: HTMLCanvasElement;
  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private light!: THREE.AmbientLight;

  private mesh!: THREE.Mesh;
  
  private frameId: number = 0;

  constructor(private ngZone: NgZone) { }

  ngOnDestroy(): void {
    if(this.frameId != null){
      cancelAnimationFrame(this.frameId);''
    }
    if(this.renderer != null){
      this.renderer.dispose();
      this.renderer == null;
      this.canvas == null;
    }
  }

  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    this.canvas = canvas.nativeElement;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(window.innerHeight, window.innerWidth);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerHeight/window.innerWidth, 0.1, 1000);
    this.camera.position.z = 5;
    this.scene.add(this.camera);

    this.light = new THREE.AmbientLight(0x404040);
    this.light.position.z = 7;
    this.scene.add(this.light);

    const geo = new THREE.SphereGeometry(500, 60, 40);
    geo.scale(-1, 1, 1);

    const texture = new THREE.TextureLoader().load('../../assets/pano.jpg');
    const material = new THREE.MeshBasicMaterial({map: texture});

    this.mesh = new THREE.Mesh(geo, material)

    this.scene.add(this.mesh);


  }


  public animate(): void{
      this.ngZone.runOutsideAngular(()=> {
        if(document.readyState !== 'loading'){
          this.render();
        }else{
          window.addEventListener('DOMContentLoaded', ()=> {
            this.render();
          });
        }

        window.addEventListener('resize', () => {
          this.resize();
        });
      });
  }


  public render(): void{
      this.frameId = requestAnimationFrame(() => {
        this.render();
      });


      this.renderer.render(this.scene, this.camera);
  }

  public resize(): void{
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }

}
