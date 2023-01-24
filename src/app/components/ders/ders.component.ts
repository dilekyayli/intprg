import { HomeComponent } from './../home/home.component';
import { Sonuc } from './../../models/Sonuc';
import { Ders } from './../../models/Ders';
import { MytoastService } from './../../services/mytoast.service';
import * as bootstrap from 'bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { HomeComponent } from '../home/home.component';
@Component({
  selector: 'app-ders',
  templateUrl: './ders.component.html',
  styleUrls: ['./ders.component.scss']
})
export class DersComponent implements OnInit {
  dersler!: Ders[];
  modal!: Modal;
  modalBaslik: string = "";
  secPro!: Ders;
  sonuc: Sonuc = new Sonuc();
  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    dersAdi: new FormControl(),
    gorsel: new FormControl(),
    ozellik: new FormControl(),
    kaytarih: new FormControl(),
    duztarih: new FormControl(),
  });
  dersListe: any;
  constructor(
    public fbservis: FbservisService,
    public toast: MytoastService
  ) { }

  ngOnInit() {
    this.DersListele();
  }
  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Ders Ekle";
    this.modal.show();
  }
  Duzenle(pro: Ders, el: HTMLElement) {
    this.frm.patchValue(pro);
    this.modalBaslik = "Ders Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(pro: Ders, el: HTMLElement) {
    this.secPro = pro;
    this.modalBaslik = "Ders Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }




  DersListele() {
    this.fbservis.DersListele().subscribe(d => {
      this.dersler = d;
    });
  }

  DersEkleDuzenle() {
    var pro: Ders = this.frm.value;
    this.fbservis.DersEkle(this.frm.value).then(() => {
      var s: Sonuc = new Sonuc();
      s.islem = true;
      s.mesaj = "Ders Eklendi";
      this.toast.ToastUygula(s);
    });
  }
  DersSil() {
    this.fbservis.DersSil(this.secPro.id).subscribe((_d: any) => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Ders Silindi";
      this.toast.ToastUygula(this.sonuc);
      this.DersListele();
      this.modal.toggle();
    });
  }


  
}
