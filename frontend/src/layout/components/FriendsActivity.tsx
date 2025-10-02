import { useChatStore } from "@/store/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { User } from "lucide-react";
import { useEffect } from "react";

import { HeadphonesIcon} from "lucide-react";

const FriendsActivity = () => {
  const { fetchUsers, users,onlineUsers } = useChatStore();
  const { user } = useUser();

useEffect(() => {
	fetchUsers();
	}, [fetchUsers]);


	console.log("ONLINE USERS:", onlineUsers)
users.forEach(user => {
  console.log("User:", user.fullName, "ClerkID:", user.clerkId, "Online?", onlineUsers.has(user.clerkId));
});

  return (
    <div className="h-full bg-zinc-800 rounded-lg flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-center p-5 gap-2">
        <User className="w-8 h-8 text-white" />
        <h2 className="text-lg font-semibold text-white">Friends Activity</h2>
      </div>

      {!user && <LoginPrompt />}

      {/* Scrollable User List */}
      <ScrollArea className='flex-1'>
				<div className='p-4 space-y-4'>
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
			</ScrollArea>
    </div>
  );
};

export default FriendsActivity;


const LoginPrompt = () => (
	<div className='h-full flex flex-col items-center justify-center p-6 text-center space-y-4'>
		<div className='relative'>
			<div
				className='absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur-lg
       opacity-75 animate-pulse'
				aria-hidden='true'
			/>
			<div className='relative bg-zinc-900 rounded-full p-4'>
				<HeadphonesIcon className='size-8 text-emerald-400' />
			</div>
		</div>

		<div className='space-y-2 max-w-[250px]'>
			<h3 className='text-lg font-semibold text-white'>See What Friends Are Playing</h3>
			<p className='text-sm text-zinc-400'>Login to discover what music your friends are enjoying right now</p>
		</div>
	</div>
);
