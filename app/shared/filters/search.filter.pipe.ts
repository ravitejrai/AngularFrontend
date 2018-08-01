import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Searchfilter'
})

export class SearchFilterPipe implements PipeTransform {

    SearchFilterPipe(){}

   transform(items: Array<any>, searchText: string): Array<any> {
    if(!items) return [];
    if(!searchText) return items;

    searchText = searchText.toLowerCase();
    return items.filter(it => {
        if(it && typeof it === 'object' && it.constructor === Object) {
            var rt = false;
            Object.keys(it).forEach(k => {
                if(it[k] && typeof it[k] === 'object' && it[k].constructor === Object) {
                    Object.keys(it[k]).forEach(x => {
                        if(it[k][x] && typeof it[k][x] === 'string' && it[k][x].toLowerCase().includes(searchText)) {
                            rt = true;
                        }
                    });
                } else if(it[k] && typeof it[k] === 'string' && it[k].toLowerCase().includes(searchText)) {
                    rt = true;
                }
            });
            return rt;
        } else if(it && typeof it === 'string')  {
            return it.toLowerCase().includes(searchText);
        }            
    });
   }
}
