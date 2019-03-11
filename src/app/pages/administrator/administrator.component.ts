import { User } from './../../store/user.store';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {

  constructor(private auth: AuthService,
    public user:User,
    private router: Router
    ) { }

  ngOnInit() {
  }
  
  logout(){
    this.auth.signOut().then(()=>{
      this.router.navigate(['/']);
    }).catch(error=>{
      alert(error);
    })
  }
}
