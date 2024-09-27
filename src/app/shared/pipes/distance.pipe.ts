import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distance',
  standalone: true
})
export class DistancePipe implements PipeTransform {

  transform(value?: number, ...args: unknown[]): string | undefined {
    if (!value) return;

    if (value >= 1000) {
      return (value / 1000).toFixed(2) + ' km';
    } else {
      return value.toFixed(2) + ' m';
    }
  }

}
