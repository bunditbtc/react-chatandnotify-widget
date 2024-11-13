import { createReducer } from '../../utils/createReducer';
import { BehaviorState } from '../types';
import { produce } from 'immer';

import {
  BehaviorActions,
  TOGGLE_CHAT,
  TOGGLE_INPUT_DISABLED,
  TOGGLE_MESSAGE_LOADER
} from '../actions/types';

const initialState = {
  showChat: false,
  disabledInput: false,
  messageLoader: false
};

const behaviorReducerImmer = {
  [TOGGLE_CHAT]: (state: BehaviorState) =>
    produce(state,draft =>{
      draft.showChat = !draft.showChat
    }),
  //  ({ ...state, showChat: !state.showChat}),

  [TOGGLE_INPUT_DISABLED]: (state: BehaviorState) =>
    produce(state,draft =>{
      draft.disabledInput = !draft.disabledInput
    })
  ,
  //  ({ ...state, disabledInput: !state.disabledInput }),

  [TOGGLE_MESSAGE_LOADER]: (state: BehaviorState) => 
   produce(state,draft =>{
     draft.messageLoader = !draft.messageLoader
   })
  // ({ ...state, messageLoader: !state.messageLoader })
};

const behaviorReducer = {
  [TOGGLE_CHAT]: (state: BehaviorState) => ({ ...state, showChat: !state.showChat}),

  [TOGGLE_INPUT_DISABLED]: (state: BehaviorState) => ({ ...state, disabledInput: !state.disabledInput }),

  [TOGGLE_MESSAGE_LOADER]: (state: BehaviorState) => ({ ...state, messageLoader: !state.messageLoader })
};

export default (state: BehaviorState = initialState, action: BehaviorActions) => createReducer(behaviorReducerImmer, state, action);