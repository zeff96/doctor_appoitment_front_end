import React from "react";
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from "../redux/store";
// import Doctors from "../components/Doctors";

describe('Home test for  rendering', () => {
    test('render all rendering from api', () => {
      const Doctors = render(
        <Provider store={store}>
          <BrowserRouter>
            < Doctors />
          </BrowserRouter>
        </Provider>,
      );
      expect(Doctors).toMatchSnapshot();
    });
  });

