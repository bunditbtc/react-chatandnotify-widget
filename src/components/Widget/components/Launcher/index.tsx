import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import Badge from './components/Badge';
import { GlobalState } from '../../../../store/types';
import { setBadgeCount } from '../../../../store/actions';
import * as actionsTypes from '../../../../store/actions/types';

import './style.scss';

import { Dispatch } from 'redux'; // Import Dispatch type from redux

// const openLauncher = require('../../../../../assets/launcher_button.svg') as string;
// const close = require('../../../../../assets/clear-button.svg') as string;

import openLauncher from '../../../../../assets/launcher_button.svg';
import close from '../../../../../assets/clear-button.svg';

type Props = {
  toggle: () => void;
  chatId: string;
  openLabel: string;
  closeLabel: string;
  closeImg: string;
  openImg: string;
  showBadge?: boolean;
}

function Launcher({ toggle, chatId, openImg, closeImg, openLabel, closeLabel, showBadge }: Props) {
  
  type AppActions =  actionsTypes.SetBadgeCount; 
  const useTypedDispatch = () => useDispatch<Dispatch<AppActions>>(); 
  const dispatch = useTypedDispatch();

  const { showChat, badgeCount } = useSelector((state: GlobalState) => ({
    showChat: state.behavior.showChat,
    badgeCount: state.messages.badgeCount
  }));

  const toggleChat = () => {
    toggle();
    if (!showChat) dispatch(setBadgeCount(0));
  }

  return (
    <button type="button" className={cn('rcw-launcher', { 'rcw-hide-sm': showChat })} onClick={toggleChat} aria-controls={chatId}>
      {!showChat && showBadge && <Badge badge={badgeCount} />}
      {showChat ?
        <img src={closeImg || close} className="rcw-close-launcher" alt={openLabel} /> :
        <img src={openImg || openLauncher} className="rcw-open-launcher" alt={closeLabel} />
      }
    </button>
  );
}

export default Launcher;
