import { Astal, Gdk, Gtk } from "ags/gtk4";
import Cairo from 'gi://cairo?version=1.0';

export default function ScreenBorder({monitor}: {monitor: Gdk.Monitor}) {
    return (
		<window
			name="screen-border"
			gdkmonitor={monitor}
			anchor={
				Astal.WindowAnchor.TOP |
				Astal.WindowAnchor.BOTTOM |
				Astal.WindowAnchor.LEFT |
				Astal.WindowAnchor.RIGHT
			}
			layer={Astal.Layer.BACKGROUND}
			exclusivity={Astal.Exclusivity.NORMAL}
			visible
		>
			<Gtk.DrawingArea 
				$={(self) => {
					self.set_draw_func((area, cr, width, height) => {
						// --- 설정 값 ---
						const borderWidth = 4; // 테두리 두께 (화면 안쪽으로 들어오는 정도)
						const radius = 20; // 라운딩 크기
						const color = [0.98, 0.7, 0.53, 1]; // #fab387 (R, G, B, Alpha)
						// --------------

						// 1. 그리기 색상 설정
						cr.setSourceRGBA(
							color[0],
							color[1],
							color[2],
							color[3]
						);
						cr.paint();

						// 2. 이제 '지우개 모드'로 변경합니다 (중요)
						cr.setOperator(Cairo.Operator.CLEAR);
						// 3. 지울 영역(가운데 둥근 사각형)을 그립니다
						const innerX = borderWidth;
						const innerY = borderWidth;
						const innerW = width - borderWidth * 2;
						const innerH = height - borderWidth * 2;

						cr.newSubPath();
						// 둥근 사각형 경로 그리기
						cr.arc(
							innerX + innerW - radius,
							innerY + radius,
							radius,
							-Math.PI / 2,
							0
						);
						cr.arc(
							innerX + innerW - radius,
							innerY + innerH - radius,
							radius,
							0,
							Math.PI / 2
						);
						cr.arc(
							innerX + radius,
							innerY + innerH - radius,
							radius,
							Math.PI / 2,
							Math.PI
						);
						cr.arc(
							innerX + radius,
							innerY + radius,
							radius,
							Math.PI,
							(3 * Math.PI) / 2
						);
						cr.closePath();

						cr.fill();
					});
				}}
			/>
           
		</window>
	);
}