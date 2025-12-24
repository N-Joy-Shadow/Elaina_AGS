import { createBinding, For, This } from "ags"
import app from "ags/gtk4/app"
import style from "./style/style.scss"
import ElainaBar from './layouts/bar/ElainaBar';
import WindowBorder from "./layouts/WindowBorder";
import WallpaperEngine from "./components/wallpaper/WallpaperEngine";
app.start({
  //instanceName: "elaina-shell",
  css: style,
  main() {
    const monitors = createBinding(app, "monitors")
    return [(
		<For each={monitors}>
			{(monitor) => (
				<This this={app}>
					<ElainaBar gdkmonitor={monitor} />
					<WindowBorder monitor={monitor}/>
				</This>
			)}
		</For>
	)];
  },
})
