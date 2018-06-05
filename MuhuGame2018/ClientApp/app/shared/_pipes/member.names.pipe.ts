import { Pipe, PipeTransform } from '@angular/core';
import { Member } from '../_models';

@Pipe({ name: 'memberNames' })
export class MemberNamesPipe implements PipeTransform {
    transform(value: Member[]): string {
        return value.filter(x => x.name != null).map(x => x.name).join(', ');
    }; 
}