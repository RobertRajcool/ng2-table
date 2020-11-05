import { Directive, EventEmitter, ElementRef, Renderer2, HostListener, Input, Output } from '@angular/core';


@Directive({selector: '[ngTableFiltering]'})
export class NgTableFilteringDirective {
  @Input() public ngTableFiltering:any = {
    filterString: '',
    columnName: 'name'
  };

  @Output() public tableChanged:EventEmitter<any> = new EventEmitter();

  @Input()
  public get config():any {
    return this.ngTableFiltering;
  }

  public set config(value:any) {
    this.ngTableFiltering = value;
  }

  private element:ElementRef;
  private renderer:Renderer2;

  @HostListener('input', ['$event.target.value'])
  public onChangeFilter(event:any):void {
    this.ngTableFiltering.filterString = event;
    this.tableChanged.emit({filtering: this.ngTableFiltering});
  }

  public constructor(element:ElementRef, renderer:Renderer2) {
    this.element = element;
    this.renderer = renderer;
    // Set default value for filter
    //setProperty(this.renderer, this.element, 'value', this.ngTableFiltering.filterString);
    this.renderer.setProperty(this.element.nativeElement, 'value', this.ngTableFiltering.filterString);
  }
}
