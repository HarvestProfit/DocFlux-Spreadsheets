// import PropTypes from 'prop-types';
import { Document } from '@harvest-profit/doc-flux-spreadsheets';
// import defaultPdfStyles from '../defaultPdfStyles';
import ImageSample from './components/ImageSample';

export default class ImageSampleSheet extends Document {
  // static stylesheet() {
  //   return {};
  // }

  // Allows you to debug, but download will not work
  // static createDocument(docDefinition) {
  //   console.log(docDefinition);
  // }

  static documentSettings() {
    return {
      name: 'Image Sample',
      type: 'xlsx',
    }
  }

  static component = ImageSample;
}
