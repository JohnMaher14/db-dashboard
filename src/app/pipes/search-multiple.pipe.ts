import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchMultiple'
})
export class SearchMultiplePipe implements PipeTransform {

  // transform(items: any[], keyword: any, properties: string[]): any[] {
  //   if (!items) return [];
  //   if (!keyword) return items;
  //   debugger;
  //   return items.filter(item => {
  //     var itemFound: Boolean;
  //     for (let i = 0; i < properties.length; i++) {
  //       if (item[properties[i]].toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
  //         itemFound = true;
  //         break;
  //       }
  //     }
  //     return itemFound!;
  //   });

  // }
  transform(value: any[], field: string, args: string): any[]{
    let filter: any = args ? args.toLocaleLowerCase() : null;
    return filter ? value.filter((item : any) =>
        item[field].toLocaleLowerCase().indexOf(filter) != -1) : value;
  }
}
