import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './admin/components/profile/profile.component';
import { LoginComponent } from './admin/components/login/login.component';
import { ForgotPasswordComponent } from './admin/components/forgot-password/forgot-password.component';
import { GLOBAL_RESOLVERS, environment } from 'src/environments/environment';
import { CountryCodeResolver } from './admin/resolvers/country-code.resolver';
import { AuthGuard } from './admin/guards/auth.guard';
import { ConfirmCodeSmsComponent } from './admin/components/confirm-code-sms/confirm-code-sms.component';
import { ResetPasswordComponent } from './admin/components/reset-password/reset-password.component';
import { AccessGuard } from './admin/guards/access.guard';
import { IsResettingPasswordGuard } from './admin/guards/is-resetting-password.guard';

const listProfileResolvers = {...GLOBAL_RESOLVERS};
// const listAnoResolvers = {...{listAnonymous: ListAnonymousResolver}, ...GLOBAL_RESOLVERS};
/**
 * ROLES POSSIBLES
 * 
 * Curé
 * Vicaire
 * Secrétaire
 * Financier
 * Responsable de catéchèse
 * Président du conseil paroissiale
 */

const routes: Routes = [
  {path: 'dashboard', loadChildren: () => import('./global/global.module').then(m => m.GlobalModule), 
    canActivate: [AuthGuard, AccessGuard],
    data:{
      roles: environment.allRoles
    }
  }, 
  {path: 'dons', loadChildren: () => import('./donation/donation.module').then(m => m.DonationModule), 
    canActivate: [AuthGuard, AccessGuard],
    data:{
      roles: environment.allRoles_Without_HeadOfCatechesis
    }
  }, 
  {path: 'messes', loadChildren: () => import('./mass/mass.module').then(m => m.MassModule), 
    canActivate: [AuthGuard, AccessGuard],
    data:{
      roles: environment.allRoles_Without_HeadOfCatechesis
    }
  }, 
  {path: 'quetes', loadChildren: () => import('./quest/quest.module').then(m => m.QuestModule), 
    canActivate: [AuthGuard, AccessGuard],
    data:{
      roles: environment.allRoles_Without_HeadOfCatechesis
    }
  }, 
  {path: 'profil', component: ProfileComponent, resolve: listProfileResolvers, 
    canActivate: [AuthGuard, AccessGuard],
    data:{
      roles: environment.allRoles
    }
  }, 
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), 
    canActivate: [AuthGuard, AccessGuard],
    data:{
      roles: environment.superAdmins
    },
  }, 
  {path: 'mot-de-passe-oublie', component: ForgotPasswordComponent, resolve: {countryCode: CountryCodeResolver}}, 
  {path: 'login', component: LoginComponent}, 
  {path: 'confirmer-code-sms', component: ConfirmCodeSmsComponent, canActivate: [IsResettingPasswordGuard]}, 
  {path: 'reinitialiser-mot-de-passe', component: ResetPasswordComponent, resolve: {countryCode: CountryCodeResolver}, canActivate: [IsResettingPasswordGuard]}, 
  {path:'', redirectTo:'dashboard', pathMatch:'full'},
  {path:'**', redirectTo:'/page-introuvable'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
