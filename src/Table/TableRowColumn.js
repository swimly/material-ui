import React from 'react';

function getStyles(props, context) {
  const {tableRowColumn} = context.muiTheme;

  const styles = {
    root: {
      paddingLeft: tableRowColumn.spacing,
      paddingRight: tableRowColumn.spacing,
      height: tableRowColumn.height,
      textAlign: 'left',
      fontSize: 13,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  };

  if (React.Children.count(props.children) === 1 && !isNaN(props.children)) {
    styles.textAlign = 'right';
  }

  return styles;
}

class TableRowColumn extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * @ignore
     * Number to identify the header row. This property
     * is automatically populated when used with TableHeader.
     */
    columnNumber: React.PropTypes.number,

    /**
     * @ignore
     * If true, this column responds to hover events.
     */
    hoverable: React.PropTypes.bool,

    /**
     * Key for this element.
     */
    key: React.PropTypes.string,

    /**
     * @ignore
     * Callback function for click event.
     */
    onClick: React.PropTypes.func,

    /**
     * @ignore
     * Callback function for hover event.
     */
    onHover: React.PropTypes.func,

    /**
     * @ignore
     * Callback function for hover exit event.
     */
    onHoverExit: React.PropTypes.func,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  };

  static defaultProps = {
    hoverable: false,
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
  };

  state = {
    hovered: false,
  };

  onClick = (event) => {
    if (this.props.onClick) this.props.onClick(event, this.props.columnNumber);
  };

  onMouseEnter = (event) => {
    if (this.props.hoverable) {
      this.setState({hovered: true});
      if (this.props.onHover) this.props.onHover(event, this.props.columnNumber);
    }
  };

  onMouseLeave = (event) => {
    if (this.props.hoverable) {
      this.setState({hovered: false});
      if (this.props.onHoverExit) this.props.onHoverExit(event, this.props.columnNumber);
    }
  };

  render() {
    const {
      children,
      className,
      columnNumber, // eslint-disable-line no-unused-vars
      hoverable, // eslint-disable-line no-unused-vars
      onClick, // eslint-disable-line no-unused-vars
      onHover, // eslint-disable-line no-unused-vars
      onHoverExit, // eslint-disable-line no-unused-vars
      style,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    const handlers = {
      onClick: this.onClick,
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
    };

    return (
      <td
        key={this.props.key}
        className={className}
        style={prepareStyles(Object.assign(styles.root, style))}
        {...handlers}
        {...other}
      >
        {children}
      </td>
    );
  }
}

export default TableRowColumn;
