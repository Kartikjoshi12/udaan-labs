import { Desktop } from "@/components/os/Desktop";
import { WallpaperProvider } from "@/components/os/WallpaperContext";

export default function Home() {
  return (
    <WallpaperProvider>
      <Desktop />
    </WallpaperProvider>
  );
}
