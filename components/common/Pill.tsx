import { Gtk } from "ags/gtk4";
import { CCProps } from "gnim";

interface PillType {
	parent?: CCProps<Gtk.Box, Partial<Gtk.Box.ConstructorProps>>
	child?: CCProps<Gtk.Box, Partial<Gtk.Box.ConstructorProps>>
    children: JSX.Element | Array<JSX.Element>
}

export default function Pill(props: PillType) {
    return (
		<box class="pill" {...props.parent}>
			<box class="pill-top"/>
			<box class="pill-content" {...props.child}>{props.children}</box>
			<box class="pill-bottom"/>
		</box>
	);    
};
