import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaSend, categorie } from 'src/app/donation/models/don.model';
import { DonationService } from 'src/app/donation/services/donation.service';

@Component({
  selector: 'app-add-asctuce',
  templateUrl: './add-asctuce.component.html',
  styleUrls: ['./add-asctuce.component.css']
})
export class AddAsctuceComponent {

  @Input() categorie!:categorie
  MediaSend!:MediaSend;
  showmessage:boolean=false;
  showmessageDanger:boolean= false;
  showSpinner!:boolean;
  constructor(
    private donationService:DonationService,
    private http: HttpClient,
  ){}


    formData: FormData | null = null; // Déclarer formData en tant que propriété de la classe
    newFormData:FormData | null = null;
    ngOnInit(): void {
      this.MediaSend = {
        titre: '',
        categorie: '',
        media: '',
        desc: ''
      };
    }


    OnChangesFiles(event: any) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        if (file.type.startsWith('image/')) {
          // Traitement pour les images
          this.formData = new FormData();
          this.formData.append('media', file);
          this.formData.append('titre', this.MediaSend.titre);
          this.formData.append('categorie', this.MediaSend.categorie);
          this.formData.append('desc', this.MediaSend.desc);
          this.formData.append('type', "image");
        } else if (file.type.startsWith('video/')) {
          // Traitement pour les vidéos
          this.formData = new FormData();
          this.formData.append('media', file);
          this.formData.append('titre', this.MediaSend.titre);
          this.formData.append('categorie', this.MediaSend.categorie);
          this.formData.append('desc', this.MediaSend.desc);
          this.formData.append('type', "video");
        } else {
          this.showmessageDanger = true;
        }
      }
    }


  publishMedia(): void {
    this.showSpinner = true;
    if (this.formData) {
      this.http.post('https://app.kofasante.com/api/media', this.formData).subscribe(
        (res: any) => {
          this.showSpinner = false
          this.showmessage = true;
        },
        (error) => {
          this.showSpinner = false
          this.showmessageDanger = true;
        }
      );
    } else {

      this.formData = new FormData();
      this.formData.append('titre', this.MediaSend.titre);
      this.formData.append('categorie', this.MediaSend.categorie);
      this.formData.append('desc', this.MediaSend.desc);
      this.formData.append('type', "aucun");

      this.http.post('https://app.kofasante.com/api/media', this.formData).subscribe(
        (res: any) => {
          this.showmessage = true;
          this.showSpinner = false;
        },
        (error) => {
          this.showSpinner = false
          this.showmessageDanger = true;
        }
      );

    }
  }


}
