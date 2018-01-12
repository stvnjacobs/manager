import React from 'react';
import { shallow } from 'enzyme';

import TicketResources from '~/support/components/TicketResources';

describe('support/components/TicketResources', () => {
  it('should render without error', () => {
    const wrapper = shallow(
      <TicketResources />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
