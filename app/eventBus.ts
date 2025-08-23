// utils/eventBus.ts or a similar path
type Callback = () => void;

const subscribers: Callback[] = [];

export const onTokenRefreshed = (callback: Callback) => {
  subscribers.push(callback);
};

export const triggerTokenRefreshed = () => {
  subscribers.forEach((callback) => callback());
};

let logoutCallbacks: (() => void)[] = [];

export const onForceLogout = (cb: () => void) => {
  logoutCallbacks.push(cb);
};

export const triggerForceLogout = () => {
  logoutCallbacks.forEach((cb) => cb());
};

