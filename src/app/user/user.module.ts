import { ProjectModule } from '../project/project.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { MaterialModule } from '@angular/material'

import { User } from './user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewAllUserComponent } from './view-all/view-all.component';
import { UserDetailsComponent } from './details/details.component';

import { UserService } from '../shared/cuser.service';

export const routes = [
  { path: '', component: User, pathMatch: 'full' },
  { path: 'add', component: AddUserComponent, pathMatch: 'full' },
  { path: 'all', component: ViewAllUserComponent, pathMatch: 'full' },
  { path: 'details', component: UserDetailsComponent, pathMatch: 'full' }
];

// import * as admin from 'firebase-admin';
// let serviceAccount = {
//   "type": "service_account",
//   "project_id": "mis-animation",
//   "private_key_id": "bb3cf1bb8ff92beb32dc0b26e7722c7e88c12b57",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC8hqy52/7vf/jB\nxXoi7mznM+/Tbai4hqsh9NNJV6JSbfXiAT4m4A+8sK4f6wxayInvXDwI1F8qpD/o\nzsZz3n8nO7BpUKsBfChOgeo10oTz9yoYTpdirsyrdXKurxxFLMW7MH5oH7ThaKzC\nWuuJNiGlKtAubBsxHNCpxewXJFB43il//ZHSRC3iFI69Ls1hVGQgYYnMVgfVGhOh\nvQuWbdSkbK0BFHSRTOPf2GYgBHwzQzOxnRbhGTxyGHmwAyuX21VxOZZPRDggPJSl\nf2AnJISXnunmK88em1Mgy40iftmExQGkN9WkEYCJ26D45GkGC+xGIETdx9NUbyLG\nFfp5JV4FAgMBAAECggEAHAIkGi65dsp74gndJeBnNIguSqqBhPyY4yAU3dITrwxg\nGdYWbj8eh2l2TQ6mFLyzZWi+EI/AnbyuM/+4UxGMsX74LAVMiplwAY3ihmGC2B3x\n1o+ihQo0JQr7YUFpwUswCynetch0HoLnG67XTFjK8ddk+2ibN5Yw1/AsLZn7DKGv\nnAjrDf6yuhAuruKv8+suvs3TXLpRY6/PyBFrFwmVr+iUxLrzQ3SdPBE67KBPRzuH\nAlW0Iymj3JwRwR82gIqeXbeMPrMqLnshyfl+Z6+di/B2DTXn1wUIVcLj0UpjhGuC\nZe7kidlSVuzLa0ziLH7JwbuXyrdlz+4Pp/+4G/kEkQKBgQDhBM9UTkzdhYY4Oh+T\nm/MuZwMNg9TV2L6HQl5/RGr6rAzdcDJEeF4wyTVbSD6o0PrtyK2NdRmPyBsmK9US\nTn6/xD29U8WanN8TAd/ckxETz+i0Y995NAKQxv6AXdumIzpRaPdMET4Xnd3865Oq\nAXk+xDwe0rfqFjF4KMW2JwNVzQKBgQDWe50dX/OPtQv/ex9Y8DhmK0EqJJ+WMASI\neKGoCL3aatibxikB+3Ydn0S3k8lZ+clgqp26OY/S/gyr8nqzGyK+LyKu3jGROwaF\nzcNXUqisJdpcpC13bbWNuyumPAp4heQP/cxS6uW0ZutYWj2AIO5GensHfvgTbzpM\neLQ+EjzxGQKBgDprnESAG7a7rvA0LvSM3aMjfYhpvL1Ui4rkcVJLehbgympHcdWT\nBqlV4/NyG0qLD0ri+iQqzdslkd7kLGqXVJMHKRxZfok4xzXRG8TRrfJd3UXQVDnM\nhgn+kB7Vv2wv4zk1rlbidyN8iiDbLLhLr6XbHtzFypgM8QUIWOSE1nnVAoGAL6QD\ncQvoEMqZIKVbgCjTjjYbYl4CKJz/1MReu/E9Im/LL0ajwzH0uX2wCMrF1bt69ILR\nSBUTEj2l2OeiQ3hKjk3v+UGXZvfiagQbWKEeoCZES4GYK8ftpM6nUmRRuxWaY8bv\nBJfyb9DQg65/rJ8j7fm0rCSSu9Zf76578rGgYbkCgYEA2ISobO1L6JhDRo4CXnGm\nYOBdxdE+qGSYMpaOJp3P3P3MnK3nUigeRxsGe/iyauSxc/ZAng9oT0X3/poOy5RE\nnem7k+enxjMcH9MVBzX+YlbhKZ0HciO/JnAeSWeVrwUN+kSh++hMgldlyoxKcDCY\n1Z6bUP624xeQ1+kBjAIJGCQ=\n-----END PRIVATE KEY-----\n",
//   "client_email": "firebase-adminsdk-p1h4e@mis-animation.iam.gserviceaccount.com",
//   "client_id": "110401927321766871944",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://accounts.google.com/o/oauth2/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-p1h4e%40mis-animation.iam.gserviceaccount.com"
// }

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://mis-animation.firebaseio.com"
// });

@NgModule({
  declarations: [
    User,
    AddUserComponent,
    ViewAllUserComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AngularFireAuthModule,
    RouterModule.forChild(routes),
    AngularFireDatabaseModule
  ],
  providers: [UserService]
})
export class UserModule {
  static routes = routes;
}
