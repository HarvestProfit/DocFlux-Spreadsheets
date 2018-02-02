import PropTypes from 'prop-types';
import { DOMComponent } from '@harvest-profit/doc-flux';
import TableHeaderItem from './TableHeaderItem';

/**
 * Defines `<thead>`
 * @module TableHeader
 */
export default class TableHeader extends DOMComponent {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  render() {
    return this.props.children;
  }

  static transform(DOM) {
    return DOM.map((item) => {
      if (item.ref instanceof TableHeaderItem) {
        return item.ref.constructor.transform(item.value);
      }
      const blankTableItem = new TableHeaderItem();
      const transform = blankTableItem.constructor.transform(blankTableItem.render());
      return transform;
    });
  }
}
