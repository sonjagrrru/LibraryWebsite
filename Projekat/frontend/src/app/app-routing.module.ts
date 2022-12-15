import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { BookComponent } from './book/book.component';
import { BorrowedComponent } from './borrowed/borrowed.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfileComponent } from './profile/profile.component';
import { UnloggedComponent } from './unlogged/unlogged.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: "user", component: UserComponent },
  { path: "admin", component: AdminComponent },
  { path: "", component: HomepageComponent },
  { path: "profile", component: ProfileComponent },
  { path: "book", component: BookComponent },
  { path: "unlogged", component: UnloggedComponent },
  { path: "changePass", component: ChangePasswordComponent },
  { path: "borrowingHistory", component: BorrowedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
