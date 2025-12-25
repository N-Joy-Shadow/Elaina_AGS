import { Gtk } from "ags/gtk4";
import Tray from "./right/Tray";
import { Divider } from "../../components/common";

export default function RightItems() {
    return (<box $type="end" orientation={Gtk.Orientation.VERTICAL} class="right-items" widthRequest={32}>
        <Tray/>
        <Divider/>

    </box>)
};
