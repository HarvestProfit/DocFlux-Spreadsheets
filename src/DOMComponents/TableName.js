import PropTypes from 'prop-types';
import { DOMComponent } from '@harvest-profit/doc-flux';

/**
 * Defines `<tname>`.  For Excel documents, sets the name of the page/table
 * @module TableName
 */
export default class TableName extends DOMComponent {
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
