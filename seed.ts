import { db } from "./src/db/index.ts";
import { vocabulary, phrases } from "./src/db/schema.ts";

async function seed() {
  console.log("Seeding database...");
  
  const existingVocab = await db.select().from(vocabulary).limit(1);
  if (existingVocab.length === 0) {
    await db.insert(vocabulary).values([
      { category: "Food", italian: "Pane", ukrainian: "Хліб", pronunciation: "Пане" },
      { category: "Food", italian: "Acqua", ukrainian: "Вода", pronunciation: "Аква" },
      { category: "Food", italian: "Caffè", ukrainian: "Кава", pronunciation: "Каффе" },
      { category: "Food", italian: "Latte", ukrainian: "Молоко", pronunciation: "Латте" },
      { category: "Transport", italian: "Biglietto", ukrainian: "Квиток", pronunciation: "Більєтто" },
      { category: "Transport", italian: "Treno", ukrainian: "Поїзд", pronunciation: "Трено" },
      { category: "Transport", italian: "Stazione", ukrainian: "Станція/Вокзал", pronunciation: "Стаціоне" },
      { category: "Health", italian: "Medico", ukrainian: "Лікар", pronunciation: "Медіко" },
      { category: "Health", italian: "Farmacia", ukrainian: "Аптека", pronunciation: "Фармачія" },
      { category: "Documents", italian: "Passaporto", ukrainian: "Паспорт", pronunciation: "Пассапорто" },
      { category: "Documents", italian: "Permesso", ukrainian: "Дозвіл", pronunciation: "Пермессо" },
    ]);
  }

  const existingPhrases = await db.select().from(phrases).limit(1);
  if (existingPhrases.length === 0) {
    await db.insert(phrases).values([
      { category: "Greetings", italian: "Buongiorno", ukrainian: "Добрий день", pronunciation: "Буонджорно" },
      { category: "Greetings", italian: "Ciao", ukrainian: "Привіт / Бувай", pronunciation: "Чао" },
      { category: "Greetings", italian: "Come stai?", ukrainian: "Як справи?", pronunciation: "Коме стай?" },
      { category: "Expressions", italian: "Grazie", ukrainian: "Дякую", pronunciation: "Граціє" },
      { category: "Expressions", italian: "Per favore", ukrainian: "Будь ласка", pronunciation: "Пер фаворе" },
      { category: "Expressions", italian: "Non capisco", ukrainian: "Я не розумію", pronunciation: "Нон капіско" },
      { category: "Health", italian: "Ho bisogno di un medico", ukrainian: "Мені потрібен лікар", pronunciation: "О бізоньо ді ун медіко" },
      { category: "Health", italian: "Mi sento male", ukrainian: "Я погано почуваюся", pronunciation: "Мі сенто малє" },
      { category: "Transport", italian: "Dov'è la stazione?", ukrainian: "Де вокзал?", pronunciation: "Дове ла стаціоне?" },
      { category: "Transport", italian: "Quanto costa il biglietto?", ukrainian: "Скільки коштує квиток?", pronunciation: "Куанто коста іль більєтто?" },
    ]);
  }
  console.log("Database seeded.");
  process.exit(0);
}

seed().catch(console.error);
