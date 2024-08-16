import {connectToDatabase}  from '../../config/db';
import { Person } from '../models/person.model';

export class PersonRepository {
  // Método para insertar un personaje en la base de datos
  async insertPerson(person: Person): Promise<number> {
    const db = await connectToDatabase();
    const [result] = await db.query(
      `INSERT INTO people (name, height, mass, hair_color, skin_color, eye_color, birth_year, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        person.name,
        person.height,
        person.mass,
        person.hair_color,
        person.skin_color,
        person.eye_color,
        person.birth_year,
        person.gender,
      ]
    );

    // Retornar el ID generado por la inserción
    return (result as any).insertId;
  }

  // Método para obtener un personaje por ID
  async getPersonById(id: number): Promise<Person | null> {
    const db = await connectToDatabase();
    const [rows] = await db.query(
      `SELECT * FROM people WHERE id = ?`,
      [id]
    );

    const people = rows as Person[];
    return people.length > 0 ? people[0] : null;
  }
  // Método para obtener un personaje por ID
  async getPersonByName(name: string): Promise<Person | null> {
    const db = await connectToDatabase();
    const [rows] = await db.query(
      `SELECT * FROM people WHERE name = ?`,
      [name]
    );

    const people = rows as Person[];
    return people.length > 0 ? people[0] : null;
  }
}