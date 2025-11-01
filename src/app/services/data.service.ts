import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private basePath = 'assets/data/';

  constructor(private http: HttpClient) { }

  getPersonalInfo(): Observable<any> {
    return this.http.get(`${this.basePath}personal-info.json`);
  }

  getSummary(): Observable<any> {
    return this.http.get(`${this.basePath}summary.json`);
  }

  getExperience(): Observable<any> {
    return this.http.get(`${this.basePath}experience.json`);
  }

  getEducation(): Observable<any> {
    return this.http.get(`${this.basePath}education.json`);
  }

  getCertificates(): Observable<any> {
    return this.http.get(`${this.basePath}certificates.json`);
  }

  getSkills(): Observable<any> {
    return this.http.get(`${this.basePath}skills.json`);
  }

  getLanguages(): Observable<any> {
    return this.http.get(`${this.basePath}languages.json`);
  }
}
