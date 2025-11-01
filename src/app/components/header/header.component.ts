import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  personalInfo: any;
  photoError: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getPersonalInfo().subscribe(data => {
      this.personalInfo = data;
    });
  }

  getProfilePhoto(): string {
    // Jika photo ada dan tidak error, gunakan photo dari data
    // Jika tidak, gunakan photo dummy
    return !this.photoError && this.personalInfo?.photo
      ? this.personalInfo.photo
      : this.getDummyPhoto();
  }

  getDummyPhoto(): string {
    // Menggunakan UI Avatars service dengan nama user
    const name = this.personalInfo?.name || 'Yusuf Wijaya';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=667eea&color=fff&size=200&bold=true&font-size=0.8`;
  }

  handleImageError(event: any): void {
    console.log('Photo not found, using dummy photo');
    this.photoError = true;
    event.target.src = this.getDummyPhoto();
  }
}
