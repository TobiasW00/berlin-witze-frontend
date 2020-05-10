import React from 'react';
import renderer from 'react-test-renderer';
import Impressum from './Impressum';

describe('Impressum', () => {
  it('Impressum entspricht dem Snapshot', () => {
    const component = renderer.create(<Impressum />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});