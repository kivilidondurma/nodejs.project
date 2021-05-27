const yargs = require('yargs')
const notes = require('./utilitis.js')
const pieces = require('./mongodb.js')

yargs.command({
    command:'search',
    description:'Searching Subject',
    builder:{
        search:{
            describe: 'Searching on Web',
            demandOption:true,
            type:'string'
        }
    },
    handler: function(argv){
        notes.search(argv.search)
       
    }
})

yargs.command({
    command:'write',
    description:'Searching Subject',
    builder:{
        write:{
            describe: 'Searching on Web',
            demandOption:true,
            type:'string'
        }
    },
    handler: function(argv){
        pieces.writing(argv.write)
       
    }
})
yargs.parse()

