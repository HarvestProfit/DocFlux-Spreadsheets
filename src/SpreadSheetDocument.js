import saveAs from 'save-as';
import * as XLSX from 'xlsx';
import { Document } from '@harvest-profit/doc-flux';
import Parser from './Parser';

/**
 * The generated document object.  Just call download
 * @module GeneratedDocument
 */
class GeneratedDocument {
  constructor(doc, settings) {
    const bookType = settings.type || 'csv';
    const filename = settings.name || 'Untitled';
    const wopts = { bookType, type: 'array' };
    this.filename = filename;
    this.extension = bookType;
    this.doc = XLSX.write(doc, wopts);
  }

  /**
   * Downloads the document
   * @function
   */
  download() {
    /* the saveAs call downloads a file on the local machine */
    saveAs(new Blob([this.doc], { type: 'application/octet-stream' }), `${this.filename}.${this.extension}`);
  }
}

/**
 * The DocFlux Document (exported as Document).
 * @module SpreadSheetDocument
 */
export default class SpreadSheetDocument extends Document {
  static documentSettings() {
    return {};
  }

  static createDocument(doc, props) {
    return new GeneratedDocument(doc, this.documentSettings(props));
  }
  static createBuilder() {
    return XLSX.utils.book_new();
  }

  static parser = Parser;
}
