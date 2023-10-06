import { db } from '../../database';
import { notes } from '../../database/schema';
import { eq } from 'drizzle-orm';

export default class NotesService {
  async getAllNotes(limit?: number) {
    return db
      .select()
      .from(notes)
      .limit(limit || 10);
  }

  async createNote(data: { content: string }) {
    const result = await db
      .insert(notes)
      .values({ content: data.content })
      .returning();
    // .returning({ id: notes.id, content: notes.content });
    return result[0];
  }

  async getNote(id: number) {
    const result = await db.select().from(notes).where(eq(notes.id, id));
    return result[0];
  }

  async updateNote(data: { id: number; content: string }) {
    const result = await db
      .update(notes)
      .set({ content: data.content })
      .where(eq(notes.id, data.id))
      .returning();
    return result[0];
  }

  async deleteNote(id: number) {
    await db.delete(notes).where(eq(notes.id, id));
  }
}
