import { createBinding } from "ags"
import { Gtk } from "ags/gtk4"
import AstalHyprland from "gi://AstalHyprland"
import AstalApps from "gi://AstalApps"

export default function FocusedIcon() {
    const hypr = AstalHyprland.get_default()
    const apps = new AstalApps.Apps()

    // 기본 아이콘 설정 (앱을 못 찾았을 때)
    const FALLBACK_ICON = "application-x-executable"

    return (
        <image
            // focusedClient가 바뀔 때마다 실행
            iconName={createBinding(hypr, "focusedClient").as(client => {
                // 포커스된 클라이언트가 없으면(바탕화면 등) fallback 반환
                if (!client) return FALLBACK_ICON

                // 1. 클라이언트의 clas 이름 가져오기
                const cls = client.class

                // 2. AstalApps를 이용해 해당 클래스 이름을 가진 앱 검색
                // exact_query는 배열을 반환하므로 첫 번째 결과를 사용
                const app = apps.exact_query(cls)[0]

                // 3. 앱이 검색되면 iconName 반환, 아니면 fallback
                return app?.iconName || FALLBACK_ICON
            })}
        />
    )
}