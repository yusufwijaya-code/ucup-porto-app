import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        console.log('Projects loaded:', this.projects); // Debug log
      },
      error: (error) => {
        console.error('Error loading projects:', error);
      }
    });
  }

  getTotalProjects(): number {
    return this.projects.length;
  }

  getTechnologiesCount(): number {
    const allTech = this.projects.flatMap(project => project.technologies);
    return new Set(allTech).size;
  }

  getClientsCount(): number {
    const clients = new Set(this.projects.map(project => project.client));
    return clients.size;
  }

  openProject(link: string): void {
    if (link && link !== 'https://example.com/') {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      console.log('Project link not available');
    }
  }

  // Tambahkan method untuk handle image error
  handleImageError(event: any, project: any): void {
    console.error(`Error loading image for project: ${project.projectName}`, event);
    // Fallback ke placeholder
    event.target.style.display = 'none';
    const placeholder = event.target.parentElement.querySelector('.thumbnail-placeholder');
    if (placeholder) {
      placeholder.style.display = 'flex';
    }
  }
}
