
class Seeker {
    constructor(client) {
     this.client=client
     this.nextTry= 60*1000*60*3
    }

    run = async () => {
        console.log(new Date() + ' seekerbot')
        try{
         
            const recommendations = await this.getRecommendations();
    
              if (recommendations && recommendations.results && recommendations.results.length) {
                 this._likeEveryBody(recommendations)
             }                                      
             
        } catch(err){
            console.log(err)
        }
        this.setNext(this.run, this.nextTry)
       
    }
    setNext(cb, time) {
        setTimeout(function(){ cb() }, time);
    }
   
    
    getRecommendations = () => {
        return this.client.getRecommendations();
        
    }
    

    _likeEveryBody = async (lastRecommendations) => {
          let exitFlag=false
        lastRecommendations.results.forEach( (item, index)=> {
         

            const randomNumber = randomInt(2000,4000)
           
            const waitTime = randomNumber*index
            setTimeout( async ()=>{
                const randomNumber2 = randomInt(1,10)
                if (!exitFlag) {
                if ((randomNumber2 > 3 && item.gender === 1) || (randomNumber2 > 9 && item.gender === 0)) {
                    console.log('pass')
                
                    await this.client.pass(item._id)
    
                } else {
                   
              
                    
                        const like= await this.client.like(item._id)
                        console.log('like')
                        if (!like.likes_remaining) {
                         exitFlag = true
                         console.log("NO MORE LIKES")
                        }
                    
                 
                 
                }}
                
                if (lastRecommendations.results.length - 1 === index && !exitFlag) {
                    const recommendations = await this.getRecommendations()
                    if (!exitFlag && recommendations && recommendations.results && recommendations.results.length) {
                        this._likeEveryBody(recommendations)
                    }

                }
            }, waitTime)
                                         
    })}
    
}


export default Seeker





 



function randomInt(min, max) {
	return min + Math.floor((max - min) * Math.random());
}


async function likeRecomendations() {

}