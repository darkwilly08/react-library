import { Button } from '@darkwilly08/button';
import './styles/AppBar.scss';

const AppBar = () => {
  const rootClass = 'app-bar';
  return (
    <div className={rootClass}>
      <Button icon="menu" round flat />
      <div className="app-bar__title">title</div>
      <div className={`${rootClass}__right`}>test</div>
    </div>
  );
};

export { AppBar };
