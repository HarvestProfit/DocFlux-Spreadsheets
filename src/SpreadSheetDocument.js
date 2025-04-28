import saveAs from 'save-as';
import { write, utils } from 'xlsx';
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
    this.doc = write(doc, wopts);
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
    return utils.book_new();
  }

  static parser = Parser;
}
