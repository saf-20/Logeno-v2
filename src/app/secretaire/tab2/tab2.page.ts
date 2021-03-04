import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { AdderService } from '../../service/adder';
import { ModalController } from '@ionic/angular';
import { DetailComponent } from './detail/detail.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  plus = 0;
  nonames = [];
  viewerNotes = [];
  viewerNotes2 = [];
  branchs = [];
  topics = [];
  teachers = [];
  students = [];
  constructor(private storage: Storage,
              private adder: AdderService,
              private modal: ModalController)
  {
    this.initBranch();
    this.initStudent();
    this.initTeacher();
    this.initTopic();
    this.initNoName();

  }
  
  initBranch()
  {
    this.storage.get('Branchs').then(val => {
      if (val)
      {
        this.branchs = val;
      }
    });
  }
  
  initTeacher()
  {
    this.storage.get('Teachers').then(val => {
      if (val)
      {
        this.teachers = val;
      }
    });
  }
  initStudent()
  {
    this.storage.get('Students').then( val => {
      if (val)
      {
        this.students = val;
      }
    });
  }


  initTopic()
  {
    this.storage.get('Topics').then(val => {
      if (val)
      {
        this.topics = val;
      }
    });
  }
  initNoName()
  {
    this.storage.get('NoNames').then(val => {
      if (val)
      {
        this.nonames = val;
      }
      this.filtre();
    });
  }

  filtre()
  {
    let top = '';
    let teach = '';
    for (let tab of this.nonames)
    {
      if (tab.code !== teach && tab.topic !== top)
      {
        top = tab.topic;
        teach = tab.teach;
        for (let val of this.topics)
        {
          if (val.code === tab.topic)
          {
            for (let bag of this.branchs)
            {
              if (bag.code === tab.branch)
              {
                for (let lop of this.teachers)
                {
                  if (lop.matricule === tab.teacher)
                  {
                    for (let tol of this.students)
                    {
                      if (tol.matricule === tab.student)
                      {
                        const vaag = {
                          branch: tab.branch,
                          code: tab.code,
                          docId: tab.docId,
                          exam: tab.exam,
                          note: tab.note,
                          schoolYear: tab.schoolYear,
                          statut: tab.statut,
                          student: tab.student,
                          teacher: tab.teacher,
                          topic: tab.topic,
                          branchName: bag.branchName,
                          topicName: val.topicName,
                          teacherName: lop.userName + ' ' + lop.surname,
                          studentName: tol.studentName + ' ' + tol.surname
                        }
                        this.viewerNotes.push(vaag);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

  }


  trieur(f)
  {
    this.viewerNotes2 = [];
    for (let tab of this.nonames)
    {
      const cour = tab;
      if (cour.teacher === f.teacher && cour.exam === f.exam && cour.branch === f.branch && cour.topic === f.topic && cour.schoolYear === f.schoolYear)
      {
        for (let val of this.topics)
        {
          if (val.code === tab.topic)
          {
            for (let bag of this.branchs)
            {
              if (bag.code === tab.branch)
              {
                for (let lop of this.teachers)
                {
                  if (lop.matricule === tab.teacher)
                  {
                    for (let tol of this.students)
                    {
                      if (tol.matricule === tab.student)
                      {
                        const vaag = {
                          branch: tab.branch,
                          code: tab.code,
                          docId: tab.docId,
                          exam: tab.exam,
                          note: tab.note,
                          schoolYear: tab.schoolYear,
                          statut: tab.statut,
                          student: tab.student,
                          teacher: tab.teacher,
                          topic: tab.topic,
                          branchName: bag.branchName,
                          topicName: val.topicName,
                          teacherName: lop.userName + ' ' + lop.surname,
                          studentName: tol.studentName + ' ' + tol.surname
                        }
                        this.viewerNotes2.push(vaag);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    this.detail(f);
    
  }
  async detail(f)
  {
    let tamp = this.viewerNotes2.filter((cour) => {
      if (cour.teacher === f.teacher && cour.exam === f.exam && cour.branch === f.branch && cour.topic === f.topic && cour.schoolYear === f.schoolYear)
      {
        return cour;
      }
    });
    this.adder.lookNotes = tamp;
    const tant = await  this.modal.create({
      component: DetailComponent,
    });
    
    await tant.present();

    let banc = tant.onWillDismiss();
    if ((await banc).data)
    {
      banc = (await banc).data.base;
      this.adder.validNote(banc);
      this.initNoName();
    }
  }

}
