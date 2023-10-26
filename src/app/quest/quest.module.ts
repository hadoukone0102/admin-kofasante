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
import { QuestListTableComponent } from './components/quest-list-table/quest-list-table.component';
import { QuestReportComponent } from './components/quest-report/quest-report.component';
import { QuestBasketComponent } from './components/quest-basket/quest-basket.component';
import { QuestListsComponent } from './components/quest-lists/quest-lists.component';
import { QuestListsResolver } from './resolvers/quest-lists.resolver';
import { QuestModalColumnComponent } from './components/quest-modal/quest-modal-column/quest-modal-column.component';
import { QuestListOriginComponent } from './components/quest-list-origin/quest-list-origin.component';
import { DetailModalComponent } from './components/quest-modal/detail-modal/detail-modal.component';

const listQuestTypeResolver = {listQuestTypeResolver: QuestTypeListResolver};
// const listMassResolvers = {listMassResolvers: MassListResolver};
// const massDayByIdResolvers = {massDayByIdResolvers: MassDayById, listMassTimeResolver: MassTimeListResolver};
const questTypeByIdResolvers = {questTypeByIdResolvers: QuestTypeByIdResolver};
const questListsResolver = { questListsResolver: QuestListsResolver}

const questRoutes: Routes = [
  {path: 'liste', component: QuestTypeListComponent, resolve: listQuestTypeResolver},
  {path: 'ajouter-type-quete', component: AddQuestTypeComponent},
  {path: 'modifier-type-quete/:id', component: EditQuestTypeComponent, resolve: questTypeByIdResolvers},
  {path: 'list-quete', component: QuestListsComponent, resolve: questListsResolver},
  {path: 'bilan', component: QuestReportComponent},
  {path: 'corbeille', component: QuestBasketComponent},
  {path: 'quest', component: QuestListOriginComponent, resolve: questListsResolver},
];

@NgModule({
  declarations: [
    QuestTypeListComponent,
    AddQuestTypeComponent,
    EditQuestTypeComponent,
    QuestTypeFormComponent,
    QuestListTableComponent,
    QuestReportComponent,
    QuestBasketComponent,
    QuestListsComponent,
    QuestModalColumnComponent,
    QuestListOriginComponent,
    DetailModalComponent
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
