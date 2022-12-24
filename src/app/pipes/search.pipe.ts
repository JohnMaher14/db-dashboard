import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(clients:any[] , term:any): any {
    if (term == undefined) {
      return clients;
    }
      return clients.filter(function (clients) {
        return clients.en_title.toLowerCase().includes(term.toLowerCase());
      });
  }

}
