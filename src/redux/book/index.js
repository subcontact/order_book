import { UPDATE_CHANNEL_ID, UPDATE_INITIAL_PRICE } from "./actionType";

const initialState = {
  channelId: 0,
  bids: {}, // price as id
  asks: {}, // price as id
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CHANNEL_ID:
      return {
        ...state,
        channelId: action.payload,
      };
    case UPDATE_INITIAL_PRICE:
      const {
        channelId,
        prices: { bids, asks },
      } = action.payload;

      if (channelId !== state.channelId) return state;

      return {
        ...state,
        bids,
        asks,
      };
    default:
      return state;
  }
};

export default bookReducer;
