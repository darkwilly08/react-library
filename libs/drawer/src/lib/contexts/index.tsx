import React, { createContext } from 'react';
import { DrawerContextModel } from '../models';

export const DrawerContext = createContext<DrawerContextModel>({
  title: 'This is the title',
  menu: [
    {
      icon: 'home',
      title: 'Home',
      action: () => alert('Welcome to @darkwilly08 library'),
      href: '/home',
    },
  ],
  children: <div>Welcome!</div>,
});

export function DrawerProvider(props: DrawerContextModel) {
  return <DrawerContext.Provider value={props}>{props.children}</DrawerContext.Provider>;
}
