import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'; 
import { ThreeService } from './services/three.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Pano';
  @ViewChild('rendererCanvas', { static: true })
  public rendererCanvas!: ElementRef<HTMLCanvasElement>;

  public constructor(private threeService: ThreeService){
    
  }

  ngOnInit(): void {
    this.threeService.createScene(this.rendererCanvas);
    this.threeService.animate();
  }
}
