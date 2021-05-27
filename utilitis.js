const note = require('./app.js')

const searchObject=[['piano','guitar','violin','flute','saxophone','voice','clarinet','trumpet'],
                    ['classical','jazz','traditional','rock_and_pop','christmas','world'],
                    ['bach','beethoven','mozart','tchaikovsky','joplin','chopin']]



const search = function(search){
    const ints = JSON.stringify(search)
    const intsLowerCase = ints.toLowerCase()
    const intsParseData = JSON.parse(intsLowerCase)

    let isExist=[];
    var i=0;
    var a=0;
    for(i=0; i<3; i++){
    
        isExist = searchObject[i].filter(function (subject){
            return subject === intsParseData
   
        })
        if(isExist == intsParseData){
            a=i;
            break;
        }
    }

   if(a==0){
       
        param = intsParseData + '/classical/sheet_music/?page='
        note.searching(intsParseData,param)    
   }
   else if(a==1){
        param='all/'+ intsParseData + '/sheet_music/?page='
        note.searching(intsParseData,param) 
   }
   else if(a==2){
        param=intsParseData + '.asp?page='
        note.searching(intsParseData,param) 
   }
   else{
        console.log("hata")
 
    }
}



module.exports = {
    search: search,

}

