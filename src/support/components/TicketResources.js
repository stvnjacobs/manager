import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Card, CardHeader } from 'linode-components';
import { ExternalLink } from 'linode-components';

export default class TicketResources extends Component {
  toggleSection(section) {
    return () =>
      this.setState({ hidden: { ...this.state.hidden, [section]: !this.state.hidden[section] } });
  }


  render() {
    const header = !this.props.displayHeader ? null : (
      <CardHeader title={'Resources'} />
    );

    const resources = [
      {
        link: 'https://forum.linode.com/',
        title: 'Community forum',
      },
      {
        link: 'https://linode.com/docs',
        title: 'User documentation and guides',
      },
      {
        link: 'https://developers.linode.com/',
        title: 'Deveoper documentation and guides',
      },
      {
        link: 'https://status.linode.com/',
        title: 'Overall system status',
      },
    ];

    const resourceItems = resources.map((resource) =>
      <li>
        <ExternalLink to={resource.link}>{resource.title}</ExternalLink>
      </li>
    );

    return (
      <Card
        header={header}
        className="TicketResources"
      >
        <ul className="list-unstyled">
          {resourceItems}
        </ul>
      </Card>
    );
  }
}

TicketResources.propTypes = {
  displayHeader: PropTypes.bool,
};
