import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { CoreService } from 'src/app/core/services/core.service';
import { environment } from 'src/environments/environment';
import { MassReport } from '../../ReportMass/models/mass-report-model.model'
@Injectable({
  providedIn: 'root'
})
export class MassReportServicesService {

  constructor(
    private http:HttpClient,
    private corservices: CoreService,
  ) { }

  GetMassReport():Observable<MassReport>{
    const MassReport = environment.MassReport;
    return this.http.get<MassReport>(MassReport).pipe(
      catchError(()=>this.corservices.handleError(console.error(),
      ))
    )
  }
}
