import { useEffect, useState } from "react";
import { SettingKeys } from "../lib/helpers/setting.helper";
import { MenuCategory, MenuData } from "../lib/models/menu-data.model";
import { UserRole, UserServiceStatus } from "../lib/modules/user/user.model";
import useAuth from "./use-auth";
import useSettings from "./use-settings";

const useMenu = (): [MenuData[], MenuCategory[], boolean] => {
  const settings = useSettings();
  const [menu, setMenu] = useState<MenuData[]>(null);
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>(null);
  const [useCategory, setUseCategory] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    if (auth && settings) {
      const useCategorySetting = settings.find((set) => set.key === SettingKeys.USE_MENU_CATEGORY);

      const menuCategoriesSetting = settings.find((set) => set.key === SettingKeys.MENU_CATEGORIES);

      if (menuCategoriesSetting) {
        setMenuCategories(menuCategoriesSetting.value);
      }

      if (useCategorySetting) {
        setUseCategory(useCategorySetting.value);
      }

      const adminMenuSetting = settings.find((set) => set.key === SettingKeys.ADMIN_MENU);

      const editorMenuSetting = settings.find((set) => set.key === SettingKeys.EDITOR_MENU);

      let menuData: MenuData[] = null;
      if (auth.role === UserRole.ADMIN) {
        menuData = adminMenuSetting.value as MenuData[];
      }

      if (auth.role === UserRole.EDITOR) {
        menuData = editorMenuSetting.value as MenuData[];
      }

      setMenu(menuData);
    }
  }, [auth, settings]);

  return [menu, menuCategories, useCategory];
};

export default useMenu;
