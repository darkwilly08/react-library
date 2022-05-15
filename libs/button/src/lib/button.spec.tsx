import { render } from '@testing-library/react';

import { Button, ButtonProps } from './button';

describe('Button', () => {
  const mockProps: ButtonProps = {
    onClick: jest.fn(),
  };
  it('should render successfully', () => {
    const { container } = render(<Button onClick={mockProps.onClick} />);
    expect(container).not.toBeEmptyDOMElement();
  });
});
