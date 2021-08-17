import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // refer index.html where the comp will be rendered
  templateUrl: './app.component.html', //components view/template
  styleUrls: ['./app.component.scss'] // components style
})
export class AppComponent {
  title = 'conFusion';
}
