import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner1',
  templateUrl: './spinner1.component.html',
  styleUrls: ['./spinner1.component.css']
})
export class Spinner1Component {

  @Input('fullScreen') public fullScreen : boolean = false;
  @Input('size')       public size       : string | undefined;
  @Input('text')       public text       : string | undefined;
  @Input('visible')    public visible    : boolean = true;
}
