import Centrifuge from "centrifuge";
import omit from "lodash/omit";

interface IParams {
  url: string;
  token: string;
}

let centrifuge: any = null,
  subscriptions: any = {};

export const init = (params: IParams) => {
  const { url, token } = params;
  centrifuge = new Centrifuge(url);
  centrifuge.setToken(token);
  centrifuge.connect();
};

export const signed = (channel: string) => {
  return subscriptions[channel];
};

export const subscribe = (channel: string) => {
  subscriptions[channel] = centrifuge.subscribe(channel);
};

export const unsubscribe = (channel: string) => {
  signed(channel).unsubscribe();
  omit(subscriptions, [channel]);
};

export const on = (type: string, cb: () => void) => {
  centrifuge.on(type, cb);
};

export const send = (channel: string, data: any) => {
  centrifuge.publish(channel, data);
};
