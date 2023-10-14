import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestTypeListComponent } from './components/quest-type-list/quest-type-list.component';
import { AddQuestTypeComponent } from './components/add-quest-type/add-quest-type.component';
import { EditQuestTypeComponent } from './components/edit-quest-type/edit-quest-type.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { QuestTypeByIdResolver } from './resolvers/quest-type-by-id.resolver';
import { QuestTypeListResolver } from './resolvers/quest-type-list.resolver';
import { QuestService } from './services/quest.service';
import { QuestTypeFormComponent } from './components/quest-type-form/quest-type-form.component';

const listQuestTypeResolver = {listQuestTypeResolver: QuestTypeListResolver};
// const listMassResolvers = {listMassResolvers: MassListResolver};
// const massDayByIdResolvers = {massDayByIdResolvers: MassDayById, listMassTimeResolver: MassTimeListResolver};
const questTypeByIdResolvers = {questTypeByIdResolvers: QuestTypeByIdResolver};

const questRoutes: Routes = [
  {path: 'liste', component: QuestTypeListComponent, resolve: listQuestTypeResolver},
  {path: 'ajouter-type-quete', component: AddQuestTypeComponent},
  {path: 'modifier-type-quete/:id', component: EditQuestTypeComponent, resolve: questTypeByIdResolvers},
];

@NgModule({
  declarations: [
    QuestTypeListComponent,
    AddQuestTypeComponent,
    EditQuestTypeComponent,
    QuestTypeFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(questRoutes) 
  ],
  providers: [
    QuestService,
    QuestTypeByIdResolver,
    QuestTypeListResolver
  ]
})
export class QuestModule { }
