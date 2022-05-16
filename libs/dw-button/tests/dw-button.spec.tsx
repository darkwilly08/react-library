import { render, cleanup, screen, fireEvent } from '@testing-library/react';

import { DwButton, ButtonProps } from '../src';

const mockProps: ButtonProps = {
  onClick: jest.fn(),
};

describe('Button', () => {
  beforeEach(() => {
    cleanup();
  });

  it('should render successfully', () => {
    const { container } = render(<DwButton onClick={mockProps.onClick} />);
    expect(container).toMatchSnapshot();
    expect(container).not.toBeEmptyDOMElement();
  });
  it('should render flat button', () => {
    mockProps.flat = true;
    const { container } = render(<DwButton onClick={mockProps.onClick} flat={mockProps.flat} />);
    expect(container).toMatchSnapshot();
    expect(container).not.toBeEmptyDOMElement();
  });

  it('should render round button', () => {
    mockProps.round = true;
    const { container } = render(<DwButton onClick={mockProps.onClick} round={mockProps.round} />);
    expect(container).toMatchSnapshot();
    expect(container).not.toBeEmptyDOMElement();
  });

  it('should render left icon button', () => {
    mockProps.icon = 'home';
    const { container } = render(<DwButton onClick={mockProps.onClick} icon={mockProps.icon} />);
    expect(container).toMatchSnapshot();
    expect(container).not.toBeEmptyDOMElement();
    expect(screen.getByText(/home/)).toBeInTheDocument();
  });

  it('should render icon on round button', () => {
    mockProps.icon = 'home';
    mockProps.round = true;
    const { container } = render(
      <DwButton onClick={mockProps.onClick} icon={mockProps.icon} round={mockProps.round} />,
    );
    expect(container).toMatchSnapshot();
    expect(container).not.toBeEmptyDOMElement();
    expect(screen.getByText(/home/)).toBeInTheDocument();
  });

  it('should render text button', () => {
    mockProps.text = 'I am the text';
    const { container } = render(<DwButton onClick={mockProps.onClick} text={mockProps.text} />);
    expect(container).toMatchSnapshot();
    expect(container).not.toBeEmptyDOMElement();
    expect(screen.getByText(/I am the text/)).toBeInTheDocument();
  });

  it('should ignore text and right icon on round button', () => {
    mockProps.text = 'I am the text';
    mockProps.rightIcon = 'home';
    mockProps.round = true;
    const { container } = render(
      <DwButton
        onClick={mockProps.onClick}
        text={mockProps.text}
        rightIcon={mockProps.rightIcon}
        round={mockProps.round}
      />,
    );
    expect(container).toMatchSnapshot();
    expect(container).not.toBeEmptyDOMElement();
    expect(screen.queryByText(/I am the text/)).not.toBeInTheDocument();
    expect(screen.queryByText(/home/)).not.toBeInTheDocument();
  });

  it('should render right icon', () => {
    mockProps.rightIcon = 'home';
    const { container } = render(<DwButton onClick={mockProps.onClick} rightIcon={mockProps.rightIcon} />);
    expect(container).toMatchSnapshot();
    expect(container).not.toBeEmptyDOMElement();
    expect(screen.getByText(/home/)).toBeInTheDocument();
  });

  it('should render colored button', () => {
    mockProps.textColor = 'red';
    mockProps.color = 'green';
    mockProps.text = 'red text over green background';
    const { container } = render(
      <DwButton
        onClick={mockProps.onClick}
        text={mockProps.text}
        color={mockProps.color}
        textColor={mockProps.textColor}
      />,
    );
    expect(container).toMatchSnapshot();
    expect(container).not.toBeEmptyDOMElement();
    expect(screen.getByText(/red text over green background/)).toBeInTheDocument();
  });
});

describe('Button behavior', () => {
  beforeEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
  it('fire onClick event', () => {
    render(<DwButton onClick={mockProps.onClick} />);
    const rippleButton = screen.getByRole(/button/).parentNode;
    if (!rippleButton) {
      throw new Error('ripple button not found!');
    }
    fireEvent.click(rippleButton);
    expect(mockProps.onClick).toHaveBeenCalled();
  });
});
