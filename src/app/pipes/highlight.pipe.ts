import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
  transform(text: string, search: string): any {
    if (!search) return text;
    const regex = new RegExp(search, 'gi');
    return text ? text.replace(regex, (match) => `<mark>${match}</mark>`) : text;
  }
}
