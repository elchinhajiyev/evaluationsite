const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Evaluation = require('./models/evaluationModel');
const Comment = require('./models/commentModel');
const cerezData = require('./cerez');
const { find } = require('./models/evaluationModel');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}));
const PORT = process.env.PORT || 6000;

const dbURL = 'mongodb+srv://dbuser:m0LNAxSPU0pMgSmu@akkreditasiya.n1bzf.mongodb.net/evaluations?retryWrites=true&w=majority'
mongoose.connect(dbURL) 
.then((result)=>app.listen(PORT, ()=>{
    console.log(`Server ${PORT} portunda calisir`);
}));



app.get('/', function(req,res){
    res.render('home');
});

app.get('/evaluations', function(req,res){
Evaluation.find({}, function(err, evaluationDB){
if(err){
    console.log(err)
}else{
    console.log(evaluationDB)
    res.render("evaluations/evaluations", {evaluations:evaluationDB});
}
});
});


app.post('/evaluations', (req,res)=>{
    const evaluation = new Evaluation (req.body)
    evaluation.save()
    .then((result)=>{
        res.redirect('evaluations')
    })
    .catch((err)=>{
        console.log(err);
    })
})

// app.post('/evaluations', function (req, res) {
// Evaluation.create()
// });

app.get("/evaluations/add", function(req,res){
    res.render("evaluations/add")
})

// app.get("/evaluations/:id", function(req, res){
//         Evaluation.findById(req.params.id, function(err, findedEvaluation){
//            if(err){
//                console.log(err)
//            } else{
//              res.render('evaluations/evaluation',{evaluation: findedEvaluation}) ; 
//            }
//         })
//     })

app.get('/evaluations/:id', function(req,res){
    Evaluation.findById(req.params.id).populate("comments").exec(function(err, findevaluation){
        if(err){
            console.log(err);
        }else{
            res.render('evaluations/evaluation', {evaluation: findevaluation});
        }
    });

});





//Esas method burada////
//
// app.get('/evaluations/:id', function(req,res){
//     Evaluation.findById(req.params.id).populate("comments").exec(function(err, findevaluation){
//         if(err){
//             console.log(err);
//         }else{
//             res.render('evaluations/evaluation', {evaluation: findevaluation});
//         }
//     });

// });

app.get('/evaluations/:id/comments/add', function(req,res){
    Evaluation.findById(req.params.id, function(err, findevaluation){
       if(err){
           console.log(err);
       } else{
           res.render('comments/add', {evaluation : findevaluation });
       }
    });
});

app.post('/evaluations/:id/comments/', function(req,res){
    Evaluation.findById(req.params.id, function(err, findevaluation){
       if(err){
           console.log(err);
       } else{
           Comment.create(req.body.comment, function(err, comment ){
               findevaluation.comments.push(comment)
               findevaluation.save();
               res.redirect("/evaluations/"+findevaluation._id)

           })
       }
    });
});


































// const express = require('express')
// const morgan = require('morgan')
// const mongoose = require('mongoose')
// const {result, identity, add} = require('lodash')
// const { render } = require('ejs')
// const Evaluation = require('./models/evaluations')
// const { request } = require('express')
// const app = express()
// const PORT = process.env.PORT || 5000;

// const dbURL = 'mongodb+srv://elchin:elchin@evaluation.vt3iq.mongodb.net/node-anket?retryWrites=true&w=majority'
// mongoose.connect(dbURL) 
// .then((result)=>app.listen(PORT, ()=>{
//     console.log(`Server ${PORT} portunda calisir`);
// }))
// .catch((err)=>console.log("baglanmadı"))

// app.set('view engine', 'ejs')
// app.use(express.static('style'))
// app.use(express.urlencoded ({extended: true}))
// app.use(morgan('dev'))


// app.get('/', (req,res)=>{
//    Evaluation.find().sort({created_At:-1})
//    .then((result)=>{
//     res.render('admin', {title: 'Main Page', evaluations: result})
//    })
//    .catch((err)=>{
//        console.log(err);
//    }) 
//  })

// app.get('/evaluation/:id', (req,res)=>{
//     const id = req.params.id
//     Evaluation.findById(id)
//     .then((result)=>{
//         res.render('evaluation', {evaluation: result, title: 'institutons'})
// })
// .catch((err)=>{
//     res.status(404).render('404',  {title: 'Error 404'})
// })

// })


// app.get('/admin', (req,res)=>{
//     Evaluation.find().sort({created_At:-1})
//     .then((result)=>{
//      res.render('admin', {title: 'admin', evaluations: result})
//     })
//     .catch((err)=>{
//         console.log(err);
//     }) 
// })

// app.get('/evaluation', (req,res)=>{
//     Evaluation.find().sort({created_At:-1})
//     .then((result)=>{
//      res.render('evaluation', {title: 'evaluation', evaluations: result})
//     })
//     .catch((err)=>{
//         console.log(err);
//     }) 
// })


// app.get('/admin/addevaluation', (req,res)=>{
//     res.render('addevaluation', {title: 'new evaluation'})
// })

// app.get('/admin/addreport', (req,res)=>{
//     res.render('addreport', {title: 'new report'})
// })


// app.get('/login', (req,res)=>{
//     res.render('login', {title: 'daxil ol'})
// })


// app.post('/admin/addevaluation', (req,res)=>{
//     const evaluation = new Evaluation (req.body)
//     evaluation.save()
//     .then((result)=>{
//         res.redirect('/admin')
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
// })




// app.get('/about', (req,res)=>{
//     res.render('about',  {title: 'Hakkimizda'})
// })


// app.get('/about-us',(req,res)=>{
//     res.redirect('about')
// })




// app.use((req,res) =>{
//     res.status(404).render('404',  {title: 'Error 404'})
// })




