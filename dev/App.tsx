import { Component,useEffect } from 'react';

import { Widget, addResponseMessage, setQuickButtons, toggleMsgLoader, addLinkSnippet,deleteMessages } from '../index';
//const  { Widget, addResponseMessage, setQuickButtons, toggleMsgLoader, addLinkSnippet }  = require('react-chat-widget');


import { addUserMessage } from '..';
import React from 'react';

// const logo = require('../assets/logo-two.svg')
// const messagelogo = require('../assets/admin-two.svg')

import logo from '../assets/logo-two.svg';
import messagelogo from '../assets/admin-two.svg';

export default class App extends Component {
  
  componentDidMount() {
    addResponseMessage('Welcome to this awesome chat!');
    addLinkSnippet({ link: 'https://google.com', title: 'Google' });
    addResponseMessage('![](https://raw.githubusercontent.com/Wolox/press-kit/master/logos/logo_banner.png)');
    addResponseMessage('Finish Check \n\n ![vertical](https://d2sofvawe08yqg.cloudfront.net/reintroducing-react/hero2x?1556470143)');  
  } 
  
  handleNewUserMessage = (newMessage: any) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message through the backend API   

    toggleMsgLoader();
    setTimeout(() => {
      toggleMsgLoader();
      console.log(newMessage)
      if (newMessage === 'fruits') {
        setQuickButtons([ { label: 'Apple', value: 'apple' }, { label: 'Orange', value: 'orange' }, { label: 'Pear', value: 'pear' }, { label: 'Banana', value: 'banana' } ]);
      } else {
        addResponseMessage(newMessage);
      }
    }, 2000);
  }

  handleQuickButtonClicked = (e: any) => {
    addResponseMessage('Selected ' + e);
    setQuickButtons([]);    
  }

  handleDeleteMessage = (e:any) => {
    deleteMessages(e);
  }

  handleSubmit = (msgText: string) => {
    if(msgText.length < 80) {
      addUserMessage("Uh oh, please write a bit more.");
      return false;
    }
    return true;
  }

  render() {
 
    return (
      <Widget       
        title="MRSYSTEM NOTIFY"
        profileAvatar={messagelogo}
        subtitle="EVERY EVENT FOR YOU"
        senderPlaceHolder="TYPING ..."       
        handleNewUserMessage={this.handleNewUserMessage}
        handleQuickButtonClicked={this.handleQuickButtonClicked}
        imagePreview
        handleSubmit={this.handleSubmit}
        emojis
        titleAvatar={logo}
      />
    );
  }
}
