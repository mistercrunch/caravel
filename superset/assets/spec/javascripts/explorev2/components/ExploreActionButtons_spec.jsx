import React from 'react';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { shallow } from 'enzyme';
import ExploreActionButtons from
  '../../../../javascripts/explorev2/components/ExploreActionButtons';

describe('ExploreActionButtons', () => {
  const defaultProps = {
    canDownload: 'True',
    formData: {
      datasource: '1__table'
    },
  };

  it('renders', () => {
    expect(
      React.isValidElement(<ExploreActionButtons {...defaultProps} />)
    ).to.equal(true);
  });

  it('should render 5 children/buttons', () => {
    const wrapper = shallow(<ExploreActionButtons {...defaultProps} />);
    expect(wrapper.children()).to.have.length(5);
  });
});
