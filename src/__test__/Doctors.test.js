import React from "react";
// import { BrowserRouter } from "react-router-dom";
import { render } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { store } from "../redux/store";
 import Doctors from "../components/Doctors";

describe('Home test for  rendering', () => {
    test('render all rendering from api', () => {
      const { container } = render(<Doctors />);
      expect(Doctors).toMatchSnapshot();
    });
  });

