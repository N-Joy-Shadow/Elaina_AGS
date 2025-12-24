import { Gtk } from "ags/gtk4";
import { Divider } from "../../components/common/index";
import Workpsaces from "../../components/workspace/Workspaces";


export default function LeftItems() {
    return (
		<box $type="start" orientation={Gtk.Orientation.VERTICAL} class="left-items">
			<button halign={Gtk.Align.CENTER} class="home-btn">
				<image iconName="archlinux" iconSize={Gtk.IconSize.LARGE}/>
			</button>
			<Divider />
			<Workpsaces />
		</box>
	);
};
