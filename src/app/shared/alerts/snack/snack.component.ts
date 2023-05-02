import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-snack',
  templateUrl: './snack.component.html',
  styleUrls: ['./snack.component.css']
})
export class SnackComponent{
  
  @Input() public type : 'danger' | 'warn' | 'success' | 'info' = 'info';
  @Input() public text : string = 'Message text example';
  @Input() set visible(visible:boolean){
    this.vsb = visible;
    this.close(true);    
  }
  @Input() public timeOut : number | undefined;
  @Output() public visibleChange : EventEmitter<boolean> = new EventEmitter<boolean>();
  public vsb : boolean = false;


  public close(timer: true | undefined = undefined) :void{

    if(this.timeOut === undefined && timer === true)return;

    if(timer){
      setTimeout(()=>{
        this.vsb = false;
        this.visibleChange.emit(false);        
      }, this.timeOut);
      return;
    }

    this.vsb = false;
    this.visibleChange.emit(false);
  }
}
