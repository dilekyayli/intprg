import { Uye } from './../../models/Uye';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { Sonuc } from 'src/app/models/Sonuc';
import { FbservisService } from './../../services/fbservis.service';
import { MytoastService } from 'src/app/services/mytoast.service';

@Component({
  selector: 'app-uye',
  templateUrl: './uye.component.html',
  styleUrls: ['./uye.component.scss']
})
export class UyeComponent implements OnInit {
  uyeler!: Uye[];
  modal!: Modal[];
  modalBaslik: string = "";
  secUye!: Uye;
  sonuc: Sonuc = new Sonuc();
  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    adsoyad: new FormControl(),
    mail: new FormControl(),
    admin: new FormControl(),
    parola: new FormControl(),
    kaytarih: new FormControl(),
    duztarih: new FormControl(),
  });
  // fbservis: any;
  // toast: ant;
  constructor(
    public fbservis: FbservisService,
    public toast: MytoastService
  ) { }

  ngOnInit() {
    this.UyeListele();
  }

  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.frm.patchValue({ admin: 0 });
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Üye Ekle";
    this.modal.show();
  }
  Duzenle(uye: Uye, el: HTMLElement) {
    this.frm.patchValue(uye);
    this.modalBaslik = "Üye Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(uye: Uye, el: HTMLElement) {
    this.secUye = uye;
    this.modalBaslik = "Üye Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  uyeListele() {
    this.fbservis.UyeListele().subscribe(d => {
      this.uyeler = d
    });
  }
  UyeSil() {
    this.fbservis.UyeSil(this.secUye).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Üye Silindi";
      this.toast.ToastUygula(this.sonuc);
      this.uyeListele();
      this.modal.toggle();
    });
  }
  UyeEkleDuzenle() {
    var uye: Uye = this.frm.value
    var tarih = new Date();
    if (!uye.id) {
      var filtre = this.uyeler(s => s.mail == uye.mail);
      if (filtre.lenght > 0) {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "Girilen E-Posta Adresi Kayıtlıdır!";
      } else {
        uye.kaytarih = tarih.getTime().toString();
        uye.duztarih = tarih.getTime().toString();
        this.fbservis.UyeEkle(uye).then(d => {
          this.sonuc.islem = true;
          this.sonuc.mesaj = "Üye Eklendi";
          this.toast.ToastUygula(this.sonuc);
          this.uyeListele();
          this.modal.toggle();
        });
      }
    } else {
      uye.duztarih = tarih.getTime().toString();
      this.fbservis.UyeDuzenle(uye).subscribe(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Üye Düzenlendi";
        this.toast.ToastUygula(this.sonuc);
        this.uyeListele();
        this.modal.toggle;
      });
    }


  }
}






