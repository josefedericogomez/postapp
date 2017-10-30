import { Directive, ElementRef, Input, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[pstEllipsis]'
})
export class EllipsisDirective implements OnInit {

  constructor(private element: ElementRef) { }

  @Input('pstEllipsis') text: string;
  
  private expanded: boolean;
  private readonly MAX_LENGTH: number = 150;

  ngOnInit() {
    var greaterThanMaxLength = this.isGreaterThanMaxLength(this.text);
    this.setCursor(greaterThanMaxLength);
    this.setText(greaterThanMaxLength);
  }

  @HostListener('click') onClick() {
    if(this.isGreaterThanMaxLength(this.text)){
      this.expanded = !this.expanded;
      this.setText(true);
    }
  }

  private isGreaterThanMaxLength(text: string): boolean{
    return text.length > this.MAX_LENGTH;
  }

  private setCursor(greaterThanMaxLength: boolean): void {
    if(greaterThanMaxLength){
      this.element.nativeElement.style.cursor = 'pointer';
    }
  }

  private setText(greaterThanMaxLength: boolean): void {
    this.element.nativeElement.innerHTML = this.expanded || !greaterThanMaxLength ? this.text : this.text.substr(0, this.MAX_LENGTH - 3) + '...';
  }

}
