import { Td } from './td.import';
import { toArray } from './lib/to_array.import';
import { filterPropsFrom } from './lib/filter_props_from.import';

export class Tr extends React.Component {
    componentDidMount() {
        if (this.props.print) {
            const node = ReactDOM.findDOMNode(this);
            this.setState({width: node.clientWidth});
        }

    }
    render() {
        var children = toArray(React.Children.children(this.props.children));
        const {print} = this.props;
        if (
            this.props.data &&
                this.props.columns &&
                    typeof this.props.columns.map === 'function'
        ) {
            if (typeof(children.concat) === 'undefined') { console.log(children); }

            children = children.concat(this.props.columns.map(function(column, i) {
                if (this.props.data.hasOwnProperty(column.key)) {
                    var value = this.props.data[column.key];
                    var props = {};

                    if (
                        typeof(value) !== 'undefined' &&
                            value !== null &&
                                value.__reactableMeta === true
                    ) {
                        props = value.props;
                        value = value.value;
                    }

                    return <Td onClick={(e) => this.props.onClickItem(column.key, value, e)} column={column} print={print} key={column.key} {...props}>{value}</Td>;
                } else {
                    return <Td onClick={(e) => this.props.onClickItem(column.key, undefined, e)} column={column} print={print} key={column.key} />;
                }
            }.bind(this)));
        }

        // Manually transfer props
        var props = filterPropsFrom(this.props);
        if (this.state && this.state.width) {
            //props.style= { width: this.state.width };
        }
        return React.DOM.tr(props, children);
    }
}

Tr.childNode = Td;
Tr.dataType = 'object';

Tr.defaultProps = {
    onClickItem: () => {}
};

