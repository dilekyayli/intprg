import { HomeComponent } from './components/home/home.component';
import { DersComponent } from './components/ders/ders.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UyeComponent } from './components/uye/uye.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dersler', component: DersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
