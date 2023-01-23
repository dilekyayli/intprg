import { Sonuc } from './../../models/Sonuc';
import { MytoastService } from './../../services/mytoast.service';
import { Uye } from './../../models/Uye';
import { FbservisService } from 'src/app/services/fbservis.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public fbservis: FbservisService,
    public toast: MytoastService
  ) { }

  ngOnInit() {
  }
  OturumAc(mail: string, parola: string) {
    this.fbservis.OturumAc(mail, parola).subscribe(d => {
      if (d.lenght > 0) {
        var kayit: Uye = d[0];
        localStorage.setItem("adsoyad", kayit.adsoyad);
        localStorage.setItem("admin", kayit.admin.toString());
        location.href = "/";
      } else {
        var s: Sonuc = new Sonuc();
        s.islem = false;
        s.mesaj = "E-Posta Adresi veya Parola Geçersizdir!";
        this.toast.ToastUygula(s);
      }
    });
  }
}
