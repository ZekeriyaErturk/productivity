export interface Event {
  id?: string;
  title: string;
  start: string;
  end?: string;
  eventUid: string;
  eventUser: string;
  allDay: boolean;
}
