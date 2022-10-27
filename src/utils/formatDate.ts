import {format} from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const formatDate = (date:Date) => format(date,'MMM dd', {locale: ptBR})