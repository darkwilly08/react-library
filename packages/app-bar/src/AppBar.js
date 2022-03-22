// import { IconWrapper } from '../../icon-wrapper/index.js';
import { IconWrapper } from '@darkwilly08/icon-wrapper';
import './styles/AppBar.scss';

const AppBar = () => {
  const rootClass = 'app-bar';
  return (
    <div className={rootClass}>
      <IconWrapper name="menu" />
      <div>title</div>
      <div className={`${rootClass}__right`}>test</div>
    </div>
  );
};

export { AppBar };
