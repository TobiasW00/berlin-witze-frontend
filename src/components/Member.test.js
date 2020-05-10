import Member from './Member';
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router'

const memberjson = {"requestguid":"","action":"user.single","msg":"","state":"OK","content":{"webpage":"","lat":50,"lng":13,"email":"granville76@gmx.de","messagetype":"0","created":"2019-08-30T20:49:09.672653Z","public":true,"fskcheck":false,"tags":"","fantasies":[],"dates":[],"id":"e890cbe8-5919-4b0a-6aa2-273b1d4707e9","name":"Granville","genre":2,"online":false,"agegroup":"1970","description":"","modified":"2019-08-30T20:49:09.672653Z","picture":false}};

describe('renders Member', () => {
  it('render without any props', () => {
    const component = mount(<MemoryRouter initialEntries={[ { pathname: '/', key: 'testKey' } ]}><Member member={memberjson.content} /></MemoryRouter>);
     expect(component).toMatchSnapshot(); // {key: expect.any(String)}
    component.unmount();
  });
});


