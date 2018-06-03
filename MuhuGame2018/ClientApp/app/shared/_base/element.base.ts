import {NgModel} from '@angular/forms';
import {Observable} from 'rxjs';
import {ValueAccessorBase} from './value.accessor.base';

export abstract class ElementBase<T> extends ValueAccessorBase<T> {
  protected abstract model: NgModel;
}