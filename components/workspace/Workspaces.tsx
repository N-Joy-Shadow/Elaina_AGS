import AstalHyprland from "gi://AstalHyprland";

type Workspace = AstalHyprland.Workspace

import Gtk from "gi://Gtk?version=4.0"
import { For, With, createBinding, createEffect, createState } from "ags";
import AstalApps from "gi://AstalApps"
import WorkspaceItem from "./WorkspaceItem";

export default function Workpsaces() {
    const hypr = AstalHyprland.get_default()
	const apps = new AstalApps.Apps()
    const FALLBACK_ICON = "application-x-executable"

	const workspaces =  createBinding(hypr, "workspaces").as(ws => [...ws].sort((a,b) => a.id - b.id));

    return (
		<box class="workspaces" orientation={Gtk.Orientation.VERTICAL}>
			<For each={workspaces}>
				{(ws: Workspace, i) => (
					<WorkspaceItem ws={ws} visible={i.peek() !== 0}/>
				)}
			</For>
		</box>
	);
};
