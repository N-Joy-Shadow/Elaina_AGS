import { createBinding, For, This } from "ags"
import app from "ags/gtk4/app"
import style from "./style.scss"
import ElainaBar from './layouts/bar/ElainaBar';
app.start({
  css: style,
  main() {
    const monitors = createBinding(app, "monitors")
    return (
		<For each={monitors}>
			{(monitor) => (
				<This this={app}>
					<ElainaBar gdkmonitor={monitor} />
				</This>
			)}
		</For>
	);
  },
})
