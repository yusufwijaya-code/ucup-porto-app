import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-certificates',
  imports: [CommonModule],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.scss',
})
export class CertificatesComponent implements OnInit {
  certificates: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getCertificates().subscribe(data => {
      this.certificates = data;
    });
  }

  getTotalCertificates(): number {
    return this.certificates.length;
  }

  getActiveCertificates(): number {
    const currentYear = new Date().getFullYear();
    return this.certificates.filter(cert => {
      const year = parseInt(cert.period.split('/')[1]);
      return year >= currentYear - 1;
    }).length;
  }

  getOrganizationsCount(): number {
    const organizations = new Set(this.certificates.map(cert => cert.issuer));
    return organizations.size;
  }

  getLatestYear(): number {
    const years = this.certificates.map(cert => {
      const yearPart = cert.period.split('/')[1];
      return parseInt(yearPart) || new Date().getFullYear();
    });
    return Math.max(...years);
  }

  getStatusClass(period: string): string {
    const currentYear = new Date().getFullYear();
    const year = parseInt(period.split('/')[1]);

    if (year >= currentYear) return 'active';
    if (year >= currentYear - 2) return 'recent';
    return 'completed';
  }

  getStatusText(period: string): string {
    const currentYear = new Date().getFullYear();
    const year = parseInt(period.split('/')[1]);

    if (year >= currentYear) return 'Active';
    if (year >= currentYear - 2) return 'Recent';
    return 'Completed';
  }

  // Optional: Method to handle certificate link clicks
  openCertificate(link: string): void {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  }
}
