export interface DrawerContextModel {
  title?: string | null;
  logo?: string | null;
  menu: DrawerItem[];
  children: React.ReactNode;
}

export interface DrawerItem {
  title: string;
  icon?: string | null;
  action?: (() => void) | null;
  href?: string | null;
  children?: DrawerItem[] | null;
}
