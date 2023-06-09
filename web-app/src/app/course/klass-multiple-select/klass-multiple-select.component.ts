import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Klass} from '../../norm/entity/Klass';
import {KlassService} from '../../service/klass.service';

@Component({
  selector: 'app-klass-multiple-select',
  templateUrl: './klass-multiple-select.component.html',
  styleUrls: ['./klass-multiple-select.component.sass']
})
export class KlassMultipleSelectComponent implements OnInit {
  klasses$: Observable<Klass[]>;

  @Output()
  changed = new EventEmitter<Klass[]>();
  @Input()
  item: Array<Klass>;

  klasses: Array<Klass>;
  constructor(private klassService: KlassService) {
  }

  ngOnInit() {
    this.klasses$ = this.klassService.all();
    this.klasses = this.item;
  }

  onChange($event: Array<Klass>) {
    this.changed.emit($event);
  }
}
