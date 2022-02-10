import { lazier } from 'eth-hooks/helpers';

// use lazy/lazier for react lazy loading

/**
 * lazy/lazier loaded component
 */
export const MainPage = lazier(() => import('./MainPage'), 'MainPage');
/**
 * lazy/lazier loaded component
 */
export const MainPageFooter = lazier(() => import('./MainPageFooter'), 'MainPageFooter');
/**
 * lazy/lazier loaded component
 */
export const MainPageHeader = lazier(() => import('./MainPageHeader'), 'MainPageHeader');
/**
 * lazy/lazier loaded component
 */
export const MainPageMenu = lazier(() => import('./MainPageMenu'), 'MainPageMenu');

export const MintPage = lazier(() => import('./MintPage'), 'MintPage');

export const StakingPage = lazier(() => import('./StakingPage'), 'StakingPage');
