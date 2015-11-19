import { isUnsafe } from './unsafe.import';
import { filterPropsFrom } from './lib/filter_props_from.import';

export class Th extends React.Component {
    render() {
        if (isUnsafe(this.props.children)) {
            return <th {...filterPropsFrom(this.props)}
                dangerouslySetInnerHTML={{__html: this.props.children.toString()}}/>
        } else {
            return <th {...filterPropsFrom(this.props)}>
                {this.props.children}
            </th>;
        }
    }
};

