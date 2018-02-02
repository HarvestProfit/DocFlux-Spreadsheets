import PropTypes from 'prop-types';
import { DOMComponent } from '@harvest-profit/doc-flux';
import TableRow from './TableRow';

/**
  * Defines `<tbody>`
  * @module TableBody
  */
export default class TableBody extends DOMComponent {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  render() {
    return this.props.children;
  }

  static transform(DOM) {
    return DOM.map((row) => {
      if (row.ref instanceof TableRow) {
        return row.ref.constructor.transform(row.value);
      }
      return null;
    }).filter(row => row !== null);
  }
}
