import { ColorHex } from '@/constants/colors';

export type DecorationTemplate = {
  label: string;
  hex: ColorHex;
};

export type AddTemplateEvent = {
  event: 'ADD';
  payload: DecorationTemplate;
};

export type ApplyTemplateEvent = {
  event: 'APPLY';
  payload: DecorationTemplate;
};

export type DeleteTemplateEvent = {
  event: 'DELETE';
  payload: DecorationTemplate;
};

export type ClearTemplateEvent = {
  event: 'CLEAR';
};

export type CustomMessageEventEnums =
  | AddTemplateEvent['event']
  | ApplyTemplateEvent['event']
  | DeleteTemplateEvent['event']
  | ClearTemplateEvent['event'];

export type CustomMessageEvent =
  | AddTemplateEvent
  | DeleteTemplateEvent
  | ApplyTemplateEvent
  | ClearTemplateEvent;
