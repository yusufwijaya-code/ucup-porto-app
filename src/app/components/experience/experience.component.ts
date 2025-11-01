import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  experiences: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getExperience().subscribe(data => {
      this.experiences = data;
    });
  }

  getCompanyInitials(company: string): string {
    return company
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  getTechnologies(position: string): string[] {
    const techMap: { [key: string]: string[] } = {
      'Software Engineer': ['Yii2', 'Angular', 'PHP', 'JavaScript', 'MySQL', 'REST API'],
      'Backend Web Developer': ['PHP Native', 'MySQL', 'JavaScript', 'REST API', 'PDF Generation']
    };

    return techMap[position] || ['Various Technologies'];
  }
}
