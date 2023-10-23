import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customTimeFormat'
})
export class CustomTimeFormatPipe implements PipeTransform {

  transform(value: string): string {
    const parts = value.split(":");
    const hours = parts[0];
    const minutes = parts[1];
    return `${hours}:${minutes}`;
  }

}
