import { t } from 'Elysia';

export const NoteBody = t.Object({
  content: t.String({
    error: 'content is required with minimum length of 5',
    minLength: 5,
  }),
});

export const NoteResponse = t.Object({
  id: t.Number(),
  content: t.String(),
});

export const FullNoteResponse = t.Object({
  id: t.Number(),
  content: t.String(),
  createdAt: t.Date(),
  updateAt: t.Date(),
});

export const NoteListResponse = t.Array(NoteResponse);
export const NoteParams = t.Object({ id: t.Numeric() });
export const NoteQuery = t.Object({ limit: t.Optional(t.Numeric()) });
