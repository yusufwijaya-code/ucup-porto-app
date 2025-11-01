import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-languages',
  imports: [CommonModule],
  templateUrl: './languages.component.html',
  styleUrl: './languages.component.scss',
})
export class LanguagesComponent implements OnInit {
  languages: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getLanguages().subscribe(data => {
      this.languages = data;
    });
  }

  getProficiencyLevel(level: string): number {
    const levelMap: { [key: string]: number } = {
      'Basic': 30,
      'Intermediate': 60,
      'Advanced': 90,
      'Native': 100
    };
    return levelMap[level] || 30;
  }

  getProficiencyClass(level: string): string {
    const levelMap: { [key: string]: string } = {
      'Basic': 'basic',
      'Intermediate': 'intermediate',
      'Advanced': 'advanced',
      'Native': 'native'
    };
    return levelMap[level] || 'basic';
  }

  getLanguageDescription(level: string): string {
    const descriptionMap: { [key: string]: string } = {
      'Basic': 'Basic communication skills',
      'Intermediate': 'Comfortable with daily conversations',
      'Advanced': 'Fluent in professional settings',
      'Native': 'Native speaker proficiency'
    };
    return descriptionMap[level] || 'Language proficiency';
  }

  getTotalLanguages(): number {
    return this.languages.length;
  }

  getNativeLanguages(): number {
    return this.languages.filter(lang => lang.level === 'Native').length;
  }

  getIntermediatePlusCount(): number {
    return this.languages.filter(lang =>
      lang.level === 'Intermediate' || lang.level === 'Advanced' || lang.level === 'Native'
    ).length;
  }

  getCountriesCount(): number {
    const countries = new Set(this.languages.map(lang => lang.icon));
    return countries.size;
  }
}
