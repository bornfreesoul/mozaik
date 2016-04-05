import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import _                               from 'lodash';
import ComponentRegistry               from './../component-registry';
import ApiConsumerMixin                from './../mixins/ApiConsumerMixin';
import InspectorItem                   from './InspectorItem.jsx';


class Inspector extends Component {
    constructor(props) {
        super(props);

        this.state = { info: null };
    }

    getApiRequest() {
        return { id: 'mozaik.inspector' };
    }

    onApiData(info) {
        this.setState({ info });
    }

    render() {
        const { info } = this.state;

        const items = [];

        const widgetTypes = _.keys(ComponentRegistry.list());
        items.push(<InspectorItem key="widgets" label="widgets" icon="columns" count={widgetTypes.length} />);

        if (info) {
            items.push(<InspectorItem key="apis" label="APIs" icon="plug" count={info.apis.length} />);
            items.push(<InspectorItem key="clients" label="connected clients" icon="user" count={info.clientCount} />);
            items.push(<InspectorItem key="uptime" label={`uptime ${info.uptime}`} icon="clock-o" />);
        }

        return (
            <div>
                <div className="widget__header">
                    Mozaïk <span className="widget__header__subject">inspector</span>
                    <i className="fa fa-stethoscope" />
                </div>
                <div className="widget__body">
                    {items}
                </div>
            </div>
        );
    }
}

Inspector.displayName = 'Inspector';

Inspector.propTypes = {};

reactMixin(Inspector.prototype, ListenerMixin);
reactMixin(Inspector.prototype, ApiConsumerMixin);


export default Inspector;
