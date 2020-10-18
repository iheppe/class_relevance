import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultComponent } from './result/result.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  {path: '',  redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: UploadComponent },
  { path: 'result', component: ResultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }