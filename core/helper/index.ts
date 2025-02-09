import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

export const formatDate = (date: string, forInputFormat = false): string => {
    if (!date) return "";

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return "";

    return format(parsedDate, forInputFormat ? "yyyy-MM-dd" : "dd.MM.yyyy", { locale: tr });
};