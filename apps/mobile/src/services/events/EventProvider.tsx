import React from 'react';

import EventEmitter from 'eventemitter3';

import { event } from '.';

const EventContext = React.createContext<EventEmitter>(event);

const EventProvider = ({ children }: { children: React.ReactElement }) => (
  <EventContext.Provider value={event}>{children}</EventContext.Provider>
);

export default EventProvider;

export const useEvent = () => React.useContext(EventContext);
