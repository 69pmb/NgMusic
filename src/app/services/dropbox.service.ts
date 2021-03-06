import { Injectable } from '@angular/core';
import * as Dropbox from 'dropbox';

import { UtilsService } from './utils.service';
import { Dropbox as DropboxConstante } from '../utils/dropbox';

@Injectable({ providedIn: 'root' })
export class DropboxService {

  constructor(
    private serviceUtils: UtilsService
  ) { }

  getDbx(): Dropbox.Dropbox {
    return new Dropbox.Dropbox({ accessToken: DropboxConstante.DROPBOX_TOKEN });
  }

  listFiles(folder: string): Promise<Dropbox.files.ListFolderResult> {
    return this.getDbx().filesListFolder({ path: folder })
      .then((response: Dropbox.files.ListFolderResult) => response)
      .catch((err) => { this.serviceUtils.handleError(err); return undefined; });
  }

  getPath(fileName: string): string {
    return DropboxConstante.DROPBOX_FOLDER + fileName;
  }

  uploadFile(fichier: Blob, fileName: string): Promise<Dropbox.files.FileMetadata> {
    const pathFile = this.getPath(fileName);
    return this.getDbx().filesDeleteV2({ path: pathFile })
      .then((response: Dropbox.files.DeleteResult) => {
        return this.getDbx().filesUpload({ path: pathFile, contents: fichier });
      }).catch((err) => this.serviceUtils.handlePromiseError(err));
  }

  uploadNewFile(fichier: string, fileName: string): Promise<Dropbox.files.FileMetadata> {
    const pathFile = this.getPath(fileName);
    return this.getDbx().filesUpload({ path: pathFile, contents: fichier })
      .then(() => new Promise<void>((resolve, reject) => resolve()))
      .catch((err) => this.serviceUtils.handlePromiseError(err));
  }

  downloadFile(fileName: string): Promise<any> {
    return this.getDbx().filesDownload({ path: this.getPath(fileName) })
      .then((response: any) => {
        const fileReader = new FileReader();
        return new Promise((resolve, reject) => {
          fileReader.onerror = () => {
            fileReader.abort();
            reject(new DOMException('Problem parsing input file.'));
          };
          fileReader.onload = () => {
            return resolve(fileReader.result.toString());
          };
          fileReader.readAsBinaryString(response.fileBlob);
        });
      })
      .catch((err) => this.serviceUtils.handleError(err));
  }
}
