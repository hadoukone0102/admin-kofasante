import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'donationTypeColor'
})
export class DonationTypeColorPipe implements PipeTransform {

  transform(isAnonymous: number, isOrganisation: number): string {

    if(isAnonymous === 1) { //anonymous
      return "bg-secondary text-dark";
    }
    else if(isAnonymous === 0 && isOrganisation === 0) {//personal
      return "bg-tertiary text-white"
    }
    else if(isAnonymous === 0 && isOrganisation === 1)//organisation
    { 
      return "bg-primary text-white";
    }
    else{
      return "";
    }
  }

}