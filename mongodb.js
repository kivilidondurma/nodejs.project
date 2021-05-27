var mongoose =require('mongoose')
const fs = require('fs');
const objectlist=['classical','jazz','traditional','rock_and_pop','christmas','world','bach','beethoven','mozart','tchaikovsky','joplin','chopin']


const writing =function(param){

    const isExist=objectlist.filter(function (subject){
        return subject === param
    })

    var schema =mongoose.Schema;
    var notes = new schema({
        name:String,
        link:String,
        level:String,
        imgLink:String,
        midiLink:String,
        about:String
    })

    var notes =mongoose.model(param,notes)
        

    mongoose.connect('mongodb+srv://yusuf:0123456@cluster.gxnbc.mongodb.net/myPieces?retryWrites=true&w=majority',(error)=>{
            if(!error){
                console.log('connected')
            }
            else{
                console.log('disconnected')
            }
    })
    fs.readFile(param+'.json', (err, data) => {
        if (err) throw err;
        let pieces = JSON.parse(data)

        if(isExist.length==1){
            for (i=0; i<pieces.length; i++){
                var notes1= new notes({
                    name:pieces[i].name,
                    link:pieces[i].link
                })
                notes1.save((error)=>{
                    if(error){
                        throw error;
                    }
                    console.log('saved')
                })
            }
        }

        else{
            for (i=0; i<pieces.length; i++){
            var notes1= new notes({
                name:pieces[i].name,
                link:pieces[i].link,
                level:pieces[i].level,
                imgLink:pieces[i].imgLink,
                midiLink:pieces[i].midiLink,
                about:pieces[i].about
            
            })
            notes1.save((error)=>{
                if(error){
                    throw error;
                }
                console.log('saved')
            })
            
            }
        }
    })
}

module.exports={
    writing:writing
 }