import { UPDATE_CHANNEL_ID, UPDATE_INITIAL_PRICE } from "./actionType";

export const updateChannelId = (channelId) => ({
  type: UPDATE_CHANNEL_ID,
  payload: channelId,
});

export const updateInitialPrice = (channelId, prices) => ({
  type: UPDATE_INITIAL_PRICE,
  payload: {
    channelId,
    prices,
  },
});
