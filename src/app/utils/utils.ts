import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';

import { Composition, Fichier } from './model';

export class Utils {
  static sortComposition(list: Composition[], sort: Sort): Composition[] {
    console.log('list', list);
    console.log('sort', sort);
    if (sort && sort.active && sort.direction !== '') {
      return list.sort((a, b) => {
        const isAsc: boolean = sort.direction === 'asc';
        if (['artist', 'title', 'type'].includes(sort.active)) {
          return Utils.compare(a[sort.active].trim().toLowerCase(), b[sort.active].trim().toLowerCase(), isAsc);
        } else if (['score', 'rank'].includes(sort.active)) {
          return Utils.compare(a[sort.active], b[sort.active], isAsc);
        } else if ('size' === sort.active) {
          return Utils.compare(a.size, b.size, isAsc);
        } else if ('sizeC' === sort.active && a.displayedFileList && b.displayedFileList) {
          return Utils.compare(a.displayedFileList.length, b.displayedFileList.length, isAsc);
        } else {
          return 0;
        }
      });
    } else {
      return list;
    }
  }

  static sortFichier(list: Fichier[], sort: Sort): Fichier[] {
    if (sort && sort.active && sort.direction !== '') {
      return list.sort((a, b) => {
        const isAsc: boolean = sort.direction === 'asc';
        if (['category', 'name', 'type', 'author'].includes(sort.active)) {
          return Utils.compare(a[sort.active].trim().toLowerCase(), b[sort.active].trim().toLowerCase(), isAsc);
        } else if (['rangeBegin', 'rangeEnd', 'rank', 'publish', 'sorted'].includes(sort.active)) {
          return Utils.compare(a[sort.active], b[sort.active], isAsc);
        } else if (sort.active === 'creation') {
          return Utils.compareDate(a.creation, b.creation, isAsc);
        } else if (['size', 'sizeF'].includes(sort.active)) {
          return Utils.compare(a.size, b.size, isAsc);
        } else {
          return 0;
        }
      });
    } else {
      return list;
    }
  }

  static compare(a: any, b: any, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  static compareDate(a: string, b: string, isAsc: boolean): number {
    const year1: string = a.split('/')[0];
    const month1: string = a.split('/')[1];
    const year2: string = b.split('/')[0];
    const month2: string = b.split('/')[1];
    let result: number;
    if (year1 < year2) {
      result = -1;
    } else if (year1 > year2) {
      result = 1;
    } else {
      if (month1 < month2) {
        result = -1;
      } else if (month1 > month2) {
        result = 1;
      }
    }
    return result * (isAsc ? 1 : -1);
  }

  static filterByFields<T>(items: T[], fields: string[], value: any): T[] {
    if (!items || items === undefined) {
      return [];
    }
    if (value === undefined || value.length === 0) {
      return items;
    }
    const val = value.toLowerCase();
    return items.filter(item => {
      return fields.some(field => {
        let it = item[field];
        if (it) {
          it = typeof it === 'string' ? it.toLowerCase() : it.toString();
          return it.includes(val);
        }
      });
    });
  }

  static paginate<T>(list: T[], page: PageEvent): T[] {
    return list.slice(page.pageIndex * page.pageSize, (page.pageIndex + 1) * page.pageSize);
  }
}
