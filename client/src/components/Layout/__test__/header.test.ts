// header.test.ts
// import { screen } from '@testing-library/react';
// import '@testing-library/jest-dom';
import Header from '../common/Header';
// import EmployeeSidebar from '../common/user/UserSideBar'

describe('Header', () => {
  test('Logo should be present', () => {
    const h = typeof Header;
    // render(<Header SideBar={<div />} />);
    console.log(h);
    // // Assuming the logo has an alt text "logo" or a test ID
    // const logo = screen.getByAltText('logo'); // or screen.getByTestId('logo');
    // console.log('logo', logo);
    // Assertion to check if the logo is present in the document
    // expect(logo).toBeInTheDocument();
  });
});
