import { Injectable } from '@angular/core';
import { default as swal } from 'sweetalert2';

@Injectable()
export class DialogService {
    confirm(title: string, message: string, okText?: string, cancelText?: string) {
        return swal({
            title: title,
            text: message,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: okText || 'Ok',
            cancelButtonText: cancelText || 'Zrušit',
            confirmButtonClass: 'btn btn-primary',
            cancelButtonClass: 'btn btn-default m-l-10',
            buttonsStyling: false
        })
    };

    error(title: string, message: string) {
        return swal(
            title,
            message,
            'error'
        )
    };

    success(title: string, message: string) {
        return swal(
            title,
            message,
            'success'
        )
    };
}