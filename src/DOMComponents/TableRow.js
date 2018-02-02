import PropTypes from 'prop-types';
import { DOMComponent } from '@harvest-profit/doc-flux';
import TableItem from './TableItem';

/**
 * Defines `<tr>`
 * @module TableRow
 */
export default class TableRow extends DOMComponent {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  render() {
    return this.props.children;
  }

  static transform(DOM) {
    return DOM.map((item) => {
      if (item.ref instanceof TableItem) {
        return item.ref.constructor.transform(item.value);
      }
      const blankTableItem = new TableItem();
      const transform = blankTableItem.constructor.transform(blankTableItem.render());
      return transform;
    });
  }
}
