import TopBar from "./components/TopBar.tsx";
import { useMusicStore } from "@/stores/useMusicStore.tsx";

import { useEffect } from "react";
import FeturedSection from "./components/FeturedSection.tsx";
import SectionGrid from "./components/SectionGrid.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";


const HomePage = () => {
  const{fetchFeaturedSongs,fetchMadeForYouSongs,fetchTrendingSongs,MadeForYouSongs,TrendingSongs}=useMusicStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  },[fetchFeaturedSongs,fetchMadeForYouSongs,fetchTrendingSongs]);
  return (
    <div>
      <TopBar/>
      <ScrollArea className="h-[80vh]">
      <FeturedSection/>
      <SectionGrid title="Made For You" songs={MadeForYouSongs}/>
      <SectionGrid title="Trending" songs={TrendingSongs}/>
      </ScrollArea>
      </div>
  )
}

export default HomePage