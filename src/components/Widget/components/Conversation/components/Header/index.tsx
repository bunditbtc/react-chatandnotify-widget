import React from 'react';
//  const close = require('../../../../../../../assets/clear-button.svg') as string;

//  import close from '../../../../../../../assets/clear-button.svg';

//import close from '/assets/clear-button.svg'; // Assuming static assets will be served from the root
import close from '../../../../../../../assets/clear-button.svg';

import './style.scss';

type Props = {
  title: string;
  subtitle: string;
  toggleChat: () => void;
  showCloseButton: boolean;
  titleAvatar?: string;
}

function Header({ title, subtitle, toggleChat, showCloseButton, titleAvatar }: Props) {
  return (
    <div className="rcw-header">
      {showCloseButton &&
        <button className="rcw-close-button" onClick={toggleChat}>
          <img src={close} className="rcw-close" alt="close" />
        </button>
      }
      <h4 className="rcw-title">
        {titleAvatar && <img src={titleAvatar} className="avatar" alt="profile" />}
        {title}
      </h4>
      <span>{subtitle}</span>
    </div>
  );
}

export default Header;