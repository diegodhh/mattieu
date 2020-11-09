


const { createClientFromFacebookLogin } = require('tinder-client')
import config from './config/config';
import Seeker from './SeekerBot'
import Lover from './LoverBot'
let relaseLoverInterval= 1000*60*3
let sleep = false
const sleepInterval=60*1000*60*1*5
console.log('profile')
let profileLog
let LastMessage='none'
async function init() {
    
    try{
    
    setInterval(() => {
        relaseLoverInterval=1000*60*15
        console.log('longTime',relaseLoverInterval)
    }, 60*1000*10);

    setInterval(() => {
       
        sleep=!sleep
        console.log('sleep:', sleep)
    }, sleepInterval);
  
    const client = await createClientFromFacebookLogin({
            emailAddress: config.facebookUser.email,
            password: config.facebookUser.password,
          });
          if (config.ubication.latitude) {
            await client.changeLocation({ latitude: config.ubication.latitude, longitude:  config.ubication.longitude });
       
          }
          const seeker = new Seeker(client, {tinderGold:config.tinderGold})
     
        seeker.run()
        const profile = await client.getProfile();
        profileLog=profile
        console.log(profile)
        releaseLovers(client, profile && profile.name)  
        
         
    } catch(err){
        console.log(err)
        setTimeout(() => {
            init()
        }, 60*1000*120);
    }
   
}

init()


const express = require('express')
const app = express()
const port = config.port || 3000 

app.get('/', (req, res) => {
    if (profileLog) {
        res.send(`${LastMessage} ${profileLog.name} ${profileLog.pos_info.timezone}`)
    } else {
        res.send('no profile')
    }

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


function randomInt(min, max) {
	return min + Math.floor((max - min) * Math.random());
}


async function releaseLovers(client, profile) {
    try {
    
   
   if (!sleep) {
    const updates = await client.getUpdates();
    if (updates.matches && updates.matches.length) {
        console.log('releaseLovers', new Date())
        console.log(relaseLoverInterval)
      updates.matches.map(async (match, index)=> {
         
          const lover=new Lover(client,match, profile)
         
            if(lover.run()) {
                relaseLoverInterval=1000*60*1.5
                LastMessage=new Date()
            }
        
         
          return lover
        })
     }
   }
   
     if (relaseLoverInterval) {
        setTimeout(()=> {
            releaseLovers(client,profile)
         },relaseLoverInterval)
      
     }
    } catch(err) {
        console.log(err)
        setTimeout(()=> {
            releaseLovers(client,profile)
         },relaseLoverInterval)
    }
}

