import { Sort } from '@angular/material/sort';

import { Composition } from './model';

export class Utils {
  /* tslint:disable cyclomatic-complexity */
  static sortComposition(list: Composition[], sort: Sort): Composition[] {
    if (sort && sort.active && sort.direction !== '') {
      return list.sort((a, b) => {
        const isAsc: boolean = sort.direction === 'asc';
        switch (sort.active) {
          case 'artist':
            return Utils.compare(a.artist, b.artist, isAsc);
          case 'title':
            return Utils.compare(a.title, b.title, isAsc);
          case 'type':
            return Utils.compare(a.type, b.type, isAsc);
          default:
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
}