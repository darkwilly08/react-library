import { render } from '@testing-library/react';

import IconWrapper from './icon-wrapper';

describe('IconWrapper', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IconWrapper />);
    expect(baseElement).toBeTruthy();
  });
});
