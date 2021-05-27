const chalk =require('chalk');
const fs =require('fs');
const objectlist=['classical','jazz','traditional','rock_and_pop','christmas','world','bach','beethoven','mozart','tchaikovsky','joplin','chopin']

const {Builder, By, Key, until} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');



const saveLink = function (file,link) {

    const dataJSON = JSON.stringify(link)
    fs.writeFileSync(file+'.json', dataJSON)

}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }   
  
const searching = function (intparse,param){
    const isExist=objectlist.filter(function (subject){
        return subject === intparse
    })
        chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

(async function example() {
    try {
        
		var driver = new webdriver.Builder().forBrowser('chrome').build()
        var driver1 = new webdriver.Builder().forBrowser('chrome').build()

        var max_page = 0
        await driver.get('https://www.8notes.com/'+param)

        try{
            await driver.findElement(By.xpath('//*[@id="dismiss-button"]/div/svg/path[1]')).click()
            await driver.findElement(By.xpath('//*[@id="dismiss-button"]/div/span')).click()  
         }
         catch(e){
            
          }
		
        let pagination = await driver.findElement(By.css('.pagination'))
	    let ul = await pagination.findElement(By.tagName('ul'))
	    let li = await ul.findElements(By.tagName("li"))
        
        for (let x of li) { 
			let p_text = await x.getText()

            if(parseInt(p_text) && p_text>max_page){
                max_page = parseInt(p_text)
            }
            
            console.log(chalk.red.bold(p_text))
        }
        var address=[]
        for(i=1; i<=max_page; i++){
            
            console.log(chalk.cyan.bold(i+". sayfa"))
            
            await driver.get('https://www.8notes.com/'+param+i)

            await sleep(1000)
            try{
                await driver.findElement(By.xpath('//*[@id="dismiss-button"]/div/svg/path[1]')).click()
                await driver.findElement(By.xpath('//*[@id="dismiss-button"]/div/span')).click()  
             }
             catch(e){
                
              }

            let element = await driver.findElement(By.css('.table-responsive'))
	        let body = await element.findElement(By.tagName('tbody'))
	        let local_pieces = await body.findElements(By.tagName("tr"))

            for (let e of local_pieces) {

                let link = await e.getAttribute("onclick")
                let link_split = link.split("'")[1]
                let text = await e.getText()
                

                abcd={}
                abcd.name=text;
                abcd.link='https://www.8notes.com'+link_split;
                console.log(chalk.green(text) + chalk.blue(':https://www.8notes.com'+ link_split))

                if(isExist.length==0){
                
                    await driver1.get(abcd.link)
                    let main = await driver1.findElement(By.tagName("main"))
                    let im = await main.findElement(By.id("mainscore"))
                    let img = await im.findElement(By.className("img-container"))
                    let imgid = await img.findElement(By.id("score"))
                    let imgsrc = await imgid.getAttribute("src")
                    //console.log(chalk.yellow(imgsrc))


                    let midi = await driver1.findElement(By.id("midi_and_mp3_container"))
                    let midi2 = await midi.findElement(By.tagName("ul"))
                    let midi4 = await midi2.findElement(By.className("midi_list"))
                    let midiLink = await midi4.getAttribute("href")
                    //console.log(chalk.yellow(midiLink))


                    about_table = await driver1.findElement(By.css("#infobox > .comp_table"))
                    about = await about_table.getText()


                    let level = await e.findElement(By.className('difflevel'))
                    let diff = await level.getAttribute('title')
                    abcd.level=diff;
                    abcd.imgLink=imgsrc
                    abcd.midiLink=midiLink
                    abcd.about=about
                }

                address.push(abcd)
                saveLink(intparse,address)
            }

            

        }


    } catch (error){
		console.log(error)
	}
    finally{
        driver.quit()
    }
})();
}


module.exports={
    searching:searching
 }



