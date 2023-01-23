import { Sonuc } from './../../models/Sonuc';
import { MytoastService } from './../../services/mytoast.service';
import { Gorev } from '../../models/Gorev';
import { FbsservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DersComponent } from '../ders/ders.component';
import { UyeComponent } from '../uye/uye.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  Duzenle(_t25: any,arg1: any) {
  throw new Error('Method not implemented.');
  }
  modalSil: any;
  modalEkleDuzenle: any;
  servis: any;
  dersler: any;
  Ekle(arg0:any) {
  throw new Error('Method not implemented');
  }
  mevcutGorevler: Gorev[] = [];
  eskiGorevler: Gorev[] = [];
  frm: FormGroup = new FormGroup({
    baslik: new FormControl(),
    aciklama: new FormControl(),
    tamam: new FormControl()
  });
  constructor(
    public fbservis: FbsservisService,
    public toast: MytoastService
  ) { }

  ngOnInit() {
    this.GorevListele();
  }
  GorevListele() {
    this.fbservis.GorevListele().subscribe(d => {
      this.mevcutGorevler = d.filter(s => s.tamam == false || s.tamam == null);
      this.eskiGorevler = d.filter(s => s.tamam == true);
    });
  }
  Kaydet() {
    console.log(this.frm.value);
    this.fbservis.GorevEkle(this.frm.value).then(() => {
      var s: Sonuc = new Sonuc();
      s.İslem = true;
      s.mesaj = "Görev Eklendi";
      this.toast.ToastUygula(s);
    });
  }
  Sil(gorev: Gorev) {
    this.fbservis.GorevSil(gorev).then(() => {
      var s: Sonuc = new Sonuc();
      s.islem = true;
      s.mesaj = "Görev Silindi";
      this.toast.ToastUygula(s);
    });
  }
  TamamIptal(gorev: Gorev, d: boolean) {
    gorev.tamam = d;
    this.fbservis.GorevDuzenle(gorev).then(() => {
      var s: Sonuc = new Sonuc();
      s.islem = true;
      s.mesaj = "Görev Güncellendi";
      this.toast.ToastUygula(s);
    });
  }
}
