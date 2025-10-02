import { Avatar, AvatarFallback} from "@/components/ui/avatar"
import { useChatStore} from "@/store/useChatStore"
import { useUser } from "@clerk/clerk-react"
import { useEffect } from "react"

const UserList = () => {
  const { users, onlineUsers } = useChatStore()

  const {user}=useUser()
  const{fetchUsers}=useChatStore()


  useEffect(() => {
     console.log("Pozivam fetchUsers");
    if(user) fetchUsers()
      
  },[user,fetchUsers])


  return (
    <div className="border">
    {users.map((user) => {
					
					console.log("Rendering user:", user.fullName, "ClerkID:", user.clerkId, "Online:", onlineUsers.has(user.clerkId));
						return (
							<div
								key={user._id}
								className='cursor-pointer hover:bg-zinc-800/50 p-3 rounded-md transition-colors group'
							>
								<div className='flex items-start gap-3'>
									<div className='relative'>
										<Avatar className='size-10 border border-zinc-800'>
											
											<AvatarFallback>{user.fullName[0]}</AvatarFallback>
										</Avatar>
										<div
											className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-zinc-900 
												${onlineUsers.has(user.clerkId) ? "bg-green-500" : "bg-zinc-500"}
												`}
											aria-hidden='true'
										/>
									</div>

									<div className='flex-1 min-w-0'>
										<div className='flex items-center gap-2'>
											<span className='font-medium text-sm text-white'>{user.fullName}</span>
											
										</div>

										
									</div>
								</div>
							</div>
						);
					})}
    </div>
  )
}

export default UserList
