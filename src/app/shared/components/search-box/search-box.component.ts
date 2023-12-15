import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();

  @Input()
  public placeHolder: string = "";

  @Input()
  public value: string = "";

  @Output()
  onValue = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe(valor => {
      this.onValue.emit(valor);
    });
  }

  ngOnDestroy(): void {
    this.debouncer.unsubscribe();
  }

  emitirValor(valor: string){
    this.onValue.emit(valor);
  }

  onKeyPress(valor: string){
    this.debouncer.next(valor);
  }
}
