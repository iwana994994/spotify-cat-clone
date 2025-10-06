
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuthStore } from "@/stores/useAuthStore.tsx"
import DashbordStates from "./components/DashboardStates.tsx"
import Header from "./components/Header.tsx"


import { useMusicStore } from "@/stores/useMusicStore.tsx"
import { useEffect } from "react"
import SongsCard from "./components/SongsCard.tsx"
import AlbumsCard from "./components/AlbumsCard.tsx"


const AdminPage = () => {
    const {isAdmin} = useAuthStore()
    const {fetchSongs,fetchAlbums,fetchStats}=useMusicStore()


    useEffect(() => {
      
    fetchSongs();
    fetchAlbums();
    fetchStats();
    
  
    }, [fetchSongs,fetchAlbums,fetchStats])

    
    if (!isAdmin) {
      return <div>Forbidden</div>; 
    }
  
  return (
    <div>
        <Header/>
        <DashbordStates/>
        <Tabs defaultValue="songs">
                <TabsList >
                    <TabsTrigger value="songs" className="data-[state=active]:bg-zinc-500">Songs</TabsTrigger>
                    <TabsTrigger value="albums">Albums</TabsTrigger>
                    </TabsList>
          <TabsContent value="songs">
            <SongsCard/>
        
        </TabsContent>
         <TabsContent value="albums">
            <AlbumsCard/>
        
        </TabsContent>
                   
            </Tabs>
            
    </div>
  )
}

export default AdminPage