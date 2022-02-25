let sub: PushSubscription | null = null;

export const setSubscription = (subscription: PushSubscription) => {
  sub = subscription;
};

export const getSubscription = (): PushSubscription | null => {
  return sub;
};
