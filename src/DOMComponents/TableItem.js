import PropTypes from 'prop-types';
import { DOMComponent } from '@harvest-profit/doc-flux';

/**
 * Defines `<td>`
 * @module TableItem
 */
export default class TableItem extends DOMComponent {
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
    if (DOM === '') return '';
    return isNaN(DOM) ? DOM : Number(DOM) // Convert strings to numeric values so excel can format them as numbers
  }
}
