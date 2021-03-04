
import { Injectable, ɵConsole } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import { ToasterService } from "./toaster.service";

@Injectable({
    providedIn: 'root'
})
export class Synch{


    users = [];
    constructor(private firestore: AngularFirestore,
                private storage: Storage,
                private toast: ToasterService)
    {

    }

    // authUser()
    // {
    //     this.getUser();
    //     this.setAuthUser(this.users);
    // }

    // setAuthUser(f)
    // {
    //     this.setUser(f);
    // }

    // setUser(f)
    // {
    //     if (f.length !== 0)
    //     {
    //         let a;
    //         for (a = 0; a < f.length; a++)
    //         {
    //             const t = f[a];
    //             t.indiceDoc = Date.now();
    //             t.dateModif = Date.now();
    //             this.firestore.collection('Users').doc(t.indiceDoc.toString()).set(t);
    //         }
    //         this.users = [];
    //     }

    // }

    // getUser()
    // {
    //     this.firestore.collection('Users').valueChanges().subscribe(val => {
    //         if (val.length !== 0)
    //         {
    //             this.storage.set('Users', val);
    //         }
    //     });
    // }

    setThing(f, document, p, message)
    {
        let test = false; 
        if (f.length !== 0)
        {
            let a;
            for (a = 0; a < f.length; a++)
            {
                const t = f[a];
                if (t.docId === 0)
                {
                    t.docId = Date.now();
                    this.firestore.collection(document).doc(t.docId.toString()).set(t);
                    test = true;
                }
            }
        }
        else{
            this.firestore.collection(document).get().subscribe(val => {
                if (val.docs)
                {
                    let a = 0;
                    const va = val.docs;
                    for (a = va.length; a > 0; a--)
                    {
                        let tab;
                        tab = va[a-1].data();
                        this.dropData(document, tab.docId, 0, '');
                    }
                }
            });
        }

        if (test)
        {
            if (p == 1)
            {
                this.toast.ToastWithOptions('', message , 'bottom', {duration: 2500, color: 'success'});
            }
        }
        this.getThing(document); 
    }

    async    getThing(document)
    {
        this.firestore.collection(document).valueChanges().subscribe(val => {
            if (val.length !== 0)
            {
                this.storage.set(document, val);
            }
        });
    }

    dropData(collection, docId, bool , message)
    {
        this.firestore.collection(collection).get().subscribe(val => {
            let a = 0;
            if (val)
            {
                const va = val.docs;
                for (a = 0; a < va.length; a++)
                {
                    let tab;
                    tab = va[a].data();
                    if (tab.docId === docId)
                    {
                        this.firestore.collection(collection).doc(docId.toString()).delete();
                        if (bool === 1)
                        {
                            this.toast.ToastWithOptions('Suppression', message,'bottom' , {duration: 2500, color: 'danger'});
                        }
                    }
                }
            }
        });
        this.getThing(collection);
    }


}