import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Injectable({
    providedIn: 'root'
})
export class PdfService{

    nada = [];
    years = [];
    studentNotes = [];
    branchs = [];
    topics  = [];
    
    notes = [
        {
            code: 'NV200',
            docId: 0,
            note: 12,
            branch: 'APR200',
            student: 'ak',
            topic: 'GL 110',
            exam: 'CC1',
            schoolYear: 'UJ1P2',
            teacher: 'ff'
        },
        {
            code: 'NV200',
            docId: 0,
            branch: 'APR200',
            student: 'ak',
            note: 5,
            topic: 'GL 112',
            exam: 'CC1',
            schoolYear: 'UJ1P2',
            teacher: 'ff'
        },
        {
            code: 'NV200',
            docId: 0,
            branch: 'APR200',
            student: '18BGIN007',
            topic: 'GL 110',
            note: 18,
            exam: 'CC1',
            schoolYear: 'UJ1P2',
            teacher: 'ff'
        },
        {
            code: 'NV200',
            docId: 0,
            branch: 'APR200',
            student: 'ak',
            topic: 'GL 110',
            exam: 'CC1',
            note: 15,
            schoolYear: '2020-2021',
            teacher: 'ff'
        },
        {
            code: 'NV200',
            docId: 0,
            branch: 'APR200',
            student: 'ak',
            topic: 'GL 120',
            exam: 'CC1',
            note: 4,
            schoolYear: 'UJ1P2',
            teacher: 'ff'
        }
    ];
    appreciations = [
        {
            Note: '80 - 100',
            Cote:   'A',
            Points: '4.00',
            Décision: 'Capitalisé (Mention Très Bien)',
            Note2:   '60 - 64',
            Cote2:	   'B-',
            Points2:    '2.70',
            Décision2:  'Capitalisé (Mention Assez-Bien)',
            Note3:   '40 - 44',
            Cote3:  'D+',
            Points3:    '1.30',
            Décision3:  'Capitalisé (Non transférable)'
        },
        {
            Note: '75 - 79',
            Cote:   'A-',
            Points: '3.70',
            Décision: 'Capitalisé (Mention Bien)',
            Note2:   '55 - 59',
            Cote2:	   'C+',
            Points2:    '2.30',
            Décision2:  'Capitalisé (Mention passable)',
            Note3:   '35 - 39',
            Cote3:  'D',
            Points3:    '1.00',
            Décision3:  'Capitalisé (Non transférable)'
        },
        {
            Note: '70 - 74',
            Cote:   'B+',
            Points: '3.30',
            Décision: 'Capitalisé (Mention Bien)',
            Note2:   '50 - 54',
            Cote2:	   'C',
            Points2:    '2.00',
            Décision2:  'Capitalisé (Mention passable)',
            Note3:   '30 - 34',
            Cote3:  'E',
            Points3:    '0.00',
            Décision3:  'Echec'
        },
        {
            Note: '65 - 69',
            Cote:   'B',
            Points: '3.00',
            Décision: 'Capitalisé (Mention Assez-Bien)',
            Note2:   '45 - 49',
            Cote2:	   'C-',
            Points2:    '1.70',
            Décision2:  'Capitalisé (Non transférable)',
            Note3:   '0 - 29',
            Cote3:  'E',
            Points3:    '0.00',
            Décision3:  'Echec'
        }

    ];

    table1 = [

        {
            code: 'DAE 1110',
            intitule: 'Économie Générale 1&2',
            note1: '12.90',
            note2: '64.5',
            cote: 'B-',
            points: '2.70',
            decision: 'CA',
            annee: '2018/2019 S1&2'  
        },
        {
            code: 'DAE 1110',
            intitule: 'Économie Générale 1&2',
            note1: '12.90',
            note2: '64.5',
            cote: 'B-',
            points: '2.70',
            decision: 'CA',
            annee: '2018/2019 S1&2'  
        },
        {
            code: 'DAE 1110',
            intitule: 'Économie Générale 1&2',
            note1: '12.90',
            note2: '64.5',
            cote: 'B-',
            points: '2.70',
            decision: 'CA',
            annee: '2018/2019 S1&2'  
        },
        {
            code: 'DAE 1110',
            intitule: 'Économie Générale 1&2',
            note1: '12.90',
            note2: '64.5',
            cote: 'B-',
            points: '2.70',
            decision: 'CA',
            annee: '2018/2019 S1&2'  
        },
        {
            code: 'DAE 1110',
            intitule: 'Économie Générale 1&2',
            note1: '12.90',
            note2: '64.5',
            cote: 'B-',
            points: '2.70',
            decision: 'CA',
            annee: '2018/2019 S1&2'  
        }
    ];

    table2 = [
        {
            code: 'DAE 1110',
            intitule: 'Économie Générale 1&2',
            note1: '12.90',
            note2: '64.5',
            cote: 'B-',
            points: '2.70',
            decision: 'CA',
            annee: '2018/2019 S1&2'  
        },        
        {
            code: 'DAE 1110',
            intitule: 'Économie Générale 1&2',
            note1: '12.90',
            note2: '64.5',
            cote: 'B-',
            points: '2.70',
            decision: 'CA',
            annee: '2018/2019 S1&2'  
        },        
        {
            code: 'DAE 1110',
            intitule: 'Économie Générale 1&2',
            note1: '12.90',
            note2: '64.5',
            cote: 'B-',
            points: '2.70',
            decision: 'CA',
            annee: '2018/2019 S1&2'  
        },
        {
            code: 'DAE 1110',
            intitule: 'Économie Générale 1&2',
            note1: '12.90',
            note2: '64.5',
            cote: 'B-',
            points: '2.70',
            decision: 'CA',
            annee: '2018/2019 S1&2'  
        },
        {
            code: 'DAE 1110',
            intitule: 'Économie Générale 1&2',
            note1: '12.90',
            note2: '64.5',
            cote: 'B-',
            points: '2.70',
            decision: 'CA',
            annee: '2018/2019 S1&2'  
        },
        {
            code: 'DAE 1110',
            intitule: 'Économie Générale 1&2',
            note1: '12.90',
            note2: '64.5',
            cote: 'B-',
            points: '2.70',
            decision: 'CA',
            annee: '2018/2019 S1&2'  
        },
        {
            code: 'DAE 1110',
            intitule: 'Économie Générale 1&2',
            note1: '12.90',
            note2: '64.5',
            cote: 'B-',
            points: '2.70',
            decision: 'CA',
            annee: '2018/2019 S1&2'  
        },
        {
            code: 'DAE 1110',
            intitule: 'Économie Générale 1&2',
            note1: '12.90',
            note2: '64.5',
            cote: 'B-',
            points: '2.70',
            decision: 'CA',
            annee: '2018/2019 S1&2'  
        },
        {
            code: 'DAE 1110',
            intitule: 'Économie Générale 1&2',
            note1: '12.90',
            note2: '64.5',
            cote: 'B-',
            points: '2.70',
            decision: 'CA',
            annee: '2018/2019 S1&2'  
        },
        {
            code: 'DAE 1110',
            intitule: 'Économie Générale 1&2',
            note1: '12.90',
            note2: '64.5',
            cote: 'B-',
            points: '2.70',
            decision: 'CA',
            annee: '2018/2019 S1&2'  
        },
        {
            code: 'DAE 1110',
            intitule: 'Économie Générale 1&2',
            note1: '12.90',
            note2: '64.5',
            cote: 'B-',
            points: '2.70',
            decision: 'CA',
            annee: '2018/2019 S1&2'  
        },
        {
            code: 'DAE 1110',
            intitule: 'Économie Générale 1&2',
            note1: '12.90',
            note2: '64.5',
            cote: 'B-',
            points: '2.70',
            decision: 'CA',
            annee: '2018/2019 S1&2'  
        },
        {
            code: 'DAE 1110',
            intitule: 'Économie Générale 1&2',
            note1: '12.90',
            note2: '64.5',
            cote: 'B-',
            points: '2.70',
            decision: 'CA',
            annee: '2018/2019 S1&2'  
        },
        {
            code: 'DAE 1110',
            intitule: 'Économie Générale 1&2',
            note1: '12.90',
            note2: '64.5',
            cote: 'B-',
            points: '2.70',
            decision: 'CA',
            annee: '2018/2019 S1&2'  
        }
    ];

    table3 = [
        {
            code: 'DAE 1110',
            intitule: 'Économie Générale 1&2',
            note1: '12.90',
            note2: '64.5',
            cote: 'B-',
            points: '2.70',
            decision: 'CA',
            annee: '2018/2019 S1&2'  
        }
    ];


    constructor(private storage: Storage)
    {
        this.storage.get('Years').then(val => {
            if (val)
            {   
                this.years = val;
            }   
        });

        // cette ligne est a decommente quand les datas seront pretes 

        // this.storage.get('Notes').then(val => {
        //     if (val)
        //     {   
        //         this.notes = val;
        //     }   
        // });

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
    }

        // cette partie permet d'appretter les donnees pour generer le pdf

    formatData(year, student)
    {
        let tamNotes = this.notes.filter((note) => {
            if (note.schoolYear === year && note.student === student.matricule)
            {
                return note;
            }
        });

        this.table1 = this.rangeTable1(tamNotes);
        if (this.rangeTable2(tamNotes).length !== 0)
        {
            this.table2 = this.rangeTable2(tamNotes);
        }
        if (this.rangeTable3(tamNotes).length !== 0)
        {
            this.table3 = this.rangeTable3(tamNotes);
        }
        this.makePdf(year, student);
    }

    rangeTable1(table)
    {
        let tops = [], bon;
        for( let note of table)
        {
            for( let top of this.topics)
            {
                if (note.topic === top.code && top.type === 'fondamentale')
                {
                    let tamp, pont, dec;
                    if ((note.note * 5) >= 80)
                    {
                        tamp = 'A';
                        pont = '4.00';
                    }
                    else if((note.note * 5) < 80 && (note.note * 5) >= 75)
                    {
                        tamp = 'A-';
                        pont = '3.70';
                    }
                    else if((note.note * 5) < 75 && (note.note * 5) >= 70)
                    {
                        tamp = 'B+';
                        pont = '3.30';
                    }
                    else if((note.note * 5) < 70 && (note.note * 5) >= 65)
                    {
                        tamp = 'B';
                        pont = '3.00';
                    }
                    else if((note.note * 5) < 65 && (note.note * 5) >= 60)
                    {
                        tamp = 'B-';
                        pont = '2.70';
                    }
                    else if((note.note * 5) < 60 && (note.note * 5) >= 55)
                    {
                        tamp = 'C+';
                        pont = '2.30';
                    }
                    else if((note.note * 5) < 55 && (note.note * 5) >= 50)
                    {
                        tamp = 'C';
                        pont = '2.00';
                    }
                    else if((note.note * 5) < 50 && (note.note * 5) >= 45)
                    {
                        tamp = 'C-';
                        pont = '1.70';
                    }
                    else if((note.note * 5) < 45 && (note.note * 5) >= 40)
                    {
                        tamp = 'D+';
                        pont = '1.30';
                    }
                    else if((note.note * 5) < 40 && (note.note * 5) >= 35)
                    {
                        tamp = 'D';
                        pont = '1.00';
                    }
                    else if((note.note * 5) < 35 && (note.note * 5) >= 30)
                    {
                        tamp = 'E';
                        pont = '0.00';
                    }
                    else if((note.note * 5) < 30 )
                    {
                        tamp = 'E';
                        pont = '0.00';
                    }
                    

                    if ((note.note * 5) < 30 )
                    {
                        dec  = 'EC';
                    }
                    else
                    {
                        dec = 'CA';
                    }


                    const bal = {
                        code: top.code,
                        intitule: top.topicName,
                        note1: note.note,
                        note2: (note.note * 5),
                        cote: tamp,
                        points: pont,
                        decision: dec,
                        annee: note.schoolYear + ' S1&2'
                    }
                    bon = bal;
                    tops.push(bon);
                }
            }
        }
        console.log(tops);
        return tops;
    }

    rangeTable2(table)
    {
        let tops = [], bon;
        for( let note of table)
        {
            for( let top of this.topics)
            {
                if (note.topic === top.code && top.type === 'specialisation')
                {
                    let tamp, pont, dec;
                    if ((note.note * 5) >= 80)
                    {
                        tamp = 'A';
                        pont = '4.00';
                    }
                    else if((note.note * 5) < 80 && (note.note * 5) >= 75)
                    {
                        tamp = 'A-';
                        pont = '3.70';
                    }
                    else if((note.note * 5) < 75 && (note.note * 5) >= 70)
                    {
                        tamp = 'B+';
                        pont = '3.30';
                    }
                    else if((note.note * 5) < 70 && (note.note * 5) >= 65)
                    {
                        tamp = 'B';
                        pont = '3.00';
                    }
                    else if((note.note * 5) < 65 && (note.note * 5) >= 60)
                    {
                        tamp = 'B-';
                        pont = '2.70';
                    }
                    else if((note.note * 5) < 60 && (note.note * 5) >= 55)
                    {
                        tamp = 'C+';
                        pont = '2.30';
                    }
                    else if((note.note * 5) < 55 && (note.note * 5) >= 50)
                    {
                        tamp = 'C';
                        pont = '2.00';
                    }
                    else if((note.note * 5) < 50 && (note.note * 5) >= 45)
                    {
                        tamp = 'C-';
                        pont = '1.70';
                    }
                    else if((note.note * 5) < 45 && (note.note * 5) >= 40)
                    {
                        tamp = 'D+';
                        pont = '1.30';
                    }
                    else if((note.note * 5) < 40 && (note.note * 5) >= 35)
                    {
                        tamp = 'D';
                        pont = '1.00';
                    }
                    else if((note.note * 5) < 35 && (note.note * 5) >= 30)
                    {
                        tamp = 'E';
                        pont = '0.00';
                    }
                    else if((note.note * 5) < 30 )
                    {
                        tamp = 'E';
                        pont = '0.00';
                    }
                    

                    if ((note.note * 5) < 30 )
                    {
                        dec  = 'EC';
                    }
                    else
                    {
                        dec = 'CA';
                    }


                    const bal = {
                        code: top.code,
                        intitule: top.topicName,
                        note1: note.note,
                        note2: (note.note * 5),
                        cote: tamp,
                        points: pont,
                        decision: dec,
                        annee: note.schoolYear + ' S1&2'
                    }
                    bon = bal;
                    tops.push(bon);
                }
            }
        }
        console.log(tops);
        return tops;
    }



    rangeTable3(table)
    {
        let tops = [], bon;
        for( let note of table)
        {
            for( let top of this.topics)
            {
                if (note.topic === top.code && top.type === 'transversale')
                {
                    let tamp, pont, dec;
                    if ((note.note * 5) >= 80)
                    {
                        tamp = 'A';
                        pont = '4.00';
                    }
                    else if((note.note * 5) < 80 && (note.note * 5) >= 75)
                    {
                        tamp = 'A-';
                        pont = '3.70';
                    }
                    else if((note.note * 5) < 75 && (note.note * 5) >= 70)
                    {
                        tamp = 'B+';
                        pont = '3.30';
                    }
                    else if((note.note * 5) < 70 && (note.note * 5) >= 65)
                    {
                        tamp = 'B';
                        pont = '3.00';
                    }
                    else if((note.note * 5) < 65 && (note.note * 5) >= 60)
                    {
                        tamp = 'B-';
                        pont = '2.70';
                    }
                    else if((note.note * 5) < 60 && (note.note * 5) >= 55)
                    {
                        tamp = 'C+';
                        pont = '2.30';
                    }
                    else if((note.note * 5) < 55 && (note.note * 5) >= 50)
                    {
                        tamp = 'C';
                        pont = '2.00';
                    }
                    else if((note.note * 5) < 50 && (note.note * 5) >= 45)
                    {
                        tamp = 'C-';
                        pont = '1.70';
                    }
                    else if((note.note * 5) < 45 && (note.note * 5) >= 40)
                    {
                        tamp = 'D+';
                        pont = '1.30';
                    }
                    else if((note.note * 5) < 40 && (note.note * 5) >= 35)
                    {
                        tamp = 'D';
                        pont = '1.00';
                    }
                    else if((note.note * 5) < 35 && (note.note * 5) >= 30)
                    {
                        tamp = 'E';
                        pont = '0.00';
                    }
                    else if((note.note * 5) < 30 )
                    {
                        tamp = 'E';
                        pont = '0.00';
                    }
                    

                    if ((note.note * 5) < 30 )
                    {
                        dec  = 'EC';
                    }
                    else
                    {
                        dec = 'CA';
                    }


                    const bal = {
                        code: top.code,
                        intitule: top.topicName,
                        note1: note.note,
                        note2: (note.note * 5),
                        cote: tamp,
                        points: pont,
                        decision: dec,
                        annee: note.schoolYear + ' S1&2'
                    }
                    bon = bal;
                    tops.push(bon);
                }
            }
        }
        console.log(tops);
        return tops;
    }


        // cette parties deja la creation du pdf avec des donnees deja pretes 
    
    dinamycBuild(data, columns, style) 
    {
        const body = [];
        let row = [];

        for (let col of columns)
        {
            row.push({text: col, style: style});
        }

        body.push(row);

        data.forEach((row) => {
            const dataRow = [];
            for (let col of columns)
            {
                dataRow.push({text: row[col], style: style});
            }    
            body.push(dataRow);
        });

        return body;
    }

    dynamicTable(data, columns, style, width) {
        return {
            table: {
                headerRows: 1,
                widths: width,
                body: this.dinamycBuild(data, columns, style), 
                style: style
            },
        };
    }

    dinamycBuildData(data, header, columns, styleHeader, styleColonne) 
    {
        const body = [];
        let row = [];

        for (let col of header)
        {
            row.push({text: col, style: styleHeader});
        }

        body.push(row);

        data.forEach((row) => {
            const dataRow = [];
            for (let col of columns)
            {
                dataRow.push({text: row[col], style:   styleColonne});
            }    
            body.push(dataRow);
        });

        return body;
    }

    dynamicData(data, header, columns, styleHeader, styleColonne, width) {
        return {
            table: {
                headerRows: 1,
                widths: width,
                body: this.dinamycBuildData(data, header, columns, styleHeader, styleColonne), 
                style: styleHeader
            },
        };
    }

    dinamycBuildEmpty(data, columns, styleColonne) 
    {
        const body = [];
        
        data.forEach((row) => {
            const dataRow = [];
            for (let col of columns)
            {
                dataRow.push({text: row[col], style:   styleColonne});
            }    
            body.push(dataRow);
        });

        return body;
    }

    dynamicEmpty(data, header, styleColonne, width) {
        return {
            table: {
                headerRows: 1,
                widths: width,
                body: this.dinamycBuildEmpty(data, header, styleColonne), 
                style: styleColonne
            },
        };
    }

    makePdf(p, f) 
    {
        this.studentNotes = this.notes.filter((val) => {
            if (val.student === f.matricule && val.schoolYear === f.schoolYear && val.exam === p)
            {
                return val;
            }
        });
        console.log(this.studentNotes);
        const tag = this.years.filter((val) => {
            if (val.code === f.schoolYear)
            {
                return val;
            }
        });
        const year = tag[0];

        const gat = this.branchs.filter((val) => {
            if (val.code === f.branch)
            {
                return val;
            }
        });
        const option = gat[0];
        pdfmake.vfs = pdfFonts.pdfMake.vfs;
        var docDefinition = {
        content: [
            { text: f.studentName, style: 'head'},
            { text: f.matricule, style: 'header' },
            { text: f.birthDate, style: 'left_head' },
            { text: f.place, style: 'center_head' },
            { text: f.cycle, style: 'left_head3' },
            { text: option.branchName, style: 'center_head2' },
            { text: year.name, style: 'right_head' },
            { text: option.branchName, style: 'left_head2' },
            { text: f.level, style: 'right_head' },
            { text: '', style: 'space'},
            this.dynamicTable(this.nada, ['Code UE', 'Intitulé/Title', 'Note/20','Note/100','Cote','Points','Decision', 'Annee/Sem'], 'subtitle', [45, 165, 35, 40, 20, 30, 40, 81]),
            this.dynamicTable(this.nada, ['Unités d’Enseignement Fondamentales / Fundamental courses'], 'titre', [519]),

            this.dynamicEmpty(this.table1, ['code', 'intitule', 'note1','note2','cote', 'points', 'decision', 'annee'], 'tableData', [45, 165, 35, 40, 20, 30, 40, 81]),

            this.dynamicTable(this.nada, ['Unités d’Enseignement de Spécialisation / Spécialisation courses'], 'titre', [519]),
            this.dynamicEmpty(this.table2, ['code', 'intitule', 'note1','note2','cote', 'points', 'decision', 'annee'],  'tableData', [45, 165, 35, 40, 20, 30, 40, 81]),

            this.dynamicTable(this.nada, ['Unités d’Enseignement Transversales / Transversal courses'], 'titre', [519]),
            this.dynamicEmpty(this.table3, ['code', 'intitule', 'note1','note2','cote', 'points', 'decision', 'annee'], 'tableData', [45, 165, 35, 40, 20, 30, 40, 81]),

            this.dynamicTable(this.nada, ['Moyenne Générale Pondérée/General Point Average', '12,68', 'Cote/grade :', 'B-', 'Décision', 'ADMIS'], 'moyenne', [250, 40, 60, 10, 61, 53]),
            this.dynamicTable(this.nada, ['Pourcentage de validation/Validation Percentag', '100 %', 'Total des UE d’enseignement capitalisées', '20 /20'], 'pourcentage', [195, 46, 211, 40]),
            this.dynamicTable(this.nada, ['Système de Notation'], 'systeme', [519]),
            this.dynamicData(this.appreciations, ['Note', 'Cote', 'Points','Décision','Note', 'Cote', 'Points','Décision','Note', 'Cote', 'Points','Décision'], ['Note', 'Cote', 'Points','Décision','Note2', 'Cote2', 'Points2','Décision2','Note3', 'Cote3', 'Points3','Décision3'], 'colonne', 'downtable', [25, 15, 20, 85,20, 15, 20, 85,20, 20, 20, 75,]),
        ],

    styles: {
        head: {
            fontSize: 11,
            bold: true,
            italics: true,
            alignment: 'left',
            margin: [120, 120, 0, 0]
        },
        moyenne:{
            fontSize: 9,
            bold: true,
            italics: true,
            alignment: 'left',
        },
        pourcentage:{
            fontSize: 7,
            bold: true,
            italics: true,
            alignment: 'left',
        },
        titre:{
            fontSize: 11,
            bold: true,
            italics: true,
            fillColor: '#dcdcdc',
            alignment: 'center',
            margin: [0, -1, 0, -1]
        },
        subtitle:
        {
            fontSize: 9,
            italics: true,
            bold: true,
            alignment: 'center',
            margin: [-5, 0, 0, 0]
            
        },
        tableData: {
            fontSize: 9,
            italics: true,
            alignment: 'left',
            margin: [0, -2, 0, -2]
        },
        systeme:{
            fontSize: 7,
            bold: true,
            italics: true,
            alignment: 'center',
            margin: [0, -1, 0, -1]
        },
        header: {
            bold: true,
            margin: [0, -10, 45, 0],
            fontSize: 11,
            italics: true,
            alignment: 'right'
        },
        downtable:{
            fontSize: 6,
            italics: true,
            alignment: 'left',
            margin: [0,-1,0,-1]
        },
        colonne:
        {
            fontSize: 6,
            italics: true,
            bold: true,
            alignment: 'center',
            fontFamily: 'Times New Roman',
            margin: [0, -1, 0, -1]
            
        },
        left_head: {
            fontSize: 12,
            bold: true,
            italics: true,
            margin: [50, 10, 0, 0],
            alignment: 'left'
        },
        left_head2: {
            fontSize: 12,
            bold: true,
            italics: true,
            margin: [95, 20, 0, 0],
            alignment: 'left'
        },
        space:
        {
            margin: [0, 8, 0, 0]
        },
        left_head3: {
            fontSize: 12,
            bold: true,
            italics: true,
            margin: [35, 15, 0, 0],
            alignment: 'left'
        },
        center_head: {
            fontSize: 12,
            bold: true,
            margin: [-98, -15, 0, 0],
            italics: true,
            alignment: 'center'
        },
        center_head2: {
            fontSize: 12,
            bold: true,
            margin: [38, -10, 0, 0],
            italics: true,
            alignment: 'center'
        },
        right_head: {
            fontSize: 12,
            bold: true,
            margin: [0, -10, 0, 0],
            italics: true,
            alignment: 'right'
        },
        },
        pageSize: 'A4',
        pageOrientation: 'portrait'
    };


        pdfmake.createPdf(docDefinition).open();
  }
}
