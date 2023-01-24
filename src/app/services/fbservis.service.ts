import { Uye } from './../models/Uye';
import { Gorev } from '../models/Gorev';
import { Ders } from '../models/Ders';
import { Injectable } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { addDoc, updateDoc } from '@firebase/firestroe';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FbservisService {
  UrunSil(id: number) {
    throw new Error('Method not implemented.');
  }
  public apiUrl = "http://localhost:3000/";
  public aktifUye: Uye = new Uye();
constructor(
  public http: HttpClient,
  public fs: Firestore
) { }

OturumAc(mail: string, parola: string) {
  return this.http.get<Uye[]>(this.apiUrl + "users?mail=" + mail + "&parola=" + parola);
}
OturumKontrol() {
  if (localStorage.getItem("adsoyad")) {
    this.AktifUyeBilgi()
    return true;
  } else {
    return false;
  }
}
AktifUyeBilgi() {
  if (localStorage.getItem("adsoyad")) {
    this.aktifUye.adsoyad = localStorage.getItem("adsoyad") || "";
    var admin = localStorage.getItem("admin") || "0";
    this.aktifUye.admin = parseInt(admin);
  }
}



DersListele() {
  var ref = collection(this.fs, "Dersler");
  return collectionData(ref, { idField: 'id' }) as Observable<Ders[]>;
}

DersEkle(ders: Ders) {
  var ref = collection(this.fs, "Dersler");
  return addDoc(ref, ders);
}


UyeListele() {
  var ref = collection(this.fs, "Uyeler");
  return collectionData(ref, { idField: 'id' }) as Observable<Uye[]>;
}
UyeDuzenle(uye: Uye) {
  var ref = doc(this.fs, "Uyeler/" + uye.id);
  return updateDoc(ref, { ...uye });
}

UyeEkle(uye: Uye) {
  var ref = collection(this.fs, "Uyeler");
  return addDoc(ref, uye);
}

UyeSil(uye: Uye) {
  var ref = doc(this.fs, "Uyeler/" + uye.id);
  return deleteDoc(ref);
}






GorevListele() {
  var ref = collection(this.fs, "Gorevler");
  return collectionData(ref, { idField: 'gorevId' }) as Observable<Gorev[]>;
}
GorevEkle(gorev: Gorev) {
  var ref = collection(this.fs, "Gorevler");
  return addDoc(ref, gorev);
}
GorevDuzenle(gorev: Gorev) {
  var ref = doc(this.fs, "Gorevler/" + gorev.gorevId);
  return updateDoc(ref, { ...gorev });
}
GorevSil(gorev: Gorev) {
  var ref = doc(this.fs, "Gorevler/" + gorev.gorevId);
  return deleteDoc(ref);
}







}
