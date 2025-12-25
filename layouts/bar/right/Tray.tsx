import AstalTray from "gi://AstalTray?version=0.1";
import Pill from "../../../components/common/Pill";
import { createBinding, For } from "ags";
import Gtk from "gi://Gtk?version=4.0";

export default function Tray() {
    const tray = AstalTray.get_default()
    const items = createBinding(tray, "items")

    const init = (btn: Gtk.MenuButton, item: AstalTray.TrayItem) => {
	    btn.menuModel = item.menuModel;
	    btn.insert_action_group("dbusmenu", item.actionGroup);
	    item.connect("notify::action-group", () => {
    		btn.insert_action_group("dbusmenu", item.actionGroup);
    	});
    }

    return (
		<Pill
			parent={{
				orientation: Gtk.Orientation.VERTICAL,
                spacing: 10,
                widthRequest: 32
			}}
            child={{
                orientation: Gtk.Orientation.VERTICAL,
                widthRequest: 32
            }}
		>
			<For each={items}>
				{(item) => {
					return (
						<menubutton
							$={(self) => init(self, item)}
							class="tray-module"
							widthRequest={32}
							heightRequest={32}
						>
							<image
								class="tray-icon"
								gicon={createBinding(item, "gicon")}
								widthRequest={32}
								heightRequest={32}
							/>
						</menubutton>
					);
				}}
			</For>
		</Pill>
	);
    
};
