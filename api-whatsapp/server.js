const makeWASocket = require('@whiskeysockets/baileys').default;
const {useMultiFileAuthState,DisconnectReason} = require('@whiskeysockets/baileys')


async function connectToWhats(){
    const {state,saveCreds} = await useMultiFileAuthState('auth_info_baileys')
    const socket =  makeWASocket({
        printQRInTerminal: true,
        auth: state

    })
    socket.ev.on('creds.update',saveCreds)

    socket.ev.on('connection.update',(update)=>{
        const {connection,qr,lastDisconnect}= update

        if(qr){console.log(qr)}
       
        if(connection==='open')console.log('Você está conectado')
        if(connection ==='close'){
            const shouldReconnect = lastDisconnect?.output?.statusCode !== DisconnectReason.loggedOut
            
            if(shouldReconnect) {
                connectToWhats()
            }
        }
    })
   
    socket.ev.on('messages.upsert',(m)=>{

        
    })  

    

   
    
}

    

connectToWhats()


