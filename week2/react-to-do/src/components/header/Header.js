import { TopBar, ActionList, Icon, Text } from '@shopify/polaris';
import { ArrowLeftIcon, QuestionCircleIcon } from '@shopify/polaris-icons';

export default function Header() {
  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={[
        { items: [{ content: 'Back to Shopify', icon: ArrowLeftIcon }] },
        { items: [{ content: 'Community forums' }] },
      ]}
      name="Dharma"
      detail="Jaded Pixel"
      initials="D"
    />
  );

  const searchResultsMarkup = (
    <ActionList
      items={[{ content: 'Shopify help center' }, { content: 'Community forums' }]}
    />
  );

  const searchFieldMarkup = (
    <TopBar.SearchField placeholder="Search" showFocusBorder />
  );

  const secondaryMenuMarkup = (
    <TopBar.Menu
      activatorContent={
        <span>
          <Icon source={QuestionCircleIcon} />
          <Text as="span" visuallyHidden>Secondary menu</Text>
        </span>
      }
      actions={[{ items: [{ content: 'Community forums' }] }]}
    />
  );

  return (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      secondaryMenu={secondaryMenuMarkup}
      searchField={searchFieldMarkup}
      searchResults={searchResultsMarkup}
    />
  );
}
