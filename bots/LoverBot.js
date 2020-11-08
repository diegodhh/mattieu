import conversationalTemplates from './conversationalTempates'
class Lover {
    constructor(client,match, profile) {
     this.client=client
     this.match=match
     this.profile=profile
     this.waitTime= 1000*60
     this.checkResponseNumber=10
    
    
    }

    run = async () => {
        // console.log(new Date() + 'loverbot')
        
        try{
        
            const {messages, created_date : createdDate} = this.match || {}
            let currentStep = null
            messages && messages.reverse().find(msg=> {
                
                currentStep= Object.keys(conversationalTemplates).find((step)=>{
                    // console.log(conversationalTemplates[step])
                    // console.log(msg.message)
                    const result = conversationalTemplates[step].indexOf(msg.message) !==-1
                    // console.log(result)
                    return result
                })
                   
                //  console.log(currentStep)
                 return currentStep
                   
                
            })
          
          
            const allSteps=Object.keys(conversationalTemplates)
            // console.log('currentStep', currentStep)
            // console.log('index calcul',allSteps.indexOf(currentStep))
            const nextStep=allSteps[allSteps.indexOf(currentStep)+1]
            // console.log('nextStep', nextStep)
            // console.log('ready', this._checkIfReady(messages, createdDate))
            if (!nextStep || !this._checkIfReady(messages, createdDate)) {
                // console.log('notReady or done')
                return false
            }
             
                // console.log('ready')
                const templates = conversationalTemplates[nextStep]
                if (!templates) {
                    return false
                }
                const randomIndex = randomInt(0,templates.length)
                setTimeout(async ()=> {
                    try {
                        this._sendMessage(templates[randomIndex] || templates[randomIndex-1] || 'error 404 de roboto pelotudo')
                    } catch(err) {
                        console.log('sendmessage error', err)
                    }
                    
                }, randomInt(0,1000*120))
                
            
                return true
          
             
        } catch(err){

            console.log(err)
        }
       
    }
   
    _checkIfReady=(messages, createdDate)=>{
       
        if (messages && messages.length === 0) {
            return true
        }
       
        const lastMessages= messages[0]


        // console.log('lastMessage', lastMessages)
        // console.log('profileid', this.profile._id)
        if (this.profile._id === lastMessages.to) {
            return true
        }
        return false

    }
   

    _sendMessage = async (msg) => {
        console.log("send message")
        try {
            await this.client.messageMatch({ matchId: this.match._id, message: msg });
            this._waitForResponse()
        } catch(err) {
            console.log(err)
        }
       
    }
    
    getRecommendations =  () => {
        return this.client.getRecommendations();
        
    }
    _waitForResponse =()=> {
        if (this.checkResponseNumber > 0) {
            this.checkResponseNumber =this.checkResponseNumber-1
            // setTimeout(this._updateMatchAndRun, this.waitTime)
        }
        
        
         
    }
    _updateMatchAndRun = async(match)=> {
     
       
        
        
    }


    
}


export default Lover





 



function randomInt(min, max) {
	return min + Math.floor((max - min) * Math.random());
}

