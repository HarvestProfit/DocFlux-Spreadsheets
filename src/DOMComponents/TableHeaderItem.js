import PropTypes from 'prop-types';
import { DOMComponent } from '@harvest-profit/doc-flux';

/**
 * Defines `<th>`
 * @module TableHeaderItem
 */
export default class TableHeaderItem extends DOMComponent {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.any).isRequired,
  }

  static defaultProps = {
    children: [''],
  }

  render() {
    return this.props.children.map(c => `${c}`).join('');
  }

  static transform(DOM) {
    return DOM;
  }
}
