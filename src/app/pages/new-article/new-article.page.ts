import { Article } from 'src/model/Article';
import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { User } from 'src/model/User';
import { take, map } from 'rxjs/operators';
import { Categorie, enumSelector } from 'src/model/Categorie';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.page.html',
  styleUrls: ['./new-article.page.scss'],
})
export class NewArticlePage implements OnInit {
  nom: string;
  description: string;
  categorie: string;
  prix: number;
  currentImage: any;
  imageName;
  uploadPercent;

  catEnum = enumSelector(Categorie);

  user;
  userID;

  constructor(private toastService: ToastService,
              private userService: UserService,
              private afs: AngularFirestore,
              private navController: NavController,
              private camera: Camera,
              private file: File
    ) {
      this.userID = firebase.auth().currentUser.uid;
      this.uploadPercent = 0;
  }

  ngOnInit() {
  }

  submit() {
    const verif = this.checkFields();

    console.log(verif.passed)

    if (!verif.passed) {

      this.toastService.presentToast(verif.message);
      return;
    }

    console.log(this.currentImage);
    if(this.currentImage != null){
      try {
        const newID = this.afs.createId();
        this.afs.collection('articles').doc(newID).set({       
          id: newID,
          categorie: this.categorie,
          date: new Date(),
          description: this.description,
          nom: this.nom,
          prix: this.prix,
          vendeur: (this.userService.currentUser as User).id,
          ville: (this.userService.currentUser as User).ville,
          image: (this.currentImage)
        });
      }catch (e) {
        console.log(e.message);
        alert("File Upload Error " + e.message);
      }

      this.navController.back();
    }
  }

  async pickImage() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    try {
      let cameraInfo = await this.camera.getPicture(options);
      let blobInfo = await this.makeFileIntoBlob(cameraInfo);
      console.log("L'image avant : "+ this.currentImage);
      this.currentImage = (blobInfo as any).fileName;
      console.log("L'image après : " + this.currentImage);
      let uploadInfo: any = await this.uploadToFirebase(blobInfo);

      alert("File Upload Success " + uploadInfo.fileName);
    } catch (e) {
      console.log(e.message);
      alert("File Upload Error " + e.message);
    }
  }

  // FILE STUFF
  makeFileIntoBlob(_imagePath) {
    // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
    return new Promise((resolve, reject) => {
      let fileName = "";
      this.file
        .resolveLocalFilesystemUrl(_imagePath)
        .then(fileEntry => {
          let { name, nativeURL } = fileEntry;

          // get the path..
          let path = nativeURL.substring(0, nativeURL.lastIndexOf("/"));
          console.log("path", path);
          console.log("fileName", name);

          fileName = name;

          // we are provided the name, so now read the file into
          // a buffer
          return this.file.readAsArrayBuffer(path, name);
        })
        .then(buffer => {
          // get the buffer and make a blob to be saved
          let imgBlob = new Blob([buffer], {
            type: "image/jpeg"
          });
          console.log(imgBlob.type, imgBlob.size);
          resolve({
            fileName,
            imgBlob
          });
        })
        .catch(e => reject(e));
    });
  }

  /**
   *
   * @param _imageBlobInfo
   */
  uploadToFirebase(_imageBlobInfo) {
    console.log("uploadToFirebase");
    return new Promise((resolve, reject) => {
      let fileRef = firebase.storage().ref("images/" + _imageBlobInfo.fileName);

      let uploadTask = fileRef.put(_imageBlobInfo.imgBlob);

      uploadTask.on(
        "state_changed",
        (_snapshot: any) => {
          console.log(
            "snapshot progess " +
              (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100
          ); this.uploadPercent =  (_snapshot.bytesTransferred / _snapshot.totalBytes);
        },
        _error => {
          console.log(_error);
          reject(_error);
        },
        () => {
          console.log("OUI");
          resolve(uploadTask.snapshot);
        }
      );
    });
  }

  checkFields(): {passed: boolean, message: string} {
    let passed = true;
    let message = '';

    if (this.prix < 0) {
      passed = false;
      message = 'le prix doit-être superieur ou égale à 0';
    } else if ( this.nom == null ||
                  this.categorie == null || this.prix == null) {
      passed = false;
      message = 'Tout les champs doivent être remplis';
      console.log('nom = ' + this.nom);
      console.log('description = ' + this.description);
      console.log('prix = ' + this.prix);
      console.log('categorie = ' + this.categorie);
    }
    return {passed, message};
  }

}
