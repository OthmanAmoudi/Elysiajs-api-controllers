import { db } from '../../database';
import { InsertNote, Note, notes } from '../../database/schema';
import { eq } from 'drizzle-orm';
import { NotFoundError } from 'Elysia';

export default class NotesService {
  async getAllNotes(
    limit?: number
  ): Promise<{ id: number; content: string | null }[]> {
    const x = db
      .select({ id: notes.id, content: notes.content })
      .from(notes)
      .limit(limit || 10);
    return x;
  }

  async createNote(data: InsertNote): Promise<Note> {
    console.log(data);
    const result = await db
      .insert(notes)
      .values({ content: data.content })
      .returning();
    // .returning({ id: notes.id, content: notes.content });
    return result[0];
  }

  async getNote(id: number): Promise<Note> {
    const result = await db.select().from(notes).where(eq(notes.id, id));
    if (result.length > 0) {
      return result[0];
    }
    throw new NotFoundError();
  }

  async updateNote(data: InsertNote): Promise<Note> {
    const result = await db
      .update(notes)
      .set({ content: data.content })
      .where(eq(notes.id, data.id!))
      .returning();
    console.log(result);
    if (result.length > 0) {
      return result[0];
    }
    throw new NotFoundError();
  }

  async deleteNote(id: number): Promise<undefined> {
    await db.delete(notes).where(eq(notes.id, id));
  }
}
