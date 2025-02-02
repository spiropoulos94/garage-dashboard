import { MenuItemProps } from "../components/common/MenuItem";

export const findActiveItem = (items: MenuItemProps[], pathname: string): MenuItemProps | null => {
  const itemsMatchingPath = items.filter((item) => pathname.includes(item.href));
  const sortedItems = itemsMatchingPath.sort((a, b) => b.href.length - a.href.length);
  return sortedItems.length > 0 ? sortedItems[0] : null;
};
