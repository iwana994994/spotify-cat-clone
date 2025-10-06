
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuthStore } from "@/stores/useAuthStore"
import DashbordStates from "./components/DashbordStates.tsx"
import Header from "./components/Header.tsx"


import { useMusicStore } from "@/stores/useMusicStore.tsx"
import { useEffect } from "react"
import SongsCard from "./components/SongsCard.tsx"
import AlbumsCard from "./components/AlbumsCard.tsx"


const AdminPage = () => {
    const {isAdmin,isLoaded} = useAuthStore()
    const {fetchSongs}=useMusicStore()


    useEffect(() => {
    fetchSongs()  
    }, [fetchSongs])

  // ← OVO JE MESTO ZA PROVERU: Van useEffect, u render delu komponente
  if (!isLoaded) {
    return <div>Loading admin status...</div>;  // Čekaj da se API završi
  }
  if (!isAdmin) {
    return <div>Forbidden</div>;  // ← OVO SE POKAŽE SAMO AKO JE isAdmin FALSE NAKON PROVERE
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