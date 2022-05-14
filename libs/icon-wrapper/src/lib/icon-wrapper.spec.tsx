import { render } from '@testing-library/react';

import { IconWrapper, IconWrapperProps } from './icon-wrapper';

describe('IconWrapper', () => {
  const mockProps: IconWrapperProps = {
    name: 'home',
  };
  it('should render successfully', () => {
    const { container } = render(<IconWrapper name={mockProps.name} />);
    expect(container).not.toBeEmptyDOMElement();
  });
});
