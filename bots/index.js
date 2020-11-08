


const { createClientFromFacebookLogin } = require('tinder-client')
import config from './config/config';
import Seeker from './SeekerBot'
import Lover from './LoverBot'
let relaseLoverInterval= 1000*60*3
async function init() {
    
    try{
    
    setInterval(() => {
        relaseLoverInterval=1000*60*15
        console.log('longTime',relaseLoverInterval)
    }, 60*1000*10);
    console.log(config)
    const client = await createClientFromFacebookLogin({
            emailAddress: config.facebookUser.email,
            password: config.facebookUser.password,
          });
        const seeker = new Seeker(client)
        
        seeker.run()
        const profile = await client.getProfile();
        releaseLovers(client, profile)  
        
         
    } catch(err){
        console.log(err)
        setInterval(() => {
            init()
        }, 60*1000*10);
    }
   
}

init()


function randomInt(min, max) {
	return min + Math.floor((max - min) * Math.random());
}


async function releaseLovers(client, profile) {
    try {
    
   
   
    const updates = await client.getUpdates();
    if (updates.matches && updates.matches.length) {
        console.log('releaseLovers', new Date())
        console.log(relaseLoverInterval)
      updates.matches.map(async (match, index)=> {
         
          const lover=new Lover(client,match, profile)
         
            if(lover.run()) {
                relaseLoverInterval=1000*60*1.5
            }
         
         
          return lover
        })
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

