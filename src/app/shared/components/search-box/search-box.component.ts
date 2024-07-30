import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public onValue = new EventEmitter<string>();
  // public onValue: EventEmitter<string> = new EventEmitter()

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer // el observable emite un valor
      .pipe(
        // cuanto tiempo quiero esperar para hacer la siguiente "mision"
        debounceTime(300)
      )
      // hasta que el observable deja de emitir valores por un segundo no manda el valor al subscribe
      .subscribe((value) => {
        // console.log('debouncer value', value);
        this.onDebounce.emit(value); // el emisor emite el valor
      });
  }

  ngOnDestroy(): void {
    // destruir los subscribe al cambiar de componente
    this.debouncerSubscription?.unsubscribe();
  }

  emitValue(value: string): void {
    this.onValue.emit(value);
  }

  // debouncer. para que busque cuando el usuario deje de escribir
  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }
}
