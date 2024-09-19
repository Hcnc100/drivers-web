import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customTransform',
    standalone: true
})
export class CustomTransformPipe implements PipeTransform {
    transform(value: any, transformFn?: (value: any) => any): any {
        return transformFn ? transformFn(value) : value;
    }
}