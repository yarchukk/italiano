import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

export interface AuthRequest extends Request {
  user?: any;
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Отримуємо initData з заголовка (наприклад: Bearer query_id=...)
    const authHeader = req.headers.authorization || '';
    const initData = authHeader.split(' ')[1]; 

    if (!initData) {
      return res.status(401).json({ error: 'Немає даних авторизації Telegram' });
    }

    // Перевірка підпису Telegram
    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash');
    urlParams.delete('hash');
    urlParams.sort();

    let dataCheckString = '';
    for (const [key, value] of urlParams.entries()) {
      dataCheckString += `${key}=${value}\n`;
    }
    dataCheckString = dataCheckString.slice(0, -1);

    // Твій токен бота з @BotFather (додай його в .env)
    const botToken = process.env.TELEGRAM_BOT_TOKEN; 
    if (!botToken) throw new Error("TELEGRAM_BOT_TOKEN is not set");

    const secretKey = crypto.createHmac('sha256', 'WebAppData').update(botToken).digest();
    const calculatedHash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

    if (calculatedHash !== hash) {
      return res.status(403).json({ error: 'Недійсний підпис Telegram' });
    }

    // Якщо підпис правильний, парсимо дані користувача
    const userString = urlParams.get('user');
    if (userString) {
      const tgUser = JSON.parse(userString);
      // Адаптуємо під твою існуючу логіку (uid як рядок)
      req.user = {
        uid: tgUser.id.toString(),
        email: '', // Telegram не дає email напряму
        name: tgUser.first_name + (tgUser.last_name ? ` ${tgUser.last_name}` : ''),
        username: tgUser.username
      };
      return next();
    }

    return res.status(401).json({ error: 'Дані користувача не знайдені' });
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ error: 'Помилка авторизації' });
  }
};