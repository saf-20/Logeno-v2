import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Synch } from './synchronisation';
import { ToasterService } from './toaster.service';

@Injectable({
    providedIn: 'root'
})
export class AdderService{

    /*Cette partie est reservee a l'administrateur*/
    test = 0;
    years = [];
    users = [];
    students = [];
    branchs = [];
    topics = [];
    teachers = [];
    notes = [];

    tables = [
        'Teachers',
        'Users', 
        'Students',
        'Branchs',
        'Years',
        'NoNames',
        'TampNoNames',
        'Notes',
        'Topics'
    ]


    /* secretaire */
    plus2 = 0;
    nonames = [];
    tampNonames = [];

        /*notes a la validation*/
    lookNotes = [];
    constructor(private storage: Storage,
                private sync: Synch,
                private loadingController: LoadingController,
                private toast: ToasterService)
    {
        this.synchroniseAll(0);
    }


    synchroniseAll(p)
    {
        if (p == 0)
        {
            for (let ting of this.tables)
            {
                this.sync.getThing(ting)
            }
    
            this.getAllStorage()
        }
        else{
            for (let ting of this.tables)
            {
                this.sync.getThing(ting)
            }
    
            this.getAllStorage()
        }
    }


    getAllStorage()
    {
        this.storage.get('Users').then(val => {
            if (val)
            {
                this.users = val;
                // this.sync.setThing(val, 'Users');
            }
        });

        this.storage.get('Teachers').then(val => {
            if (val)
            {
                this.teachers = val;
            }
        });


        this.storage.get('Students').then(val => {
            if (val)
            {
                this.students = val;
            }
        });

        this.storage.get('Branchs').then(val => {
            if (val)
            {
                this.branchs = val;
            }
        });

        this.storage.get('Topics').then(val => {
            if (val)
            {
                this.topics = val;
            }
        });

        this.storage.get('Years').then(val => {
            if (val)
            {
                this.years = val;
            }
        });

        this.storage.get('NoNames').then(val => {
            if (val)
            {
                this.nonames = val;
            }
        });

        this.storage.get('TampNoNames').then(val => {
            if (val)
            {
                this.tampNonames = val;
            }
        });


        this.storage.get('Notes').then(val => {
            if (val)
            {
                this.notes = val;
            }
        });

    }

    addYear(f)
    {
        const year = 
        {
          code: 'UJ'+ this.years.length + 'P2',
          name: f.name,
          begin: f.begin,
          end: f.end,
          docId: 0
        }
        
        this.years.push(year);
        this.sync.setThing(this.years, 'Years', 1 , 'Ajout de l\'annee avec succes!');
        // this.storage.set('Years', this.years);
    }

    addThing(f)
    {
        if (this.test === 1)
        {
            const student = {
                matricule: f.matricule,
                studentName: f.name,
                surname: f.surname,
                bithDate: f.birthDate,
                password: f.password,
                schoolYear: this.years[this.years.length - 1].code,
                docId: 0,
                level: f.level,
                branch: f.branch,
                cycle: f.cycle,
                option: f.option,
                place: f.place
            }
            this.students.push(student);
            this.sync.setThing(this.students, 'Students', 1, 'Ajout de l\'etudiant avec success!');
            // this.storage.set('Students', this.students);
            
            const user = {
                matricule: f.matricule,
                userName: f.name,
                surname: f.surname,
                statut: 'etudiant',
                password: f.password,
                schoolYear: this.years[this.years.length - 1].code,
                docId: 0,
            }
            this.users.push(user);
            this.sync.setThing(this.users, 'Users', 0, '');
            // this.storage.set('Users', this.users);
        }
        else if (this.test === 4)
        {
            const user = {
                matricule: f.matricule,
                userName: f.name,
                surname: f.surname,
                statut: f.statut,
                password: f.password,
                schoolYear: this.years[this.years.length - 1].code,
                docId: 0,
            }
            this.users.push(user);
            // this.storage.set('Users', this.users);
            this.sync.setThing(this.users, 'Users', 1, 'Ajout d\'utilisateur reussit');
            if (user.statut === 'enseignant')
            {
                this.teachers.push(user);
                this.sync.setThing(this.teachers, 'Teachers', 1, 'Ajout de l\'enseignant avec success!');
                // this.storage.set('Teachers', this.teachers);
            }
        }

        else if (this.test === 3)
        {
            const topic = {
                code: f.code,
                topicName: f.libelle,
                docId: 0,
                teacher: f.teacher,
                type: f.type,
                schoolYear: this.years[this.years.length - 1].code,
                level: f.level
            }
            this.topics.push(topic);
            this.sync.setThing(this.topics, 'Topics', 1, 'Ajout de la matiere avec success!');
            // this.storage.set('Topics', this.topics);
        }
        else if (this.test === 2)
        {
            const branch = {
                code: f.code,
                branchName: f.libelle,
                docId: 0,
                schoolYear: this.years[this.years.length - 1].code
            }
            this.branchs.push(branch);
            this.sync.setThing(this.branchs, 'Branchs', 1, 'Ajout de la filiere avec success!');
            // this.storage.set('Branchs', this.branchs);

        }
    }



    /*la partie anonymats */

    addNoname(f)
    {
        for(let tab of f)
        {
            this.tampNonames.push(tab);
        }
        this.sync.setThing(this.tampNonames, 'TampNoNames', 1, 'Vous avez generer les anonymats avec success');
        // this.storage.set('TampNoNames', this.tampNonames);

    }

    /* Enregistreur des notes avec anonymats venant de l'enseignant */

    saveNote(f)
    {

        this.storage.get('NoNames').then(val => {
            if (val)
            {
                this.nonames = val;
            }
            else
            {
                this.nonames = [];
            }
            for(let tab of f)
            {
                this.nonames.push(tab);
            }
            this.sync.setThing(this.nonames, 'NoNames', 1, 'Vous avez enregistrer les notes avec succes!');
            // this.storage.set('NoNames', this.nonames);
        });

    }


    saveTampNoName(f)
    {
        for(let tab of f)
        {
            this.tampNonames.push(tab);
        }
        this.sync.setThing(this.tampNonames, 'TampNoNames', 1, 'Ajout de l\'etudiant avec success!');
        // this.storage.set('TampNoNames', this.tampNonames);
    }


    /* Partie d'enregistrement des notes des etudiants */

    dropNote()
    {
        for (let val of this.lookNotes)
        {
            this.dropNoName(val);
        }
    }
    validNote(f)
    {
        for (let val of f)
        {
            const note = {
                code: val.code,
                branch: val.branch,
                topic: val.topic,
                student: val.student,
                exam: val.exam,
                docId: val.docId,
                note: f.note,
                schoolYear: val.schoolYear,
                teacher: val.teacher,
                branchName: val.branchName,
                studentName: val.studentName,
                teacherName: val.teacherName
            }

            this.notes.push(note);
            this.dropNoName(val);

        }

        // this.storage.set('Notes', this.notes);
        this.sync.setThing(this.notes, 'Notes', 1,'Enregistrement des notes avec succes!');
        // this.storage.set('NoNames', this.nonames);
        this.sync.setThing(this.nonames, 'NoNames',0,'');
    }

    dropNoName(tab)
    {
        let a, b;
        for (let val of this.nonames)
        {
            if (val.code === tab.code)
            {
                b = a;
            }

            a++;
        }

        this.nonames.splice(b, 1);
    }
    
    
    async dropThing(collection, f)
    {
        this.sync.dropData(collection, f);
    }

}
