export class Fichier {
  category: string;
  creation: string;
  name: string;
  rangeBegin: number;
  rangeEnd: number;
  rank: number;
  size: number;
  sorted: number; // 0: false, 1: true

  constructor(category: string, creation: string, name: string, rangeBegin: string, rangeEnd: string,
    rank: string, size: string, sorted: string) {
    this.category = category;
    this.creation = creation;
    this.name = name;
    this.rangeBegin = +rangeBegin;
    this.rangeEnd = +rangeEnd;
    this.rank = +rank;
    this.size = +size;
    this.sorted = sorted === 'true' ? 1 : 0;
  }
}

export class Composition {
  id: number;
  artist: string;
  title: string;
  sArtist: string;
  sTitle: string;
  score: number;
  size: number;
  decile: number;
  type: string;
  deleted: number; // 0: false, 1: true
  fileList: Fichier[];

  constructor(artist: string, title: string, type: string, deleted: string,
    sArtist: string, sTitle: string, score: string, size: string, decile: string) {
    this.artist = artist;
    this.title = title;
    this.type = type;
    this.sArtist = sArtist;
    this.sTitle = sTitle;
    this.score = +score / 10;
    this.size = +size;
    this.decile = +decile;
    this.deleted = deleted === 'true' ? 1 : 0;
  }
}

export class Dropdown {
  label: string;
  code: string;

  constructor(label: string, code: string) {
    this.label = label;
    this.code = code;
  }
}
