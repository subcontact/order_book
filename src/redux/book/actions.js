import { UPDATE_CHANNEL_ID, UPDATE_PRICE } from "./actionType";

export const updateChannelId = (channelId) => ({
  type: UPDATE_CHANNEL_ID,
  payload: channelId,
});

export const updatePrice = (channelId, prices) => ({
  type: UPDATE_PRICE,
  payload: {
    channelId,
    prices,
  },
});
