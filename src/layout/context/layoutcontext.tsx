'use client';

import Head from 'next/head';
import React, { useState } from 'react';
import { Breadcrumb, LayoutConfig, LayoutContextProps } from '@/types/layout';
import { ChildContainerProps } from '@/types/types';

export const LayoutContext = React.createContext({} as LayoutContextProps);

export const LayoutProvider = (props: ChildContainerProps) => {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);
  const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>({
    ripple: true,
    inputStyle: 'outlined',
    menuMode: 'compact',
    menuTheme: 'darkgray',
    colorScheme: 'light',
    theme: 'blue',
    scale: 14,
  });

  const [layoutState, setLayoutState] = useState({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    overlaySubmenuActive: false,
    rightMenuVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
    searchBarActive: false,
    resetMenu: false,
    sidebarActive: false,
    anchored: false,
  });

  const onMenuToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isOverlay()) {
      setLayoutState(prevLayoutState => ({
        ...prevLayoutState,
        overlayMenuActive: !prevLayoutState.overlayMenuActive,
      }));
    }
    if (isDesktop()) {
      setLayoutState(prevLayoutState => ({
        ...prevLayoutState,
        staticMenuDesktopInactive: !prevLayoutState.staticMenuDesktopInactive,
      }));
    } else {
      setLayoutState(prevLayoutState => ({
        ...prevLayoutState,
        staticMenuMobileActive: !prevLayoutState.staticMenuMobileActive,
      }));

      event.preventDefault();
    }
  };

  const hideOverlayMenu = () => {
    setLayoutState(prevLayoutState => ({
      ...prevLayoutState,
      overlayMenuActive: false,
      staticMenuMobileActive: false,
    }));
  };

  const toggleSearch = () => {
    setLayoutState(prevLayoutState => ({
      ...prevLayoutState,
      searchBarActive: !layoutState.searchBarActive,
    }));
  };

  const onSearchHide = () => {
    setLayoutState(prevLayoutState => ({
      ...prevLayoutState,
      searchBarActive: false,
    }));
  };

  const showRightSidebar = () => {
    setLayoutState(prevLayoutState => ({
      ...prevLayoutState,
      rightMenuVisible: true,
    }));
    hideOverlayMenu();
  };

  const isOverlay = () => {
    return layoutConfig.menuMode === 'overlay';
  };

  const isSlim = () => {
    return layoutConfig.menuMode === 'slim';
  };

  const isCompact = () => {
    return layoutConfig.menuMode === 'compact';
  };

  const isHorizontal = () => {
    return layoutConfig.menuMode === 'horizontal';
  };

  const isDesktop = () => {
    return window.innerWidth > 991;
  };

  const value = {
    layoutConfig,
    setLayoutConfig,
    layoutState,
    setLayoutState,
    isSlim,
    isCompact,
    isHorizontal,
    isDesktop,
    onMenuToggle,
    toggleSearch,
    onSearchHide,
    showRightSidebar,
    breadcrumbs,
    setBreadcrumbs,
  };

  return (
    <LayoutContext.Provider value={value}>
      <>
        <Head>
          <title>Site da receita</title>
          <meta charSet="UTF-8" />
          <meta
            name="description"
            content="The ultimate collection of design-agnostic, flexible and accessible React UI Components."
          />
          <meta name="robots" content="index, follow" />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <meta property="og:type" content="website"></meta>
          <meta
            property="og:title"
            content="Diamond by PrimeReact for NextJS"
          ></meta>
          <meta
            property="og:url"
            content="https://diamond.primereact.org"
          ></meta>
          <meta
            property="og:description"
            content="The ultimate collection of design-agnostic, flexible and accessible React UI Components."
          />
          <meta
            property="og:image"
            content="https://www.primefaces.org/static/social/diamond-react.png"
          ></meta>
          <meta property="og:ttl" content="604800"></meta>
          <link rel="icon" href={`/favicon.ico`} type="image/x-icon"></link>
        </Head>
        {props.children}
      </>
    </LayoutContext.Provider>
  );
};
