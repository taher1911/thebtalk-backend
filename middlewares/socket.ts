import io from '../app'

export const sendMessage = (userId :string , message:object)=>{  
  io.emit(userId,message)
}