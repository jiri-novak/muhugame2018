import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorBase } from '../../_base/value.accessor.base';
import { ElementBase } from '../../_base/element.base';

@Component({
    selector: 'validating-input',
    templateUrl: './validating-input.component.html',
    styleUrls: ['./validating-input.component.scss'],
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: ValidatingInputComponent, multi: true}
    ]
})
export class ValidatingInputComponent extends ElementBase<string> {
    @ViewChild(NgModel) model: NgModel;

    @Input() form: ElementRef;
    @Input() label: string;
    @Input() validationMsg: string;
}