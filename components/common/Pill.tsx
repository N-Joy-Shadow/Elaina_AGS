import { Gtk } from "ags/gtk4";
import { CCProps } from "gnim";

interface PillType extends CCProps<Gtk.Box, Partial<Gtk.Box.ConstructorProps>>  {
    children: JSX.Element | Array<JSX.Element>
}

export default function Pill(props: PillType) {
    return (
		<box class="pill" {...props}>
			<box class="pill-top"/>
			<box class="pill-content" orientation={props.orientation}>{props.children}</box>
			<box class="pill-bottom"/>
		</box>
	);    
};
