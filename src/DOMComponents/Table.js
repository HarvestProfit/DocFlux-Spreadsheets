import _ from 'lodash';
import XLSX from 'xlsx';
import PropTypes from 'prop-types';
import { DOMComponent } from '@harvest-profit/doc-flux';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableName from './TableName';

/**
 * Defines `<table>`
 * @module Table
 */
export default class Table extends DOMComponent {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  render() {
    return this.props.children;
  }

  static transform(DOM, workbook) {
    if (DOM.length < 1) return workbook;
    const changedWorkBook = { ...workbook };

    let table = [];

    const tableHeader = _.find(DOM, comp => comp.ref instanceof TableHeader);
    const tableBody = _.find(DOM, comp => comp.ref instanceof TableBody);
    const tableName = _.find(DOM, comp => comp.ref instanceof TableName);

    if (tableHeader) {
      table.push(tableHeader.ref.constructor.transform(tableHeader.value));
    }

    if (tableBody) {
      table = [
        ...table,
        ...tableBody.ref.constructor.transform(tableBody.value),
      ];
    }


    let sheetName = 'Sheet';
    if (tableName) {
      sheetName = tableName.ref.constructor.transform(tableName.value);
    }

    const cleanSheetName = name => name
      .replace(/(\/|\\)/g, '-')
      .replace(/\[/g, '(')
      .replace(/\]/g, ')')
      .replace(/(\?|\*)/g, '');

    sheetName = cleanSheetName(sheetName);

    if (sheetName.length > 28) {
      sheetName = sheetName.substring(0, 29);
    }

    const createSheetName = (name, number) => {
      const fullname = `${name} ${number}`;
      if (changedWorkBook.SheetNames.indexOf(fullname) < 0) {
        return fullname;
      }
      return createSheetName(name, number + 1);
    };

    if (changedWorkBook.SheetNames.indexOf(sheetName) >= 0) {
      sheetName = createSheetName(sheetName, 2);
    }

    const worksheet = XLSX.utils.aoa_to_sheet(table);

    changedWorkBook.SheetNames.push(sheetName);
    changedWorkBook.Sheets[sheetName] = worksheet;

    return changedWorkBook;
  }
}
