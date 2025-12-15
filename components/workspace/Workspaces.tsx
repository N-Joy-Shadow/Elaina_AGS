import AstalHyprland from "gi://AstalHyprland";

type Workspace = AstalHyprland.Workspace
            
import app from "ags/gtk4/app"
import GLib from "gi://GLib"
import Astal from "gi://Astal?version=4.0"
import Gtk from "gi://Gtk?version=4.0"
import Gdk from "gi://Gdk?version=4.0"
import { For, createBinding, createEffect, createState } from "ags";
import FocusedIcon from "./FocusedIcon";
import AstalApps from "gi://AstalApps"

export default function Workpsaces() {
    const hypr = AstalHyprland.get_default()
	const apps = new AstalApps.Apps()
    const FALLBACK_ICON = "application-x-executable"

    const box = Gtk.Box;

	const workspaces =  createBinding(hypr, "workspaces").as(ws => [...ws].sort((a,b) => a.id - b.id));
	const [icons, setIcons] = createState<string[]>([])
	const [focusedWorkspace, setFocusedWorkspace] = createState<Workspace>(hypr.focusedWorkspace)
	createEffect(() => {
		setIcons(focusedWorkspace().clients.map((client) => {
			const cls = client.class;
			const app = apps.exact_query(cls)[0];
			return (app?.iconName ?? FALLBACK_ICON);
		}))
	})

    return (
		<box class="workspaces" orientation={Gtk.Orientation.VERTICAL}>
			<For each={workspaces}>
				{(ws: Workspace) => {
					const isFocused = createBinding(
						hypr,
						"focusedWorkspace"
					).as((fw) => fw.id === ws.id);
					return (
						<button
							onClicked={() => ws.focus()}
							$={(self) => {
								const update = () => {
									if (isFocused()) {
										self.add_css_class("focused");
										setFocusedWorkspace(ws);
									} else {
										self.remove_css_class("focused");
									}
								};

								const signalId = hypr.connect(
									"notify::focused-workspace",
									update
								);

								update();

								self.connect("destroy", () => {
									hypr.disconnect(signalId);
								});
							}}
						>
							<box orientation={Gtk.Orientation.VERTICAL}>
								<label
									label={isFocused.as((f) => (f ? "" : ""))}
								/>
								<revealer
									revealChild={isFocused}
									transitionType={
										Gtk.RevealerTransitionType.SLIDE_DOWN
									}
									transitionDuration={300}
								>
									<box orientation={Gtk.Orientation.VERTICAL}>
										<For each={icons}>
											{(icon: string) => (
												<image iconName={icon} />
											)}
										</For>
									</box>
								</revealer>
							</box>
						</button>
					);
				}}
			</For>
		</box>
	);
};
