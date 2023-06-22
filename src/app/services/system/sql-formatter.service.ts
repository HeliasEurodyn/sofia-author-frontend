import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SqlFormatterService {

  constructor() { }

  beautifySql(sql: string): string {
    const keywords = [
      'SELECT', 'FROM', 'WHERE', 'GROUP BY', 'HAVING',
      'ORDER BY', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET',
      'DELETE FROM', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN',
      'ON', 'AND', 'OR', 'IN', 'NOT IN', 'LIKE', 'LIMIT'
    ];

    let beautifiedSql = '';
    let indentLevel = 0;
    let previousLineWasComma = false;
    const lines = this.splitStringWithSeparatorsRetain(
      sql
        .trim()
        .replace(/[\r\n\t]+/g, ' ')
        .replace(/\s\s+/g, ' ')
      , [...keywords, ' ']);

    for (let line of lines) {

      const trimmedLine = line.trim();

      if (trimmedLine === '') {
        continue;
      }

      if(keywords.includes(line.toUpperCase()) && (indentLevel > 0)){
        line = line.toUpperCase();
        indentLevel--;
      }

      beautifiedSql += '\t'.repeat(indentLevel);
      beautifiedSql += line + '\n';


      if(keywords.includes(line.toUpperCase())){
        indentLevel++;
      }

    }

    return beautifiedSql.trim();
  }

  splitStringWithSeparatorsRetain(input: string, separators: string[]): string[] {
    const separatorPattern = separators.map(sep => `\\${sep}`).join('|');
    const regex = new RegExp(`(${separatorPattern})`);
    return input.split(regex).filter(s => s);
  }

}
